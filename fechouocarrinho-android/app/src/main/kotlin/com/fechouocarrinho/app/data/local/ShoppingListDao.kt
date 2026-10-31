package com.fechouocarrinho.app.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

data class ListSummaryRow(
    val id: Long,
    val name: String,
    val itemCount: Int,
    val plannedCount: Int,
    val total: Double
)

@Dao
interface ShoppingListDao {
    @Insert
    suspend fun insert(list: ShoppingListEntity): Long

    @Query("SELECT * FROM shopping_lists WHERE archived = 0 ORDER BY createdAt DESC")
    fun observeAll(): Flow<List<ShoppingListEntity>>

    @Query(
        """
        SELECT l.id AS id,
               l.name AS name,
               COUNT(p.id) AS itemCount,
               COALESCE(SUM(CASE WHEN p.planned = 1 THEN 1 ELSE 0 END), 0) AS plannedCount,
               COALESCE(SUM(CASE WHEN p.planned = 0 THEN p.value ELSE 0 END), 0) AS total
        FROM shopping_lists l
        LEFT JOIN prices p ON p.listId = l.id
        WHERE l.archived = 0
        GROUP BY l.id
        ORDER BY l.createdAt DESC
        """
    )
    fun observeSummaries(): Flow<List<ListSummaryRow>>

    @Query("UPDATE shopping_lists SET archived = 1 WHERE id = :id")
    suspend fun archive(id: Long)

    @Query("UPDATE shopping_lists SET name = :name WHERE id = :id")
    suspend fun rename(id: Long, name: String)

    @Query("DELETE FROM shopping_lists WHERE id = :id")
    suspend fun delete(id: Long)

    @Query("DELETE FROM prices WHERE listId = :listId")
    suspend fun clearItems(listId: Long)

    @Query("SELECT COUNT(*) FROM shopping_lists")
    suspend fun count(): Int

    @Query("SELECT id FROM shopping_lists WHERE archived = 0 ORDER BY createdAt DESC LIMIT 1")
    suspend fun firstId(): Long?

    @Query("SELECT COUNT(*) FROM prices WHERE listId = :listId")
    suspend fun itemCount(listId: Long): Int
}
