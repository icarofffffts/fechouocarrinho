package com.fechouocarrinho.app.presentation.home

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.fechouocarrinho.app.presentation.theme.FechouOCarrinhoTheme

private val BrandGreen = Color(0xFF1B8C42)
private val BrandGreenDark = Color(0xFF146B32)
private val AccentOrange = Color(0xFFFF6B00)
private val AppBackground = Color(0xFFFFF8F0)
private val SurfaceWhite = Color(0xFFFFFFFF)
private val TextPrimary = Color(0xFF111827)
private val TextSecondary = Color(0xFF6B7280)
private val BorderLight = Color(0xFFEAE5DC)
private val ThumbBackground = Color(0xFFEAE5DC)

data class HomeListItem(
    val name: String,
    val quantity: Int,
    val unitPrice: String,
    val total: String,
    val hasOcr: Boolean,
    val checked: Boolean = false,
    val thumbInitial: String = ""
)

@OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    viewModel: HomeViewModel,
    onNavigateToCamera: () -> Unit,
    onNavigateToList: () -> Unit = {},
    onNavigateToCarrinho: () -> Unit = {},
    onNavigateToPerfil: () -> Unit = {},
    onNavigateToSupermarkets: () -> Unit = {},
    onNavigateToHelp: () -> Unit = {},
    selectedSupermarket: String = "Supermercados BH"
) {
    val uiState by viewModel.uiState.collectAsState()

    Scaffold(
        containerColor = AppBackground,
        bottomBar = {
            HomeBottomBar(
                onNavigateToCamera = onNavigateToCamera,
                onNavigateToList = onNavigateToList,
                onNavigateToCarrinho = onNavigateToCarrinho,
                onNavigateToPerfil = onNavigateToPerfil
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .verticalScroll(rememberScrollState())
                .background(AppBackground)
        ) {
            HomeHeader(
                selectedSupermarket = selectedSupermarket,
                onNavigateToSupermarkets = onNavigateToSupermarkets
            )
            Spacer(modifier = Modifier.height(20.dp))
            BudgetCard(total = uiState.total, pendingCount = uiState.pendingCount)
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = "lista de compras",
                style = MaterialTheme.typography.titleMedium.copy(
                    fontFamily = androidx.compose.ui.text.font.FontFamily.Default,
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 16.sp
                ),
                color = TextPrimary,
                modifier = Modifier.padding(start = 20.dp, top = 4.dp, bottom = 4.dp)
            )
            Spacer(modifier = Modifier.height(8.dp))

            val homeItems = uiState.prices.map { p ->
                HomeListItem(
                    name = p.label,
                    quantity = 1,
                    unitPrice = com.fechouocarrinho.app.ocr.PriceExtractor.formatCurrency(p.value),
                    total = com.fechouocarrinho.app.ocr.PriceExtractor.formatCurrency(p.value),
                    hasOcr = true,
                    checked = false,
                    thumbInitial = p.label.take(1).uppercase()
                )
            }
            if (homeItems.isEmpty()) {
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 20.dp, vertical = 8.dp),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = SurfaceWhite)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Box(
                            modifier = Modifier
                                .size(52.dp)
                                .clip(RoundedCornerShape(14.dp))
                                .background(BrandGreen.copy(alpha = 0.1f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.CameraAlt,
                                contentDescription = null,
                                tint = BrandGreen,
                                modifier = Modifier.size(28.dp)
                            )
                        }
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(
                            text = "Nenhum item escaneado ainda",
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                            color = TextPrimary
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "Toque em 'Escanear' abaixo para ler etiquetas no supermercado sem internet.",
                            style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                            color = TextSecondary,
                            textAlign = TextAlign.Center
                        )
                    }
                }
            } else {
                Column(modifier = Modifier.padding(horizontal = 20.dp)) {
                    homeItems.forEach { item ->
                        ShoppingItem(item)
                        Spacer(modifier = Modifier.height(10.dp))
                    }
                }
            }

            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}

@Composable
private fun HomeHeader(
    selectedSupermarket: String = "Supermercados BH",
    onNavigateToSupermarkets: () -> Unit = {}
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(
                brush = Brush.verticalGradient(
                    colors = listOf(BrandGreen, BrandGreenDark)
                )
            )
            .statusBarsPadding()
            .padding(horizontal = 20.dp, vertical = 16.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.fillMaxWidth()
        ) {
            Box(
                modifier = Modifier
                    .size(42.dp)
                    .clip(RoundedCornerShape(13.dp))
                    .background(SurfaceWhite),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.ShoppingCart,
                    contentDescription = null,
                    tint = BrandGreen,
                    modifier = Modifier.size(22.dp)
                )
            }
            Spacer(modifier = Modifier.width(10.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "fechou o carrinho",
                    style = MaterialTheme.typography.titleMedium.copy(
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 20.sp,
                        letterSpacing = (-0.5).sp
                    ),
                    color = SurfaceWhite
                )
                Text(
                    text = "olá, bora às compras?",
                    style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                    color = SurfaceWhite.copy(alpha = 0.85f)
                )
            }
            Column(horizontalAlignment = Alignment.End) {
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(14.dp))
                        .background(SurfaceWhite.copy(alpha = 0.22f))
                        .clickable { onNavigateToSupermarkets() }
                        .padding(horizontal = 10.dp, vertical = 6.dp)
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = selectedSupermarket,
                            style = MaterialTheme.typography.labelSmall.copy(fontSize = 11.sp, fontWeight = FontWeight.Bold),
                            color = SurfaceWhite
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Icon(
                            imageVector = Icons.Default.ArrowDropDown,
                            contentDescription = "Trocar supermercado",
                            tint = SurfaceWhite,
                            modifier = Modifier.size(16.dp)
                        )
                    }
                }
                Spacer(modifier = Modifier.height(4.dp))
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(14.dp))
                        .background(SurfaceWhite.copy(alpha = 0.18f))
                        .padding(horizontal = 10.dp, vertical = 5.dp)
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.WifiOff,
                            contentDescription = null,
                            tint = SurfaceWhite,
                            modifier = Modifier.size(12.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = "100% Offline",
                            style = MaterialTheme.typography.labelSmall.copy(fontSize = 10.sp, fontWeight = FontWeight.SemiBold),
                            color = SurfaceWhite
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun BudgetCard(total: Double = 0.0, pendingCount: Int = 0) {
    val meta = 200.0
    val pct = if (meta > 0) (total / meta * 100).toInt().coerceIn(0, 100) else 0
    val remaining = (meta - total).coerceAtLeast(0.0)
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 20.dp),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Text(
                text = "TOTAL NO CARRINHO",
                style = MaterialTheme.typography.labelSmall.copy(
                    fontFamily = FontFamily.Monospace,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.2.sp
                ),
                color = TextSecondary
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = com.fechouocarrinho.app.ocr.PriceExtractor.formatCurrency(total),
                style = MaterialTheme.typography.headlineMedium.copy(
                    fontFamily = FontFamilyNunito,
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 32.sp
                ),
                color = TextPrimary
            )
            Text(
                text = "de ${com.fechouocarrinho.app.ocr.PriceExtractor.formatCurrency(meta)} (meta)",
                style = MaterialTheme.typography.bodySmall.copy(fontSize = 13.sp),
                color = TextSecondary
            )
            Spacer(modifier = Modifier.height(14.dp))
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(10.dp)
                    .clip(RoundedCornerShape(5.dp))
                    .background(BorderLight)
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth((pct / 100f).coerceIn(0f, 1f))
                        .height(10.dp)
                        .clip(RoundedCornerShape(5.dp))
                        .background(BrandGreen)
                )
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "$pct% da meta · ${com.fechouocarrinho.app.ocr.PriceExtractor.formatCurrency(remaining)} restantes" + if (pendingCount > 0) " · $pendingCount pendente(s)" else "",
                style = MaterialTheme.typography.labelMedium.copy(fontSize = 12.sp, fontWeight = FontWeight.SemiBold),
                color = BrandGreen
            )
        }
    }
}

private fun getProductIcon(name: String): ImageVector {
    val n = name.lowercase()
    return when {
        n.contains("arroz") || n.contains("feijao") || n.contains("feijão") || n.contains("trigo") || n.contains("cereal") || n.contains("farinha") -> Icons.Default.LocalGroceryStore
        n.contains("leite") || n.contains("queijo") || n.contains("iogurte") || n.contains("manteiga") || n.contains("requeijao") -> Icons.Default.LocalDrink
        n.contains("cafe") || n.contains("café") || n.contains("cha") || n.contains("chá") || n.contains("suco") || n.contains("refrigerante") || n.contains("agua") -> Icons.Default.LocalCafe
        n.contains("pao") || n.contains("pão") || n.contains("bolo") || n.contains("biscoito") || n.contains("bolacha") || n.contains("torrada") -> Icons.Default.BakeryDining
        n.contains("carne") || n.contains("frango") || n.contains("peixe") || n.contains("bife") || n.contains("linguica") || n.contains("linguiça") -> Icons.Default.Restaurant
        n.contains("maca") || n.contains("maçã") || n.contains("banana") || n.contains("tomate") || n.contains("alface") || n.contains("legume") || n.contains("fruta") -> Icons.Default.Eco
        n.contains("sabao") || n.contains("sabão") || n.contains("detergente") || n.contains("amaciante") || n.contains("desinfetante") -> Icons.Default.CleanHands
        else -> Icons.Default.ShoppingBag
    }
}

@Composable
private fun ShoppingItem(item: HomeListItem) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // circular checkbox
            Box(
                modifier = Modifier
                    .size(22.dp)
                    .clip(CircleShape)
                    .background(if (item.checked) BrandGreen else Color.Transparent)
                    .border(
                        width = 2.dp,
                        color = if (item.checked) BrandGreen else Color(0xFFD1D5DB),
                        shape = CircleShape
                    ),
                contentAlignment = Alignment.Center
            ) {
                if (item.checked) {
                    Icon(
                        imageVector = Icons.Default.Check,
                        contentDescription = null,
                        tint = SurfaceWhite,
                        modifier = Modifier.size(14.dp)
                    )
                }
            }
            Spacer(modifier = Modifier.width(12.dp))
            // product packshot badge with clean category icon
            Box(
                modifier = Modifier
                    .size(44.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(BrandGreen.copy(alpha = 0.08f))
                    .border(1.dp, BrandGreen.copy(alpha = 0.15f), RoundedCornerShape(12.dp)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = getProductIcon(item.name),
                    contentDescription = item.name,
                    tint = BrandGreen,
                    modifier = Modifier.size(24.dp)
                )
            }
            Spacer(modifier = Modifier.width(12.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = item.name,
                    style = MaterialTheme.typography.bodyMedium.copy(
                        fontSize = 14.sp,
                        fontWeight = FontWeight.SemiBold
                    ),
                    color = TextPrimary
                )
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = "${item.quantity} un · ${item.unitPrice}",
                        style = MaterialTheme.typography.labelSmall.copy(fontSize = 11.sp),
                        color = TextSecondary
                    )
                    if (item.hasOcr) {
                        Spacer(modifier = Modifier.width(6.dp))
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(6.dp))
                                .background(AccentOrange)
                                .padding(horizontal = 5.dp, vertical = 2.dp)
                        ) {
                            Text(
                                text = "OCR",
                                style = MaterialTheme.typography.labelSmall.copy(
                                    fontFamily = FontFamily.Monospace,
                                    fontSize = 8.sp,
                                    fontWeight = FontWeight.Bold
                                ),
                                color = SurfaceWhite
                            )
                        }
                    }
                }
            }
            Text(
                text = item.total,
                style = MaterialTheme.typography.titleMedium.copy(
                    fontFamily = FontFamilyNunito,
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 16.sp
                ),
                color = AccentOrange,
                textAlign = TextAlign.End
            )
        }
    }
}

@Composable
private fun HomeBottomBar(
    onNavigateToCamera: () -> Unit,
    onNavigateToList: () -> Unit,
    onNavigateToCarrinho: () -> Unit = {},
    onNavigateToPerfil: () -> Unit = {}
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .navigationBarsPadding()
            .background(SurfaceWhite)
            .padding(top = 10.dp, bottom = 8.dp)
    ) {
        // top divider
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(1.dp)
                .background(TextPrimary.copy(alpha = 0.08f))
                .align(Alignment.TopCenter)
        )
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 24.dp, vertical = 6.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            BottomNavItem(icon = Icons.Default.Home, label = "Home", active = true, onClick = {})
            BottomNavItem(icon = Icons.Default.List, label = "Lista", active = false, onClick = onNavigateToList)
            Spacer(modifier = Modifier.width(64.dp))
            BottomNavItem(icon = Icons.Default.ShoppingCart, label = "Carrinho", active = false, onClick = onNavigateToCarrinho)
            BottomNavItem(icon = Icons.Default.Person, label = "Perfil", active = false, onClick = onNavigateToPerfil)
        }
        Column(
            modifier = Modifier
                .align(Alignment.TopCenter)
                .offset(y = (-24).dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            FloatingActionButton(
                onClick = onNavigateToCamera,
                containerColor = AccentOrange,
                contentColor = SurfaceWhite,
                shape = CircleShape,
                modifier = Modifier.size(60.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.CameraAlt,
                    contentDescription = "Escanear",
                    modifier = Modifier.size(28.dp)
                )
            }
            Spacer(modifier = Modifier.height(2.dp))
            Text(
                text = "Escanear",
                style = MaterialTheme.typography.labelSmall.copy(
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                ),
                color = AccentOrange
            )
        }
    }
}

@Composable
private fun BottomNavItem(
    icon: ImageVector,
    label: String,
    active: Boolean,
    onClick: () -> Unit
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .clip(RoundedCornerShape(8.dp))
            .clickable { onClick() }
            .padding(horizontal = 8.dp, vertical = 4.dp)
    ) {
        Icon(
            imageVector = icon,
            contentDescription = label,
            tint = if (active) BrandGreen else TextSecondary,
            modifier = Modifier.size(22.dp)
        )
        Spacer(modifier = Modifier.height(2.dp))
        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall.copy(
                fontSize = 10.sp,
                fontWeight = if (active) FontWeight.SemiBold else FontWeight.Medium
            ),
            color = if (active) BrandGreen else TextSecondary
        )
    }
}

private val FontFamilyNunito = FontFamily.Default

@Preview(showBackground = true)
@Composable
private fun HomePreview() {
    FechouOCarrinhoTheme {
        Box(modifier = Modifier.fillMaxSize().background(AppBackground)) {
            Text("Home Preview", modifier = Modifier.align(Alignment.Center))
        }
    }
}