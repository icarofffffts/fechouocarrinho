package com.fechouocarrinho.app.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Transaction
import kotlinx.coroutines.flow.Flow

@Dao
interface SupermarketDao {

    @Query("SELECT * FROM supermarkets ORDER BY name ASC")
    fun observeAll(): Flow<List<SupermarketEntity>>

    @Query("SELECT * FROM supermarkets WHERE id = :id LIMIT 1")
    suspend fun findById(id: String): SupermarketEntity?

    @Query("SELECT COUNT(*) FROM supermarkets")
    suspend fun count(): Int

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(items: List<SupermarketEntity>)

    @Query("DELETE FROM supermarkets")
    suspend fun clear()

    @Transaction
    suspend fun replaceAll(items: List<SupermarketEntity>) {
        clear()
        insertAll(items)
    }
}
