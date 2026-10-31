package com.fechouocarrinho.app.presentation.screens

import android.app.Activity
import android.content.Intent
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
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.view.WindowCompat
import androidx.compose.animation.core.*
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.scale
import com.fechouocarrinho.app.presentation.components.pressBounce
import com.fechouocarrinho.app.presentation.components.SquircleMedium
import com.fechouocarrinho.app.presentation.components.SquircleLarge
import com.fechouocarrinho.app.presentation.components.SquircleSmall
import com.fechouocarrinho.app.presentation.components.SquircleExtraLarge
import com.fechouocarrinho.app.domain.model.Market
import com.fechouocarrinho.app.domain.model.ListSummary
import com.fechouocarrinho.app.domain.model.Price
import com.fechouocarrinho.app.domain.model.ShoppingList
import com.fechouocarrinho.app.ocr.PriceExtractor

private val BrandGreen = Color(0xFF1B8C42)
private val BrandGreenDark = Color(0xFF146B32)
private val AccentOrange = Color(0xFFFF6B00)
private val AppBackground = Color(0xFFFFF8F0)
private val SurfaceWhite = Color(0xFFFFFFFF)
private val TextPrimary = Color(0xFF0B2B1F)
private val TextSecondary = Color(0xFF5A6B63)
private val BorderLight = Color(0xFFEAE5DC)

// ---------------------------------------------------------------------------
// Tela 03: Carrinho Fechado (Mockup 03 - Celebração & Resumo)
// ---------------------------------------------------------------------------
@Composable
fun CarrinhoFechadoScreenReal(
    prices: List<Price> = emptyList(),
    marketName: String = "",
    meta: Double = 0.0,
    economia: Double = 0.0,
    onFinalizar: () -> Unit = {},
    onCompartilhar: () -> Unit = {},
    onComparar: () -> Unit = {},
    onBack: () -> Unit = {}
) {
    val context = LocalContext.current
    // Esta tela possui fundo verde escuro de celebração; usamos ícones brancos na barra de status
    DisposableEffect(Unit) {
        val window = (context as? Activity)?.window
        val insets = window?.let { WindowCompat.getInsetsController(it, window.decorView) }
        insets?.isAppearanceLightStatusBars = false
        onDispose {
            insets?.isAppearanceLightStatusBars = true
        }
    }

    val total = prices.sumOf { it.subtotal }
    val itemCount = prices.size
    val hasGoal = meta > 0.0
    val economiaReal = when {
        total <= 0.0 -> 0.0
        economia > 0.0 -> economia
        hasGoal -> (meta - total).coerceAtLeast(0.0)
        else -> 0.0
    }

    val celebrationScale by animateFloatAsState(
        targetValue = 1f,
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy,
            stiffness = Spring.StiffnessLow
        ),
        label = "CelebrationScale"
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                brush = Brush.verticalGradient(
                    colors = listOf(BrandGreen, BrandGreenDark, Color(0xFF0E4822))
                )
            )
            .statusBarsPadding()
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 20.dp)
                .verticalScroll(rememberScrollState()),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Top Bar
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(
                    onClick = onBack,
                    modifier = Modifier
                        .size(38.dp)
                        .clip(CircleShape)
                        .background(Color.White.copy(alpha = 0.15f))
                ) {
                    Icon(
                        imageVector = Icons.Default.Close,
                        contentDescription = "Fechar",
                        tint = Color.White,
                        modifier = Modifier.size(20.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            // Badge de celebração com círculo radiante
            Box(
                modifier = Modifier
                    .scale(celebrationScale)
                    .size(96.dp)
                    .clip(CircleShape)
                    .background(Color.White.copy(alpha = 0.15f)),
                contentAlignment = Alignment.Center
            ) {
                Box(
                    modifier = Modifier
                        .size(72.dp)
                        .clip(CircleShape)
                        .background(Color.White),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Check,
                        contentDescription = null,
                        tint = BrandGreen,
                        modifier = Modifier.size(42.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = "Fechou o Carrinho!",
                style = MaterialTheme.typography.headlineMedium.copy(
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 28.sp,
                    letterSpacing = (-1).sp
                ),
                color = Color.White,
                textAlign = TextAlign.Center
            )

            Spacer(modifier = Modifier.height(4.dp))

            Text(
                text = "Sua compra está calculada, sem sustos no caixa.",
                style = MaterialTheme.typography.bodyMedium.copy(fontSize = 13.sp),
                color = Color.White.copy(alpha = 0.85f),
                textAlign = TextAlign.Center
            )

            Spacer(modifier = Modifier.height(24.dp))

            // Card Principal do Total
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(26.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
                elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
            ) {
                Column(modifier = Modifier.padding(22.dp)) {
                    Text(
                        text = "total calculado",
                        style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                        color = TextSecondary
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = PriceExtractor.formatCurrency(total),
                        style = MaterialTheme.typography.displaySmall.copy(
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 42.sp,
                            letterSpacing = (-1.5).sp
                        ),
                        color = TextPrimary
                    )
                    Text(
                        text = "$itemCount itens · ${marketName.ifBlank { "mercado não selecionado" }}",
                        style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                        color = TextSecondary
                    )

                    Spacer(modifier = Modifier.height(14.dp))
                    HorizontalDivider(color = TextPrimary.copy(alpha = 0.08f))
                    Spacer(modifier = Modifier.height(14.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        if (hasGoal) {
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(14.dp))
                                    .background(BrandGreen.copy(alpha = 0.12f))
                                    .padding(horizontal = 12.dp, vertical = 6.dp)
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Icon(
                                        imageVector = Icons.Default.Check,
                                        contentDescription = null,
                                        tint = BrandGreen,
                                        modifier = Modifier.size(14.dp)
                                    )
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text(
                                        text = "economia ${PriceExtractor.formatCurrency(economiaReal)}",
                                        style = MaterialTheme.typography.labelSmall.copy(
                                            color = BrandGreen,
                                            fontWeight = FontWeight.Bold
                                        )
                                    )
                                }
                            }

                            Text(
                                text = "vs. meta de ${PriceExtractor.formatCurrency(meta)}",
                                style = MaterialTheme.typography.labelSmall.copy(fontSize = 11.sp),
                                color = TextSecondary
                            )
                        } else {
                            Text(
                                text = "sem meta definida · toque no orçamento da tela inicial para definir",
                                style = MaterialTheme.typography.labelSmall.copy(fontSize = 11.sp),
                                color = TextSecondary
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(20.dp))

            // Resumo por Categorias (Mockup 03)
            Text(
                text = "resumo da compra",
                style = MaterialTheme.typography.titleMedium.copy(
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 16.sp
                ),
                color = Color.White,
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(10.dp))

            // Breakdown real por categoria (dados do Room, sem mock)
            val categoryOrder = listOf("Mercearia", "Laticínios", "Bebidas", "Hortifruti", "Limpeza", "Outros")
            fun categoryOf(label: String): String {
                val n = label.lowercase()
                return when {
                    n.contains("leite") || n.contains("queijo") || n.contains("iogurte") || n.contains("manteiga") -> "Laticínios"
                    n.contains("cafe") || n.contains("café") || n.contains("suco") || n.contains("refrigerante") || n.contains("cerveja") || n.contains("agua") || n.contains("água") -> "Bebidas"
                    n.contains("maca") || n.contains("maçã") || n.contains("banana") || n.contains("alface") || n.contains("tomate") || n.contains("horti") -> "Hortifruti"
                    n.contains("detergente") || n.contains("sabao") || n.contains("sabão") || n.contains("limpeza") -> "Limpeza"
                    else -> "Mercearia"
                }
            }
            fun categoryIcon(cat: String) = when (cat) {
                "Laticínios" -> Icons.Default.LocalDrink
                "Bebidas" -> Icons.Default.LocalCafe
                "Hortifruti" -> Icons.Default.Eco
                "Limpeza" -> Icons.Default.CleaningServices
                else -> Icons.Default.LocalGroceryStore
            }

            val grouped = prices.groupBy { categoryOf(it.label) }
            val breakdown = categoryOrder.mapNotNull { cat ->
                val items = grouped[cat] ?: return@mapNotNull null
                if (items.isEmpty()) return@mapNotNull null
                Triple("$cat (${items.size} ${if (items.size == 1) "item" else "itens"})", PriceExtractor.formatCurrency(items.sumOf { it.subtotal }), categoryIcon(cat))
            }

            if (breakdown.isEmpty()) {
                Card(
                    modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.12f))
                ) {
                    Text(
                        text = "Nenhum item registrado ainda.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = Color.White,
                        modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp)
                    )
                }
            }

            breakdown.forEach { (catName, catTotal, catIcon) ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp),
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.12f))
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp, vertical = 12.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(catIcon, contentDescription = null, tint = Color.White, modifier = Modifier.size(18.dp))
                            Spacer(modifier = Modifier.width(10.dp))
                            Text(catName, style = MaterialTheme.typography.bodyMedium, color = Color.White)
                        }
                        Text(catTotal, style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.ExtraBold), color = Color.White)
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Botões de Ação
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Button(
                    onClick = onCompartilhar,
                    modifier = Modifier
                        .weight(1f)
                        .height(50.dp)
                        .pressBounce(onClick = onCompartilhar),
                    colors = ButtonDefaults.buttonColors(containerColor = SurfaceWhite),
                    shape = RoundedCornerShape(25.dp)
                ) {
                    Text("Compartilhar", fontWeight = FontWeight.Bold, color = BrandGreen)
                }

                Button(
                    onClick = onFinalizar,
                    modifier = Modifier
                        .weight(1f)
                        .height(50.dp)
                        .pressBounce(onClick = onFinalizar),
                    colors = ButtonDefaults.buttonColors(containerColor = AccentOrange),
                    shape = RoundedCornerShape(25.dp)
                ) {
                    Text("Finalizar", fontWeight = FontWeight.Bold, color = Color.White)
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            Text(
                text = "Comparar com outros mercados",
                modifier = Modifier
                    .clip(RoundedCornerShape(14.dp))
                    .pressBounce(onClick = onComparar)
                    .padding(horizontal = 12.dp, vertical = 8.dp),
                style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp, fontWeight = FontWeight.SemiBold),
                color = Color.White
            )

            Spacer(modifier = Modifier.height(14.dp))

            Text(
                text = "Lista salva offline · pode ser reaberta a qualquer momento",
                style = MaterialTheme.typography.labelSmall.copy(fontSize = 11.sp),
                color = Color.White.copy(alpha = 0.65f),
                textAlign = TextAlign.Center
            )

            Spacer(modifier = Modifier.height(30.dp))
        }
    }
}

// ---------------------------------------------------------------------------
// Tela 12: Seleção de Mercado — dados reais do Supabase (cache em Room)
// ---------------------------------------------------------------------------
@Composable
fun SelecaoMercadoScreenReal(
    markets: List<Market> = emptyList(),
    selectedMarketId: String = "",
    isLoading: Boolean = false,
    errorMessage: String? = null,
    onRefresh: () -> Unit = {},
    onSelectMarket: (Market) -> Unit = {},
    onBack: () -> Unit = {}
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .padding(horizontal = 20.dp)
    ) {
        Spacer(modifier = Modifier.height(8.dp))

        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.fillMaxWidth()
        ) {
            IconButton(
                onClick = onBack,
                modifier = Modifier
                    .size(38.dp)
                    .clip(CircleShape)
                    .background(BrandGreen.copy(alpha = 0.12f))
            ) {
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                    contentDescription = "Voltar",
                    tint = BrandGreen,
                    modifier = Modifier.size(20.dp)
                )
            }
            Spacer(modifier = Modifier.width(12.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "Selecionar mercado",
                    style = MaterialTheme.typography.titleLarge.copy(
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 20.sp,
                        letterSpacing = (-0.5).sp
                    ),
                    color = TextPrimary
                )
                Text(
                    text = "Redes cadastradas na base do Fechou o Carrinho",
                    style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                    color = TextSecondary
                )
            }
            IconButton(onClick = onRefresh, enabled = !isLoading) {
                if (isLoading) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(18.dp),
                        strokeWidth = 2.dp,
                        color = BrandGreen
                    )
                } else {
                    Icon(
                        imageVector = Icons.Default.Refresh,
                        contentDescription = "Atualizar lista de mercados",
                        tint = BrandGreen
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        Text(
            text = "redes disponíveis",
            style = MaterialTheme.typography.titleSmall.copy(
                fontWeight = FontWeight.ExtraBold,
                fontSize = 15.sp
            ),
            color = TextPrimary
        )
        Text(
            text = when {
                isLoading && markets.isEmpty() -> "sincronizando com o Supabase…"
                markets.isNotEmpty() -> "${markets.size} ${if (markets.size == 1) "supermercado" else "supermercados"} na base"
                else -> "nenhum supermercado sincronizado ainda"
            },
            style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
            color = TextSecondary
        )

        Spacer(modifier = Modifier.height(10.dp))

        if (errorMessage != null) {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 10.dp),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = AccentOrange.copy(alpha = 0.10f))
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        text = "Não foi possível atualizar agora",
                        style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold),
                        color = TextPrimary
                    )
                    Text(
                        text = if (markets.isEmpty()) {
                            "Sem conexão e sem cache local. Conecte-se e toque em atualizar."
                        } else {
                            "Mostrando as redes salvas no aparelho. $errorMessage"
                        },
                        style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                        color = TextSecondary
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    TextButton(onClick = onRefresh) {
                        Text("Tentar novamente", color = BrandGreen, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        when {
            isLoading && markets.isEmpty() -> {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 40.dp),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator(color = BrandGreen)
                }
            }

            markets.isEmpty() -> {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(18.dp),
                    colors = CardDefaults.cardColors(containerColor = SurfaceWhite)
                ) {
                    Column(modifier = Modifier.padding(20.dp)) {
                        Text(
                            text = "Nenhuma rede para escolher",
                            style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold),
                            color = TextPrimary
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "O app não inventa mercados: a lista vem do servidor. Conecte-se à internet e atualize para selecionar a rede onde você está comprando.",
                            style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                            color = TextSecondary
                        )
                    }
                }
            }

            else -> {
                LazyColumn(modifier = Modifier.weight(1f)) {
                    items(markets) { market ->
                        val isSelected = market.id == selectedMarketId
                        Card(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 5.dp)
                                .clickable { onSelectMarket(market) },
                            shape = RoundedCornerShape(20.dp),
                            colors = CardDefaults.cardColors(
                                containerColor = if (isSelected) BrandGreen else SurfaceWhite
                            ),
                            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
                        ) {
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(16.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(44.dp)
                                        .clip(RoundedCornerShape(12.dp))
                                        .background(
                                            if (isSelected) Color.White.copy(alpha = 0.2f)
                                            else BrandGreen.copy(alpha = 0.1f)
                                        ),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.Storefront,
                                        contentDescription = null,
                                        tint = if (isSelected) Color.White else BrandGreen,
                                        modifier = Modifier.size(24.dp)
                                    )
                                }

                                Spacer(modifier = Modifier.width(14.dp))

                                Column(modifier = Modifier.weight(1f)) {
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        Text(
                                            text = market.name,
                                            style = MaterialTheme.typography.bodyLarge.copy(fontWeight = FontWeight.Bold),
                                            color = if (isSelected) Color.White else TextPrimary
                                        )
                                        if (market.isVerified) {
                                            Spacer(modifier = Modifier.width(6.dp))
                                            Icon(
                                                imageVector = Icons.Default.Verified,
                                                contentDescription = "Rede verificada",
                                                tint = if (isSelected) Color.White else BrandGreen,
                                                modifier = Modifier.size(14.dp)
                                            )
                                        }
                                    }
                                    Text(
                                        text = market.locationLabel,
                                        style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                                        color = if (isSelected) Color.White.copy(alpha = 0.85f) else TextSecondary
                                    )
                                    if (isSelected) {
                                        Spacer(modifier = Modifier.height(4.dp))
                                        Box(
                                            modifier = Modifier
                                                .clip(RoundedCornerShape(8.dp))
                                                .background(Color.White)
                                                .padding(horizontal = 8.dp, vertical = 2.dp)
                                        ) {
                                            Text(
                                                text = "SELECIONADO",
                                                style = MaterialTheme.typography.labelSmall.copy(
                                                    fontFamily = FontFamily.Monospace,
                                                    fontSize = 9.sp,
                                                    fontWeight = FontWeight.Bold
                                                ),
                                                color = BrandGreen
                                            )
                                        }
                                    }
                                }

                                Box(
                                    modifier = Modifier
                                        .size(24.dp)
                                        .clip(CircleShape)
                                        .background(if (isSelected) Color.White else BorderLight),
                                    contentAlignment = Alignment.Center
                                ) {
                                    if (isSelected) {
                                        Icon(
                                            Icons.Default.Check,
                                            contentDescription = null,
                                            tint = BrandGreen,
                                            modifier = Modifier.size(16.dp)
                                        )
                                    }
                                }
                            }
                        }
                    }

                    item { Spacer(modifier = Modifier.height(16.dp)) }
                }
            }
        }
    }
}

// ---------------------------------------------------------------------------
// Tela 06: Aba Minhas Listas
// ---------------------------------------------------------------------------
@Composable
fun ListasScreenReal(
    summaries: List<ListSummary> = emptyList(),
    activeListId: Long = 1L,
    onSelectList: (Long) -> Unit = {},
    onNovaLista: (String) -> Unit = {},
    onDeleteList: (Long) -> Unit = {},
    onBack: () -> Unit = {}
) {
    var newListName by remember { mutableStateOf("") }
    var listToDelete by remember { mutableStateOf<ListSummary?>(null) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .padding(horizontal = 20.dp)
            .verticalScroll(rememberScrollState())
    ) {
        Spacer(modifier = Modifier.height(8.dp))

        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            IconButton(
                onClick = onBack,
                modifier = Modifier
                    .size(38.dp)
                    .clip(CircleShape)
                    .background(BrandGreen.copy(alpha = 0.12f))
            ) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Voltar", tint = BrandGreen, modifier = Modifier.size(20.dp))
            }
            Spacer(modifier = Modifier.width(12.dp))
            Column {
                Text(
                    text = "Minhas listas",
                    style = MaterialTheme.typography.titleLarge.copy(
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 24.sp,
                        letterSpacing = (-0.5).sp
                    ),
                    color = TextPrimary
                )
                Text(
                    text = "Cada lista tem seu próprio total",
                    style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                    color = TextSecondary
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Criar lista antes de ir ao mercado
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(22.dp),
            colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(modifier = Modifier.padding(18.dp)) {
                Text(
                    text = "nova lista",
                    style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.ExtraBold, fontSize = 15.sp),
                    color = TextPrimary
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = "Dê um nome (ex: Compras da semana) e adicione os itens antes de sair.",
                    style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
                    color = TextSecondary
                )
                Spacer(modifier = Modifier.height(12.dp))
                OutlinedTextField(
                    value = newListName,
                    onValueChange = { newListName = it },
                    placeholder = { Text("Nome da lista") },
                    singleLine = true,
                    shape = RoundedCornerShape(14.dp),
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(10.dp))
                Button(
                    onClick = {
                        if (newListName.isNotBlank()) {
                            onNovaLista(newListName.trim())
                            newListName = ""
                        }
                    },
                    enabled = newListName.isNotBlank(),
                    modifier = Modifier.fillMaxWidth().height(48.dp),
                    shape = RoundedCornerShape(24.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = BrandGreen)
                ) {
                    Text("Criar lista", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                }
            }
        }

        Spacer(modifier = Modifier.height(18.dp))

        Text(
            text = "suas listas",
            style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.ExtraBold, fontSize = 15.sp),
            color = TextPrimary
        )
        Spacer(modifier = Modifier.height(8.dp))

        if (summaries.isEmpty()) {
            Text("Nenhuma lista ainda. Crie a primeira acima.", color = TextSecondary, fontSize = 13.sp)
        }

        summaries.forEach { summary ->
            val ativa = summary.id == activeListId
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .clickable { onSelectList(summary.id) },
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = if (ativa) BrandGreen else SurfaceWhite),
                elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth().padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(40.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(if (ativa) Color.White.copy(alpha = 0.2f) else BrandGreen.copy(alpha = 0.1f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            Icons.Default.List,
                            contentDescription = null,
                            tint = if (ativa) Color.White else BrandGreen,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = summary.name,
                            maxLines = 1,
                            overflow = androidx.compose.ui.text.style.TextOverflow.Ellipsis,
                            style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold),
                            color = if (ativa) Color.White else TextPrimary
                        )
                        Text(
                            text = buildString {
                                append("${summary.itemCount} ${if (summary.itemCount == 1) "item" else "itens"}")
                                if (summary.plannedCount > 0) append(" · ${summary.plannedCount} sem preço")
                                append(" · ${PriceExtractor.formatCurrency(summary.total)}")
                            },
                            style = MaterialTheme.typography.labelSmall.copy(fontSize = 11.sp),
                            color = if (ativa) Color.White.copy(alpha = 0.8f) else TextSecondary
                        )
                    }
                    if (ativa) {
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(8.dp))
                                .background(Color.White)
                                .padding(horizontal = 6.dp, vertical = 3.dp)
                        ) {
                            Text(
                                "ATIVA",
                                style = MaterialTheme.typography.labelSmall.copy(fontSize = 8.sp, fontWeight = FontWeight.Bold),
                                color = BrandGreen
                            )
                        }
                    }
                    IconButton(onClick = { listToDelete = summary }) {
                        Icon(
                            Icons.Default.DeleteOutline,
                            contentDescription = "Excluir lista",
                            tint = if (ativa) Color.White.copy(alpha = 0.8f) else TextSecondary,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(28.dp))
    }

    listToDelete?.let { alvo ->
        AlertDialog(
            onDismissRequest = { listToDelete = null },
            title = { Text("Excluir lista?", fontWeight = FontWeight.ExtraBold) },
            text = { Text("A lista \"${alvo.name}\" e seus ${alvo.itemCount} itens serão apagados deste aparelho.") },
            confirmButton = {
                TextButton(onClick = {
                    onDeleteList(alvo.id)
                    listToDelete = null
                }) { Text("Excluir", color = AccentOrange, fontWeight = FontWeight.Bold) }
            },
            dismissButton = {
                TextButton(onClick = { listToDelete = null }) { Text("Cancelar", color = TextSecondary) }
            }
        )
    }
}

// ---------------------------------------------------------------------------
// Tela 07: Aba Perfil — identidade e números reais do aparelho
// ---------------------------------------------------------------------------
@Composable
fun PerfilScreenReal(
    nome: String = "Convidado",
    accountLabel: String = "Sem conta conectada · modo offline",
    totalRegistrado: Double = 0.0,
    itemCount: Int = 0,
    listCount: Int = 0,
    onNavigateToAuth: () -> Unit = {},
    onNavigateToMarkets: () -> Unit = {},
    onNavigateToLists: () -> Unit = {},
    onShowOfflineInfo: () -> Unit = {},
    onBack: () -> Unit = {}
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .padding(horizontal = 20.dp)
            .verticalScroll(rememberScrollState())
    ) {
        Spacer(modifier = Modifier.height(8.dp))

        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(
                onClick = onBack,
                modifier = Modifier
                    .size(38.dp)
                    .clip(CircleShape)
                    .background(BrandGreen.copy(alpha = 0.12f))
            ) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Voltar", tint = BrandGreen, modifier = Modifier.size(20.dp))
            }
            Spacer(modifier = Modifier.width(12.dp))
            Text(
                text = "Perfil",
                style = MaterialTheme.typography.titleLarge.copy(
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 24.sp,
                    letterSpacing = (-0.5).sp
                ),
                color = TextPrimary
            )
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Avatar Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(20.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(72.dp)
                        .clip(CircleShape)
                        .background(BrandGreen),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(Icons.Default.Person, contentDescription = null, tint = Color.White, modifier = Modifier.size(42.dp))
                }
                Spacer(modifier = Modifier.width(16.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Text(nome, style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold), color = TextPrimary)
                    Text(accountLabel, style = MaterialTheme.typography.bodySmall, color = TextSecondary)
                }
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Números reais do Room: nada de economia inventada
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = BrandGreen),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text(
                    text = "total registrado",
                    style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                    color = Color.White.copy(alpha = 0.85f)
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    PriceExtractor.formatCurrency(totalRegistrado),
                    style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.ExtraBold, fontSize = 32.sp, color = Color.White)
                )
                Spacer(modifier = Modifier.height(10.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(24.dp)) {
                    Column {
                        Text(
                            itemCount.toString(),
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.ExtraBold),
                            color = Color.White
                        )
                        Text(
                            if (itemCount == 1) "item na lista" else "itens na lista",
                            style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
                            color = Color.White.copy(alpha = 0.8f)
                        )
                    }
                    Column {
                        Text(
                            listCount.toString(),
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.ExtraBold),
                            color = Color.White
                        )
                        Text(
                            if (listCount == 1) "lista criada" else "listas criadas",
                            style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
                            color = Color.White.copy(alpha = 0.8f)
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        Text(
            text = "configurações e dados",
            style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.ExtraBold, fontSize = 16.sp),
            color = TextPrimary
        )

        Spacer(modifier = Modifier.height(10.dp))

        val menuItems = listOf(
            Triple("Mercados favoritos", "Redes salvas e mercado principal", Icons.Default.Storefront),
            Triple("Minhas listas", "Criar, trocar e excluir listas", Icons.Default.ReceiptLong),
            Triple("Sincronização familiar", "Compartilhar listas por código de 6 dígitos", Icons.Default.Sync),
            Triple("Preferências & offline", "Armazenamento local e dados", Icons.Default.Settings)
        )

        menuItems.forEach { (title, subtitle, icon) ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .clickable {
                        when {
                            title.startsWith("Mercados") -> onNavigateToMarkets()
                            title.startsWith("Minhas listas") -> onNavigateToLists()
                            title.startsWith("Sincronização") -> onNavigateToAuth()
                            else -> onShowOfflineInfo()
                        }
                    },
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
                elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(38.dp)
                            .clip(RoundedCornerShape(10.dp))
                            .background(BrandGreen.copy(alpha = 0.12f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(icon, contentDescription = null, tint = BrandGreen, modifier = Modifier.size(20.dp))
                    }
                    Spacer(modifier = Modifier.width(14.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(title, style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold), color = TextPrimary)
                        Text(subtitle, style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp), color = TextSecondary)
                    }
                    Icon(Icons.Default.ChevronRight, contentDescription = null, tint = TextSecondary)
                }
            }
        }

        Spacer(modifier = Modifier.height(30.dp))
    }
}

// ---------------------------------------------------------------------------
// Tela 13: Adicionar Manual (Mockup 13)
// ---------------------------------------------------------------------------
@Composable
private fun CategoryChip(label: String, selected: Boolean, onClick: () -> Unit) {
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(12.dp))
            .background(if (selected) BrandGreen else BorderLight)
            .clickable(onClick = onClick)
            .padding(horizontal = 12.dp, vertical = 8.dp)
    ) {
        Text(
            label,
            style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
            color = if (selected) Color.White else TextPrimary
        )
    }
}

@Composable
fun ManualScreenReal(
    onSave: (String, Double?, Int) -> Unit = { _, _, _ -> },
    onBack: () -> Unit = {}
) {
    var nome by remember { mutableStateOf("") }
    var preco by remember { mutableStateOf("") }
    var qty by remember { mutableIntStateOf(1) }
    var selectedCategory by remember { mutableStateOf("MERCEARIA") }
    var showError by remember { mutableStateOf(false) }

    val categories = listOf("MERCEARIA", "LATICÍNIOS", "BEBIDAS", "HORTIFRUTI", "LIMPEZA")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .padding(horizontal = 20.dp)
            .verticalScroll(rememberScrollState())
    ) {
        Spacer(modifier = Modifier.height(8.dp))

        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(
                onClick = onBack,
                modifier = Modifier
                    .size(38.dp)
                    .clip(CircleShape)
                    .background(BrandGreen.copy(alpha = 0.12f))
            ) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Voltar", tint = BrandGreen, modifier = Modifier.size(20.dp))
            }
            Spacer(modifier = Modifier.width(12.dp))
            Column {
                Text(
                    text = "Adicionar item",
                    style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.ExtraBold, fontSize = 22.sp),
                    color = TextPrimary
                )
                Text(
                    text = "Planeje a lista antes de sair de casa",
                    style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                    color = TextSecondary
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(22.dp),
            colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text("Nome do produto", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold), color = TextPrimary)
                Spacer(modifier = Modifier.height(6.dp))
                OutlinedTextField(
                    value = nome,
                    onValueChange = { nome = it; showError = false },
                    placeholder = { Text("Ex: Arroz 5kg") },
                    isError = showError && nome.isBlank(),
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(modifier = Modifier.height(16.dp))

                Text("Categoria", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold), color = TextPrimary)
                Spacer(modifier = Modifier.height(8.dp))

                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        categories.take(3).forEach { cat -> CategoryChip(cat, cat == selectedCategory) { selectedCategory = cat } }
                    }
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        categories.drop(3).forEach { cat -> CategoryChip(cat, cat == selectedCategory) { selectedCategory = cat } }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                Text("Quantidade", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold), color = TextPrimary)
                Spacer(modifier = Modifier.height(8.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(BorderLight)
                            .clickable { if (qty > 1) qty-- },
                        contentAlignment = Alignment.Center
                    ) { Text("−", fontSize = 18.sp, fontWeight = FontWeight.Bold) }
                    Box(
                        modifier = Modifier
                            .width(64.dp)
                            .height(44.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(SurfaceWhite)
                            .border(1.dp, BorderLight, RoundedCornerShape(12.dp)),
                        contentAlignment = Alignment.Center
                    ) { Text(qty.toString(), fontSize = 16.sp, fontWeight = FontWeight.Bold) }
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(BrandGreen)
                            .clickable { qty++ },
                        contentAlignment = Alignment.Center
                    ) { Text("+", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color.White) }
                }

                Spacer(modifier = Modifier.height(16.dp))

                Text("Preço unitário (opcional)", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold), color = TextPrimary)
                Spacer(modifier = Modifier.height(6.dp))
                OutlinedTextField(
                    value = preco,
                    onValueChange = { preco = it },
                    placeholder = { Text("0,00") },
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "Deixe vazio para planejar agora e preencher o preço no mercado.",
                    style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
                    color = TextSecondary
                )

                Spacer(modifier = Modifier.height(24.dp))

                Button(
                    onClick = {
                        if (nome.isBlank()) {
                            showError = true
                            return@Button
                        }
                        val raw = preco.replace("R$", "").replace(" ", "")
                        val v = if (raw.isBlank()) null else raw.replace(".", "").replace(",", ".").toDoubleOrNull()
                        onSave(nome.trim(), v, qty)
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(50.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = BrandGreen),
                    shape = RoundedCornerShape(25.dp)
                ) {
                    Text("Adicionar à lista", fontWeight = FontWeight.Bold, fontSize = 15.sp)
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))
    }
}

// ---------------------------------------------------------------------------
// Tela 15: Recibo & Compartilhar (Mockup 15)
// ---------------------------------------------------------------------------
@Composable
fun ReciboScreenReal(
    prices: List<Price> = emptyList(),
    marketName: String = "",
    onRemoveItem: (Long) -> Unit = {},
    onBack: () -> Unit = {}
) {
    val context = LocalContext.current
    val total = prices.sumOf { it.subtotal }
    val dateLabel = remember {
        java.text.SimpleDateFormat("dd/MM/yyyy 'às' HH:mm", java.util.Locale("pt", "BR"))
            .format(java.util.Date())
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .padding(horizontal = 20.dp)
            .verticalScroll(rememberScrollState()),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(8.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(
                onClick = onBack,
                modifier = Modifier
                    .size(38.dp)
                    .clip(CircleShape)
                    .background(BrandGreen.copy(alpha = 0.12f))
            ) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Voltar", tint = BrandGreen, modifier = Modifier.size(20.dp))
            }
            Spacer(modifier = Modifier.width(12.dp))
            Text("Recibo Digital", style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.ExtraBold, fontSize = 22.sp), color = TextPrimary)
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Cupom Fiscal estilizado
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(22.dp),
            colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
            elevation = CardDefaults.cardElevation(defaultElevation = 3.dp)
        ) {
            Column(modifier = Modifier.padding(24.dp)) {
                Text("Fechou o Carrinho", fontWeight = FontWeight.ExtraBold, fontSize = 22.sp, color = BrandGreen)
                Text(
                    text = "${marketName.ifBlank { "Mercado não selecionado" }} · $dateLabel",
                    style = MaterialTheme.typography.bodySmall,
                    color = TextSecondary
                )
                Text("Cupom digital gerado offline", style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp), color = TextSecondary)

                Spacer(modifier = Modifier.height(16.dp))
                HorizontalDivider(color = TextPrimary.copy(alpha = 0.08f))
                Spacer(modifier = Modifier.height(14.dp))

                if (prices.isEmpty()) {
                    Text("Nenhum item na lista ainda. Escaneie o primeiro produto.", style = MaterialTheme.typography.bodyMedium, color = TextSecondary, modifier = Modifier.padding(vertical = 8.dp))
                }
                prices.forEach { p ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 5.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(p.label, style = MaterialTheme.typography.bodyMedium, color = TextPrimary)
                            Text(
                                text = if (p.planned) "preço a definir" else "${p.qty} × ${PriceExtractor.formatCurrency(p.value)}",
                                style = MaterialTheme.typography.labelSmall.copy(fontSize = 10.sp),
                                color = TextSecondary
                            )
                        }
                        Text(
                            text = if (p.planned) "—" else PriceExtractor.formatCurrency(p.subtotal),
                            fontWeight = FontWeight.Bold,
                            color = if (p.planned) AccentOrange else TextPrimary
                        )
                        IconButton(onClick = { onRemoveItem(p.id) }, modifier = Modifier.size(32.dp)) {
                            Icon(
                                Icons.Default.DeleteOutline,
                                contentDescription = "Remover item",
                                tint = TextSecondary,
                                modifier = Modifier.size(18.dp)
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(14.dp))
                HorizontalDivider(color = TextPrimary.copy(alpha = 0.08f))
                Spacer(modifier = Modifier.height(14.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("TOTAL FINAL", fontWeight = FontWeight.ExtraBold, fontSize = 18.sp, color = TextPrimary)
                    Text(PriceExtractor.formatCurrency(total), fontWeight = FontWeight.ExtraBold, fontSize = 24.sp, color = AccentOrange)
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

         Button(
             onClick = {
                 val share = Intent(Intent.ACTION_SEND).apply {
                     type = "text/plain"
                     putExtra(Intent.EXTRA_TEXT, "Minha lista do Fechou o Carrinho: ${PriceExtractor.formatCurrency(total)}")
                 }
                 context.startActivity(Intent.createChooser(share, "Compartilhar recibo"))
             },
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF25D366)),
            shape = RoundedCornerShape(26.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp)
        ) {
            Icon(Icons.Default.Share, contentDescription = null, tint = Color.White)
            Spacer(modifier = Modifier.width(8.dp))
            Text("Compartilhar no WhatsApp", fontWeight = FontWeight.Bold, fontSize = 15.sp, color = Color.White)
        }

        Spacer(modifier = Modifier.height(24.dp))
    }
}

// ---------------------------------------------------------------------------
// Tela 11: Splash / Onboarding (Mockup 11)
// ---------------------------------------------------------------------------
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
        Text(
            text = "fechou o carrinho",
            style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.ExtraBold, color = TextPrimary)
        )
        Spacer(Modifier.height(8.dp))
        Text(
            text = "Levou. Somou. Fechou.\nSeu total sem sustos no caixa do supermercado.",
            style = MaterialTheme.typography.bodyMedium.copy(fontSize = 14.sp, color = TextSecondary),
            textAlign = TextAlign.Center
        )
        Spacer(Modifier.height(36.dp))
        Button(
            onClick = onComeçar,
            colors = ButtonDefaults.buttonColors(containerColor = BrandGreen),
            shape = RoundedCornerShape(26.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp)
        ) {
            Text("Começar Agora (100% Offline)", fontWeight = FontWeight.Bold, fontSize = 15.sp)
        }
    }
}

// ---------------------------------------------------------------------------
// Tela 04: Comparador de Mercados — só com preços reais por rede
// ---------------------------------------------------------------------------
@Composable
fun ComparadorScreenReal(
    prices: List<Price> = emptyList(),
    onRota: (String) -> Unit = {},
    onBack: () -> Unit = {}
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .padding(horizontal = 20.dp)
            .verticalScroll(rememberScrollState())
    ) {
        Spacer(modifier = Modifier.height(8.dp))
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(
                onClick = onBack,
                modifier = Modifier
                    .size(38.dp)
                    .clip(CircleShape)
                    .background(BrandGreen.copy(alpha = 0.12f))
            ) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Voltar", tint = BrandGreen, modifier = Modifier.size(20.dp))
            }
            Spacer(modifier = Modifier.width(12.dp))
            Text("Comparador de Preços", style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.ExtraBold, fontSize = 22.sp), color = TextPrimary)
        }
        Spacer(modifier = Modifier.height(16.dp))

        if (prices.isEmpty()) {
            Text(
                text = "Escaneie itens para comparar o total entre mercados.",
                color = TextSecondary
            )
            return@Column
        }

        // Agrupa os itens realmente escaneados por mercado de origem.
        val byMarket = prices.groupBy { it.marketName?.takeIf { name -> name.isNotBlank() } }
        val withMarket = byMarket.filterKeys { it != null }
        val withoutMarket = byMarket[null].orEmpty()

        if (withMarket.isEmpty()) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceWhite)
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Text(
                        text = "Nenhum item vinculado a um mercado",
                        style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold),
                        color = TextPrimary
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Selecione o mercado na tela inicial antes de escanear. Assim cada preço fica ligado à rede onde foi coletado e a comparação é real.",
                        style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                        color = TextSecondary
                    )
                }
            }
            if (withoutMarket.isNotEmpty()) {
                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = "${withoutMarket.size} ${if (withoutMarket.size == 1) "item sem mercado" else "itens sem mercado"} · total ${PriceExtractor.formatCurrency(withoutMarket.sumOf { it.value })}",
                    style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                    color = TextSecondary
                )
            }
            Spacer(modifier = Modifier.height(24.dp))
            return@Column
        }

        val ranking = withMarket
            .map { (market, items) -> Triple(market!!, items.sumOf { it.value }, items.size) }
            .sortedBy { it.second }
        val lowestTotal = ranking.first().second

        ranking.forEach { (market, valor, count) ->
            val isBest = ranking.size > 1 && valor == lowestTotal
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 5.dp),
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = if (isBest) BrandGreen.copy(alpha = 0.08f) else SurfaceWhite),
                border = if (isBest) androidx.compose.foundation.BorderStroke(2.dp, BrandGreen) else null
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(market, fontWeight = FontWeight.Bold, color = TextPrimary)
                        Text(
                            text = "$count ${if (count == 1) "item escaneado" else "itens escaneados"} nesta rede",
                            style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
                            color = TextSecondary
                        )
                    }
                    Column(horizontalAlignment = Alignment.End) {
                        Text(PriceExtractor.formatCurrency(valor), fontWeight = FontWeight.ExtraBold, fontSize = 16.sp, color = if (isBest) BrandGreen else AccentOrange)
                        if (isBest) {
                            Text("MENOR TOTAL", style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold, fontSize = 9.sp), color = BrandGreen)
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(12.dp))
        Text(
            text = if (ranking.size == 1) {
                "Comparação disponível quando você tiver itens em mais de um mercado."
            } else {
                "Comparação feita apenas com os itens que você escaneou em cada rede."
            },
            style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
            color = TextSecondary
        )

        if (withoutMarket.isNotEmpty()) {
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "${withoutMarket.size} ${if (withoutMarket.size == 1) "item" else "itens"} sem mercado informado · ${PriceExtractor.formatCurrency(withoutMarket.sumOf { it.value })}",
                style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
                color = TextSecondary
            )
        }

        Spacer(modifier = Modifier.height(24.dp))
    }
}

// ---------------------------------------------------------------------------
// Tela 14: Correção OCR (Mockup 14)
// ---------------------------------------------------------------------------
@Composable
fun CorrecaoOcrScreenReal(
    preco: Double? = null,
    label: String = "Item escaneado",
    onConfirm: (Price) -> Unit = {},
    onBack: () -> Unit = {}
) {
    var textVal by remember { mutableStateOf(preco?.let { PriceExtractor.formatCurrency(it) } ?: "") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .padding(horizontal = 20.dp)
    ) {
        Spacer(modifier = Modifier.height(8.dp))
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(
                onClick = onBack,
                modifier = Modifier
                    .size(38.dp)
                    .clip(CircleShape)
                    .background(BrandGreen.copy(alpha = 0.12f))
            ) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Voltar", tint = BrandGreen, modifier = Modifier.size(20.dp))
            }
            Spacer(modifier = Modifier.width(12.dp))
            Text("Correção de Leitura", style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.ExtraBold, fontSize = 22.sp), color = TextPrimary)
        }
        Spacer(modifier = Modifier.height(20.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(22.dp),
            colors = CardDefaults.cardColors(containerColor = SurfaceWhite)
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text(
                    text = "Confira o preço lido na etiqueta e corrija se precisar.",
                    style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                    color = TextSecondary
                )
                Spacer(modifier = Modifier.height(16.dp))
                OutlinedTextField(
                    value = textVal,
                    onValueChange = { textVal = it },
                    label = { Text("Preço") },
                    placeholder = { Text("0,00") },
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(20.dp))
                Button(
                    enabled = textVal.toDoubleOrNullCompat() != null,
                    onClick = {
                        val v = textVal.toDoubleOrNullCompat() ?: return@Button
                        onConfirm(
                            Price(
                                label = label,
                                value = v,
                                rawText = textVal.trim(),
                                syncStatus = "PENDING"
                            )
                        )
                    },
                    modifier = Modifier.fillMaxWidth().height(50.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = BrandGreen),
                    shape = RoundedCornerShape(25.dp)
                ) {
                    Text("Confirmar Preço", fontWeight = FontWeight.Bold, fontSize = 15.sp)
                }
            }
        }
    }
}

private fun String.toDoubleOrNullCompat(): Double? =
    replace("R$", "").replace(" ", "")
        .let { if (it.contains(",")) it.replace(".", "").replace(",", ".") else it }
        .toDoubleOrNull()
