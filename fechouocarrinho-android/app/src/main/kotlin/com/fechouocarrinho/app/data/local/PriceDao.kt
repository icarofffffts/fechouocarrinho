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

    @Query("SELECT * FROM prices ORDER BY createdAt DESC")
    fun observeAll(): Flow<List<PriceEntity>>

    @Query("SELECT * FROM prices WHERE syncStatus = :status ORDER BY createdAt ASC")
    suspend fun getByStatus(status: SyncStatus): List<PriceEntity>

    @Query("SELECT COUNT(*) FROM prices WHERE syncStatus = :status")
    suspend fun countByStatus(status: SyncStatus): Int

    @Query("DELETE FROM prices WHERE id = :id")
    suspend fun deleteById(id: Long)
}
