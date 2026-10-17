package com.fechouocarrinho.app.presentation.camera

import com.fechouocarrinho.app.domain.model.Price

sealed class CameraUiState {
    data object Preview : CameraUiState()
    data object Processing : CameraUiState()
    data class Success(val prices: List<Price>) : CameraUiState()
    data class Error(val message: String) : CameraUiState()
}
