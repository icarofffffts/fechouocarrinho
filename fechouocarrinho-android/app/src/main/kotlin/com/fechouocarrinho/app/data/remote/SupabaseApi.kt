package com.fechouocarrinho.app.data.remote

import com.fechouocarrinho.app.data.remote.dto.PriceDto

interface SupabaseApi {
    /**
     * Envia uma lista de preços para o Supabase.
     * @return true se a resposta for 2xx
     */
    suspend fun postPrices(prices: List<PriceDto>): Result<Unit>
}
