package com.fechouocarrinho.app.presentation.camera

import android.graphics.Bitmap
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.fechouocarrinho.app.domain.model.Price
import com.fechouocarrinho.app.domain.usecase.ExtractPricesUseCase
import com.fechouocarrinho.app.domain.usecase.SavePriceUseCase
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class CameraViewModel(
    private val extractPricesUseCase: ExtractPricesUseCase,
    private val savePriceUseCase: SavePriceUseCase
) : ViewModel() {

    private val _uiState = MutableStateFlow<CameraUiState>(CameraUiState.Preview)
    val uiState: StateFlow<CameraUiState> = _uiState.asStateFlow()

    fun onPhotoCaptured(bitmap: Bitmap) {
        _uiState.value = CameraUiState.Processing
        viewModelScope.launch {
            extractPricesUseCase(bitmap)
                .onSuccess { prices ->
                    _uiState.value = if (prices.isEmpty()) {
                        CameraUiState.Error("Não encontramos o preço na etiqueta. Tente posicionar a etiqueta no centro do quadro com boa iluminação.")
                    } else {
                        CameraUiState.Success(prices)
                    }
                }
                .onFailure { error ->
                    _uiState.value = CameraUiState.Error(error.message ?: "Erro ao processar imagem")
                }
        }
    }

    fun confirmPrice(price: Price, quantity: Int = 1, onSaved: () -> Unit = {}) {
        viewModelScope.launch {
            repeat(quantity.coerceAtLeast(1)) {
                savePriceUseCase(price)
            }
            onSaved()
        }
    }

    fun retry() {
        _uiState.value = CameraUiState.Preview
    }

    fun saveManual(price: Price) {
        viewModelScope.launch {
            savePriceUseCase(price)
        }
    }
}
