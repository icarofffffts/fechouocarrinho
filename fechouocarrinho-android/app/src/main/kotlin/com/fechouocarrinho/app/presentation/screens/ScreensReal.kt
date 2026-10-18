package com.fechouocarrinho.app.presentation.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

private val Green = Color(0xFF1B8C42)
private val Orange = Color(0xFFFF6B00)
private val Bg = Color(0xFFFFF8F0)
private val Ink = Color(0xFF111827)

// Tela 03: Carrinho Fechado - R$189,40 + economia R$27,60
@Composable fun CarrinhoFechadoScreenReal(total: Double = 189.40, economia: Double = 27.60, onFinalizar: ()->Unit = {}, onCompartilhar: ()->Unit = {}) {
    Column(Modifier.fillMaxSize().background(Bg).padding(20.dp), horizontalAlignment = Alignment.CenterHorizontally) {
        Card(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
            Column(Modifier.padding(24.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                Box(Modifier.size(64.dp).clip(RoundedCornerShape(16.dp)).background(Green), contentAlignment = Alignment.Center) {
                    Text("✓", color = Color.White, style = MaterialTheme.typography.headlineLarge)
                }
                Spacer(Modifier.height(16.dp))
                Text("Carrinho fechado!", style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.ExtraBold, color = Ink))
                Text("R$ 189,40", style = MaterialTheme.typography.displayMedium.copy(fontWeight = FontWeight.ExtraBold, color = Ink, fontSize = 36.sp))
                Spacer(Modifier.height(8.dp))
                Box(Modifier.clip(RoundedCornerShape(20.dp)).background(Green.copy(alpha=0.12f)).padding(horizontal=12.dp, vertical=6.dp)) {
                    Text("Economia de R$ 27,60", style = MaterialTheme.typography.labelMedium.copy(color = Green, fontWeight = FontWeight.Bold))
                }
                Spacer(Modifier.height(16.dp))
                Button(onClick = onFinalizar, colors = ButtonDefaults.buttonColors(containerColor = Green), modifier = Modifier.fillMaxWidth()) { Text("Finalizar Compra") }
                Spacer(Modifier.height(8.dp))
                OutlinedButton(onClick = onCompartilhar, modifier = Modifier.fillMaxWidth()) { Text("Compartilhar Recibo") }
            }
        }
    }
}

// Tela 04: Comparador - BH R$189,40 / EPA R$204,20 / Mart Minas R$196,80
@Composable fun ComparadorScreenReal(onRota: (String)->Unit = {}) {
    Column(Modifier.fillMaxSize().background(Bg).padding(16.dp)) {
        Text("Comparador de Supermercados", style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold, color = Ink))
        Spacer(Modifier.height(12.dp))
        ComparadorCard("Supermercados BH", "R$ 189,40", "Menor Preço · 1,2 km", Green, true, onRota)
        ComparadorCard("EPA Supermercados", "R$ 204,20", "+ R$ 14,80 · 2,8 km", Color(0xFFE63946), false, onRota)
        ComparadorCard("Mart Minas", "R$ 196,80", "+ R$ 7,40 · 5,4 km", Color(0xFFFF6B00), false, onRota)
    }
}
@Composable private fun ComparadorCard(nome: String, preco: String, detalhe: String, color: Color, menor: Boolean, onRota: (String)->Unit) {
    Card(Modifier.fillMaxWidth().padding(vertical=6.dp), shape = RoundedCornerShape(16.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
        Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(Modifier.size(40.dp).clip(RoundedCornerShape(10.dp)).background(color), contentAlignment = Alignment.Center) { Text(nome.take(2), color = Color.White, style = MaterialTheme.typography.labelMedium.copy(fontWeight=FontWeight.Bold)) }
            Spacer(Modifier.width(12.dp))
            Column(Modifier.weight(1f)) {
                Text(nome, style = MaterialTheme.typography.bodyMedium.copy(fontWeight=FontWeight.SemiBold))
                Text(preco, style = MaterialTheme.typography.titleMedium.copy(fontWeight=FontWeight.Bold, color = if(menor) Green else Ink))
                Text(detalhe, style = MaterialTheme.typography.labelSmall.copy(color = if(menor) Green else Color(0xFF6B7280)))
                if(menor) Text("Menor Preço da Região", style = MaterialTheme.typography.labelSmall.copy(color = Green, fontWeight=FontWeight.Bold))
            }
            TextButton(onClick = { onRota(nome) }) { Text("Rota") }
        }
    }
}

// Tela 06: Listas
@Composable fun ListasScreenReal(onNovaLista: ()->Unit = {}) {
    Column(Modifier.fillMaxSize().background(Bg).padding(16.dp)) {
        Text("Minhas Listas", style = MaterialTheme.typography.titleLarge.copy(fontWeight=FontWeight.Bold))
        Spacer(Modifier.height(12.dp))
        listOf(
            Triple("Compras do Mês - Casa","18/24 itens","R$ 189,40"),
            Triple("Churrasco Fim de Semana","6/12 itens","R$ 94,50"),
            Triple("Hortifruti & Feira","0/8 itens","R$ 0,00")
        ).forEach { (nome, prog, total) ->
            Card(Modifier.fillMaxWidth().padding(vertical=6.dp), shape = RoundedCornerShape(16.dp)) {
                Column(Modifier.padding(16.dp)) {
                    Text(nome, style = MaterialTheme.typography.bodyLarge.copy(fontWeight=FontWeight.Bold))
                    Text(prog, style = MaterialTheme.typography.bodySmall.copy(color=Color(0xFF6B7280)))
                    Text(total, style = MaterialTheme.typography.titleMedium.copy(color=Green, fontWeight=FontWeight.Bold))
                    LinearProgressIndicator(progress = 0.7f, modifier = Modifier.fillMaxWidth().height(6.dp).clip(RoundedCornerShape(3.dp)), color = Green, trackColor = Color(0xFFEAE5DC))
                }
            }
        }
        Spacer(Modifier.height(12.dp))
        Button(onClick = onNovaLista, modifier = Modifier.fillMaxWidth(), colors = ButtonDefaults.buttonColors(containerColor = Orange)) { Text("+ Nova Lista") }
    }
}

// Tela 07: Perfil
@Composable fun PerfilScreenReal() {
    Column(Modifier.fillMaxSize().background(Bg).padding(20.dp), horizontalAlignment = Alignment.CenterHorizontally) {
        Box(Modifier.size(80.dp).clip(RoundedCornerShape(20.dp)).background(Color(0xFFEAE5DC)), contentAlignment = Alignment.Center) { Text("T", style = MaterialTheme.typography.headlineLarge.copy(color=Green)) }
        Text("Tales Head Tech", style = MaterialTheme.typography.titleLarge.copy(fontWeight=FontWeight.Bold))
        Text("Plano Gratuito", style = MaterialTheme.typography.labelMedium.copy(color=Color(0xFF6B7280)))
        Spacer(Modifier.height(16.dp))
        Card(Modifier.fillMaxWidth(), shape = RoundedCornerShape(16.dp), colors = CardDefaults.cardColors(containerColor = Green)) {
            Column(Modifier.padding(16.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                Text("R$ 342,80 Economizados no total", style = MaterialTheme.typography.titleMedium.copy(color=Color.White, fontWeight=FontWeight.Bold))
            }
        }
    }
}

// Tela 11-15
@Composable fun SplashScreenReal(onComeçar: ()->Unit = {}) {
    Column(Modifier.fillMaxSize().background(Bg).padding(24.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
        Box(Modifier.size(80.dp).clip(RoundedCornerShape(20.dp)).background(Green), contentAlignment = Alignment.Center) { Text("✓", color=Color.White, style=MaterialTheme.typography.headlineLarge) }
        Spacer(Modifier.height(16.dp))
        Text("fechou o carrinho", style = MaterialTheme.typography.headlineSmall.copy(fontWeight=FontWeight.ExtraBold, color = Ink))
        Text("Levou. Somou. Fechou. Seu total sem sustos no caixa", style = MaterialTheme.typography.bodyMedium.copy(color=Color(0xFF6B7280)), modifier = Modifier.padding(top=8.dp))
        Spacer(Modifier.height(24.dp))
        Button(onClick = onComeçar, colors = ButtonDefaults.buttonColors(containerColor = Green), modifier = Modifier.fillMaxWidth()) { Text("Começar sem cadastro") }
    }
}
@Composable fun SelecaoMercadoScreenReal() {
    Column(Modifier.fillMaxSize().background(Bg).padding(16.dp)) {
        Text("Seleção de Praça e Supermercado", style = MaterialTheme.typography.titleLarge.copy(fontWeight=FontWeight.Bold))
        Spacer(Modifier.height(12.dp))
        Text("Estado: Minas Gerais", style = MaterialTheme.typography.bodyMedium)
        Text("Cidade: Belo Horizonte e região", style = MaterialTheme.typography.bodyMedium)
        Spacer(Modifier.height(12.dp))
        listOf("Supermercados BH","EPA","Mart Minas","Carrefour").forEach { Text("• $it", modifier = Modifier.padding(vertical=4.dp)) }
        Spacer(Modifier.height(16.dp))
        Button(onClick = {}, modifier = Modifier.fillMaxWidth(), colors = ButtonDefaults.buttonColors(containerColor = Green)) { Text("Confirmar praça") }
    }
}
@Composable fun ManualScreenReal() {
    Column(Modifier.fillMaxSize().background(Color.White).padding(16.dp)) {
        Text("Adicionar Manual", style = MaterialTheme.typography.titleLarge.copy(fontWeight=FontWeight.Bold))
        Spacer(Modifier.height(12.dp))
        Text("Nome do produto", style = MaterialTheme.typography.labelMedium)
        OutlinedTextField(value = "", onValueChange = {}, label = { Text("Ex: Arroz 5kg") }, modifier = Modifier.fillMaxWidth())
        Spacer(Modifier.height(8.dp))
        Text("Categoria", style = MaterialTheme.typography.labelMedium)
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) { listOf("Hortifruti","Mercearia","Carnes","Bebidas").forEach { AssistChip(onClick={}, label={ Text(it)}) } }
    }
}
@Composable fun CorrecaoOcrScreenReal() {
    Column(Modifier.fillMaxSize().background(Bg).padding(16.dp)) {
        Text("Correção de Leitura OCR", style = MaterialTheme.typography.titleLarge.copy(fontWeight=FontWeight.Bold))
        Spacer(Modifier.height(12.dp))
        Box(Modifier.fillMaxWidth().height(120.dp).clip(RoundedCornerShape(12.dp)).background(Color(0xFFEAE5DC)), contentAlignment = Alignment.Center) { Text("Recorte da etiqueta", color = Color(0xFF6B7280)) }
        Spacer(Modifier.height(8.dp))
        Box(Modifier.clip(RoundedCornerShape(8.dp)).background(Green.copy(alpha=0.12f)).padding(8.dp)) { Text("94% de precisão", style = MaterialTheme.typography.labelMedium.copy(color=Green)) }
        Spacer(Modifier.height(12.dp))
        OutlinedTextField(value = "R$ 28,90", onValueChange = {}, label = { Text("Preço") }, modifier = Modifier.fillMaxWidth())
        Spacer(Modifier.height(12.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp), modifier = Modifier.fillMaxWidth()) {
            OutlinedButton(onClick = {}, modifier = Modifier.weight(1f)) { Text("Excluir") }
            Button(onClick = {}, modifier = Modifier.weight(1f), colors = ButtonDefaults.buttonColors(containerColor = Green)) { Text("Confirmar") }
        }
    }
}
@Composable fun ReciboScreenReal() {
    Column(Modifier.fillMaxSize().background(Bg).padding(16.dp), horizontalAlignment = Alignment.CenterHorizontally) {
        Text("Recibo Digital", style = MaterialTheme.typography.titleLarge.copy(fontWeight=FontWeight.Bold))
        Spacer(Modifier.height(12.dp))
        Card(Modifier.fillMaxWidth(), shape = RoundedCornerShape(12.dp)) {
            Column(Modifier.padding(16.dp)) {
                Text("Itens: 5  Subtotal: R$ 189,40  Economizado: R$ 27,60", style = MaterialTheme.typography.bodySmall)
                Spacer(Modifier.height(8.dp))
                Box(Modifier.size(80.dp).background(Color(0xFFEAE5DC)), contentAlignment = Alignment.Center) { Text("QR", color = Color(0xFF6B7280)) }
            }
        }
        Spacer(Modifier.height(16.dp))
        Button(onClick = {}, colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF25D366)), modifier = Modifier.fillMaxWidth()) { Text("Compartilhar no WhatsApp") }
    }
}
