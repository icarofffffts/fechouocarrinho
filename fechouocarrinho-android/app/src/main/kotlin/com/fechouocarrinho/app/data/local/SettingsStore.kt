package com.fechouocarrinho.app.data.local

import android.content.Context
import android.content.SharedPreferences
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * Preferências locais reais do app: mercado selecionado, meta de orçamento e
 * identidade da conta conectada. Nada aqui é valor de exemplo: tudo começa vazio
 * e só é preenchido por uma ação do usuário (ou pela sessão autenticada).
 */
class SettingsStore(context: Context) {

    private val prefs: SharedPreferences =
        context.getSharedPreferences("fechou_settings", Context.MODE_PRIVATE)

    private val _marketId = MutableStateFlow(prefs.getString(KEY_MARKET_ID, "").orEmpty())
    val marketId: StateFlow<String> = _marketId.asStateFlow()

    private val _marketName = MutableStateFlow(prefs.getString(KEY_MARKET_NAME, "").orEmpty())
    val marketName: StateFlow<String> = _marketName.asStateFlow()

    private val _budgetGoal = MutableStateFlow(prefs.getFloat(KEY_BUDGET_GOAL, 0f).toDouble())
    val budgetGoal: StateFlow<Double> = _budgetGoal.asStateFlow()

    private val _userEmail = MutableStateFlow(prefs.getString(KEY_USER_EMAIL, null))
    val userEmail: StateFlow<String?> = _userEmail.asStateFlow()

    private val _syncEnabled = MutableStateFlow(prefs.getBoolean(KEY_SYNC_ENABLED, false))
    val syncEnabled: StateFlow<Boolean> = _syncEnabled.asStateFlow()

    fun setMarket(id: String, name: String) {
        prefs.edit().putString(KEY_MARKET_ID, id).putString(KEY_MARKET_NAME, name).apply()
        _marketId.value = id
        _marketName.value = name
    }

    fun clearMarket() {
        prefs.edit().remove(KEY_MARKET_ID).remove(KEY_MARKET_NAME).apply()
        _marketId.value = ""
        _marketName.value = ""
    }

    fun setBudgetGoal(value: Double) {
        val safe = value.coerceAtLeast(0.0)
        prefs.edit().putFloat(KEY_BUDGET_GOAL, safe.toFloat()).apply()
        _budgetGoal.value = safe
    }

    fun setSyncEnabled(enabled: Boolean) {
        prefs.edit().putBoolean(KEY_SYNC_ENABLED, enabled).apply()
        _syncEnabled.value = enabled
    }

    fun setUserEmail(email: String?) {
        prefs.edit().apply {
            if (email.isNullOrBlank()) remove(KEY_USER_EMAIL) else putString(KEY_USER_EMAIL, email)
        }.apply()
        _userEmail.value = email
    }

    private companion object {
        const val KEY_MARKET_ID = "selected_market_id"
        const val KEY_MARKET_NAME = "selected_market_name"
        const val KEY_BUDGET_GOAL = "budget_goal"
        const val KEY_USER_EMAIL = "user_email"
        const val KEY_SYNC_ENABLED = "sync_enabled"
    }
}
