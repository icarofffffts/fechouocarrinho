package com.fechouocarrinho.app.presentation.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.unit.dp

/**
 * Design Engineering Utilities (emilkowalski / taste-skill)
 * Microinteractions, physics-based springs, and tactile feedback for Jetpack Compose.
 */

// Continuous Squircle-style shapes (Apple HIG & Anti-slop)
val SquircleSmall: Shape = RoundedCornerShape(12.dp)
val SquircleMedium: Shape = RoundedCornerShape(18.dp)
val SquircleLarge: Shape = RoundedCornerShape(24.dp)
val SquircleExtraLarge: Shape = RoundedCornerShape(32.dp)

/**
 * Adds a natural physical bounce / press compression (scale 0.96f) with a spring curve.
 * Based on Emil Kowalski's rule: "Buttons must feel responsive to press; unseen details compound".
 */
@Composable
fun Modifier.pressBounce(
    scaleDown: Float = 0.96f,
    onClick: (() -> Unit)? = null
): Modifier {
    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()

    val scale by animateFloatAsState(
        targetValue = if (isPressed) scaleDown else 1f,
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy,
            stiffness = Spring.StiffnessLow
        ),
        label = "PressBounceScale"
    )

    return this
        .scale(scale)
        .then(
            if (onClick != null) {
                Modifier.clickable(
                    interactionSource = interactionSource,
                    indication = null,
                    onClick = onClick
                )
            } else {
                Modifier
            }
        )
}

/**
 * Tactile spring card with subtle border and continuous squircle corners.
 */
@Composable
fun SpringCard(
    modifier: Modifier = Modifier,
    shape: Shape = SquircleMedium,
    containerColor: Color = Color.White,
    onClick: (() -> Unit)? = null,
    content: @Composable () -> Unit
) {
    Card(
        modifier = modifier.then(
            if (onClick != null) Modifier.pressBounce(onClick = onClick) else Modifier
        ),
        shape = shape,
        colors = CardDefaults.cardColors(containerColor = containerColor),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.5.dp)
    ) {
        content()
    }
}
