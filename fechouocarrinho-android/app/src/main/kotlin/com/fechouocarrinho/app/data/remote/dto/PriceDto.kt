package com.fechouocarrinho.app.data.remote.dto

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class PriceDto(
    @SerialName("label")
    val label: String,
    @SerialName("value")
    val value: Double,
    @SerialName("raw_text")
    val rawText: String,
    @SerialName("captured_at")
    val capturedAt: String
)
