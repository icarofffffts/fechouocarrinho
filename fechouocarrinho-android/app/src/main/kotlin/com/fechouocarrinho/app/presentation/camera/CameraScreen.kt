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
import androidx.camera.core.Camera
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import com.fechouocarrinho.app.domain.model.Price
import com.fechouocarrinho.app.ocr.PriceExtractor
import com.fechouocarrinho.app.presentation.components.ScannerTipBanner
import com.fechouocarrinho.app.presentation.components.pressBounce
import com.fechouocarrinho.app.presentation.components.SquircleLarge
import com.fechouocarrinho.app.presentation.components.SquircleMedium
import com.fechouocarrinho.app.presentation.components.SquircleSmall
import com.fechouocarrinho.app.presentation.theme.FechouOCarrinhoTheme
import java.util.concurrent.Executors

private val ScanGreen = Color(0xFF1B8C42)
private val ScanOrange = Color(0xFFFF6B00)

@Composable
fun CameraScreen(
    viewModel: CameraViewModel,
    onNavigateToList: () -> Unit,
    marketName: String = ""
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
    ) { granted -> hasPermission = granted }

    LaunchedEffect(Unit) {
        if (!hasPermission) launcher.launch(Manifest.permission.CAMERA)
    }

    var camera by remember { mutableStateOf<Camera?>(null) }
    var torchOn by remember { mutableStateOf(false) }

    Scaffold(containerColor = Color.Black) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            if (hasPermission) {
                CameraPreviewWithOverlay(
                    onCameraReady = { camera = it },
                    torchOn = torchOn,
                    uiState = uiState,
                    viewModel = viewModel,
                    onNavigateToList = onNavigateToList,
                    marketName = marketName,
                    onTorchToggle = {
                        torchOn = !torchOn
                        camera?.cameraControl?.enableTorch(torchOn)
                    }
                )
            } else {
                PermissionDeniedContent(
                    onRequestPermission = { launcher.launch(Manifest.permission.CAMERA) }
                )
            }
        }
    }
}

@Composable
private fun CameraPreviewWithOverlay(
    onCameraReady: (Camera) -> Unit,
    torchOn: Boolean,
    uiState: CameraUiState,
    viewModel: CameraViewModel,
    onNavigateToList: () -> Unit,
    marketName: String = "",
    onTorchToggle: () -> Unit
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
                    onCameraReady = onCameraReady,
                    onImageCaptureReady = { imageCapture = it }
                )
                previewView
            },
            modifier = Modifier.fillMaxSize()
        )

        // Top bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp, vertical = 56.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            CircleIconButton(onClick = onNavigateToList) {
                Text("X", color = Color.White, fontWeight = FontWeight.Bold)
            }
            Text(
                text = "Escanear preco",
                color = Color.White,
                fontSize = 18.sp,
                fontWeight = FontWeight.ExtraBold
            )
            CircleIconButton(onClick = onTorchToggle) {
                Text(if (torchOn) "ON" else "OFF", color = Color.White, fontSize = 10.sp)
            }
        }

        // Offline badge
        Surface(
            shape = RoundedCornerShape(13.dp),
            color = ScanGreen,
            modifier = Modifier
                .align(Alignment.TopCenter)
                .padding(top = 92.dp)
        ) {
            Row(
                modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("100% Offline", color = Color.White, fontSize = 11.sp, fontWeight = FontWeight.SemiBold)
            }
        }

        // Banner tip scanner 720x200
        Box(modifier = Modifier.align(Alignment.TopCenter).padding(top = 120.dp).padding(horizontal = 16.dp)) {
            ScannerTipBanner()
        }

        // Viewfinder
        Box(
            modifier = Modifier
                .align(Alignment.TopCenter)
                .padding(top = 140.dp)
                .size(330.dp, 220.dp)
        ) {
            ScannerFrame()
        }

        // Hint
        Column(
            modifier = Modifier
                .align(Alignment.TopCenter)
                .padding(top = 380.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Posicione a etiqueta no centro do quadro",
                color = Color.White.copy(alpha = 0.8f),
                fontSize = 13.sp,
                textAlign = TextAlign.Center
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "A leitura e instantanea e 100% offline",
                color = Color.White.copy(alpha = 0.5f),
                fontSize = 11.sp,
                textAlign = TextAlign.Center
            )
        }

        // Capture button
        if (uiState is CameraUiState.Preview) {
            val takePhotoAction = {
                imageCapture?.let { capture ->
                    takePhoto(context, capture, executor) { bitmap ->
                        viewModel.onPhotoCaptured(bitmap)
                    }
                }
            }
            Button(
                onClick = { takePhotoAction() },
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .padding(bottom = 32.dp)
                    .size(76.dp)
                    .pressBounce(scaleDown = 0.92f, onClick = { takePhotoAction() }),
                shape = CircleShape,
                colors = ButtonDefaults.buttonColors(containerColor = ScanOrange),
                elevation = ButtonDefaults.buttonElevation(defaultElevation = 4.dp)
            ) {
                Text("Foto", color = Color.White, fontSize = 13.sp, fontWeight = FontWeight.Bold)
            }
        }

        if (uiState is CameraUiState.Processing) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator(color = ScanOrange)
            }
        }

        if (uiState is CameraUiState.Error) {
            Column(
                modifier = Modifier
                    .align(Alignment.Center)
                    .padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = (uiState as CameraUiState.Error).message,
                    color = Color.White,
                    textAlign = TextAlign.Center
                )
                Spacer(modifier = Modifier.height(16.dp))
                Button(onClick = { viewModel.retry() }) { Text("Tentar novamente") }
            }
        }

        // Bottom sheet when detected
        if (uiState is CameraUiState.Success) {
            val prices = (uiState as CameraUiState.Success).prices
            val detected = prices.firstOrNull()
            if (detected != null) {
                DetectedBottomSheet(
                    detected = detected,
                    marketName = marketName,
                    onConfirm = { price, quantity ->
                        viewModel.confirmPrice(price, quantity) { viewModel.retry() }
                    },
                    onEdit = { viewModel.retry() }
                )
            }
        }
    }
}

@Composable
private fun CircleIconButton(
    onClick: () -> Unit,
    content: @Composable () -> Unit
) {
    Box(
        modifier = Modifier
            .size(36.dp)
            .background(Color.White.copy(alpha = 0.15f), CircleShape)
            .pressBounce(onClick = onClick),
        contentAlignment = Alignment.Center
    ) {
        content()
    }
}

@Composable
private fun ScannerFrame() {
    val infiniteTransition = rememberInfiniteTransition(label = "ScannerLaser")
    val laserProgress by infiniteTransition.animateFloat(
        initialValue = 0.15f,
        targetValue = 0.85f,
        animationSpec = infiniteRepeatable(
            animation = tween(1400, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "LaserProgress"
    )

    Canvas(modifier = Modifier.fillMaxSize()) {
        val stroke = 4.dp.toPx()
        val corner = 30.dp.toPx()
        // top-left
        drawLine(ScanGreen, Offset(0f, 0f), Offset(corner, 0f), stroke, StrokeCap.Round)
        drawLine(ScanGreen, Offset(0f, 0f), Offset(0f, corner), stroke, StrokeCap.Round)
        // top-right
        drawLine(ScanGreen, Offset(size.width, 0f), Offset(size.width - corner, 0f), stroke, StrokeCap.Round)
        drawLine(ScanGreen, Offset(size.width, 0f), Offset(size.width, corner), stroke, StrokeCap.Round)
        // bottom-left
        drawLine(ScanGreen, Offset(0f, size.height), Offset(corner, size.height), stroke, StrokeCap.Round)
        drawLine(ScanGreen, Offset(0f, size.height), Offset(0f, size.height - corner), stroke, StrokeCap.Round)
        // bottom-right
        drawLine(ScanGreen, Offset(size.width, size.height), Offset(size.width - corner, size.height), stroke, StrokeCap.Round)
        drawLine(ScanGreen, Offset(size.width, size.height), Offset(size.width, size.height - corner), stroke, StrokeCap.Round)
        
        // Dynamic scanning laser with subtle glow
        val laserY = size.height * laserProgress
        drawLine(
            color = ScanOrange.copy(alpha = 0.35f),
            start = Offset(12f, laserY),
            end = Offset(size.width - 12f, laserY),
            strokeWidth = 5.dp.toPx(),
            cap = StrokeCap.Round
        )
        drawLine(
            color = ScanOrange,
            start = Offset(16f, laserY),
            end = Offset(size.width - 16f, laserY),
            strokeWidth = 2.dp.toPx(),
            cap = StrokeCap.Round
        )
    }
}

@Composable
private fun DetectedBottomSheet(
    detected: Price,
    marketName: String = "",
    onConfirm: (Price, Int) -> Unit,
    onEdit: () -> Unit
) {
    var priceText by remember(detected) {
        mutableStateOf(PriceExtractor.formatCurrency(detected.value).replace("R$", "").trim())
    }
    var quantity by remember { mutableStateOf(1) }

    Surface(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(topStart = 28.dp, topEnd = 28.dp),
        color = Color.White,
        shadowElevation = 12.dp
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(24.dp)
        ) {
            Box(
                modifier = Modifier
                    .width(40.dp)
                    .height(4.dp)
                    .background(Color(0xFFEAE5DC), RoundedCornerShape(2.dp))
                    .align(Alignment.CenterHorizontally)
            )
            Spacer(modifier = Modifier.height(16.dp))
            Text("Preco detectado", fontSize = 20.sp, fontWeight = FontWeight.ExtraBold, color = Color(0xFF0B2B1F))
            Text("Confirme ou edite antes de adicionar", fontSize = 12.sp, color = Color(0xFF5A6B63))
            Spacer(modifier = Modifier.height(12.dp))

            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFFFFF8F0)),
                shape = RoundedCornerShape(20.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(48.dp)
                            .background(Color(0xFFEAE5DC), RoundedCornerShape(12.dp))
                    )
                    Spacer(modifier = Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(detected.label, fontWeight = FontWeight.SemiBold, fontSize = 13.sp, color = Color(0xFF0B2B1F))
                        Text("${marketName.ifBlank { "mercado não selecionado" }} · 1 un", fontSize = 11.sp, color = Color(0xFF5A6B63))
                    }
                    Text(
                        PriceExtractor.formatCurrency(detected.value),
                        fontSize = 22.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = ScanOrange
                    )
                }
            }

            Spacer(modifier = Modifier.height(12.dp))
            Text("Preco unitario", fontSize = 12.sp, color = Color(0xFF5A6B63))
            OutlinedTextField(
                value = priceText,
                onValueChange = { priceText = it },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(14.dp)
            )

            Spacer(modifier = Modifier.height(12.dp))
            Text("Quantidade", fontSize = 12.sp, color = Color(0xFF5A6B63))
            Row(verticalAlignment = Alignment.CenterVertically) {
                CircleStepButton(text = "-", onClick = { if (quantity > 1) quantity-- })
                Spacer(modifier = Modifier.width(8.dp))
                Surface(
                    shape = RoundedCornerShape(12.dp),
                    border = androidx.compose.foundation.BorderStroke(1.5.dp, Color(0xFF0B2B1F).copy(alpha = 0.12f)),
                    color = Color.White,
                    modifier = Modifier.size(width = 60.dp, height = 40.dp)
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Text(quantity.toString(), fontSize = 18.sp, fontWeight = FontWeight.ExtraBold)
                    }
                }
                Spacer(modifier = Modifier.width(8.dp))
                CircleStepButton(text = "+", filled = true, onClick = { quantity++ })
            }

            Spacer(modifier = Modifier.height(16.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Button(
                    onClick = onEdit,
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFEAE5DC), contentColor = Color(0xFF0B2B1F)),
                    shape = RoundedCornerShape(22.dp),
                    modifier = Modifier.weight(1f).height(44.dp)
                ) { Text("Editar") }
                Button(
                    onClick = {
                        val parsed = priceText.replace("R$", "").trim().replace(".", "").replace(",", ".").toDoubleOrNull()
                            ?: detected.value
                        val price = detected.copy(value = parsed, rawText = priceText.trim())
                        onConfirm(price, quantity)
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = ScanOrange),
                    shape = RoundedCornerShape(22.dp),
                    modifier = Modifier.weight(1f).height(44.dp)
                ) { Text("Confirmar", color = Color.White, fontWeight = FontWeight.Bold) }
            }
        }
    }
}

@Composable
private fun CircleStepButton(text: String, filled: Boolean = false, onClick: () -> Unit) {
    val bg = if (filled) ScanGreen else Color(0xFFEAE5DC)
    val fg = if (filled) Color.White else Color(0xFF0B2B1F)
    Box(
        modifier = Modifier
            .size(44.dp)
            .background(bg, SquircleSmall)
            .pressBounce(onClick = onClick),
        contentAlignment = Alignment.Center
    ) {
        Text(text, color = fg, fontSize = 20.sp, fontWeight = FontWeight.Bold)
    }
}

@Composable
private fun PermissionDeniedContent(onRequestPermission: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text("Permissao de camera necessaria.", color = Color.White)
        Spacer(modifier = Modifier.height(16.dp))
        Button(onClick = onRequestPermission) { Text("Conceder permissao") }
    }
}

private fun startCamera(
    context: Context,
    lifecycleOwner: androidx.lifecycle.LifecycleOwner,
    previewView: PreviewView,
    onCameraReady: (Camera) -> Unit,
    onImageCaptureReady: (ImageCapture) -> Unit
) {
    val cameraProviderFuture = ProcessCameraProvider.getInstance(context)
    cameraProviderFuture.addListener({
        val cameraProvider = cameraProviderFuture.get()

        val preview = Preview.Builder()
            .build()
            .also { it.setSurfaceProvider(previewView.surfaceProvider) }

        val imageCapture = ImageCapture.Builder()
            .setCaptureMode(ImageCapture.CAPTURE_MODE_MINIMIZE_LATENCY)
            .setTargetResolution(Size(768, 1024))
            .setJpegQuality(85)
            .build()

        onImageCaptureReady(imageCapture)

        val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

        try {
            cameraProvider.unbindAll()
            val camera = cameraProvider.bindToLifecycle(
                lifecycleOwner,
                cameraSelector,
                preview,
                imageCapture
            )
            onCameraReady(camera)
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

private const val TAG = "CameraScreen"