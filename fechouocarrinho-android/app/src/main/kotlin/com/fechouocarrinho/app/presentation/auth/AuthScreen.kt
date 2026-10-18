package com.fechouocarrinho.app.presentation.auth

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Security
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// Tela 16: Criar Conta / Login Opcional - Guest First - mockup_16_auth_cadastro.svg
// Real: Supabase Auth (GoTrue) - email/senha + Google OneTap, com fallback 100% offline
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AuthScreen(
    onContinueOffline: () -> Unit,
    onGoogleSignIn: () -> Unit = {},
    onCreateAccount: (String, String) -> Unit = { _, _ -> },
    onLogin: () -> Unit = {}
) {
    var email by remember { mutableStateOf("maria.silva@email.com") }
    var password by remember { mutableStateOf("••••••••") }
    var showPass by remember { mutableStateOf(false) }

    Column(
        Modifier.fillMaxSize().background(Brush.verticalGradient(listOf(Color(0xFFFFF8F0), Color(0xFFF7F2EB)))).padding(horizontal = 24.dp).padding(top = 16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Back + Brand
        Box(Modifier.size(72.dp).clip(RoundedCornerShape(22.dp)).background(Color(0xFF1B8C42)), contentAlignment = Alignment.Center) {
            Icon(Icons.Default.Security, contentDescription = null, tint = Color.White, modifier = Modifier.size(36.dp))
        }
        Spacer(Modifier.height(12.dp))
        Text("Criar Conta (Opcional)", style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.ExtraBold, color = Color(0xFF111827)))
        Text("Sincronize com a família e salve suas listas", style = MaterialTheme.typography.bodySmall.copy(color = Color(0xFF6B7280)))
        Text("na nuvem. Ou use 100% offline.", style = MaterialTheme.typography.bodySmall.copy(color = Color(0xFF6B7280)))
        Spacer(Modifier.height(20.dp))
        // Google
        Card(Modifier.fillMaxWidth(), shape = RoundedCornerShape(16.dp), colors = CardDefaults.cardColors(containerColor = Color.White), elevation = CardDefaults.cardElevation(2.dp)) {
            Row(Modifier.fillMaxWidth().padding(16.dp).clickableWithoutRipple { onGoogleSignIn() }, verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.Center) {
                Box(Modifier.size(20.dp).clip(RoundedCornerShape(10.dp)).background(Color(0xFFF4F4F5)), contentAlignment = Alignment.Center) { Text("G", style = MaterialTheme.typography.labelMedium.copy(color = Color(0xFF4285F4), fontWeight = FontWeight.Bold)) }
                Spacer(Modifier.width(8.dp))
                Text("Continuar com Google", style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.SemiBold))
            }
        }
        Spacer(Modifier.height(12.dp))
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
            Box(Modifier.weight(1f).height(1.dp).background(Color(0xFFEAE5DC))) 
            Text("ou com e-mail", modifier = Modifier.padding(horizontal = 12.dp), style = MaterialTheme.typography.labelSmall.copy(color = Color(0xFF9CA3AF)))
            Box(Modifier.weight(1f).height(1.dp).background(Color(0xFFEAE5DC)))
        }
        Spacer(Modifier.height(12.dp))
        OutlinedTextField(value = email, onValueChange = { email = it }, label = { Text("E-mail") }, leadingIcon = { Icon(Icons.Default.Email, null, tint = Color(0xFF9CA3AF)) }, modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(14.dp), singleLine = true, keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email))
        Spacer(Modifier.height(8.dp))
        OutlinedTextField(value = password, onValueChange = { password = it }, label = { Text("Senha") }, leadingIcon = { Icon(Icons.Default.Lock, null, tint = Color(0xFF9CA3AF)) }, trailingIcon = { IconButton(onClick = { showPass = !showPass }) { Icon(if (showPass) Icons.Default.VisibilityOff else Icons.Default.Visibility, null, tint = Color(0xFF9CA3AF)) } }, visualTransformation = if (showPass) VisualTransformation.None else PasswordVisualTransformation(), modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(14.dp), singleLine = true)
        Spacer(Modifier.height(16.dp))
        Button(onClick = { onCreateAccount(email, password) }, modifier = Modifier.fillMaxWidth().height(50.dp), shape = RoundedCornerShape(25.dp), colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF1B8C42))) { Text("Criar Conta Gratuita", style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold, color = Color.White)) }
        Spacer(Modifier.height(12.dp))
        // Pular 100% Offline - destacado laranja sem sobreposição
        Button(onClick = onContinueOffline, modifier = Modifier.fillMaxWidth().height(50.dp), shape = RoundedCornerShape(25.dp), colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFFFF7ED), contentColor = Color(0xFFFF6B00)), border = androidx.compose.foundation.BorderStroke(1.8.dp, Color(0xFFFF6B00))) {
            Icon(Icons.Default.Security, contentDescription = null, tint = Color(0xFFFF6B00), modifier = Modifier.size(16.dp))
            Spacer(Modifier.width(8.dp))
            Text("Pular e Usar 100% Offline", style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold, color = Color(0xFFFF6B00)))
        }
        Spacer(Modifier.height(12.dp))
        Text("Já tem uma conta? Entrar", modifier = Modifier.clickableWithoutRipple { onLogin() }.padding(8.dp), style = MaterialTheme.typography.bodySmall.copy(color = Color(0xFF1B8C42), fontWeight = FontWeight.SemiBold))
        Spacer(Modifier.height(8.dp))
        Text("Ao continuar você concorda com os Termos e Política", style = MaterialTheme.typography.labelSmall.copy(color = Color(0xFF9CA3AF)), modifier = Modifier.padding(top = 8.dp))
    }
}

// Helper to avoid ripple
private fun Modifier.clickableWithoutRipple(onClick: () -> Unit) = this.then(Modifier.clickable(onClick = onClick))
