package com.fechouocarrinho.app.data.remote

import com.fechouocarrinho.app.data.remote.dto.PriceDto
import com.fechouocarrinho.app.data.remote.dto.SupermarketDto

interface SupabaseApi {
    /**
     * Envia uma lista de preços para o Supabase.
     * @return true se a resposta for 2xx
     */
    suspend fun postPrices(prices: List<PriceDto>): Result<Unit>

    /**
     * Busca as redes de supermercado reais cadastradas no Supabase.
     */
    suspend fun getSupermarkets(): Result<List<SupermarketDto>>
}
