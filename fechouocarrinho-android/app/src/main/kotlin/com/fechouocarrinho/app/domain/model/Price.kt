package com.fechouocarrinho.app.domain.model

data class Price(
    val id: Long = 0,
    val label: String,
    val value: Double,
    val rawText: String,
    val createdAt: Long = System.currentTimeMillis(),
    val syncStatus: String
)
