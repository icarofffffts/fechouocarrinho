package com.fechouocarrinho.app.presentation.home

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.animation.core.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.fechouocarrinho.app.ocr.PriceExtractor
import com.fechouocarrinho.app.presentation.components.WelcomeBanner
import com.fechouocarrinho.app.presentation.components.pressBounce
import com.fechouocarrinho.app.presentation.components.SquircleLarge
import com.fechouocarrinho.app.presentation.components.SquircleMedium
import com.fechouocarrinho.app.presentation.components.SquircleSmall

private val BrandGreen = Color(0xFF1B8C42)
private val BrandGreenDark = Color(0xFF146B32)
private val AccentOrange = Color(0xFFFF6B00)
private val AppBackground = Color(0xFFFFF8F0)
private val SurfaceWhite = Color(0xFFFFFFFF)
private val TextPrimary = Color(0xFF0B2B1F)
private val TextSecondary = Color(0xFF5A6B63)
private val BorderLight = Color(0xFFEAE5DC)

data class HomeListItem(
    val name: String,
    val quantity: Int,
    val unitPrice: String,
    val total: String,
    val hasOcr: Boolean,
    val checked: Boolean = false,
    val category: String = "MERCEARIA"
)

@Composable
fun HomeScreen(
    viewModel: HomeViewModel,
    onNavigateToCamera: () -> Unit,
    onNavigateToList: () -> Unit = {},
    onNavigateToCarrinho: () -> Unit = {},
    onNavigateToPerfil: () -> Unit = {},
    onNavigateToSupermarkets: () -> Unit = {},
    onNavigateToHelp: () -> Unit = {},
    selectedSupermarket: String = "",
    budgetGoal: Double = 0.0,
    onSetBudgetGoal: (Double) -> Unit = {}
) {
    val uiState by viewModel.uiState.collectAsState()
    var showGoalDialog by remember { mutableStateOf(false) }

    // Total real vindo do Room/Supabase - sem mock
    val displayTotal = uiState.prices.sumOf { it.value }

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
                .background(AppBackground)
                .padding(padding)
                .verticalScroll(rememberScrollState())
        ) {
            Spacer(modifier = Modifier.height(4.dp))

            // 1. Cabeçalho Organizado (Mockup 01)
            HomeHeaderCard(
                selectedSupermarket = selectedSupermarket,
                onNavigateToSupermarkets = onNavigateToSupermarkets,
                onCheckUpdate = { viewModel.checkForUpdateManually() }
            )

            Spacer(modifier = Modifier.height(12.dp))

            // Banner de Boas-vindas 720x240
            WelcomeBanner(onAction = onNavigateToCamera)

            Spacer(modifier = Modifier.height(14.dp))

            // 2. Card de Orçamento (Mockup 01)
            BudgetCard(
                total = displayTotal,
                meta = budgetGoal,
                pendingCount = uiState.pendingCount,
                onEditGoal = { showGoalDialog = true }
            )

            Spacer(modifier = Modifier.height(20.dp))

            // 3. Título da Seção
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "lista de compras",
                    style = MaterialTheme.typography.titleMedium.copy(
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 18.sp
                    ),
                    color = TextPrimary
                )
                Text(
                    text = "${uiState.prices.size} itens",
                    style = MaterialTheme.typography.labelSmall.copy(fontSize = 12.sp),
                    color = TextSecondary
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Lista real vinda do Room/Supabase
            if (uiState.prices.isEmpty()) {
                Column(
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 20.dp, vertical = 24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text("Sua lista está vazia", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold, color = TextPrimary))
                    Text("Toque em Escanear e aponte para a etiqueta", style = MaterialTheme.typography.bodySmall.copy(color = TextSecondary), textAlign = TextAlign.Center)
                }
            } else {
                // Agrupa por categoria real inferida do label
                val grouped = uiState.prices.groupBy { p ->
                    val n = p.label.lowercase()
                    when {
                        n.contains("leite") || n.contains("queijo") -> "LATICÍNIOS"
                        n.contains("cafe") || n.contains("café") -> "BEBIDAS"
                        else -> "MERCEARIA"
                    }
                }
                grouped.forEach { (cat, items) ->
                    CategoryHeader(title = cat)
                    Column(modifier = Modifier.padding(horizontal = 16.dp)) {
                        items.forEach { p ->
                            val item = HomeListItem(
                                name = p.label,
                                quantity = 1,
                                unitPrice = PriceExtractor.formatCurrency(p.value),
                                total = PriceExtractor.formatCurrency(p.value),
                                hasOcr = true,
                                checked = false,
                                category = cat
                            )
                            ShoppingItemRow(item = item, onToggleCheck = {})
                            Spacer(modifier = Modifier.height(8.dp))
                        }
                    }
                    Spacer(modifier = Modifier.height(10.dp))
                }
            }

            Spacer(modifier = Modifier.height(36.dp))
        }
    }

    if (showGoalDialog) {
        BudgetGoalDialog(
            currentGoal = budgetGoal,
            onDismiss = { showGoalDialog = false },
            onConfirm = { goal ->
                onSetBudgetGoal(goal)
                showGoalDialog = false
            }
        )
    }
}

@Composable
private fun BudgetGoalDialog(
    currentGoal: Double,
    onDismiss: () -> Unit,
    onConfirm: (Double) -> Unit
) {
    var text by remember {
        mutableStateOf(if (currentGoal > 0) PriceExtractor.formatCurrency(currentGoal).replace("R$", "").trim() else "")
    }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = "meta de orçamento",
                fontWeight = FontWeight.ExtraBold
            )
        },
        text = {
            Column {
                Text(
                    text = "Defina quanto você pretende gastar nesta compra. Deixe vazio para remover a meta.",
                    style = MaterialTheme.typography.bodySmall,
                    color = TextSecondary
                )
                Spacer(modifier = Modifier.height(12.dp))
                OutlinedTextField(
                    value = text,
                    onValueChange = { text = it },
                    singleLine = true,
                    label = { Text("Valor em R$") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(14.dp)
                )
            }
        },
        confirmButton = {
            TextButton(onClick = {
                val parsed = text.replace("R$", "").replace(" ", "")
                    .replace(".", "")
                    .replace(",", ".")
                    .toDoubleOrNull()
                onConfirm(parsed?.coerceAtLeast(0.0) ?: 0.0)
            }) { Text("Salvar", fontWeight = FontWeight.Bold, color = BrandGreen) }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Cancelar", color = TextSecondary) }
        }
    )
}

@Composable
private fun HomeHeaderCard(
    selectedSupermarket: String,
    onNavigateToSupermarkets: () -> Unit,
    onCheckUpdate: () -> Unit = {}
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        shape = SquircleLarge,
        colors = CardDefaults.cardColors(containerColor = BrandGreen),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    brush = Brush.verticalGradient(
                        colors = listOf(BrandGreen, BrandGreenDark)
                    )
                )
                .padding(horizontal = 18.dp, vertical = 16.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.fillMaxWidth()
            ) {
                // Logo da marca
                Box(
                    modifier = Modifier
                        .size(44.dp)
                        .clip(RoundedCornerShape(13.dp))
                        .background(SurfaceWhite),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.ShoppingCart,
                        contentDescription = null,
                        tint = BrandGreen,
                        modifier = Modifier.size(24.dp)
                    )
                }

                Spacer(modifier = Modifier.width(12.dp))

                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "fechou o carrinho",
                        style = MaterialTheme.typography.titleMedium.copy(
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 19.sp,
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

                // Seletor de supermercado interativo
                Box(
                    modifier = Modifier
                        .clip(SquircleSmall)
                        .background(SurfaceWhite.copy(alpha = 0.2f))
                        .pressBounce(onClick = onNavigateToSupermarkets)
                        .padding(horizontal = 10.dp, vertical = 6.dp)
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = selectedSupermarket.ifBlank { "escolher mercado" },
                            maxLines = 1,
                            overflow = androidx.compose.ui.text.style.TextOverflow.Ellipsis,
                            style = MaterialTheme.typography.labelSmall.copy(
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold
                            ),
                            color = SurfaceWhite
                        )
                        Spacer(modifier = Modifier.width(3.dp))
                        Icon(
                            imageVector = Icons.Default.ArrowDropDown,
                            contentDescription = "Trocar",
                            tint = SurfaceWhite,
                            modifier = Modifier.size(16.dp)
                        )
                    }
                }
                Spacer(modifier = Modifier.width(8.dp))
                IconButton(onClick = onCheckUpdate, modifier = Modifier.size(32.dp)) {
                    Icon(Icons.Default.Refresh, contentDescription = "Verificar atualização", tint = SurfaceWhite, modifier = Modifier.size(18.dp))
                }
            }
        }
    }
}

@Composable
private fun BudgetCard(
    total: Double,
    meta: Double,
    pendingCount: Int = 0,
    onEditGoal: () -> Unit = {}
) {
    val hasGoal = meta > 0
    val pct = if (hasGoal) (total / meta * 100).toInt().coerceIn(0, 100) else 0
    val remaining = (meta - total).coerceAtLeast(0.0)

    val animatedProgress by animateFloatAsState(
        targetValue = (pct / 100f).coerceIn(0f, 1f),
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy,
            stiffness = Spring.StiffnessLow
        ),
        label = "BudgetSpringProgress"
    )

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp)
            .clickable(onClick = onEditGoal),
        shape = SquircleLarge,
        colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "orçamento da compra",
                    style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                    color = TextSecondary
                )
                Text(
                    text = if (hasGoal) "editar meta" else "definir meta",
                    style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold, fontSize = 11.sp),
                    color = BrandGreen
                )
            }
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = PriceExtractor.formatCurrency(total),
                style = MaterialTheme.typography.headlineMedium.copy(
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 34.sp,
                    letterSpacing = (-1.5).sp
                ),
                color = TextPrimary
            )
            if (hasGoal) {
                Text(
                    text = "de ${PriceExtractor.formatCurrency(meta)} (meta)",
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
                            .fillMaxWidth(animatedProgress)
                            .height(10.dp)
                            .clip(RoundedCornerShape(5.dp))
                            .background(BrandGreen)
                    )
                }
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "$pct% da meta · ${PriceExtractor.formatCurrency(remaining)} restantes" + if (pendingCount > 0) " · $pendingCount pendente(s)" else "",
                    style = MaterialTheme.typography.labelMedium.copy(
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold
                    ),
                    color = BrandGreen
                )
            } else {
                Text(
                    text = "Toque para definir quanto pretende gastar." + if (pendingCount > 0) " · $pendingCount pendente(s)" else "",
                    style = MaterialTheme.typography.bodySmall.copy(fontSize = 13.sp),
                    color = TextSecondary
                )
            }
        }
    }
}

@Composable
private fun CategoryHeader(title: String) {
    Text(
        text = title,
        style = MaterialTheme.typography.labelSmall.copy(
            fontFamily = FontFamily.Monospace,
            fontSize = 10.sp,
            fontWeight = FontWeight.Bold,
            letterSpacing = 1.5.sp
        ),
        color = TextSecondary,
        modifier = Modifier.padding(horizontal = 20.dp, vertical = 6.dp)
    )
}

@Composable
private fun ShoppingItemRow(
    item: HomeListItem,
    onToggleCheck: () -> Unit
) {
    val rowAlpha by animateFloatAsState(
        targetValue = if (item.checked) 0.55f else 1f,
        animationSpec = spring(stiffness = Spring.StiffnessMedium),
        label = "ItemCheckAlpha"
    )
    val checkScale by animateFloatAsState(
        targetValue = if (item.checked) 1f else 0f,
        animationSpec = spring(dampingRatio = Spring.DampingRatioMediumBouncy),
        label = "CheckIconScale"
    )

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .alpha(rowAlpha)
            .pressBounce(onClick = onToggleCheck),
        shape = SquircleMedium,
        colors = CardDefaults.cardColors(containerColor = SurfaceWhite),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 14.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Checkbox circular
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
                if (item.checked || checkScale > 0.05f) {
                    Icon(
                        imageVector = Icons.Default.Check,
                        contentDescription = null,
                        tint = SurfaceWhite,
                        modifier = Modifier
                            .size(14.dp)
                            .scale(checkScale)
                    )
                }
            }

            Spacer(modifier = Modifier.width(12.dp))

            // Miniatura com ícone vetorial da categoria
            Box(
                modifier = Modifier
                    .size(42.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(BrandGreen.copy(alpha = 0.08f))
                    .border(1.dp, BrandGreen.copy(alpha = 0.15f), RoundedCornerShape(10.dp)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = getCategoryVector(item.name, item.category),
                    contentDescription = item.name,
                    tint = BrandGreen,
                    modifier = Modifier.size(22.dp)
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
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 15.sp
                ),
                color = TextPrimary,
                textAlign = TextAlign.End
            )
        }
    }
}

private fun getCategoryVector(name: String, cat: String): ImageVector {
    val n = name.lowercase()
    return when {
        n.contains("arroz") || n.contains("feijao") || n.contains("feijão") || cat == "MERCEARIA" -> Icons.Default.LocalGroceryStore
        n.contains("leite") || n.contains("queijo") || cat == "LATICÍNIOS" -> Icons.Default.LocalDrink
        n.contains("cafe") || n.contains("café") || n.contains("suco") || cat == "BEBIDAS" -> Icons.Default.LocalCafe
        n.contains("carne") || n.contains("frango") -> Icons.Default.Restaurant
        n.contains("maca") || n.contains("banana") || n.contains("horti") -> Icons.Default.Eco
        else -> Icons.Default.ShoppingBag
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
            .height(82.dp)
    ) {
        // Linha divisória superior
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(1.dp)
                .background(TextPrimary.copy(alpha = 0.08f))
                .align(Alignment.TopCenter)
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
            Spacer(modifier = Modifier.width(64.dp))
            BottomNavItem(icon = Icons.Default.ShoppingCart, label = "Carrinho", active = false, onClick = onNavigateToCarrinho)
            BottomNavItem(icon = Icons.Default.Person, label = "Perfil", active = false, onClick = onNavigateToPerfil)
        }

        // FAB Central "Escanear" alinhado perfeitamente sem cortes
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
                modifier = Modifier.size(62.dp).pressBounce(onClick = onNavigateToCamera)
            ) {
                Icon(
                    imageVector = Icons.Default.CameraAlt,
                    contentDescription = "Escanear",
                    modifier = Modifier.size(28.dp)
                )
            }
            Spacer(modifier = Modifier.height(3.dp))
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
            .clip(SquircleSmall)
            .pressBounce(onClick = onClick)
            .padding(horizontal = 8.dp, vertical = 6.dp)
    ) {
        Icon(
            imageVector = icon,
            contentDescription = label,
            tint = if (active) BrandGreen else TextSecondary,
            modifier = Modifier.size(22.dp)
        )
        Spacer(modifier = Modifier.height(3.dp))
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