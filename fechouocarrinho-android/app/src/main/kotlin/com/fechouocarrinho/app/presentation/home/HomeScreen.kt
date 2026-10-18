package com.fechouocarrinho.app.presentation.home

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
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CameraAlt
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.List
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.filled.WifiOff
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
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
    onNavigateToList: () -> Unit,
    onNavigateToSupermarkets: () -> Unit = {},
    onNavigateToHelp: () -> Unit = {}
) {
    val uiState by viewModel.uiState.collectAsState()

    Scaffold(
        containerColor = AppBackground,
        bottomBar = {
            HomeBottomBar(
                onNavigateToCamera = onNavigateToCamera,
                onNavigateToList = onNavigateToList
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
            HomeHeader()
            Spacer(modifier = Modifier.height(20.dp))
            BudgetCard()
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "lista de compras",
                style = MaterialTheme.typography.titleMedium.copy(
                    fontFamily = androidx.compose.ui.text.font.FontFamily.Default,
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 16.sp
                ),
                color = TextPrimary,
                modifier = Modifier.padding(start = 20.dp, top = 8.dp, bottom = 4.dp)
            )
            Spacer(modifier = Modifier.height(8.dp))

            CategorySection(
                title = "MERCEARIA",
                items = listOf(
                    HomeListItem("Arroz integral 5kg", 1, "R$ 28,90", "R$ 28,90", true, false, "A"),
                    HomeListItem("Feijão carioca 1kg", 2, "R$ 3,74", "R$ 7,49", false, false, "F")
                )
            )
            CategorySection(
                title = "LATICÍNIOS",
                items = listOf(
                    HomeListItem("Leite integral 1L", 4, "R$ 4,99", "R$ 19,96", false, false, "L")
                )
            )
            CategorySection(
                title = "HORTIFRUTI",
                items = emptyList()
            )
            CategorySection(
                title = "BEBIDAS",
                items = listOf(
                    HomeListItem("Café torrado 500g", 1, "R$ 18,50", "R$ 18,50", false, false, "C")
                )
            )

            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}

@Composable
private fun HomeHeader() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(
                brush = Brush.verticalGradient(
                    colors = listOf(BrandGreen, BrandGreenDark)
                )
            )
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
                        .background(SurfaceWhite.copy(alpha = 0.18f))
                        .padding(horizontal = 12.dp, vertical = 6.dp)
                ) {
                    Text(
                        text = "Supermercados BH",
                        style = MaterialTheme.typography.labelSmall.copy(fontSize = 11.sp, fontWeight = FontWeight.SemiBold),
                        color = SurfaceWhite
                    )
                }
                Spacer(modifier = Modifier.height(4.dp))
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(14.dp))
                        .background(SurfaceWhite.copy(alpha = 0.18f))
                        .padding(horizontal = 12.dp, vertical = 6.dp)
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
                            style = MaterialTheme.typography.labelSmall.copy(fontSize = 11.sp, fontWeight = FontWeight.SemiBold),
                            color = SurfaceWhite
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun BudgetCard() {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 20.dp),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Text(
                text = "orçamento da compra",
                style = MaterialTheme.typography.labelMedium.copy(fontSize = 12.sp, fontWeight = FontWeight.Medium),
                color = TextSecondary
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "R$ 142,80",
                style = MaterialTheme.typography.headlineMedium.copy(
                    fontFamily = FontFamilyNunito,
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 34.sp,
                    letterSpacing = (-1.5).sp
                ),
                color = TextPrimary
            )
            Text(
                text = "de R$ 200,00 (meta)",
                style = MaterialTheme.typography.bodySmall.copy(fontSize = 13.sp),
                color = TextSecondary
            )
            Spacer(modifier = Modifier.height(12.dp))
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(10.dp)
                    .clip(RoundedCornerShape(5.dp))
                    .background(BorderLight)
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth(0.714f)
                        .height(10.dp)
                        .clip(RoundedCornerShape(5.dp))
                        .background(BrandGreen)
                )
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "71% da meta · R$ 57,20 restantes",
                style = MaterialTheme.typography.labelMedium.copy(fontSize = 12.sp, fontWeight = FontWeight.SemiBold),
                color = BrandGreen
            )
        }
    }
}

@Composable
private fun CategorySection(title: String, items: List<HomeListItem>) {
    Column(modifier = Modifier.fillMaxWidth().padding(horizontal = 20.dp, vertical = 8.dp)) {
        Text(
            text = title,
            style = MaterialTheme.typography.labelSmall.copy(
                fontFamily = FontFamily.Monospace,
                fontSize = 10.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 1.5.sp
            ),
            color = TextSecondary
        )
        Spacer(modifier = Modifier.height(8.dp))
        if (items.isEmpty()) {
            Text(
                text = "Nenhum item nesta seção",
                style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
                color = Color(0xFF9CA3AF),
                modifier = Modifier.padding(vertical = 4.dp)
            )
        } else {
            items.forEach { item ->
                ShoppingItem(item)
                Spacer(modifier = Modifier.height(10.dp))
            }
        }
    }
}

@Composable
private fun ShoppingItem(item: HomeListItem) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
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
            Spacer(modifier = Modifier.width(10.dp))
            // photo 1:1
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(ThumbBackground),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = item.thumbInitial,
                    style = MaterialTheme.typography.labelLarge.copy(fontWeight = FontWeight.Bold),
                    color = TextSecondary
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
                        text = "${item.quantity} un · ${item.unitPrice} · x${item.quantity}",
                        style = MaterialTheme.typography.labelSmall.copy(fontSize = 11.sp),
                        color = TextSecondary
                    )
                    if (item.hasOcr) {
                        Spacer(modifier = Modifier.width(6.dp))
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(7.dp))
                                .background(AccentOrange)
                                .padding(horizontal = 6.dp, vertical = 2.dp)
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
                style = MaterialTheme.typography.titleSmall.copy(
                    fontFamily = FontFamilyNunito,
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 15.sp
                ),
                color = TextPrimary,
                textAlign = TextAlign.End
            )
        }
    }
}

@Composable
private fun HomeBottomBar(
    onNavigateToCamera: () -> Unit,
    onNavigateToList: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(80.dp)
            .background(SurfaceWhite)
    ) {
        // top divider
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(1.dp)
                .background(TextPrimary.copy(alpha = 0.08f))
        )
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 24.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            BottomNavItem(icon = Icons.Default.Home, label = "Home", active = true, onClick = {})
            BottomNavItem(icon = Icons.Default.List, label = "Lista", active = false, onClick = onNavigateToList)
            Spacer(modifier = Modifier.width(56.dp))
            BottomNavItem(icon = Icons.Default.ShoppingCart, label = "Carrinho", active = false, onClick = onNavigateToList)
            BottomNavItem(icon = Icons.Default.Person, label = "Perfil", active = false, onClick = {})
        }
        Column(
            modifier = Modifier
                .align(Alignment.TopCenter)
                .offset(y = (-34).dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            FloatingActionButton(
                onClick = onNavigateToCamera,
                containerColor = AccentOrange,
                contentColor = SurfaceWhite,
                shape = CircleShape,
                modifier = Modifier.size(68.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.CameraAlt,
                    contentDescription = null,
                    modifier = Modifier.size(28.dp)
                )
            }
            Spacer(modifier = Modifier.height(2.dp))
            Text(
                text = "Escanear",
                style = MaterialTheme.typography.labelSmall.copy(
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold
                ),
                color = AccentOrange
            )
        }
    }
}

@Composable
private fun BottomNavItem(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    label: String,
    active: Boolean,
    onClick: () -> Unit
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.clickable { onClick() }
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
            style = MaterialTheme.typography.labelSmall.copy(fontSize = 10.sp, fontWeight = if (active) FontWeight.SemiBold else FontWeight.Medium),
            color = if (active) BrandGreen else TextSecondary
        )
    }
}

// Font family placeholders (Nunito not bundled; fallback to default)
private val FontFamilyNunito = FontFamily.Default
private val FontFamilyMonospace = FontFamily.Monospace

@Preview(showBackground = true)
@Composable
private fun HomePreview() {
    FechouOCarrinhoTheme {
        Box(modifier = Modifier.fillMaxSize().background(AppBackground)) {
            Text("Home Preview", modifier = Modifier.align(Alignment.Center))
        }
    }
}