package com.fechouocarrinho.app.presentation.list

import com.fechouocarrinho.app.domain.model.Price

sealed class PriceListUiState {
    data object Loading : PriceListUiState()
    data class Content(
        val prices: List<Price>,
        val pendingCount: Int,
        val isSyncing: Boolean,
        val message: String? = null
    ) : PriceListUiState()
    data class Empty(val pendingCount: Int = 0) : PriceListUiState()
}
