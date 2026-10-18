package com.fechouocarrinho.app.presentation.auth

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CloudDone
import androidx.compose.material.icons.filled.ContentCopy
import androidx.compose.material.icons.filled.Group
import androidx.compose.material.icons.filled.Sync
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context

// Tela 17: Painel Sincronização Familiar - mockup_17_auth_sincronizacao.svg
// Real: Supabase Realtime + shared list code FC-XXXX
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SyncScreen(
    userEmail: String = "maria.silva@email.com",
    userName: String = "Maria Silva",
    isSyncEnabled: Boolean = true,
    onToggleSync: (Boolean) -> Unit = {},
    onDisconnect: () -> Unit = {},
    shareCode: String = "A7K9Q2"
) {
    val context = LocalContext.current
    Column(
        Modifier.fillMaxSize().background(Color(0xFFFFF8F0)).padding(16.dp).padding(top = 8.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Header
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Default.Sync, contentDescription = null, tint = Color(0xFF1B8C42), modifier = Modifier.size(20.dp))
            Spacer(Modifier.width(8.dp))
            Column {
                Text("Sincronização Familiar", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold))
                Text("Compartilhe listas com sua família", style = MaterialTheme.typography.bodySmall.copy(color = Color(0xFF6B7280)))
            }
        }
        // User card
        Card(Modifier.fillMaxWidth(), shape = RoundedCornerShape(20.dp), colors = CardDefaults.cardColors(containerColor = Color.White), elevation = CardDefaults.cardElevation(2.dp)) {
            Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.size(56.dp).clip(RoundedCornerShape(28.dp)).background(Color(0xFF1B8C42)), contentAlignment = Alignment.Center) {
                    Text(userName.take(1).uppercase(), style = MaterialTheme.typography.titleLarge.copy(color = Color.White, fontWeight = FontWeight.Bold))
                }
                Spacer(Modifier.width(12.dp))
                Column(Modifier.weight(1f)) {
                    Text(userName, style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold))
                    Text(userEmail, style = MaterialTheme.typography.bodySmall.copy(color = Color(0xFF6B7280)))
                    Spacer(Modifier.height(4.dp))
                    Box(Modifier.clip(RoundedCornerShape(10.dp)).background(Color(0xFF1B8C42).copy(alpha=0.12f)).padding(horizontal=8.dp, vertical=2.dp)) {
                        Text("CONECTADO", style = MaterialTheme.typography.labelSmall.copy(color = Color(0xFF1B8C42), fontWeight = FontWeight.Bold))
                    }
                }
            }
        }
        // Sync toggle
        Card(Modifier.fillMaxWidth(), shape = RoundedCornerShape(18.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
            Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.size(36.dp).clip(RoundedCornerShape(10.dp)).background(Color(0xFF1B8C42).copy(alpha=0.12f)), contentAlignment = Alignment.Center) {
                    Icon(Icons.Default.Sync, contentDescription = null, tint = Color(0xFF1B8C42), modifier = Modifier.size(20.dp))
                }
                Spacer(Modifier.width(12.dp))
                Column(Modifier.weight(1f)) {
                    Text("Sincronização em tempo real", style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.SemiBold))
                    Text("Atualiza a lista em todos os aparelhos", style = MaterialTheme.typography.bodySmall.copy(color = Color(0xFF6B7280)))
                }
                Switch(checked = isSyncEnabled, onCheckedChange = onToggleSync)
            }
        }
        // Backup status
        Card(Modifier.fillMaxWidth(), shape = RoundedCornerShape(18.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
            Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.size(36.dp).clip(RoundedCornerShape(10.dp)).background(Color(0xFF6B7280).copy(alpha=0.12f)), contentAlignment = Alignment.Center) {
                    Icon(Icons.Default.CloudDone, contentDescription = null, tint = Color(0xFF6B7280))
                }
                Spacer(Modifier.width(12.dp))
                Column(Modifier.weight(1f)) {
                    Text("Backup na nuvem", style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.SemiBold))
                    Text("Último backup: hoje, 09:41", style = MaterialTheme.typography.bodySmall.copy(color = Color(0xFF6B7280)))
                }
                Box(Modifier.clip(RoundedCornerShape(14.dp)).background(Color(0xFF1B8C42).copy(alpha=0.12f)).padding(horizontal=10.dp, vertical=6.dp)) {
                    Text("OK", style = MaterialTheme.typography.labelSmall.copy(color = Color(0xFF1B8C42), fontWeight = FontWeight.Bold))
                }
            }
        }
        // Share code
        Card(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp), colors = CardDefaults.cardColors(containerColor = Color(0xFF1B8C42))) {
            Column(Modifier.padding(20.dp)) {
                Text("Compartilhar Lista", style = MaterialTheme.typography.titleMedium.copy(color = Color.White, fontWeight = FontWeight.Bold))
                Text("Envie o código de 6 dígitos para a família", style = MaterialTheme.typography.bodySmall.copy(color = Color.White.copy(alpha=0.8f)))
                Spacer(Modifier.height(12.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(Modifier.weight(1f).clip(RoundedCornerShape(14.dp)).background(Color.White.copy(alpha=0.2f)).padding(vertical=12.dp), contentAlignment = Alignment.Center) {
                        Text(shareCode, style = MaterialTheme.typography.titleLarge.copy(color = Color.White, fontWeight = FontWeight.ExtraBold, letterSpacing = 6.sp))
                    }
                    Spacer(Modifier.width(12.dp))
                    Button(onClick = {
                        val cm = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                        cm.setPrimaryClip(ClipData.newPlainText("code", shareCode))
                    }, shape = RoundedCornerShape(14.dp), colors = ButtonDefaults.buttonColors(containerColor = Color.White)) {
                        Icon(Icons.Default.ContentCopy, contentDescription = null, tint = Color(0xFF1B8C42), modifier = Modifier.size(16.dp))
                        Spacer(Modifier.width(6.dp))
                        Text("Copiar", color = Color(0xFF1B8C42))
                    }
                }
                Spacer(Modifier.height(8.dp))
                Text("Quem tiver o código poderá ver e editar a lista", style = MaterialTheme.typography.labelSmall.copy(color = Color.White.copy(alpha=0.7f)))
            }
        }
        // Disconnect
        Button(onClick = onDisconnect, modifier = Modifier.fillMaxWidth(), colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFEAE5DC), contentColor = Color(0xFF6B7280)), shape = RoundedCornerShape(26.dp)) {
            Text("Desconectar conta")
        }
    }
}
