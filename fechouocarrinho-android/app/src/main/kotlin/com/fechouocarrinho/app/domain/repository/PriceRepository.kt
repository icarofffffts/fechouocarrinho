package com.fechouocarrinho.app.domain.repository

import com.fechouocarrinho.app.data.repository.SyncResult
import com.fechouocarrinho.app.domain.model.Price
import com.fechouocarrinho.app.domain.model.ShoppingList
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.StateFlow

interface PriceRepository {
    val prices: Flow<List<Price>>
    val lists: Flow<List<ShoppingList>>
    val activeListId: StateFlow<Long>
    suspend fun save(price: Price): Long
    suspend fun syncPending(): SyncResult
    suspend fun pendingCount(): Int
    suspend fun delete(id: Long)
    suspend fun createList(name: String): Long
    suspend fun selectList(id: Long)
    suspend fun ensureDefaultList()
}
