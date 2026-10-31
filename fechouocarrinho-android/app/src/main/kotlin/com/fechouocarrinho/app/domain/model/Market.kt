package com.fechouocarrinho.app.domain.model

data class Market(
    val id: String,
    val slug: String,
    val name: String,
    val city: String?,
    val state: String?,
    val logoUrl: String? = null,
    val isVerified: Boolean = false
) {
    val locationLabel: String
        get() = listOfNotNull(city?.takeIf { it.isNotBlank() }, state?.takeIf { it.isNotBlank() })
            .joinToString(" · ")
            .ifBlank { "Localização não informada" }
}
