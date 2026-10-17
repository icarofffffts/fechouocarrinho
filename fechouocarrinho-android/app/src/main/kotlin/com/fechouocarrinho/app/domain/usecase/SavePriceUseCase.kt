package com.fechouocarrinho.app.domain.usecase

import com.fechouocarrinho.app.FechouOCarrinhoApplication
import com.fechouocarrinho.app.domain.model.Price
import com.fechouocarrinho.app.domain.repository.PriceRepository
import kotlinx.coroutines.withContext

class SavePriceUseCase(
    private val repository: PriceRepository
) {
    suspend operator fun invoke(price: Price): Result<Long> = withContext(FechouOCarrinhoApplication.ioDispatcher) {
        try {
            Result.success(repository.save(price))
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
