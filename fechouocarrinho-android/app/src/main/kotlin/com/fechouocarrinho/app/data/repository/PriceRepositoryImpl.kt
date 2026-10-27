package com.fechouocarrinho.app.data.repository

import com.fechouocarrinho.app.data.local.PriceDao
import com.fechouocarrinho.app.data.local.PriceEntity
import com.fechouocarrinho.app.data.local.SyncStatus
import com.fechouocarrinho.app.data.local.ShoppingListDao
import com.fechouocarrinho.app.data.local.ShoppingListEntity
import com.fechouocarrinho.app.data.remote.SupabaseApi
import com.fechouocarrinho.app.data.remote.dto.PriceDto
import com.fechouocarrinho.app.domain.model.Price
import com.fechouocarrinho.app.domain.model.ShoppingList
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.asStateFlow
import com.fechouocarrinho.app.domain.repository.PriceRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone

class PriceRepositoryImpl(
    private val priceDao: PriceDao,
    private val supabaseApi: SupabaseApi,
    private val shoppingListDao: ShoppingListDao
) : PriceRepository {
    private val _activeListId = MutableStateFlow(1L)
    override val activeListId = _activeListId.asStateFlow()
    override val lists: Flow<List<ShoppingList>> = shoppingListDao.observeAll().map { rows ->
        rows.map { ShoppingList(it.id, it.name, it.createdAt, it.archived) }
    }

    override val prices: Flow<List<Price>> = _activeListId.flatMapLatest { listId -> priceDao.observeAll(listId) }.map { list ->
        list.map { entity ->
            Price(
                id = entity.id,
                label = entity.label,
                value = entity.value,
                rawText = entity.rawText,
                
                createdAt = entity.createdAt,
                syncStatus = entity.syncStatus.name
            )
        }
    }

    override suspend fun save(price: Price): Long {
        val entity = PriceEntity(
            id = price.id,
            label = price.label,
            value = price.value,
            rawText = price.rawText,
            createdAt = price.createdAt,
            syncStatus = SyncStatus.PENDING,
            listId = _activeListId.value
        )
        return priceDao.insert(entity)
    }

    override suspend fun syncPending(): SyncResult {
        val pending = priceDao.getByStatus(SyncStatus.PENDING, _activeListId.value)
        if (pending.isEmpty()) return SyncResult.NothingToSync

        val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US).apply {
            timeZone = TimeZone.getTimeZone("UTC")
        }
        val dtos = pending.map { entity ->
            PriceDto(
                price = entity.value,
                productName = entity.label,
                state = "MG",
                source = "manual"
            )
        }

        return supabaseApi.postPrices(dtos).fold(
            onSuccess = {
                val now = System.currentTimeMillis()
                pending.forEach { entity ->
                    priceDao.update(
                        entity.copy(
                            syncStatus = SyncStatus.SYNCED,
                            syncedAt = now
                        )
                    )
                }
                SyncResult.Success(pending.size)
            },
            onFailure = { error ->
                pending.forEach { entity ->
                    priceDao.update(entity.copy(syncStatus = SyncStatus.ERROR))
                }
                SyncResult.Error(error.message ?: "Erro desconhecido")
            }
        )
    }

    override suspend fun pendingCount(): Int = priceDao.countByStatus(SyncStatus.PENDING, _activeListId.value)
    override suspend fun delete(id: Long) = priceDao.deleteById(id)

    override suspend fun createList(name: String): Long {
        val id = shoppingListDao.insert(ShoppingListEntity(name = name.trim()))
        _activeListId.value = id
        return id
    }

    override suspend fun selectList(id: Long) { _activeListId.value = id }

    override suspend fun ensureDefaultList() {
        if (shoppingListDao.count() == 0) shoppingListDao.insert(ShoppingListEntity(id = 1L, name = "Minha lista"))
    }
}
