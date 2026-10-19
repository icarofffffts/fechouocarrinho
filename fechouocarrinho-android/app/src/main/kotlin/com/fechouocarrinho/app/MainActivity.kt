package com.fechouocarrinho.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.fechouocarrinho.app.data.local.AppDatabase
import com.fechouocarrinho.app.data.remote.SupabaseService
import com.fechouocarrinho.app.data.repository.PriceRepositoryImpl
import com.fechouocarrinho.app.domain.model.Price
import com.fechouocarrinho.app.domain.usecase.ExtractPricesUseCase
import com.fechouocarrinho.app.domain.usecase.SavePriceUseCase
import com.fechouocarrinho.app.domain.usecase.SyncPricesUseCase
import com.fechouocarrinho.app.ocr.PriceExtractor
import com.fechouocarrinho.app.ocr.TextRecognitionHelper
import com.fechouocarrinho.app.presentation.auth.AuthScreen
import com.fechouocarrinho.app.presentation.auth.SyncScreen
import com.fechouocarrinho.app.presentation.camera.CameraScreen
import com.fechouocarrinho.app.presentation.camera.CameraViewModel
import com.fechouocarrinho.app.presentation.home.HomeScreen
import com.fechouocarrinho.app.presentation.home.HomeViewModel
import com.fechouocarrinho.app.presentation.list.PriceListScreen
import com.fechouocarrinho.app.presentation.list.PriceListViewModel
import com.fechouocarrinho.app.presentation.screens.*
import com.fechouocarrinho.app.presentation.theme.FechouOCarrinhoTheme
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {

    private val database by lazy { (application as FechouOCarrinhoApplication).database }
    private val repository by lazy { PriceRepositoryImpl(database.priceDao(), SupabaseService.create()) }
    private val textRecognition by lazy { TextRecognitionHelper(this) }
    private val priceExtractor by lazy { PriceExtractor() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            FechouOCarrinhoTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val navController = rememberNavController()
                    var currentMarket by remember { mutableStateOf("Supermercados BH") }

                    NavHost(navController = navController, startDestination = "home") {
                        composable("home") {
                            val viewModel: HomeViewModel = viewModel {
                                HomeViewModel(repository = repository)
                            }
                            HomeScreen(
                                viewModel = viewModel,
                                onNavigateToCamera = { navController.navigate("camera") },
                                onNavigateToList = { navController.navigate("listas") },
                                onNavigateToCarrinho = { navController.navigate("carrinho") },
                                onNavigateToPerfil = { navController.navigate("perfil") },
                                onNavigateToSupermarkets = { navController.navigate("selecao") },
                                onNavigateToHelp = { navController.navigate("splash") },
                                selectedSupermarket = currentMarket
                            )
                        }

                        composable("camera") {
                            val viewModel: CameraViewModel = viewModel {
                                CameraViewModel(
                                    extractPricesUseCase = ExtractPricesUseCase(textRecognition, priceExtractor),
                                    savePriceUseCase = SavePriceUseCase(repository)
                                )
                            }
                            CameraScreen(
                                viewModel = viewModel,
                                onNavigateToList = {
                                    navController.navigate("home") {
                                        popUpTo("home") { inclusive = true }
                                    }
                                }
                            )
                        }

                        composable("list") {
                            val viewModel: PriceListViewModel = viewModel {
                                PriceListViewModel(
                                    repository = repository,
                                    syncPricesUseCase = SyncPricesUseCase(repository)
                                )
                            }
                            PriceListScreen(
                                viewModel = viewModel,
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("carrinho") {
                            val prices by repository.prices.collectAsState(initial = emptyList())
                            CarrinhoFechadoScreenReal(
                                prices = prices,
                                marketName = currentMarket,
                                onFinalizar = { navController.navigate("recibo") },
                                onCompartilhar = { navController.navigate("recibo") },
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("comparador") {
                            ComparadorScreenReal(
                                onRota = {},
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("listas") {
                            val prices by repository.prices.collectAsState(initial = emptyList())
                            ListasScreenReal(
                                prices = prices,
                                onNovaLista = { navController.navigate("home") },
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("perfil") {
                            val prices by repository.prices.collectAsState(initial = emptyList())
                            PerfilScreenReal(
                                totalEconomizado = prices.sumOf { it.value },
                                nome = "Usuário",
                                onBack = { navController.popBackStack() },
                                onNavigateToAuth = { navController.navigate("auth") }
                            )
                        }

                        composable("splash") {
                            SplashScreenReal(
                                onComeçar = {
                                    navController.navigate("home") {
                                        popUpTo("splash") { inclusive = true }
                                    }
                                }
                            )
                        }

                        composable("selecao") {
                            SelecaoMercadoScreenReal(
                                currentMarket = currentMarket,
                                onSelectMarket = { market ->
                                    currentMarket = market
                                    navController.popBackStack()
                                },
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("manual") {
                            val scope = rememberCoroutineScope()
                            ManualScreenReal(
                                onSave = { nome, valor ->
                                    scope.launch {
                                        repository.save(
                                            Price(
                                                label = nome,
                                                value = valor,
                                                rawText = PriceExtractor.formatCurrency(valor),
                                                syncStatus = "PENDING"
                                            )
                                        )
                                        navController.popBackStack()
                                    }
                                },
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("correcao") {
                            CorrecaoOcrScreenReal(
                                onConfirm = { navController.popBackStack() },
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("recibo") {
                            val prices by repository.prices.collectAsState(initial = emptyList())
                            ReciboScreenReal(
                                prices = prices,
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("auth") {
                            AuthScreen(
                                onContinueOffline = {
                                    navController.navigate("home") {
                                        popUpTo("auth") { inclusive = true }
                                    }
                                },
                                onGoogleSignIn = { navController.navigate("sync") },
                                onCreateAccount = { _, _ -> navController.navigate("sync") },
                                onLogin = { navController.navigate("sync") }
                            )
                        }

                        composable("sync") {
                            SyncScreen(
                                onDisconnect = {
                                    navController.navigate("home") {
                                        popUpTo("sync") { inclusive = true }
                                    }
                                }
                            )
                        }
                    }
                }
            }
        }
    }
}
