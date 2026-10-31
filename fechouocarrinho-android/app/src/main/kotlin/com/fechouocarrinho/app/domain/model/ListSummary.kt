package com.fechouocarrinho.app.domain.model

data class ListSummary(
    val id: Long,
    val name: String,
    val itemCount: Int,
    val plannedCount: Int,
    val total: Double
)
