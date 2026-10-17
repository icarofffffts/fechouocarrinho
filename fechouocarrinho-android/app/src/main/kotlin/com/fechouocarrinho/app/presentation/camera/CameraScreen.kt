package com.fechouocarrinho.app.presentation.camera

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import android.util.Log
import android.util.Size
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.Preview as CameraXPreview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import com.fechouocarrinho.app.domain.model.Price
import com.fechouocarrinho.app.ocr.PriceExtractor
import com.fechouocarrinho.app.presentation.theme.FechouOCarrinhoTheme
import java.util.concurrent.Executors

@Composable
fun CameraScreen(
    viewModel: CameraViewModel,
    onNavigateToList: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    val context = LocalContext.current
    var hasPermission by remember {
        mutableStateOf(
            ContextCompat.checkSelfPermission(context, Manifest.permission.CAMERA) ==
                PackageManager.PERMISSION_GRANTED
        )
    }
    val launcher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestPermission()
    ) { granted ->
        hasPermission = granted
    }

    LaunchedEffect(Unit) {
        if (!hasPermission) {
            launcher.launch(Manifest.permission.CAMERA)
        }
    }

    Scaffold(
        floatingActionButton = {
            if (uiState is CameraUiState.Preview || uiState is CameraUiState.Error) {
                ExtendedFloatingActionButton(
                    onClick = onNavigateToList,
                    icon = {},
                    text = { Text("Meus precos") }
                )
            }
        }
    ) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            when (uiState) {
                is CameraUiState.Preview -> {
                    if (hasPermission) {
                        CameraPreviewContent(
                            onPhotoCaptured = { bitmap ->
                                viewModel.onPhotoCaptured(bitmap)
                            }
                        )
                    } else {
                        PermissionDeniedContent(
                            onRequestPermission = { launcher.launch(Manifest.permission.CAMERA) }
                        )
                    }
                }

                is CameraUiState.Processing -> {
                    ProcessingContent()
                }

                is CameraUiState.Success -> {
                    SuccessContent(
                        prices = (uiState as CameraUiState.Success).prices,
                        onRetry = { viewModel.retry() },
                        onList = onNavigateToList
                    )
                }

                is CameraUiState.Error -> {
                    ErrorContent(
                        message = (uiState as CameraUiState.Error).message,
                        onRetry = { viewModel.retry() }
                    )
                }
            }
        }
    }
}

@Composable
private fun CameraPreviewContent(
    onPhotoCaptured: (Bitmap) -> Unit
) {
    val context = LocalContext.current
    val lifecycleOwner = LocalLifecycleOwner.current
    val executor = remember { Executors.newSingleThreadExecutor() }
    var imageCapture by remember { mutableStateOf<ImageCapture?>(null) }

    Box(modifier = Modifier.fillMaxSize()) {
        AndroidView(
            factory = { ctx ->
                val previewView = PreviewView(ctx).apply {
                    implementationMode = PreviewView.ImplementationMode.COMPATIBLE
                    scaleType = PreviewView.ScaleType.FILL_CENTER
                }
                startCamera(
                    context = ctx,
                    lifecycleOwner = lifecycleOwner,
                    previewView = previewView,
                    onImageCaptureReady = { imageCapture = it }
                )
                previewView
            },
            modifier = Modifier.fillMaxSize()
        )

        Button(
            onClick = {
                imageCapture?.let { capture ->
                    takePhoto(context, capture, executor, onPhotoCaptured)
                }
            },
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .padding(bottom = 32.dp)
        ) {
            Text("Capturar preco")
        }

        Text(
            text = "Alinhe o preco dentro da moldura",
            style = MaterialTheme.typography.labelLarge,
            color = MaterialTheme.colorScheme.onPrimary,
            modifier = Modifier
                .align(Alignment.TopCenter)
                .padding(top = 24.dp)
        )
    }
}

private fun startCamera(
    context: Context,
    lifecycleOwner: androidx.lifecycle.LifecycleOwner,
    previewView: PreviewView,
    onImageCaptureReady: (ImageCapture) -> Unit
) {
    val cameraProviderFuture = ProcessCameraProvider.getInstance(context)
    cameraProviderFuture.addListener({
        val cameraProvider = cameraProviderFuture.get()

        val preview = CameraXPreview.Builder()
            .build()
            .also { it.setSurfaceProvider(previewView.surfaceProvider) }

        // Resolucao limitada a 1024px no eixo maior para economia de memoria
        val imageCapture = ImageCapture.Builder()
            .setCaptureMode(ImageCapture.CAPTURE_MODE_MINIMIZE_LATENCY)
            .setTargetResolution(Size(768, 1024))
            .setJpegQuality(85)
            .build()

        onImageCaptureReady(imageCapture)

        val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

        try {
            cameraProvider.unbindAll()
            cameraProvider.bindToLifecycle(
                lifecycleOwner,
                cameraSelector,
                preview,
                imageCapture
            )
        } catch (exc: Exception) {
            Log.e(TAG, "Falha ao iniciar camera", exc)
        }
    }, ContextCompat.getMainExecutor(context))
}

private fun takePhoto(
    context: Context,
    imageCapture: ImageCapture,
    executor: java.util.concurrent.ExecutorService,
    onPhotoCaptured: (Bitmap) -> Unit
) {
    imageCapture.takePicture(
        executor,
        object : ImageCapture.OnImageCapturedCallback() {
            override fun onCaptureSuccess(image: androidx.camera.core.ImageProxy) {
                val buffer = image.planes[0].buffer
                val bytes = ByteArray(buffer.remaining())
                buffer.get(bytes)

                executor.execute {
                    val bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.size)
                    val rotated = if (image.imageInfo.rotationDegrees == 0) {
                        bitmap
                    } else {
                        bitmap.rotate(image.imageInfo.rotationDegrees)
                    }
                    val resized = rotated.scaleToMaxDimension(1024)

                    if (rotated !== resized) rotated.recycle()
                    if (bitmap !== rotated && bitmap !== resized) bitmap.recycle()

                    image.close()
                    onPhotoCaptured(resized)
                }
            }

            override fun onError(exception: ImageCaptureException) {
                Log.e(TAG, "Falha na captura", exception)
            }
        }
    )
}

private fun Bitmap.rotate(degrees: Int): Bitmap {
    if (degrees == 0) return this
    val matrix = Matrix().apply { postRotate(degrees.toFloat()) }
    return Bitmap.createBitmap(this, 0, 0, width, height, matrix, true)
}

private fun Bitmap.scaleToMaxDimension(maxDimension: Int): Bitmap {
    val max = width.coerceAtLeast(height)
    if (max <= maxDimension) return this
    val scale = maxDimension.toFloat() / max
    val newWidth = (width * scale).toInt()
    val newHeight = (height * scale).toInt()
    return Bitmap.createScaledBitmap(this, newWidth, newHeight, true)
}

@Composable
private fun ProcessingContent() {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            CircularProgressIndicator()
            Spacer(modifier = Modifier.height(16.dp))
            Text("Lendo precos...")
        }
    }
}

@Composable
private fun SuccessContent(
    prices: List<Price>,
    onRetry: () -> Unit,
    onList: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = "${prices.size} preco(s) encontrado(s)",
            style = MaterialTheme.typography.headlineSmall,
            modifier = Modifier.padding(bottom = 16.dp)
        )
        LazyColumn(modifier = Modifier.weight(1f)) {
            items(prices, key = { it.createdAt }) { price ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = MaterialTheme.colorScheme.primaryContainer
                    )
                ) {
                    Column(modifier = Modifier.padding(12.dp)) {
                        Text(text = price.label, style = MaterialTheme.typography.titleMedium)
                        Text(
                            text = PriceExtractor.formatCurrency(price.value),
                            style = MaterialTheme.typography.headlineSmall,
                            color = MaterialTheme.colorScheme.primary
                        )
                    }
                }
            }
        }
        Button(onClick = onRetry, modifier = Modifier.fillMaxWidth()) {
            Text("Nova foto")
        }
        Spacer(modifier = Modifier.height(8.dp))
        Button(onClick = onList, modifier = Modifier.fillMaxWidth()) {
            Text("Ver lista salva")
        }
    }
}

@Composable
private fun ErrorContent(message: String, onRetry: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.weight(1f))
        Text(
            text = message,
            style = MaterialTheme.typography.bodyMedium,
            textAlign = TextAlign.Center,
            color = MaterialTheme.colorScheme.error
        )
        Spacer(modifier = Modifier.height(16.dp))
        Button(onClick = onRetry) {
            Text("Tentar novamente")
        }
        Spacer(modifier = Modifier.weight(1f))
    }
}

@Composable
private fun PermissionDeniedContent(onRequestPermission: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.weight(1f))
        Text(
            text = "Permissao de camera necessaria para capturar precos.",
            textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(16.dp))
        Button(onClick = onRequestPermission) {
            Text("Conceder permissao")
        }
        Spacer(modifier = Modifier.weight(1f))
    }
}

private const val TAG = "CameraScreen"

@Preview(showBackground = true)
@Composable
private fun ProcessingPreview() {
    FechouOCarrinhoTheme {
        ProcessingContent()
    }
}

@Preview(showBackground = true)
@Composable
private fun SuccessPreview() {
    FechouOCarrinhoTheme {
        SuccessContent(
            prices = listOf(
                Price(label = "ARROZ 5KG", value = 24.99, rawText = "R$ 24,99", syncStatus = "PENDING"),
                Price(label = "FEIJAO 1KG", value = 8.79, rawText = "R$ 8,79", syncStatus = "PENDING")
            ),
            onRetry = {},
            onList = {}
        )
    }
}

@Preview(showBackground = true)
@Composable
private fun ErrorPreview() {
    FechouOCarrinhoTheme {
        ErrorContent(message = "Nenhum preco encontrado.", onRetry = {})
    }
}