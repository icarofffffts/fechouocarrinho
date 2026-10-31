package com.fechouocarrinho.app.presentation.auth

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
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
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.fechouocarrinho.app.presentation.components.SquircleLarge
import com.fechouocarrinho.app.presentation.components.SquircleMedium
import com.fechouocarrinho.app.presentation.components.SquircleSmall
import com.fechouocarrinho.app.presentation.components.pressBounce

// Tela 16: Criar Conta / Login Opcional - Guest First - mockup_16_auth_cadastro.svg
// Real: Supabase Auth (GoTrue) - email/senha + Google OneTap, com fallback 100% offline
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AuthScreen(
    onContinueOffline: () -> Unit,
    onGoogleSignIn: () -> Unit = {},
    onCreateAccount: (String, String) -> Unit = { _, _ -> },
    onLogin: (String, String) -> Unit = { _, _ -> },
    isLoading: Boolean = false,
    errorMessage: String? = null
) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var showPass by remember { mutableStateOf(false) }
    var loginMode by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Brush.verticalGradient(listOf(Color(0xFFFFF8F0), Color(0xFFF7F2EB))))
            .statusBarsPadding()
            .navigationBarsPadding()
            .verticalScroll(rememberScrollState())
            .padding(horizontal = 24.dp)
            .padding(top = 16.dp, bottom = 24.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Back + Brand Logo Badge
        Box(
            modifier = Modifier
                .size(72.dp)
                .clip(SquircleMedium)
                .background(Color(0xFF1B8C42)),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Security,
                contentDescription = null,
                tint = Color.White,
                modifier = Modifier.size(36.dp)
            )
        }

        Spacer(Modifier.height(16.dp))

        Text(
            text = if (loginMode) "Entrar na sua conta" else "Criar conta (opcional)",
            style = MaterialTheme.typography.titleLarge.copy(
                fontWeight = FontWeight.ExtraBold,
                fontSize = 24.sp,
                letterSpacing = (-0.5).sp,
                color = Color(0xFF0B2B1F)
            )
        )
        Spacer(Modifier.height(4.dp))
        Text(
            text = if (loginMode) {
                "Entre para recuperar suas listas\nem outro aparelho."
            } else {
                "Sincronize com a família e salve suas listas\nna nuvem. Ou use 100% offline."
            },
            style = MaterialTheme.typography.bodySmall.copy(
                color = Color(0xFF5A6B63),
                fontSize = 13.sp,
                lineHeight = 18.sp
            ),
            textAlign = TextAlign.Center
        )

        Spacer(Modifier.height(24.dp))

        // Botão Google com pressBounce físico
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .pressBounce(onClick = onGoogleSignIn),
            shape = SquircleMedium,
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(2.dp)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 14.dp, horizontal = 16.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center
            ) {
                Box(
                    modifier = Modifier
                        .size(24.dp)
                        .clip(CircleShape)
                        .background(Color(0xFFF4F4F5)),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "G",
                        style = MaterialTheme.typography.labelMedium.copy(
                            color = Color(0xFF4285F4),
                            fontWeight = FontWeight.Bold
                        )
                    )
                }
                Spacer(Modifier.width(10.dp))
                Text(
                    text = "Continuar com Google",
                    style = MaterialTheme.typography.bodyMedium.copy(
                        fontWeight = FontWeight.SemiBold,
                        color = Color(0xFF0B2B1F)
                    )
                )
            }
        }

        Spacer(Modifier.height(16.dp))

        // Divisor editorial
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.fillMaxWidth()
        ) {
            Box(Modifier.weight(1f).height(1.dp).background(Color(0xFFE5E7EB)))
            Text(
                text = "ou com e-mail",
                modifier = Modifier.padding(horizontal = 12.dp),
                style = MaterialTheme.typography.labelSmall.copy(
                    color = Color(0xFF9CA3AF),
                    fontWeight = FontWeight.Medium
                )
            )
            Box(Modifier.weight(1f).height(1.dp).background(Color(0xFFE5E7EB)))
        }

        Spacer(Modifier.height(16.dp))

        // Campos de Input com Squircles e contraste
        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("E-mail") },
            leadingIcon = { Icon(Icons.Default.Email, null, tint = Color(0xFF9CA3AF)) },
            modifier = Modifier.fillMaxWidth(),
            shape = SquircleMedium,
            singleLine = true,
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = Color(0xFF1B8C42),
                unfocusedBorderColor = Color(0xFFE5E7EB),
                focusedContainerColor = Color.White,
                unfocusedContainerColor = Color.White
            )
        )

        Spacer(Modifier.height(10.dp))

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Senha") },
            leadingIcon = { Icon(Icons.Default.Lock, null, tint = Color(0xFF9CA3AF)) },
            trailingIcon = {
                IconButton(onClick = { showPass = !showPass }) {
                    Icon(
                        imageVector = if (showPass) Icons.Default.VisibilityOff else Icons.Default.Visibility,
                        contentDescription = null,
                        tint = Color(0xFF9CA3AF)
                    )
                }
            },
            visualTransformation = if (showPass) VisualTransformation.None else PasswordVisualTransformation(),
            modifier = Modifier.fillMaxWidth(),
            shape = SquircleMedium,
            singleLine = true,
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = Color(0xFF1B8C42),
                unfocusedBorderColor = Color(0xFFE5E7EB),
                focusedContainerColor = Color.White,
                unfocusedContainerColor = Color.White
            )
        )

        Spacer(Modifier.height(20.dp))

        if (errorMessage != null) {
            Text(
                text = errorMessage,
                modifier = Modifier.fillMaxWidth(),
                style = MaterialTheme.typography.bodySmall.copy(fontSize = 12.sp),
                color = Color(0xFFDC2626)
            )
            Spacer(Modifier.height(10.dp))
        }

        // Botão Primário com pressBounce
        Button(
            enabled = !isLoading && email.isNotBlank() && password.length >= 6,
            onClick = { if (loginMode) onLogin(email.trim(), password) else onCreateAccount(email.trim(), password) },
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp)
                .pressBounce {
                    if (!isLoading && email.isNotBlank() && password.length >= 6) {
                        if (loginMode) onLogin(email.trim(), password) else onCreateAccount(email.trim(), password)
                    }
                },
            shape = SquircleLarge,
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF1B8C42)),
            elevation = ButtonDefaults.buttonElevation(defaultElevation = 2.dp)
        ) {
            if (isLoading) {
                CircularProgressIndicator(
                    modifier = Modifier.size(20.dp),
                    strokeWidth = 2.dp,
                    color = Color.White
                )
            } else {
                Text(
                    text = if (loginMode) "Entrar" else "Criar conta gratuita",
                    style = MaterialTheme.typography.bodyMedium.copy(
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp,
                        color = Color.White
                    )
                )
            }
        }

        Spacer(Modifier.height(12.dp))

        // Pular 100% Offline - destacado laranja sem sobreposição com pressBounce
        Button(
            onClick = onContinueOffline,
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp)
                .pressBounce(onClick = onContinueOffline),
            shape = SquircleLarge,
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFFFFF7ED),
                contentColor = Color(0xFFFF6B00)
            ),
            border = androidx.compose.foundation.BorderStroke(1.8.dp, Color(0xFFFF6B00))
        ) {
            Icon(
                imageVector = Icons.Default.Security,
                contentDescription = null,
                tint = Color(0xFFFF6B00),
                modifier = Modifier.size(18.dp)
            )
            Spacer(Modifier.width(8.dp))
            Text(
                text = "Pular e Usar 100% Offline",
                style = MaterialTheme.typography.bodyMedium.copy(
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp,
                    color = Color(0xFFFF6B00)
                )
            )
        }

        Spacer(Modifier.height(16.dp))

        // Alternar entre criar conta e entrar
        Text(
            text = if (loginMode) "Não tem conta? Criar agora" else "Já tem uma conta? Entrar",
            modifier = Modifier
                .clip(SquircleSmall)
                .pressBounce(onClick = { loginMode = !loginMode })
                .padding(horizontal = 12.dp, vertical = 8.dp),
            style = MaterialTheme.typography.bodySmall.copy(
                color = Color(0xFF1B8C42),
                fontWeight = FontWeight.Bold,
                fontSize = 13.sp
            )
        )

        Spacer(Modifier.height(8.dp))

        Text(
            text = "Ao continuar você concorda com os Termos e Política de Privacidade",
            style = MaterialTheme.typography.labelSmall.copy(
                color = Color(0xFF9CA3AF),
                fontSize = 11.sp
            ),
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(horizontal = 16.dp)
        )
    }
}
