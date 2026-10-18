package com.fechouocarrinho.app.data.repository

import com.fechouocarrinho.app.data.local.PriceDao
import com.fechouocarrinho.app.data.local.PriceEntity
import com.fechouocarrinho.app.data.local.SyncStatus
import com.fechouocarrinho.app.data.remote.SupabaseApi
import com.fechouocarrinho.app.data.remote.dto.PriceDto
import com.fechouocarrinho.app.domain.model.Price
import com.fechouocarrinho.app.domain.repository.PriceRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone

class PriceRepositoryImpl(
    private val priceDao: PriceDao,
    private val supabaseApi: SupabaseApi
) : PriceRepository {

    override val prices: Flow<List<Price>> = priceDao.observeAll().map { list ->
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
            syncStatus = SyncStatus.PENDING
        )
        return priceDao.insert(entity)
    }

    override suspend fun syncPending(): SyncResult {
        val pending = priceDao.getByStatus(SyncStatus.PENDING)
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

    override suspend fun pendingCount(): Int = priceDao.countByStatus(SyncStatus.PENDING)
}
