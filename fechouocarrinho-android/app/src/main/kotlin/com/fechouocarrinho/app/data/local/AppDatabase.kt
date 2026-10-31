package com.fechouocarrinho.app.data.local

import androidx.room.Database
import androidx.room.RoomDatabase

@Database(
    entities = [PriceEntity::class, ShoppingListEntity::class, SupermarketEntity::class],
    version = 4,
    exportSchema = false
)
@androidx.room.TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {
    abstract fun priceDao(): PriceDao
    abstract fun shoppingListDao(): ShoppingListDao
    abstract fun supermarketDao(): SupermarketDao
}
