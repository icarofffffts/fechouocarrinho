package com.fechouocarrinho.app

import android.app.Application
import androidx.room.Room
import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase
import com.fechouocarrinho.app.data.local.AppDatabase
import kotlinx.coroutines.Dispatchers

class FechouOCarrinhoApplication : Application() {

    val database: AppDatabase by lazy {
        Room.databaseBuilder(
            applicationContext,
            AppDatabase::class.java,
            "fechouocarrinho_db"
        )
            .addMigrations(MIGRATION_1_2)
            .fallbackToDestructiveMigration()
            .build()
    }

    companion object {
        val MIGRATION_1_2 = object : Migration(1, 2) {
            override fun migrate(db: SupportSQLiteDatabase) {
                db.execSQL("ALTER TABLE prices ADD COLUMN listId INTEGER NOT NULL DEFAULT 1")
                db.execSQL("CREATE TABLE IF NOT EXISTS shopping_lists (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL, createdAt INTEGER NOT NULL, archived INTEGER NOT NULL DEFAULT 0)")
                db.execSQL("INSERT INTO shopping_lists (id, name, createdAt, archived) VALUES (1, 'Minha lista', strftime('%s','now') * 1000, 0)")
            }
        }
        // Dispatchers.IO é injetado manualmente para facilitar testes unitários
        @JvmStatic
        var ioDispatcher = Dispatchers.IO
    }
}
