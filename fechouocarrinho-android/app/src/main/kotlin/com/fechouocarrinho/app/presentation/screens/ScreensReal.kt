package com.fechouocarrinho.app.presentation.screens

import android.app.Activity
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

// ---------------------------------------------------------------------------
// Tela 03: Carrinho Fechado (Mockup 03 - Celebração & Resumo)
// ---------------------------------------------------------------------------
@Composable
fun CarrinhoFechadoScreenReal(
    prices: List<Price> = emptyList(),
    marketName: String = "Supermercados BH",
    economia: Double = 0.0,
    onFinalizar: () -> Unit = {},
    onCompartilhar: () -> Unit = {},
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

    val total = prices.sumOf { it.value }
    val itemCount = prices.size
    val meta = 200.0
    val economiaReal = if (economia > 0.0) economia else (meta - total).coerceAtLeast(0.0)

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
                        text = "$itemCount itens · $marketName",
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
                Triple("$cat (${items.size} ${if (items.size == 1) "item" else "itens"})", PriceExtractor.formatCurrency(items.sumOf { it.value }), categoryIcon(cat))
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
// Tela 12: Seleção de Mercado (Mockup 12)
// ---------------------------------------------------------------------------
@Composable
fun SelecaoMercadoScreenReal(
    currentMarket: String = "Supermercados BH",
    onSelectMarket: (String) -> Unit = {},
    onBack: () -> Unit = {}
) {
    var selected by remember { mutableStateOf(currentMarket) }

    data class RedeItem(val name: String, val subtitle: String, val distance: String, val isPrimary: Boolean)
    val redes = listOf(
        RedeItem("Supermercados BH", "12 lojas na região", "2,4 km", true),
        RedeItem("EPA Supermercados / Zepa", "8 lojas na região", "1,8 km", false),
        RedeItem("Mart Minas Atacado e Varejo", "5 lojas na região", "3,1 km", false),
        RedeItem("Carrefour Hipermercado", "3 lojas na região", "4,2 km", false),
        RedeItem("Super Nosso Gourmet", "4 lojas na região", "2,9 km", false)
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .padding(horizontal = 20.dp)
    ) {
        Spacer(modifier = Modifier.height(8.dp))

        // Top bar
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
            Column {
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
                    text = "Escolha sua cidade e rede preferida",
                    style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                    color = TextSecondary
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Card de Cidade
        Text(
            text = "sua cidade",
            style = MaterialTheme.typography.titleSmall.copy(
                fontWeight = FontWeight.ExtraBold,
                fontSize = 15.sp
            ),
            color = TextPrimary
        )
        Spacer(modifier = Modifier.height(8.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
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
                        .size(38.dp)
                        .clip(CircleShape)
                        .background(BrandGreen.copy(alpha = 0.12f)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(Icons.Default.LocationOn, contentDescription = null, tint = BrandGreen, modifier = Modifier.size(20.dp))
                }
                Spacer(modifier = Modifier.width(12.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Text("Belo Horizonte · MG", fontWeight = FontWeight.Bold, color = TextPrimary)
                    Text("Minas Gerais, Brasil", style = MaterialTheme.typography.bodySmall, color = TextSecondary)
                }
                Icon(Icons.Default.ChevronRight, contentDescription = null, tint = TextSecondary)
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Lista de Redes
        Text(
            text = "redes disponíveis",
            style = MaterialTheme.typography.titleSmall.copy(
                fontWeight = FontWeight.ExtraBold,
                fontSize = 15.sp
            ),
            color = TextPrimary
        )
        Text(
            text = "${redes.size} supermercados na sua região",
            style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
            color = TextSecondary
        )

        Spacer(modifier = Modifier.height(10.dp))

        LazyColumn(modifier = Modifier.weight(1f)) {
            items(redes) { rede ->
                val isSelected = rede.name == selected
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 5.dp)
                        .clickable { selected = rede.name },
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
                            Text(
                                text = rede.name,
                                style = MaterialTheme.typography.bodyLarge.copy(fontWeight = FontWeight.Bold),
                                color = if (isSelected) Color.White else TextPrimary
                            )
                            Text(
                                text = "${rede.distance} · ${rede.subtitle}",
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
                                Icon(Icons.Default.Check, contentDescription = null, tint = BrandGreen, modifier = Modifier.size(16.dp))
                            }
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        Button(
            onClick = { onSelectMarket(selected) },
            colors = ButtonDefaults.buttonColors(containerColor = BrandGreen),
            shape = RoundedCornerShape(26.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp)
        ) {
            Text("Confirmar mercado", fontWeight = FontWeight.Bold, fontSize = 15.sp)
        }

        Spacer(modifier = Modifier.height(16.dp))
    }
}

// ---------------------------------------------------------------------------
// Tela 06: Aba Minhas Listas (Mockup 06)
// ---------------------------------------------------------------------------
@Composable
fun ListasScreenReal(
    prices: List<Price> = emptyList(),
    onNovaLista: () -> Unit = {},
    onBack: () -> Unit = {}
) {
    val total = if (prices.isNotEmpty()) prices.sumOf { it.value } else 142.80
    val count = if (prices.isNotEmpty()) prices.size else 8

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppBackground)
            .statusBarsPadding()
            .padding(horizontal = 20.dp)
            .verticalScroll(rememberScrollState())
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
                    text = "Listas ativas e compras salvas offline",
                    style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                    color = TextSecondary
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Card 1: Lista Atual
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .clip(RoundedCornerShape(14.dp))
                            .background(BrandGreen),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.ShoppingCart, contentDescription = null, tint = Color.White, modifier = Modifier.size(24.dp))
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text("Mês - Casa", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold), color = TextPrimary)
                        Text("Supermercados BH · atualizada hoje", style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp), color = TextSecondary)
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("progresso", style = MaterialTheme.typography.labelSmall, color = TextSecondary)
                    Text("$count/12 itens", style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold), color = BrandGreen)
                }
                Spacer(modifier = Modifier.height(6.dp))
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(8.dp)
                        .clip(RoundedCornerShape(4.dp))
                        .background(BorderLight)
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth(0.71f)
                            .height(8.dp)
                            .clip(RoundedCornerShape(4.dp))
                            .background(BrandGreen)
                    )
                }

                Spacer(modifier = Modifier.height(16.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.Bottom
                ) {
                    Column {
                        Text("total estimado", style = MaterialTheme.typography.labelSmall, color = TextSecondary)
                        Text(PriceExtractor.formatCurrency(total), style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.ExtraBold), color = TextPrimary)
                    }
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(14.dp))
                            .background(BrandGreen.copy(alpha = 0.1f))
                            .padding(horizontal = 14.dp, vertical = 6.dp)
                    ) {
                        Text("71%", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold), color = BrandGreen)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Card 2: Lista Passada
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .clip(RoundedCornerShape(14.dp))
                            .background(AccentOrange),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.OutdoorGrill, contentDescription = null, tint = Color.White, modifier = Modifier.size(24.dp))
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text("Churrasco de Domingo", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold), color = TextPrimary)
                        Text("EPA Supermercados · 18 itens", style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp), color = TextSecondary)
                    }
                }
                Spacer(modifier = Modifier.height(14.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("R$ 185,50", style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.ExtraBold), color = TextPrimary)
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(14.dp))
                            .background(AccentOrange.copy(alpha = 0.1f))
                            .padding(horizontal = 12.dp, vertical = 5.dp)
                    ) {
                        Text("100% FECHADA", style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold), color = AccentOrange)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = onNovaLista,
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp),
            shape = RoundedCornerShape(26.dp),
            colors = ButtonDefaults.buttonColors(containerColor = AccentOrange)
        ) {
            Text("+ Criar Nova Lista", fontWeight = FontWeight.Bold, fontSize = 15.sp)
        }

        Spacer(modifier = Modifier.height(24.dp))
    }
}

// ---------------------------------------------------------------------------
// Tela 07: Aba Perfil (Mockup 07)
// ---------------------------------------------------------------------------
@Composable
fun PerfilScreenReal(
    totalEconomizado: Double = 342.80,
    nome: String = "Maria Silva",
    onBack: () -> Unit = {},
    onNavigateToAuth: () -> Unit = {}
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
                    Text("maria.silva@email.com", style = MaterialTheme.typography.bodySmall, color = TextSecondary)
                    Spacer(modifier = Modifier.height(6.dp))
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(TextSecondary.copy(alpha = 0.12f))
                            .padding(horizontal = 8.dp, vertical = 2.dp)
                    ) {
                        Text("PLANO GRATUITO", style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold), color = TextSecondary)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Savings Card Verde
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = BrandGreen),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text("economia acumulada", style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp), color = Color.White.copy(alpha = 0.85f))
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    PriceExtractor.formatCurrency(if (totalEconomizado > 0) totalEconomizado else 342.80),
                    style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.ExtraBold, fontSize = 32.sp, color = Color.White)
                )
                Text("em 12 compras comparadas", style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp), color = Color.White.copy(alpha = 0.75f))
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
            Triple("Mercados Favoritos", "Redes salvas e mercado principal", Icons.Default.Storefront),
            Triple("Histórico de Compras", "Recibos e totais anteriores", Icons.Default.ReceiptLong),
            Triple("Sincronização Familiar", "Compartilhar listas por código de 6 dígitos", Icons.Default.Sync),
            Triple("Preferências & Offline", "Armazenamento local e dados", Icons.Default.Settings)
        )

        menuItems.forEach { (title, subtitle, icon) ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .clickable {
                        if (title.contains("Sincronização")) onNavigateToAuth()
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
fun ManualScreenReal(
    onSave: (String, Double) -> Unit = { _, _ -> },
    onBack: () -> Unit = {}
) {
    var nome by remember { mutableStateOf("") }
    var preco by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf("MERCEARIA") }

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
            Text(
                text = "Adicionar produto",
                style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.ExtraBold, fontSize = 22.sp),
                color = TextPrimary
            )
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
                    onValueChange = { nome = it },
                    placeholder = { Text("Ex: Arroz Tio João 5kg") },
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(modifier = Modifier.height(16.dp))

                Text("Categoria", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold), color = TextPrimary)
                Spacer(modifier = Modifier.height(8.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    categories.take(3).forEach { cat ->
                        val isSel = cat == selectedCategory
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(12.dp))
                                .background(if (isSel) BrandGreen else BorderLight)
                                .clickable { selectedCategory = cat }
                                .padding(horizontal = 12.dp, vertical = 8.dp)
                        ) {
                            Text(cat, style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold), color = if (isSel) Color.White else TextPrimary)
                        }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                Text("Preço unitário (R$)", style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold), color = TextPrimary)
                Spacer(modifier = Modifier.height(6.dp))
                OutlinedTextField(
                    value = preco,
                    onValueChange = { preco = it },
                    placeholder = { Text("0,00") },
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(modifier = Modifier.height(24.dp))

                Button(
                    onClick = {
                        val v = preco.replace("R$", "").replace(" ", "").replace(".", "").replace(",", ".").toDoubleOrNull() ?: 0.0
                        if (nome.isNotBlank() && v > 0) {
                            onSave(nome, v)
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(50.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = BrandGreen),
                    shape = RoundedCornerShape(25.dp)
                ) {
                    Text("Adicionar ao Carrinho", fontWeight = FontWeight.Bold, fontSize = 15.sp)
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
    onBack: () -> Unit = {}
) {
    val total = if (prices.isNotEmpty()) prices.sumOf { it.value } else 189.40

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
                Text("Supermercados BH · Belo Horizonte, MG", style = MaterialTheme.typography.bodySmall, color = TextSecondary)
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
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(p.label, style = MaterialTheme.typography.bodyMedium, color = TextPrimary)
                        Text(PriceExtractor.formatCurrency(p.value), fontWeight = FontWeight.Bold, color = TextPrimary)
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
            onClick = {},
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
// Tela 04: Comparador de Mercados (Mockup 04)
// ---------------------------------------------------------------------------
@Composable
fun ComparadorScreenReal(
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

        val comparacoes = listOf(
            Triple("Supermercados BH", 142.80, "Mais barato na sua região · 800m"),
            Triple("Mart Minas", 148.50, "Economia no atacado (+3 un) · 3,1 km"),
            Triple("EPA Supermercados / Zepa", 152.20, "Ofertas válidas até hoje · 1,8 km"),
            Triple("Carrefour Hiper", 164.90, "Preço padrão de hipermercado · 4,2 km")
        )

        comparacoes.forEach { (mercado, valor, desc) ->
            val isBest = mercado.contains("BH")
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
                        Text(mercado, fontWeight = FontWeight.Bold, color = TextPrimary)
                        Text(desc, style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp), color = TextSecondary)
                    }
                    Column(horizontalAlignment = Alignment.End) {
                        Text(PriceExtractor.formatCurrency(valor), fontWeight = FontWeight.ExtraBold, fontSize = 16.sp, color = if (isBest) BrandGreen else AccentOrange)
                        if (isBest) {
                            Text("MENOR VALOR", style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold, fontSize = 9.sp), color = BrandGreen)
                        }
                    }
                }
            }
        }
        Spacer(modifier = Modifier.height(24.dp))
    }
}

// ---------------------------------------------------------------------------
// Tela 14: Correção OCR (Mockup 14)
// ---------------------------------------------------------------------------
@Composable
fun CorrecaoOcrScreenReal(
    preco: Double = 28.90,
    onConfirm: (Double) -> Unit = {},
    onBack: () -> Unit = {}
) {
    var textVal by remember { mutableStateOf(PriceExtractor.formatCurrency(preco)) }

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
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(130.dp)
                        .clip(RoundedCornerShape(14.dp))
                        .background(BorderLight),
                    contentAlignment = Alignment.Center
                ) {
                    Text("Recorte da foto da etiqueta", color = TextSecondary)
                }
                Spacer(modifier = Modifier.height(12.dp))
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(8.dp))
                        .background(BrandGreen.copy(alpha = 0.12f))
                        .padding(horizontal = 8.dp, vertical = 4.dp)
                ) {
                    Text("Confiança do OCR: 94%", style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold), color = BrandGreen)
                }
                Spacer(modifier = Modifier.height(16.dp))
                OutlinedTextField(
                    value = textVal,
                    onValueChange = { textVal = it },
                    label = { Text("Preço detectado") },
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(20.dp))
                Button(
                    onClick = {
                        val v = textVal.replace("R$", "").replace(" ", "").replace(".", "").replace(",", ".").toDoubleOrNull() ?: preco
                        onConfirm(v)
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