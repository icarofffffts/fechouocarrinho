package com.fechouocarrinho.app.data.local

import androidx.room.Database
import androidx.room.RoomDatabase

@Database(
    entities = [PriceEntity::class],
    version = 1,
    exportSchema = false
)
@androidx.room.TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {
    abstract fun priceDao(): PriceDao
}
