package com.fechouocarrinho.app.widget

import android.content.Context
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.GlanceId
import androidx.glance.GlanceModifier
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import androidx.glance.appwidget.provideContent
import androidx.glance.background
import androidx.glance.layout.Alignment
import androidx.glance.layout.Box
import androidx.glance.layout.Column
import androidx.glance.layout.fillMaxSize
import androidx.glance.layout.padding
import androidx.glance.text.Text
import androidx.glance.text.TextStyle
import androidx.glance.unit.ColorProvider
import com.fechouocarrinho.app.FechouOCarrinhoApplication
import java.util.Locale

class BudgetWidget : GlanceAppWidget() {
    override suspend fun provideGlance(context: Context, id: GlanceId) {
        val app = context.applicationContext as? FechouOCarrinhoApplication
        val listId = app?.settings?.activeListId?.value ?: 1L
        val meta = app?.settings?.budgetGoal?.value ?: 0.0
        val total = app?.database?.priceDao()?.totalValue(listId) ?: 0.0
        val marketName = app?.settings?.marketName?.value.orEmpty()

        val totalLabel = formatBRL(total)
        val metaLabel = if (meta > 0) "de ${formatBRL(meta)}" else "sem meta definida"

        provideContent {
            Box(
                modifier = GlanceModifier
                    .fillMaxSize()
                    .background(ColorProvider(Color(0xFF1B8C42)))
                    .padding(14.dp),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                        text = "fechou o carrinho",
                        style = TextStyle(color = ColorProvider(Color.White), fontSize = 12.sp)
                    )
                    Text(
                        text = totalLabel,
                        style = TextStyle(color = ColorProvider(Color.White), fontSize = 22.sp)
                    )
                    Text(
                        text = metaLabel,
                        style = TextStyle(color = ColorProvider(Color(0xFFD9F2E1)), fontSize = 12.sp)
                    )
                    if (marketName.isNotBlank()) {
                        Text(
                            text = marketName,
                            style = TextStyle(color = ColorProvider(Color(0xFFD9F2E1)), fontSize = 10.sp)
                        )
                    }
                }
            }
        }
    }

    private fun formatBRL(value: Double): String =
        String.format(Locale.forLanguageTag("pt-BR"), "R$ %.2f", value)
}

class BudgetWidgetReceiver : GlanceAppWidgetReceiver() {
    override val glanceAppWidget: GlanceAppWidget = BudgetWidget()
}
