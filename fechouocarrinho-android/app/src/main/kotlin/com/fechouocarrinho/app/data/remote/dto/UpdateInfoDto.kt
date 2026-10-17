package com.fechouocarrinho.app.data.remote.dto

import kotlinx.serialization.Serializable

@Serializable
data class UpdateInfoDto(
    val versionCode: Int,
    val versionName: String,
    val apkUrl: String,
    val releaseNotes: String = "",
    val forceUpdate: Boolean = false
)
