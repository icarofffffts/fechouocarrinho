package com.fechouocarrinho.app.domain.repository

import com.fechouocarrinho.app.data.repository.SyncResult
import com.fechouocarrinho.app.domain.model.Price
import kotlinx.coroutines.flow.Flow

interface PriceRepository {
    val prices: Flow<List<Price>>
    suspend fun save(price: Price): Long
    suspend fun syncPending(): SyncResult
    suspend fun pendingCount(): Int
}
