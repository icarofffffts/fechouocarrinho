package com.fechouocarrinho.app.data.remote.dto

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class SupermarketDto(
    @SerialName("id") val id: String,
    @SerialName("slug") val slug: String = "",
    @SerialName("name") val name: String,
    @SerialName("city") val city: String? = null,
    @SerialName("state") val state: String? = null,
    @SerialName("logo_url") val logoUrl: String? = null,
    @SerialName("is_verified") val isVerified: Boolean = false
)
