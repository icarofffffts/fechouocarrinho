package com.fechouocarrinho.app.presentation.list

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.fechouocarrinho.app.domain.model.Price
import com.fechouocarrinho.app.presentation.components.PriceItem
import com.fechouocarrinho.app.presentation.theme.FechouOCarrinhoTheme

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PriceListScreen(
    viewModel: PriceListViewModel,
    onBack: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    val snackbarHostState = remember { SnackbarHostState() }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Meus preços") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Voltar"
                        )
                    }
                }
            )
        },
        floatingActionButton = {
            FloatingActionButton(onClick = { viewModel.sync() }) {
                Icon(imageVector = Icons.Default.Refresh, contentDescription = "Sincronizar")
            }
        },
        snackbarHost = { SnackbarHost(hostState = snackbarHostState) }
    ) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            when (val state = uiState) {
                is PriceListUiState.Loading -> {
                    CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                }

                is PriceListUiState.Empty -> {
                    EmptyContent(pendingCount = state.pendingCount)
                }

                is PriceListUiState.Content -> {
                    ContentList(state = state)
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
private fun ContentList(state: PriceListUiState.Content) {
    Column(modifier = Modifier.fillMaxSize()) {
        if (state.pendingCount > 0) {
            Text(
                text = "${state.pendingCount} pendente(s) de sincronização",
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                style = MaterialTheme.typography.labelLarge,
                color = MaterialTheme.colorScheme.secondary
            )
        }
        if (state.isSyncing) {
            CircularProgressIndicator(
                modifier = Modifier
                    .align(Alignment.CenterHorizontally)
                    .padding(8.dp)
            )
        }
        LazyColumn(modifier = Modifier.weight(1f)) {
            items(state.prices, key = { it.id }) { price ->
                PriceItem(price = price)
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
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.weight(1f))
        Text(
            text = "Nenhum preço salvo ainda.",
            textAlign = TextAlign.Center,
            style = MaterialTheme.typography.headlineSmall
        )
        if (pendingCount > 0) {
            Text(
                text = "$pendingCount pendente(s)",
                color = MaterialTheme.colorScheme.secondary,
                modifier = Modifier.padding(top = 8.dp)
            )
        }
        Spacer(modifier = Modifier.weight(1f))
    }
}

@Preview(showBackground = true)
@Composable
private fun PriceListPreview() {
    FechouOCarrinhoTheme {
        ContentList(
            state = PriceListUiState.Content(
                prices = listOf(
                    Price(id = 1, label = "ARROZ", value = 24.99, rawText = "R$ 24,99", syncStatus = "SYNCED"),
                    Price(id = 2, label = "FEIJAO", value = 8.79, rawText = "R$ 8,79", syncStatus = "PENDING")
                ),
                pendingCount = 1,
                isSyncing = false
            )
        )
    }
}
