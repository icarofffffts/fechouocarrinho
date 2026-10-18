package com.fechouocarrinho.app.presentation.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.fechouocarrinho.app.data.remote.UpdateService
import com.fechouocarrinho.app.data.remote.dto.UpdateInfoDto
import com.fechouocarrinho.app.domain.repository.PriceRepository
import com.fechouocarrinho.app.domain.usecase.CheckUpdateUseCase
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch

class HomeViewModel(
    private val repository: PriceRepository,
    private val checkUpdateUseCase: CheckUpdateUseCase = CheckUpdateUseCase(UpdateService.create())
) : ViewModel() {

    private val _uiState = MutableStateFlow(HomeUiState())
    val uiState: StateFlow<HomeUiState> = _uiState.asStateFlow()

    private val _updateInfo = MutableStateFlow<UpdateInfoDto?>(null)
    val updateInfo: StateFlow<UpdateInfoDto?> = _updateInfo.asStateFlow()

    private val _isForceUpdate = MutableStateFlow(false)
    val isForceUpdate: StateFlow<Boolean> = _isForceUpdate.asStateFlow()

    init {
        observePrices()
        checkForUpdate()
    }

    private fun checkForUpdate() {
        viewModelScope.launch {
            try {
                val result = checkUpdateUseCase()
                if (result.shouldUpdate) {
                    _updateInfo.value = result.info
                    _isForceUpdate.value = result.isForce
                }
            } catch (_: Exception) {
                // offline - ignora
            }
        }
    }

    fun checkForUpdateManually() {
        checkForUpdate()
    }

    fun dismissUpdate() {
        _updateInfo.value = null
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
