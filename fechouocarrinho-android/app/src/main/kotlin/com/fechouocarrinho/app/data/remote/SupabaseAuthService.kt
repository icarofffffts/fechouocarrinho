package com.fechouocarrinho.app.data.remote

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import java.util.concurrent.TimeUnit

@Serializable
private data class SignupRequest(val email: String, val password: String)
@Serializable
private data class LoginRequest(val email: String, val password: String)
@Serializable
data class AuthResponse(val access_token: String = "", val refresh_token: String = "", val user: AuthUser? = null)
@Serializable
data class AuthUser(val id: String, val email: String)

class SupabaseAuthService(
    private val supabaseUrl: String = "https://supabase.arxdevs.xyz",
    private val anonKey: String = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc4MzgxNzgyLCJleHAiOjIwOTM3NDE3ODJ9.K4fBz3HC_CoeNdUwWCvIsdo4I8Z5OmJJcSB5Pzx6Dfw",
    private val client: OkHttpClient = OkHttpClient.Builder().connectTimeout(5, TimeUnit.SECONDS).readTimeout(10, TimeUnit.SECONDS).build(),
    private val json: Json = Json { ignoreUnknownKeys = true }
) {
    suspend fun signUp(email: String, password: String): Result<AuthResponse> = withContext(Dispatchers.IO) {
        try {
            val body = json.encodeToString(SignupRequest.serializer(), SignupRequest(email, password)).toRequestBody("application/json".toMediaType())
            val req = Request.Builder().url("$supabaseUrl/auth/v1/signup").header("apikey", anonKey).header("Content-Type", "application/json").post(body).build()
            client.newCall(req).execute().use { res ->
                val txt = res.body?.string() ?: ""
                if (!res.isSuccessful) return@withContext Result.failure(Exception("signup ${res.code}: $txt"))
                Result.success(json.decodeFromString(AuthResponse.serializer(), txt))
            }
        } catch (e: Exception) { Result.failure(e) }
    }
    suspend fun signIn(email: String, password: String): Result<AuthResponse> = withContext(Dispatchers.IO) {
        try {
            val body = json.encodeToString(LoginRequest.serializer(), LoginRequest(email, password)).toRequestBody("application/json".toMediaType())
            val req = Request.Builder().url("$supabaseUrl/auth/v1/token?grant_type=password").header("apikey", anonKey).header("Content-Type", "application/json").post(body).build()
            client.newCall(req).execute().use { res ->
                val txt = res.body?.string() ?: ""
                if (!res.isSuccessful) return@withContext Result.failure(Exception("login ${res.code}: $txt"))
                Result.success(json.decodeFromString(AuthResponse.serializer(), txt))
            }
        } catch (e: Exception) { Result.failure(e) }
    }
}
