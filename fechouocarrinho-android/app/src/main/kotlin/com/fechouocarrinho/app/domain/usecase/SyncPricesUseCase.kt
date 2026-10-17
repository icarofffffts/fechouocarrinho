package com.fechouocarrinho.app.domain.usecase

import com.fechouocarrinho.app.FechouOCarrinhoApplication
import com.fechouocarrinho.app.data.repository.SyncResult
import com.fechouocarrinho.app.domain.repository.PriceRepository
import kotlinx.coroutines.withContext

class SyncPricesUseCase(
    private val repository: PriceRepository
) {
    suspend operator fun invoke(): SyncResult = withContext(FechouOCarrinhoApplication.ioDispatcher) {
        repository.syncPending()
    }
}
