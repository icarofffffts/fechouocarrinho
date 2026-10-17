package com.fechouocarrinho.app.data.local

import androidx.room.Entity
import androidx.room.Index
import androidx.room.PrimaryKey

@Entity(
    tableName = "prices",
    indices = [Index(value = ["syncStatus"])]
)
data class PriceEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val label: String,
    val value: Double,
    val rawText: String,
    val createdAt: Long = System.currentTimeMillis(),
    val syncStatus: SyncStatus = SyncStatus.PENDING,
    val syncedAt: Long? = null
)
