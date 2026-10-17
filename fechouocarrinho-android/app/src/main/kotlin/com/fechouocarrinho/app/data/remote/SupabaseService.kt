package com.fechouocarrinho.app.data.remote

import com.fechouocarrinho.app.BuildConfig
import com.fechouocarrinho.app.data.remote.dto.PriceDto
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.logging.HttpLoggingInterceptor
import java.io.IOException
import java.util.concurrent.TimeUnit

class SupabaseService private constructor(
    private val httpClient: OkHttpClient,
    private val json: Json
) : SupabaseApi {

    override suspend fun postPrices(prices: List<PriceDto>): Result<Unit> {
        if (prices.isEmpty()) return Result.success(Unit)

        val body = json.encodeToString(prices)
            .toRequestBody("application/json".toMediaType())

        val request = Request.Builder()
            .url("${BuildConfig.SUPABASE_URL}/prices")
            .post(body)
            .header("apikey", BuildConfig.SUPABASE_KEY)
            .header("Authorization", "Bearer ${BuildConfig.SUPABASE_KEY}")
            .header("Content-Type", "application/json")
            .header("Accept", "application/json")
            .header("Accept-Profile", BuildConfig.SUPABASE_PROFILE)
            .build()

        return try {
            httpClient.newCall(request).execute().use { response ->
                if (response.isSuccessful) {
                    Result.success(Unit)
                } else {
                    Result.failure(
                        IOException("Supabase POST /prices falhou: ${response.code} ${response.message}")
                    )
                }
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    companion object {
        fun create(): SupabaseApi {
            val logging = HttpLoggingInterceptor().apply {
                level = if (BuildConfig.DEBUG) {
                    HttpLoggingInterceptor.Level.BASIC
                } else {
                    HttpLoggingInterceptor.Level.NONE
                }
            }
            val client = OkHttpClient.Builder()
                .connectTimeout(15, TimeUnit.SECONDS)
                .readTimeout(20, TimeUnit.SECONDS)
                .writeTimeout(20, TimeUnit.SECONDS)
                .addInterceptor(logging)
                .build()

            return SupabaseService(
                httpClient = client,
                json = Json { ignoreUnknownKeys = true }
            )
        }
    }
}
