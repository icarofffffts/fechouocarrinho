package com.fechouocarrinho.app.presentation.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.fechouocarrinho.app.data.remote.SupabaseAuthService
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

sealed interface AuthState {
    data object Idle : AuthState
    data object Loading : AuthState
    data class Success(val email: String) : AuthState
    data class Error(val message: String) : AuthState
}

class AuthViewModel(
    private val authService: SupabaseAuthService = SupabaseAuthService()
) : ViewModel() {
    private val _state = MutableStateFlow<AuthState>(AuthState.Idle)
    val state: StateFlow<AuthState> = _state.asStateFlow()

    fun signUp(email: String, password: String, onSuccess: () -> Unit) {
        _state.value = AuthState.Loading
        viewModelScope.launch {
            val res = authService.signUp(email, password)
            if (res.isSuccess) {
                _state.value = AuthState.Success(email)
                onSuccess()
            } else {
                _state.value = AuthState.Error(res.exceptionOrNull()?.message ?: "Falha no cadastro")
            }
        }
    }

    fun signIn(email: String, password: String, onSuccess: () -> Unit) {
        _state.value = AuthState.Loading
        viewModelScope.launch {
            val res = authService.signIn(email, password)
            if (res.isSuccess) {
                _state.value = AuthState.Success(email)
                onSuccess()
            } else {
                _state.value = AuthState.Error(res.exceptionOrNull()?.message ?: "Falha no login")
            }
        }
    }
}
