package com.fechouocarrinho.app.presentation.list

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.fechouocarrinho.app.data.repository.SyncResult
import com.fechouocarrinho.app.domain.repository.PriceRepository
import com.fechouocarrinho.app.domain.usecase.SyncPricesUseCase
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

class PriceListViewModel(
    private val repository: PriceRepository,
    private val syncPricesUseCase: SyncPricesUseCase
) : ViewModel() {

    private val _uiState = MutableStateFlow<PriceListUiState>(PriceListUiState.Loading)
    val uiState: StateFlow<PriceListUiState> = _uiState.asStateFlow()

    init {
        observePrices()
    }

    private fun observePrices() {
        viewModelScope.launch {
            repository.prices.collectLatest { prices ->
                val pending = repository.pendingCount()
                if (prices.isEmpty()) {
                    _uiState.value = PriceListUiState.Empty(pending)
                } else {
                    _uiState.value = PriceListUiState.Content(
                        prices = prices,
                        pendingCount = pending,
                        isSyncing = false
                    )
                }
            }
        }
    }

    fun sync() {
        val current = _uiState.value as? PriceListUiState.Content ?: return
        _uiState.update { current.copy(isSyncing = true, message = null) }

        viewModelScope.launch {
            val result = syncPricesUseCase()
            val message = when (result) {
                is SyncResult.NothingToSync -> "Nada para sincronizar"
                is SyncResult.Success -> "${result.syncedCount} preço(s) sincronizado(s)"
                is SyncResult.Error -> "Falha: ${result.message}"
            }
            _uiState.update { current.copy(isSyncing = false, message = message) }
        }
    }

    fun delete(id: Long) {
        viewModelScope.launch { repository.delete(id) }
    }
}
