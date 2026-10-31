package com.fechouocarrinho.app.presentation.home

import androidx.compose.animation.core.*
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
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.fechouocarrinho.app.ocr.PriceExtractor
import com.fechouocarrinho.app.presentation.components.pressBounce
import com.fechouocarrinho.app.presentation.components.SquircleLarge
import com.fechouocarrinho.app.presentation.components.SquircleMedium
import com.fechouocarrinho.app.presentation.components.SquircleSmall

private val BrandGreen = Color(0xFF1B8C42)
private val BrandGreenDark = Color(0xFF146B32)
private val AccentOrange = Color(0xFFFF6B00)
private val AppBackground = Color(0xFFFFF8F0)
private val SurfaceWhite = Color(0xFFFFFFFF)
private val Ink = Color(0xFF0B2B1F)
private val TextPrimary = Color(0xFF0B2B1F)
private val TextSecondary = Color(0xFF5A6B63)
private val BorderLight = Color(0xFFEAE5DC)
private val ProgressGreen = Color(0xFF35B96A)

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
    onNavigateToManual: () -> Unit = {},
    onNavigateToHelp: () -> Unit = {},
    selectedSupermarket: String = "",
    budgetGoal: Double = 0.0,
    onSetBudgetGoal: (Double) -> Unit = {}
) {
    val uiState by viewModel.uiState.collectAsState()
    var showGoalDialog by remember { mutableStateOf(false) }
    var checkedIds by remember { mutableStateOf(setOf<Long>()) }

    val displayTotal = uiState.prices.sumOf { it.value }
    val hasGoal = budgetGoal > 0.0
    val remaining = (budgetGoal - displayTotal).coerceAtLeast(0.0)
    val progress = if (hasGoal) (displayTotal / budgetGoal).toFloat().coerceIn(0f, 1f) else 0f
    val animatedProgress by animateFloatAsState(
        targetValue = progress,
        animationSpec = spring(dampingRatio = Spring.DampingRatioMediumBouncy, stiffness = Spring.StiffnessLow),
        label = "BudgetProgress"
    )

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
            Spacer(modifier = Modifier.height(6.dp))

            // Cabeçalho enxuto: marca + mercado selecionado
            HomeTopBar(
                selectedSupermarket = selectedSupermarket,
                onNavigateToSupermarkets = onNavigateToSupermarkets,
                onCheckUpdate = { viewModel.checkForUpdateManually() }
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Orçamento como bloco principal
            BudgetHero(
                total = displayTotal,
                goal = budgetGoal,
                remaining = remaining,
                progress = animatedProgress,
                onEditGoal = { showGoalDialog = true }
            )

            Spacer(modifier = Modifier.height(14.dp))

            // Ação principal
            Row(modifier = Modifier.padding(horizontal = 16.dp)) {
                Row(
                    modifier = Modifier
                        .weight(1f)
                        .height(54.dp)
                        .clip(RoundedCornerShape(27.dp))
                        .background(AccentOrange)
                        .pressBounce(onClick = onNavigateToCamera)
                        .padding(horizontal = 20.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.CameraAlt,
                        contentDescription = null,
                        tint = SurfaceWhite,
                        modifier = Modifier.size(20.dp)
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(
                        text = "Escanear etiqueta",
                        color = SurfaceWhite,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
                Spacer(modifier = Modifier.width(10.dp))
                Box(
                    modifier = Modifier
                        .width(96.dp)
                        .height(54.dp)
                        .clip(RoundedCornerShape(27.dp))
                        .background(SurfaceWhite)
                        .border(1.dp, BorderLight, RoundedCornerShape(27.dp))
                        .pressBounce(onClick = onNavigateToManual),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "+ Manual",
                        color = TextPrimary,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }

            Spacer(modifier = Modifier.height(22.dp))

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
                    text = "${uiState.prices.size} ${if (uiState.prices.size == 1) "item" else "itens"}",
                    style = MaterialTheme.typography.labelSmall.copy(fontSize = 12.sp),
                    color = TextSecondary
                )
            }

            Spacer(modifier = Modifier.height(4.dp))

            if (uiState.prices.isEmpty()) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 20.dp, vertical = 28.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "Sua lista está vazia",
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = TextPrimary
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Toque em Escanear etiqueta e aponte para o preço na prateleira.",
                        style = MaterialTheme.typography.bodySmall.copy(color = TextSecondary, fontSize = 13.sp),
                        textAlign = TextAlign.Center
                    )
                }
            } else {
                uiState.prices.forEachIndexed { index, p ->
                    val checked = checkedIds.contains(p.id)
                    ShoppingItemRow(
                        item = HomeListItem(
                            name = p.label,
                            quantity = 1,
                            unitPrice = PriceExtractor.formatCurrency(p.value),
                            total = PriceExtractor.formatCurrency(p.value),
                            hasOcr = true,
                            checked = checked,
                            category = categoryOf(p.label)
                        ),
                        subtitle = "${p.marketName ?: "sem mercado"} · ${categoryOf(p.label).lowercase()}",
                        onToggleCheck = {
                            checkedIds = if (checked) checkedIds - p.id else checkedIds + p.id
                        }
                    )
                    if (index < uiState.prices.lastIndex) {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(horizontal = 20.dp)
                                .height(1.dp)
                                .background(TextPrimary.copy(alpha = 0.08f))
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(20.dp))

            // Fechamento
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp)
                    .height(54.dp)
                    .clip(RoundedCornerShape(27.dp))
                    .background(if (uiState.prices.isEmpty()) BorderLight else BrandGreen)
                    .clickable(enabled = uiState.prices.isNotEmpty(), onClick = onNavigateToCarrinho)
                    .padding(horizontal = 20.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "Finalizar compra",
                    color = if (uiState.prices.isEmpty()) TextSecondary else SurfaceWhite,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = PriceExtractor.formatCurrency(displayTotal),
                    color = if (uiState.prices.isEmpty()) TextSecondary else SurfaceWhite,
                    fontSize = 15.sp,
                    fontWeight = FontWeight.ExtraBold
                )
            }

            Spacer(modifier = Modifier.height(28.dp))
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
private fun HomeTopBar(
    selectedSupermarket: String,
    onNavigateToSupermarkets: () -> Unit,
    onCheckUpdate: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 20.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier
                .size(40.dp)
                .clip(RoundedCornerShape(12.dp))
                .background(BrandGreen)
                .clickable(onClick = onCheckUpdate),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Check,
                contentDescription = "Verificar atualização",
                tint = SurfaceWhite,
                modifier = Modifier.size(22.dp)
            )
        }
        Spacer(modifier = Modifier.width(10.dp))
        Text(
            text = "fechou o carrinho",
            style = MaterialTheme.typography.titleMedium.copy(
                fontWeight = FontWeight.ExtraBold,
                fontSize = 16.sp,
                letterSpacing = (-0.4).sp
            ),
            color = TextPrimary
        )
        Spacer(modifier = Modifier.weight(1f))
        Row(
            modifier = Modifier
                .clip(RoundedCornerShape(16.dp))
                .background(SurfaceWhite)
                .border(1.dp, BorderLight, RoundedCornerShape(16.dp))
                .clickable(onClick = onNavigateToSupermarkets)
                .padding(horizontal = 12.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = selectedSupermarket.ifBlank { "escolher mercado" },
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
                style = MaterialTheme.typography.labelSmall.copy(fontSize = 11.sp, fontWeight = FontWeight.SemiBold),
                color = TextPrimary,
                modifier = Modifier.widthIn(max = 130.dp)
            )
            Spacer(modifier = Modifier.width(2.dp))
            Icon(
                imageVector = Icons.Default.ArrowDropDown,
                contentDescription = "Trocar mercado",
                tint = TextSecondary,
                modifier = Modifier.size(16.dp)
            )
        }
    }
}

@Composable
private fun BudgetHero(
    total: Double,
    goal: Double,
    remaining: Double,
    progress: Float,
    onEditGoal: () -> Unit
) {
    val hasGoal = goal > 0.0
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp)
            .clip(RoundedCornerShape(26.dp))
            .background(Ink)
            .padding(horizontal = 20.dp, vertical = 20.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = "ORÇAMENTO DA COMPRA",
                modifier = Modifier.alpha(0.6f),
                style = MaterialTheme.typography.labelSmall.copy(
                    fontSize = 9.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.2.sp
                ),
                color = SurfaceWhite
            )
            Text(
                text = if (hasGoal) "editar meta" else "definir meta",
                modifier = Modifier
                    .clickable(onClick = onEditGoal)
                    .alpha(0.75f),
                style = MaterialTheme.typography.labelSmall.copy(fontSize = 10.sp, fontWeight = FontWeight.SemiBold),
                color = SurfaceWhite
            )
        }
        Spacer(modifier = Modifier.height(6.dp))
        Text(
            text = PriceExtractor.formatCurrency(total),
            style = MaterialTheme.typography.displaySmall.copy(
                fontWeight = FontWeight.ExtraBold,
                fontSize = 38.sp,
                letterSpacing = (-1.5).sp
            ),
            color = SurfaceWhite
        )
        Spacer(modifier = Modifier.height(2.dp))
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = if (hasGoal) "de ${PriceExtractor.formatCurrency(goal)}" else "sem meta definida",
                style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp),
                color = SurfaceWhite.copy(alpha = 0.65f)
            )
            if (hasGoal) {
                Text(
                    text = if (remaining > 0) "faltam ${PriceExtractor.formatCurrency(remaining)}" else "meta atingida",
                    style = MaterialTheme.typography.bodySmall.copy(fontSize = 11.sp, fontWeight = FontWeight.SemiBold),
                    color = SurfaceWhite.copy(alpha = 0.85f)
                )
            }
        }
        if (hasGoal) {
            Spacer(modifier = Modifier.height(14.dp))
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(6.dp)
                    .clip(RoundedCornerShape(3.dp))
                    .background(SurfaceWhite.copy(alpha = 0.18f))
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth(progress)
                        .height(6.dp)
                        .clip(RoundedCornerShape(3.dp))
                        .background(ProgressGreen)
                )
            }
        }
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
        title = { Text(text = "meta de orçamento", fontWeight = FontWeight.ExtraBold) },
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

private fun categoryOf(label: String): String {
    val n = label.lowercase()
    return when {
        n.contains("leite") || n.contains("queijo") || n.contains("iogurte") -> "Laticínios"
        n.contains("cafe") || n.contains("café") || n.contains("suco") || n.contains("refrigerante") || n.contains("cerveja") -> "Bebidas"
        n.contains("maca") || n.contains("banana") || n.contains("alface") || n.contains("tomate") -> "Hortifruti"
        n.contains("detergente") || n.contains("sabao") || n.contains("sabão") -> "Limpeza"
        else -> "Mercearia"
    }
}

@Composable
private fun ShoppingItemRow(
    item: HomeListItem,
    subtitle: String,
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

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .alpha(rowAlpha)
            .pressBounce(onClick = onToggleCheck)
            .padding(horizontal = 20.dp, vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier
                .size(24.dp)
                .clip(CircleShape)
                .background(if (item.checked) BrandGreen else Color.Transparent)
                .border(
                    width = if (item.checked) 0.dp else 1.5.dp,
                    color = if (item.checked) BrandGreen else TextPrimary.copy(alpha = 0.25f),
                    shape = CircleShape
                ),
            contentAlignment = Alignment.Center
        ) {
            if (item.checked || checkScale > 0.05f) {
                Icon(
                    imageVector = Icons.Default.Check,
                    contentDescription = null,
                    tint = SurfaceWhite,
                    modifier = Modifier.size(14.dp).scale(checkScale)
                )
            }
        }

        Spacer(modifier = Modifier.width(10.dp))

        Box(
            modifier = Modifier
                .size(44.dp)
                .clip(RoundedCornerShape(12.dp))
                .background(BrandGreen.copy(alpha = 0.07f)),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = getCategoryVector(item.name, item.category),
                contentDescription = null,
                tint = BrandGreen,
                modifier = Modifier.size(22.dp)
            )
        }

        Spacer(modifier = Modifier.width(12.dp))

        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = item.name,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
                style = MaterialTheme.typography.bodyMedium.copy(
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold
                ),
                color = TextPrimary
            )
            Text(
                text = subtitle,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
                style = MaterialTheme.typography.labelSmall.copy(fontSize = 11.sp),
                color = TextSecondary
            )
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
            BottomNavItem(icon = Icons.Default.Home, label = "Início", active = true, onClick = {})
            BottomNavItem(icon = Icons.Default.List, label = "Listas", active = false, onClick = onNavigateToList)
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
