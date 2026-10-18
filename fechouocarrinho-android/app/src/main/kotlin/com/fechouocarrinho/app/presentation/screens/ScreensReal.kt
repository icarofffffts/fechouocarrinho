package com.fechouocarrinho.app.presentation.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.fechouocarrinho.app.domain.model.Price
import com.fechouocarrinho.app.ocr.PriceExtractor

private val BrandGreen = Color(0xFF1B8C42)
private val BrandGreenDark = Color(0xFF146B32)
private val AccentOrange = Color(0xFFFF6B00)
private val AppBackground = Color(0xFFFFF8F0)
private val SurfaceWhite = Color(0xFFFFFFFF)
private val TextPrimary = Color(0xFF111827)
private val TextSecondary = Color(0xFF6B7280)
private val BorderLight = Color(0xFFEAE5DC)

// Tela 03: Carrinho Fechado
@Composable
fun CarrinhoFechadoScreenReal(
    prices: List<Price> = emptyList(),
    economia: Double = 0.0,
    onFinalizar: () -> Unit = {},
    onCompartilhar: () -> Unit = {},
    onBack: () -> Unit = {}
) {
    val total = prices.sumOf { it.value }
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .verticalScroll(rememberScrollState())
            .padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onBack) {
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                    contentDescription = "Voltar",
                    tint = TextPrimary
                )
            }
            Text(
                text = "Carrinho Fechado",
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                color = TextPrimary
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(
                modifier = Modifier.padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Box(
                    modifier = Modifier
                        .size(64.dp)
                        .clip(RoundedCornerShape(18.dp))
                        .background(BrandGreen),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Check,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(36.dp)
                    )
                }

                Spacer(modifier = Modifier.height(16.dp))

                Text(
                    text = "Tudo somado sem sustos!",
                    style = MaterialTheme.typography.titleLarge.copy(
                        fontWeight = FontWeight.ExtraBold,
                        color = TextPrimary
                    )
                )

                Spacer(modifier = Modifier.height(6.dp))

                Text(
                    text = PriceExtractor.formatCurrency(total),
                    style = MaterialTheme.typography.displayMedium.copy(
                        fontWeight = FontWeight.ExtraBold,
                        color = TextPrimary,
                        fontSize = 38.sp
                    )
                )

                Spacer(modifier = Modifier.height(8.dp))

                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(20.dp))
                        .background(BrandGreen.copy(alpha = 0.12f))
                        .padding(horizontal = 14.dp, vertical = 6.dp)
                ) {
                    Text(
                        text = "${prices.size} itens no carrinho",
                        style = MaterialTheme.typography.labelMedium.copy(
                            color = BrandGreen,
                            fontWeight = FontWeight.Bold
                        )
                    )
                }

                Spacer(modifier = Modifier.height(24.dp))

                Button(
                    onClick = onFinalizar,
                    colors = ButtonDefaults.buttonColors(containerColor = BrandGreen),
                    shape = RoundedCornerShape(24.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp)
                ) {
                    Text("Finalizar e Gerar Recibo", fontWeight = FontWeight.Bold)
                }

                Spacer(modifier = Modifier.height(10.dp))

                OutlinedButton(
                    onClick = onCompartilhar,
                    shape = RoundedCornerShape(24.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp)
                ) {
                    Text("Compartilhar Resumo", color = TextPrimary)
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        if (prices.isNotEmpty()) {
            Text(
                text = "Itens somados",
                style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold),
                color = TextPrimary,
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(8.dp))
            prices.forEach { item ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = SurfaceWhite)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(12.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(item.label, fontWeight = FontWeight.SemiBold, color = TextPrimary)
                            Text("1 un", style = MaterialTheme.typography.bodySmall, color = TextSecondary)
                        }
                        Text(
                            PriceExtractor.formatCurrency(item.value),
                            fontWeight = FontWeight.Bold,
                            color = AccentOrange
                        )
                    }
                }
            }
        }
    }
}

// Tela 04: Comparador
@Composable
fun ComparadorScreenReal(
    items: List<Pair<String, Double>> = emptyList(),
    onRota: (String) -> Unit = {},
    onBack: () -> Unit = {}
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .padding(16.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Voltar")
            }
            Text("Comparador de Preços", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold))
        }
        Spacer(Modifier.height(12.dp))
        Text("Compare os preços desta compra entre os supermercados da sua região.", style = MaterialTheme.typography.bodySmall, color = TextSecondary)
        Spacer(Modifier.height(16.dp))

        val mercados = listOf(
            Triple("Supermercados BH", "Mais barato para grãos e laticínios", 142.80),
            Triple("EPA Supermercados / Zepa", "Ofertas de hortifruti na terça", 148.50),
            Triple("Mart Minas", "Economia em atacado acima de 3 un", 139.20),
            Triple("Carrefour", "Preço padrão de hipermercado", 158.90)
        )
        mercados.forEach { (nome, detalhe, preco) ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 6.dp),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceWhite)
            ) {
                Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(42.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(BrandGreen.copy(alpha = 0.12f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(nome.take(2), fontWeight = FontWeight.Bold, color = BrandGreen)
                    }
                    Spacer(Modifier.width(12.dp))
                    Column(Modifier.weight(1f)) {
                        Text(nome, fontWeight = FontWeight.Bold, color = TextPrimary)
                        Text(detalhe, style = MaterialTheme.typography.labelSmall, color = TextSecondary)
                        Text(PriceExtractor.formatCurrency(preco), fontWeight = FontWeight.ExtraBold, color = if (preco <= 140) BrandGreen else AccentOrange)
                    }
                    TextButton(onClick = { onRota(nome) }) {
                        Text("Ver Rota", color = BrandGreen, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
    }
}

// Tela 06: Listas
@Composable
fun ListasScreenReal(
    prices: List<Price> = emptyList(),
    onNovaLista: () -> Unit = {},
    onBack: () -> Unit = {}
) {
    val total = prices.sumOf { it.value }
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .padding(16.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Voltar")
            }
            Text("Minhas Listas", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold))
        }

        Spacer(Modifier.height(16.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = SurfaceWhite)
        ) {
            Column(Modifier.padding(18.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(10.dp)
                            .clip(CircleShape)
                            .background(BrandGreen)
                    )
                    Spacer(Modifier.width(8.dp))
                    Text("Lista Atual (Em Andamento)", fontWeight = FontWeight.Bold, color = TextPrimary)
                }
                Spacer(Modifier.height(8.dp))
                Text("${prices.size} item(s) somados", style = MaterialTheme.typography.bodySmall, color = TextSecondary)
                Text(
                    PriceExtractor.formatCurrency(total),
                    style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.ExtraBold, color = AccentOrange)
                )
            }
        }

        Spacer(Modifier.height(16.dp))

        Button(
            onClick = onNovaLista,
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp),
            shape = RoundedCornerShape(24.dp),
            colors = ButtonDefaults.buttonColors(containerColor = AccentOrange)
        ) {
            Text("+ Iniciar Nova Compra", fontWeight = FontWeight.Bold)
        }
    }
}

// Tela 07: Perfil
@Composable
fun PerfilScreenReal(
    totalEconomizado: Double = 0.0,
    nome: String = "Usuário",
    onBack: () -> Unit = {},
    onNavigateToAuth: () -> Unit = {}
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Voltar")
            }
            Text("Meu Perfil", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold))
        }

        Spacer(Modifier.height(24.dp))

        Box(
            modifier = Modifier
                .size(76.dp)
                .clip(CircleShape)
                .background(BrandGreen.copy(alpha = 0.15f)),
            contentAlignment = Alignment.Center
        ) {
            Icon(Icons.Default.Person, contentDescription = null, tint = BrandGreen, modifier = Modifier.size(44.dp))
        }

        Spacer(Modifier.height(12.dp))
        Text(nome, style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold), color = TextPrimary)
        Text("Modo 100% Offline Ativo", style = MaterialTheme.typography.bodySmall.copy(color = BrandGreen, fontWeight = FontWeight.SemiBold))

        Spacer(Modifier.height(24.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = BrandGreen)
        ) {
            Column(Modifier.padding(20.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                Text("Total Acumulado em Compras", style = MaterialTheme.typography.labelSmall.copy(color = Color.White.copy(alpha = 0.85f)))
                Spacer(Modifier.height(4.dp))
                Text(
                    PriceExtractor.formatCurrency(totalEconomizado),
                    style = MaterialTheme.typography.headlineMedium.copy(color = Color.White, fontWeight = FontWeight.ExtraBold)
                )
                Text("Dados salvos com segurança no aparelho", style = MaterialTheme.typography.labelSmall.copy(color = Color.White.copy(alpha = 0.75f), fontSize = 10.sp))
            }
        }

        Spacer(Modifier.height(20.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = SurfaceWhite)
        ) {
            Column(Modifier.padding(16.dp)) {
                Text("Configurações & Backup", fontWeight = FontWeight.Bold, color = TextPrimary)
                Spacer(Modifier.height(8.dp))
                Text("Seus dados funcionam 100% offline. Para sincronizar com outro celular da família, crie uma conta opcional.", style = MaterialTheme.typography.bodySmall, color = TextSecondary)
                Spacer(Modifier.height(12.dp))
                OutlinedButton(
                    onClick = onNavigateToAuth,
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(20.dp)
                ) {
                    Text("Conta & Sincronização Familiar", color = BrandGreen)
                }
            }
        }
    }
}

// Tela 11: Splash / Onboarding
@Composable
fun SplashScreenReal(onComeçar: () -> Unit = {}) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Box(
            modifier = Modifier
                .size(80.dp)
                .clip(RoundedCornerShape(24.dp))
                .background(BrandGreen),
            contentAlignment = Alignment.Center
        ) {
            Icon(Icons.Default.ShoppingCart, contentDescription = null, tint = Color.White, modifier = Modifier.size(42.dp))
        }
        Spacer(Modifier.height(20.dp))
        Text("fechou o carrinho", style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.ExtraBold, color = TextPrimary))
        Spacer(Modifier.height(6.dp))
        Text(
            "Levou. Somou. Fechou.\nSeu total sem sustos no caixa do supermercado.",
            style = MaterialTheme.typography.bodyMedium.copy(color = TextSecondary),
            textAlign = TextAlign.Center
        )
        Spacer(Modifier.height(32.dp))
        Button(
            onClick = onComeçar,
            colors = ButtonDefaults.buttonColors(containerColor = BrandGreen),
            shape = RoundedCornerShape(24.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp)
        ) {
            Text("Começar Agora (100% Offline)", fontWeight = FontWeight.Bold)
        }
    }
}

// Tela 12: Seleção de Mercado (mockup 12)
@Composable
fun SelecaoMercadoScreenReal(
    currentMarket: String = "Supermercados BH",
    onSelectMarket: (String) -> Unit = {},
    onBack: () -> Unit = {}
) {
    var selected by remember { mutableStateOf(currentMarket) }
    val redes = listOf(
        "Supermercados BH",
        "EPA Supermercados / Zepa",
        "Mart Minas Atacado e Varejo",
        "Carrefour Hipermercado",
        "Apoio Mineiro",
        "Super Nosso"
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .padding(20.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Voltar")
            }
            Text("Escolha o Supermercado", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold))
        }

        Spacer(Modifier.height(12.dp))
        Text("Selecione onde você está fazendo compras para ajustar a leitura das etiquetas:", style = MaterialTheme.typography.bodySmall, color = TextSecondary)

        Spacer(Modifier.height(16.dp))

        LazyColumn(modifier = Modifier.weight(1f)) {
            items(redes) { rede ->
                val isSelected = rede == selected
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp)
                        .clickable { selected = rede },
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(containerColor = if (isSelected) BrandGreen.copy(alpha = 0.08f) else SurfaceWhite),
                    border = if (isSelected) androidx.compose.foundation.BorderStroke(2.dp, BrandGreen) else null
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        RadioButton(
                            selected = isSelected,
                            onClick = { selected = rede },
                            colors = RadioButtonDefaults.colors(selectedColor = BrandGreen)
                        )
                        Spacer(Modifier.width(8.dp))
                        Text(
                            rede,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                            color = TextPrimary
                        )
                    }
                }
            }
        }

        Spacer(Modifier.height(16.dp))

        Button(
            onClick = { onSelectMarket(selected) },
            colors = ButtonDefaults.buttonColors(containerColor = BrandGreen),
            shape = RoundedCornerShape(24.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp)
        ) {
            Text("Confirmar Supermercado", fontWeight = FontWeight.Bold)
        }
    }
}

// Tela 13: Adicionar Manual (mockup 13)
@Composable
fun ManualScreenReal(
    onSave: (String, Double) -> Unit = { _, _ -> },
    onBack: () -> Unit = {}
) {
    var nome by remember { mutableStateOf("") }
    var preco by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .padding(20.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Voltar")
            }
            Text("Adicionar Item Manual", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold))
        }

        Spacer(Modifier.height(16.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = SurfaceWhite)
        ) {
            Column(Modifier.padding(20.dp)) {
                Text("Nome do Produto", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold))
                Spacer(Modifier.height(6.dp))
                OutlinedTextField(
                    value = nome,
                    onValueChange = { nome = it },
                    placeholder = { Text("Ex: Arroz Tio João 5kg") },
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(Modifier.height(14.dp))

                Text("Preço Unitário (R$)", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold))
                Spacer(Modifier.height(6.dp))
                OutlinedTextField(
                    value = preco,
                    onValueChange = { preco = it },
                    placeholder = { Text("0,00") },
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(Modifier.height(20.dp))

                Button(
                    onClick = {
                        val v = preco.replace("R$", "").replace(" ", "").replace(".", "").replace(",", ".").toDoubleOrNull() ?: 0.0
                        if (nome.isNotBlank() && v > 0) {
                            onSave(nome, v)
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = BrandGreen),
                    shape = RoundedCornerShape(24.dp)
                ) {
                    Text("Adicionar ao Carrinho", fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

// Tela 14: Correção OCR
@Composable
fun CorrecaoOcrScreenReal(
    preco: Double = 0.0,
    onConfirm: (Double) -> Unit = {},
    onBack: () -> Unit = {}
) {
    var value by remember { mutableStateOf(PriceExtractor.formatCurrency(preco)) }
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .padding(20.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Voltar")
            }
            Text("Correção de Leitura", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold))
        }

        Spacer(Modifier.height(16.dp))

        OutlinedTextField(
            value = value,
            onValueChange = { value = it },
            label = { Text("Preço Corrigido") },
            shape = RoundedCornerShape(12.dp),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(Modifier.height(20.dp))

        Button(
            onClick = {
                val v = value.replace("R$", "").replace(" ", "").replace(".", "").replace(",", ".").toDoubleOrNull() ?: 0.0
                onConfirm(v)
            },
            colors = ButtonDefaults.buttonColors(containerColor = BrandGreen),
            shape = RoundedCornerShape(24.dp),
            modifier = Modifier.fillMaxWidth().height(48.dp)
        ) {
            Text("Confirmar Preço", fontWeight = FontWeight.Bold)
        }
    }
}

// Tela 15: Recibo Digital
@Composable
fun ReciboScreenReal(
    prices: List<Price> = emptyList(),
    onBack: () -> Unit = {}
) {
    val total = prices.sumOf { it.value }
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .verticalScroll(rememberScrollState())
            .padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Voltar")
            }
            Text("Recibo Digital", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold))
        }

        Spacer(Modifier.height(16.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = SurfaceWhite)
        ) {
            Column(Modifier.padding(24.dp)) {
                Text("Fechou o Carrinho", fontWeight = FontWeight.ExtraBold, fontSize = 20.sp, color = BrandGreen)
                Text("Cupom digital de conferência", style = MaterialTheme.typography.bodySmall, color = TextSecondary)
                Spacer(Modifier.height(16.dp))
                HorizontalDivider(color = BorderLight)
                Spacer(Modifier.height(12.dp))

                prices.forEach { p ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(p.label, style = MaterialTheme.typography.bodyMedium, color = TextPrimary)
                        Text(PriceExtractor.formatCurrency(p.value), fontWeight = FontWeight.Bold, color = TextPrimary)
                    }
                }

                Spacer(Modifier.height(12.dp))
                HorizontalDivider(color = BorderLight)
                Spacer(Modifier.height(12.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("TOTAL FINAL", fontWeight = FontWeight.ExtraBold, fontSize = 18.sp, color = TextPrimary)
                    Text(PriceExtractor.formatCurrency(total), fontWeight = FontWeight.ExtraBold, fontSize = 22.sp, color = AccentOrange)
                }
            }
        }

        Spacer(Modifier.height(24.dp))

        Button(
            onClick = {},
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF25D366)),
            shape = RoundedCornerShape(24.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp)
        ) {
            Text("Compartilhar no WhatsApp", fontWeight = FontWeight.Bold, color = Color.White)
        }
    }
}