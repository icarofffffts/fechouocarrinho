package com.fechouocarrinho.app

import android.app.Application
import androidx.room.Room
import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase
import com.fechouocarrinho.app.data.local.AppDatabase
import com.fechouocarrinho.app.data.local.SettingsStore
import kotlinx.coroutines.Dispatchers

class FechouOCarrinhoApplication : Application() {

    val database: AppDatabase by lazy {
        Room.databaseBuilder(
            applicationContext,
            AppDatabase::class.java,
            "fechouocarrinho_db"
        )
            .addMigrations(MIGRATION_1_2, MIGRATION_2_3)
            .build()
    }

    val settings: SettingsStore by lazy { SettingsStore(this) }

    companion object {
        val MIGRATION_1_2 = object : Migration(1, 2) {
            override fun migrate(db: SupportSQLiteDatabase) {
                db.execSQL("ALTER TABLE prices ADD COLUMN listId INTEGER NOT NULL DEFAULT 1")
                db.execSQL("CREATE TABLE IF NOT EXISTS shopping_lists (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL, createdAt INTEGER NOT NULL, archived INTEGER NOT NULL DEFAULT 0)")
                db.execSQL("INSERT INTO shopping_lists (id, name, createdAt, archived) VALUES (1, 'Minha lista', strftime('%s','now') * 1000, 0)")
            }
        }

        val MIGRATION_2_3 = object : Migration(2, 3) {
            override fun migrate(db: SupportSQLiteDatabase) {
                db.execSQL("ALTER TABLE prices ADD COLUMN marketId TEXT")
                db.execSQL("ALTER TABLE prices ADD COLUMN marketName TEXT")
                db.execSQL("CREATE INDEX IF NOT EXISTS index_prices_marketId ON prices (marketId)")
                db.execSQL(
                    "CREATE TABLE IF NOT EXISTS supermarkets (" +
                        "id TEXT NOT NULL, " +
                        "slug TEXT NOT NULL, " +
                        "name TEXT NOT NULL, " +
                        "city TEXT, " +
                        "state TEXT, " +
                        "logoUrl TEXT, " +
                        "isVerified INTEGER NOT NULL DEFAULT 0, " +
                        "updatedAt INTEGER NOT NULL, " +
                        "PRIMARY KEY(id)" +
                        ")"
                )
            }
        }

        // Dispatchers.IO é injetado manualmente para facilitar testes unitários
        @JvmStatic
        var ioDispatcher = Dispatchers.IO
    }
}
