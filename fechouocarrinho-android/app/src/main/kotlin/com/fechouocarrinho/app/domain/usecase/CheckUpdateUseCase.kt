package com.fechouocarrinho.app.domain.usecase

import com.fechouocarrinho.app.BuildConfig
import com.fechouocarrinho.app.data.remote.UpdateService
import com.fechouocarrinho.app.data.remote.dto.UpdateInfoDto

data class UpdateResult(
    val shouldUpdate: Boolean,
    val info: UpdateInfoDto?,
    val isForce: Boolean = false
)

class CheckUpdateUseCase(
    private val updateService: UpdateService = UpdateService.create()
) {
    suspend operator fun invoke(): UpdateResult {
        val info = updateService.checkForUpdate() ?: return UpdateResult(false, null)
        val currentCode = BuildConfig.VERSION_CODE
        return if (info.versionCode > currentCode) {
            UpdateResult(true, info, info.forceUpdate)
        } else {
            UpdateResult(false, null)
        }
    }
}
