package com.fechouocarrinho.app.data.remote

import com.fechouocarrinho.app.data.remote.dto.UpdateInfoDto
import kotlinx.serialization.json.Json
import okhttp3.OkHttpClient
import okhttp3.Request
import java.util.concurrent.TimeUnit
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class UpdateService(
    private val client: OkHttpClient = OkHttpClient.Builder()
        .connectTimeout(5, TimeUnit.SECONDS)
        .readTimeout(5, TimeUnit.SECONDS)
        .build(),
    private val json: Json = Json { ignoreUnknownKeys = true }
) {
    suspend fun checkForUpdate(url: String = "https://fechouocarrinho.site/version.json"): UpdateInfoDto? = withContext(Dispatchers.IO) {
        try {
            val request = Request.Builder().url(url).get().build()
            client.newCall(request).execute().use { response ->
                if (!response.isSuccessful) return@withContext null
                val body = response.body?.string() ?: return@withContext null
                json.decodeFromString<UpdateInfoDto>(body)
            }
        } catch (e: Exception) {
            null
        }
    }

    companion object {
        fun create(): UpdateService = UpdateService()
    }
}
