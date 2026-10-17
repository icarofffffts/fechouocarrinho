package com.fechouocarrinho.app.presentation.components

import android.content.Intent
import android.net.Uri
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext
import com.fechouocarrinho.app.data.remote.dto.UpdateInfoDto

@Composable
fun UpdateDialog(
    info: UpdateInfoDto,
    isForce: Boolean,
    onDismiss: () -> Unit
) {
    val context = LocalContext.current
    AlertDialog(
        onDismissRequest = { if (!isForce) onDismiss() },
        title = { Text("Nova atualização disponível") },
        text = {
            Text(
                "Versão ${info.versionName} disponível.\n\n" +
                    (info.releaseNotes.ifBlank { "Melhorias e correções." }) +
                    "\n\nDeseja atualizar agora?"
            )
        },
        confirmButton = {
            TextButton(onClick = {
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(info.apkUrl))
                context.startActivity(intent)
                if (!isForce) onDismiss()
            }) {
                Text("Atualizar")
            }
        },
        dismissButton = {
            if (!isForce) {
                TextButton(onClick = onDismiss) {
                    Text("Depois")
                }
            }
        }
    )
}
