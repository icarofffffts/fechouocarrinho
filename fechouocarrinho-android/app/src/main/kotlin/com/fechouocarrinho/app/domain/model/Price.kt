package com.fechouocarrinho.app.domain.model

data class Price(
    val id: Long = 0,
    val label: String,
    val value: Double,
    val rawText: String,
    val createdAt: Long = System.currentTimeMillis(),
    val syncStatus: String,
    val marketId: String? = null,
    val marketName: String? = null,
    val qty: Int = 1,
    val planned: Boolean = false
) {
    val subtotal: Double get() = value * qty.coerceAtLeast(1)
}
