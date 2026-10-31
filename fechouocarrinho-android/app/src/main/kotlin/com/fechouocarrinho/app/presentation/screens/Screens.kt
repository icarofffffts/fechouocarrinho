package com.fechouocarrinho.app.presentation.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

private val BrandGreen = Color(0xFF1B8C42)
private val AccentOrange = Color(0xFFFF6B00)
private val AppBackground = Color(0xFFFFF8F0)

@Composable fun ScannerOcrScreen() = ScreenShell("Scanner OCR")
@Composable fun CarrinhoFechadoScreen() = ScreenShell("Carrinho Fechado")
@Composable fun ComparadorScreen() = ScreenShell("Comparador de Mercados")
@Composable fun ListasScreen() = ScreenShell("Listas")
@Composable fun PerfilScreen() = ScreenShell("Perfil")
@Composable fun MercadosScreen() = ScreenShell("Mercados")
@Composable fun HistoricoScreen() = ScreenShell("Historico")
@Composable fun ConfigScreen() = ScreenShell("Configuracoes")
@Composable fun SplashScreen() = ScreenShell("Splash")
@Composable fun SelecaoMercadoScreen() = ScreenShell("Selecao de Mercado")
@Composable fun ManualScreen() = ScreenShell("Adicionar Manual")
@Composable fun CorrecaoOcrScreen() = ScreenShell("Correcao OCR")
@Composable fun ReciboScreen() = ScreenShell("Recibo")

@Composable
private fun ScreenShell(title: String) {
    Column(Modifier.fillMaxSize().background(AppBackground).padding(16.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
        Text(title, color = BrandGreen, style = MaterialTheme.typography.headlineMedium)
        Spacer(Modifier.height(8.dp))
        Text("Em desenvolvimento", color = Color(0xFF5A6B63))
    }
}
