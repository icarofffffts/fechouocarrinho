package com.fechouocarrinho.app.data.repository

import com.fechouocarrinho.app.data.local.SettingsStore
import com.fechouocarrinho.app.data.local.SupermarketDao
import com.fechouocarrinho.app.data.local.SupermarketEntity
import com.fechouocarrinho.app.data.remote.SupabaseApi
import com.fechouocarrinho.app.domain.model.Market
import com.fechouocarrinho.app.domain.repository.MarketRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class MarketRepositoryImpl(
    private val dao: SupermarketDao,
    private val supabaseApi: SupabaseApi,
    private val settings: SettingsStore
) : MarketRepository {

    override val markets: Flow<List<Market>> = dao.observeAll().map { rows ->
        rows.map { it.toDomain() }
    }

    override val selectedMarketId = settings.marketId
    override val selectedMarketName = settings.marketName

    override suspend fun refresh(): Result<Int> =
        supabaseApi.getSupermarkets().map { dtos ->
            val entities = dtos.map { dto ->
                SupermarketEntity(
                    id = dto.id,
                    slug = dto.slug,
                    name = dto.name,
                    city = dto.city,
                    state = dto.state,
                    logoUrl = dto.logoUrl,
                    isVerified = dto.isVerified
                )
            }
            dao.replaceAll(entities)

            // Se o mercado salvo não existe mais na base, some com a seleção.
            val currentId = settings.marketId.value
            if (currentId.isNotBlank()) {
                val stillExists = entities.firstOrNull { it.id == currentId }
                if (stillExists == null) settings.clearMarket()
                else if (stillExists.name != settings.marketName.value) {
                    settings.setMarket(stillExists.id, stillExists.name)
                }
            }
            entities.size
        }

    override suspend fun select(market: Market) {
        settings.setMarket(market.id, market.name)
    }

    override suspend fun cachedCount(): Int = dao.count()

    private fun SupermarketEntity.toDomain() = Market(
        id = id,
        slug = slug,
        name = name,
        city = city,
        state = state,
        logoUrl = logoUrl,
        isVerified = isVerified
    )
}
