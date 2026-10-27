package com.fechouocarrinho.app.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface ShoppingListDao {
    @Insert
    suspend fun insert(list: ShoppingListEntity): Long

    @Query("SELECT * FROM shopping_lists WHERE archived = 0 ORDER BY createdAt DESC")
    fun observeAll(): Flow<List<ShoppingListEntity>>

    @Query("UPDATE shopping_lists SET archived = 1 WHERE id = :id")
    suspend fun archive(id: Long)

    @Query("SELECT COUNT(*) FROM shopping_lists")
    suspend fun count(): Int
}
