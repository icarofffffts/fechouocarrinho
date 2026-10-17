package com.fechouocarrinho.app

import android.app.Application
import androidx.room.Room
import com.fechouocarrinho.app.data.local.AppDatabase
import kotlinx.coroutines.Dispatchers

class FechouOCarrinhoApplication : Application() {

    val database: AppDatabase by lazy {
        Room.databaseBuilder(
            applicationContext,
            AppDatabase::class.java,
            "fechouocarrinho_db"
        )
            .fallbackToDestructiveMigration()
            .build()
    }

    companion object {
        // Dispatchers.IO é injetado manualmente para facilitar testes unitários
        @JvmStatic
        var ioDispatcher = Dispatchers.IO
    }
}
