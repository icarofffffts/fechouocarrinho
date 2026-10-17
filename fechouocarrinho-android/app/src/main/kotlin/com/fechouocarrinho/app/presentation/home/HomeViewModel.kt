package com.fechouocarrinho.app.presentation.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.fechouocarrinho.app.domain.repository.PriceRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch

class HomeViewModel(
    private val repository: PriceRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(HomeUiState())
    val uiState: StateFlow<HomeUiState> = _uiState.asStateFlow()

    init {
        observePrices()
    }

    private fun observePrices() {
        viewModelScope.launch {
            repository.prices.collectLatest { prices ->
                val total = prices.sumOf { it.value }
                val pending = repository.pendingCount()
                _uiState.value = _uiState.value.copy(
                    prices = prices,
                    total = total,
                    pendingCount = pending
                )
            }
        }
    }

    fun selectStore(slug: String) {
        _uiState.value = _uiState.value.copy(selectedStoreSlug = slug)
    }

    fun selectState(state: String) {
        _uiState.value = _uiState.value.copy(selectedState = state)
    }
}
