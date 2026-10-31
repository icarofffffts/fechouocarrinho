package com.fechouocarrinho.app.domain.repository

import com.fechouocarrinho.app.data.repository.SyncResult
import com.fechouocarrinho.app.domain.model.ListSummary
import com.fechouocarrinho.app.domain.model.Price
import com.fechouocarrinho.app.domain.model.ShoppingList
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.StateFlow

interface PriceRepository {
    val prices: Flow<List<Price>>
    val lists: Flow<List<ShoppingList>>
    val summaries: Flow<List<ListSummary>>
    val activeListId: StateFlow<Long>

    suspend fun save(price: Price): Long
    suspend fun setPrice(id: Long, value: Double)
    suspend fun delete(id: Long)
    suspend fun syncPending(): SyncResult
    suspend fun pendingCount(): Int

    suspend fun createList(name: String): Long
    suspend fun renameList(id: Long, name: String)
    suspend fun deleteList(id: Long)
    suspend fun clearList(id: Long)
    suspend fun selectList(id: Long)
    suspend fun ensureDefaultList()
}
