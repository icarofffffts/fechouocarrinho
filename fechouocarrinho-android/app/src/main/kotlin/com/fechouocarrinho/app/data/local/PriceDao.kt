package com.fechouocarrinho.app.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

@Dao
interface PriceDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(price: PriceEntity): Long

    @Update
    suspend fun update(price: PriceEntity)

    @Query("SELECT * FROM prices WHERE listId = :listId ORDER BY createdAt DESC")
    fun observeAll(listId: Long): Flow<List<PriceEntity>>

    @Query("SELECT * FROM prices WHERE id = :id LIMIT 1")
    suspend fun findById(id: Long): PriceEntity?

    @Query("SELECT * FROM prices WHERE syncStatus = :status AND listId = :listId ORDER BY createdAt ASC")
    suspend fun getByStatus(status: SyncStatus, listId: Long): List<PriceEntity>

    @Query("SELECT COUNT(*) FROM prices WHERE syncStatus = :status AND listId = :listId")
    suspend fun countByStatus(status: SyncStatus, listId: Long): Int

    @Query("SELECT COALESCE(SUM(value * qty), 0) FROM prices WHERE listId = :listId AND planned = 0")
    suspend fun totalValue(listId: Long): Double

    @Query("DELETE FROM prices WHERE id = :id")
    suspend fun deleteById(id: Long)
}
