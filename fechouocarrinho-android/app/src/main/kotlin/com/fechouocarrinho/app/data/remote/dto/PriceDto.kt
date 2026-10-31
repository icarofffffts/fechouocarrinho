package com.fechouocarrinho.app.data.remote.dto

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class PriceDto(
    @SerialName("price")
    val price: Double,
    @SerialName("product_name")
    val productName: String? = null,
    @SerialName("ean")
    val ean: String? = null,
    @SerialName("state")
    val state: String? = null,
    @SerialName("city")
    val city: String? = null,
    @SerialName("supermarket_id")
    val supermarketId: String? = null,
    @SerialName("source")
    val source: String = "manual",
    @SerialName("scan_image_hash")
    val scanImageHash: String? = null
)
