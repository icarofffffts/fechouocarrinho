package com.fechouocarrinho.app.presentation.home

import com.fechouocarrinho.app.domain.model.Price

data class HomeUiState(
    val prices: List<Price> = emptyList(),
    val total: Double = 0.0,
    val pendingCount: Int = 0,
    val selectedStoreSlug: String? = null,
    val selectedState: String = "MG"
)

data class Store(
    val slug: String,
    val initials: String,
    val name: String,
    val location: String,
    val colorHex: String
)

val defaultStores = listOf(
    Store("epa", "EPA", "EPA Supermercados", "Várias cidades • MG", "#F9C74F"),
    Store("mart-minas", "MM", "Mart Minas", "Várias cidades • MG", "#E63946"),
    Store("bh", "BH", "Supermercados BH", "Várias cidades • MG", "#2554A3"),
    Store("supernosso", "SN", "Supernosso", "Várias cidades • MG", "#F58220"),
    Store("verdemar", "VM", "Verdemar", "Várias cidades • MG", "#2A9D5B"),
    Store("carrefour", "CA", "Carrefour", "MG • SP • RJ", "#1F4AA8"),
    Store("assai", "AM", "Assaí Atacadista", "Várias cidades • MG", "#FF8A00")
)
