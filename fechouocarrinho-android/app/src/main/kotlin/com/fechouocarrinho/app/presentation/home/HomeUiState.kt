package com.fechouocarrinho.app.presentation.home

import com.fechouocarrinho.app.domain.model.Price

data class HomeUiState(
    val prices: List<Price> = emptyList(),
    val total: Double = 0.0,
    val pendingCount: Int = 0
)
