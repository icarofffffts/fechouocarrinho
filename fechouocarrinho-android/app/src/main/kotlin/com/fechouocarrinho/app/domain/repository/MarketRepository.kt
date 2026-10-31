package com.fechouocarrinho.app.domain.repository

import com.fechouocarrinho.app.domain.model.Market
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.StateFlow

interface MarketRepository {
    /** Redes reais vindas do Supabase (cache local em Room). */
    val markets: Flow<List<Market>>

    /** Mercado selecionado pelo usuário, persistido entre execuções. */
    val selectedMarketId: StateFlow<String>
    val selectedMarketName: StateFlow<String>

    /** Busca a lista atualizada no Supabase. */
    suspend fun refresh(): Result<Int>

    /** Seleciona o mercado, persistindo a escolha. */
    suspend fun select(market: Market)

    /** Quantidade de mercados em cache (para saber se já sincronizou). */
    suspend fun cachedCount(): Int
}
