package com.fechouocarrinho.app.data.repository

sealed class SyncResult {
    data object NothingToSync : SyncResult()
    data class Success(val syncedCount: Int) : SyncResult()
    data class Error(val message: String) : SyncResult()
}
