package com.fechouocarrinho.app.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "supermarkets")
data class SupermarketEntity(
    @PrimaryKey val id: String,
    val slug: String,
    val name: String,
    val city: String? = null,
    val state: String? = null,
    val logoUrl: String? = null,
    val isVerified: Boolean = false,
    val updatedAt: Long = System.currentTimeMillis()
)
