package com.fechouocarrinho.app.domain.model

data class ShoppingList(
    val id: Long,
    val name: String,
    val createdAt: Long,
    val archived: Boolean = false
)
