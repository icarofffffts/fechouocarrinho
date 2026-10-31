package com.fechouocarrinho.app.presentation.list

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.fechouocarrinho.app.domain.model.Price
import com.fechouocarrinho.app.presentation.components.PriceItem
import com.fechouocarrinho.app.presentation.theme.FechouOCarrinhoTheme

private val BrandGreen = Color(0xFF1B8C42)
private val AccentOrange = Color(0xFFFF6B00)
private val AppBackground = Color(0xFFFFF8F0)
private val TextPrimary = Color(0xFF0B2B1F)
private val TextSecondary = Color(0xFF5A6B63)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PriceListScreen(
    viewModel: PriceListViewModel,
    onBack: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    val snackbarHostState = remember { SnackbarHostState() }

    Scaffold(
        containerColor = AppBackground,
        topBar = {
            TopAppBar(
                title = { Text("Meus Preços", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Voltar"
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = BrandGreen,
                    titleContentColor = Color.White,
                    navigationIconContentColor = Color.White
                )
            )
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = { viewModel.sync() },
                containerColor = AccentOrange,
                contentColor = Color.White,
                shape = CircleShape
            ) {
                Icon(imageVector = Icons.Default.Refresh, contentDescription = "Sincronizar")
            }
        },
        snackbarHost = { SnackbarHost(hostState = snackbarHostState) }
    ) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .background(AppBackground)
        ) {
            when (val state = uiState) {
                is PriceListUiState.Loading -> {
                    CircularProgressIndicator(
                        modifier = Modifier.align(Alignment.Center),
                        color = BrandGreen
                    )
                }

                is PriceListUiState.Empty -> {
                    EmptyContent(pendingCount = state.pendingCount)
                }

                is PriceListUiState.Content -> {
                    ContentList(state = state, onDelete = viewModel::delete)
                    state.message?.let { message ->
                        LaunchedEffect(message) {
                            snackbarHostState.showSnackbar(message)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun ContentList(state: PriceListUiState.Content, onDelete: (Long) -> Unit) {
    Column(modifier = Modifier.fillMaxSize()) {
        if (state.pendingCount > 0) {
            Text(
                text = "${state.pendingCount} pendente(s) de sincronização",
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                style = MaterialTheme.typography.labelLarge,
                color = AccentOrange
            )
        }
        if (state.isSyncing) {
            CircularProgressIndicator(
                modifier = Modifier
                    .align(Alignment.CenterHorizontally)
                    .padding(8.dp),
                color = BrandGreen
            )
        }
        LazyColumn(modifier = Modifier.weight(1f)) {
            items(state.prices, key = { it.id }) { price ->
                PriceItem(price = price, onDelete = { onDelete(price.id) })
            }
        }
    }
}

@Composable
private fun EmptyContent(pendingCount: Int) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Nenhum preço salvo ainda.",
            textAlign = TextAlign.Center,
            style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold),
            color = TextPrimary
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "Use a câmera na tela inicial para escanear etiquetas.",
            textAlign = TextAlign.Center,
            style = MaterialTheme.typography.bodyMedium,
            color = TextSecondary
        )
        if (pendingCount > 0) {
            Spacer(modifier = Modifier.height(12.dp))
            Text(
                text = "$pendingCount pendente(s) de envio",
                textAlign = TextAlign.Center,
                style = MaterialTheme.typography.bodySmall,
                color = AccentOrange
            )
        }
    }
}
