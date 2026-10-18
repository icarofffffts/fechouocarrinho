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
import com.fechouocarrinho.app.data.local.AppDatabase
import androidx.room.Room

class BudgetWidget : GlanceAppWidget() {
    override suspend fun provideGlance(context: Context, id: GlanceId) {
        val db = (context.applicationContext as? FechouOCarrinhoApplication)?.database
            ?: Room.databaseBuilder(context.applicationContext, AppDatabase::class.java, "fechouocarrinho_db").build()
        val total = db.priceDao().totalValue()
        val meta = 200.0
        provideContent {
            Box(modifier = GlanceModifier.fillMaxSize().background(ColorProvider(Color(0xFF1B8C42))).padding(12.dp), contentAlignment = Alignment.Center) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("Fechou o Carrinho", style = TextStyle(color = ColorProvider(Color.White)))
                    Text("R$ ${String.format("%.2f", total)} / R$ ${String.format("%.2f", meta)}", style = TextStyle(color = ColorProvider(Color.White)))
                }
            }
        }
    }
}

class BudgetWidgetReceiver : GlanceAppWidgetReceiver() {
    override val glanceAppWidget: GlanceAppWidget = BudgetWidget()
}