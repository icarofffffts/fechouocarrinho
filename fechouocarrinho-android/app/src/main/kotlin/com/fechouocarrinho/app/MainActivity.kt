package com.fechouocarrinho.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.fechouocarrinho.app.data.remote.SupabaseService
import com.fechouocarrinho.app.data.repository.MarketRepositoryImpl
import com.fechouocarrinho.app.data.repository.PriceRepositoryImpl
import com.fechouocarrinho.app.domain.model.Price
import com.fechouocarrinho.app.domain.usecase.ExtractPricesUseCase
import com.fechouocarrinho.app.domain.usecase.SavePriceUseCase
import com.fechouocarrinho.app.domain.usecase.SyncPricesUseCase
import com.fechouocarrinho.app.ocr.PriceExtractor
import com.fechouocarrinho.app.ocr.TextRecognitionHelper
import com.fechouocarrinho.app.presentation.auth.AuthScreen
import com.fechouocarrinho.app.presentation.auth.AuthState
import com.fechouocarrinho.app.presentation.auth.AuthViewModel
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
    private val settings by lazy { (application as FechouOCarrinhoApplication).settings }
    private val marketRepository by lazy {
        MarketRepositoryImpl(database.supermarketDao(), SupabaseService.create(), settings)
    }
    private val repository by lazy {
        PriceRepositoryImpl(
            database.priceDao(),
            SupabaseService.create(),
            database.shoppingListDao(),
            settings
        )
    }
    private val textRecognition by lazy { TextRecognitionHelper(this) }
    private val priceExtractor by lazy { PriceExtractor() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            LaunchedEffect(Unit) { repository.ensureDefaultList() }
            FechouOCarrinhoTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val navController = rememberNavController()
                    val scope = rememberCoroutineScope()

                    val markets by marketRepository.markets.collectAsState(initial = emptyList())
                    val selectedMarketId by marketRepository.selectedMarketId.collectAsState()
                    val selectedMarketName by marketRepository.selectedMarketName.collectAsState()
                    val budgetGoal by settings.budgetGoal.collectAsState()
                    val userEmail by settings.userEmail.collectAsState()

                    var marketsLoading by remember { mutableStateOf(false) }
                    var marketsError by remember { mutableStateOf<String?>(null) }

                    val refreshMarkets: () -> Unit = {
                        scope.launch {
                            marketsLoading = true
                            marketsError = null
                            val result = marketRepository.refresh()
                            marketsError = result.exceptionOrNull()?.message
                            marketsLoading = false
                        }
                    }

                    // Primeira carga: sincroniza as redes reais do Supabase (cache em Room).
                    LaunchedEffect(Unit) {
                        marketsLoading = true
                        val result = marketRepository.refresh()
                        marketsError = result.exceptionOrNull()?.message
                        marketsLoading = false
                    }

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
                                onNavigateToManual = { navController.navigate("manual") },
                                onNavigateToHelp = { navController.navigate("splash") },
                                selectedSupermarket = selectedMarketName,
                                budgetGoal = budgetGoal,
                                onSetBudgetGoal = { settings.setBudgetGoal(it) },
                                onSetPrice = { id, value -> scope.launch { repository.setPrice(id, value) } }
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
                                marketName = selectedMarketName,
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
                                marketName = selectedMarketName,
                                meta = budgetGoal,
                                onFinalizar = { navController.navigate("recibo") },
                                onCompartilhar = { navController.navigate("recibo") },
                                onComparar = { navController.navigate("comparador") },
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("comparador") {
                            val prices by repository.prices.collectAsState(initial = emptyList())
                            ComparadorScreenReal(
                                prices = prices,
                                onRota = {},
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("listas") {
                            val summaries by repository.summaries.collectAsState(initial = emptyList())
                            val activeListId by repository.activeListId.collectAsState()
                            ListasScreenReal(
                                summaries = summaries,
                                activeListId = activeListId,
                                onSelectList = { id -> scope.launch { repository.selectList(id) } },
                                onNovaLista = { name -> scope.launch { repository.createList(name) } },
                                onDeleteList = { id -> scope.launch { repository.deleteList(id) } },
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("perfil") {
                            val prices by repository.prices.collectAsState(initial = emptyList())
                            val lists by repository.lists.collectAsState(initial = emptyList())
                            var showOfflineInfo by remember { mutableStateOf(false) }
                            PerfilScreenReal(
                                nome = userEmail?.substringBefore("@") ?: "Convidado",
                                accountLabel = userEmail ?: "Sem conta conectada · modo offline",
                                totalRegistrado = prices.sumOf { it.subtotal },
                                itemCount = prices.size,
                                listCount = lists.size,
                                onNavigateToAuth = { navController.navigate("auth") },
                                onNavigateToMarkets = { navController.navigate("selecao") },
                                onNavigateToLists = { navController.navigate("listas") },
                                onShowOfflineInfo = { showOfflineInfo = true },
                                onBack = { navController.popBackStack() }
                            )
                            if (showOfflineInfo) {
                                AlertDialog(
                                    onDismissRequest = { showOfflineInfo = false },
                                    title = {
                                        Text(
                                            text = "Preferências & offline",
                                            fontWeight = androidx.compose.ui.text.font.FontWeight.ExtraBold
                                        )
                                    },
                                    text = {
                                        Text(
                                            "Suas ${lists.size} listas e ${prices.size} itens ficam no banco local deste aparelho. " +
                                                "Sem conta conectada, nada é enviado para a nuvem. " +
                                                "A meta de orçamento e o mercado selecionado também ficam salvos aqui."
                                        )
                                    },
                                    confirmButton = {
                                        TextButton(onClick = { showOfflineInfo = false }) {
                                            Text(
                                                text = "Entendi",
                                                color = androidx.compose.ui.graphics.Color(0xFF1B8C42),
                                                fontWeight = androidx.compose.ui.text.font.FontWeight.Bold
                                            )
                                        }
                                    }
                                )
                            }
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
                                markets = markets,
                                selectedMarketId = selectedMarketId,
                                isLoading = marketsLoading,
                                errorMessage = marketsError,
                                onRefresh = refreshMarkets,
                                onSelectMarket = { market ->
                                    scope.launch { marketRepository.select(market) }
                                    navController.popBackStack()
                                },
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("manual") {
                            val scope = rememberCoroutineScope()
                            ManualScreenReal(
                                onSave = { nome, valor, qty ->
                                    scope.launch {
                                        repository.save(
                                            Price(
                                                label = nome,
                                                value = valor ?: 0.0,
                                                rawText = valor?.let { PriceExtractor.formatCurrency(it) } ?: "",
                                                syncStatus = "PENDING",
                                                qty = qty,
                                                planned = valor == null
                                            )
                                        )
                                        navController.popBackStack()
                                    }
                                },
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("correcao") {
                            val scope = rememberCoroutineScope()
                            CorrecaoOcrScreenReal(
                                preco = null,
                                onConfirm = { price ->
                                    scope.launch { repository.save(price) }
                                    navController.popBackStack()
                                },
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("recibo") {
                            val prices by repository.prices.collectAsState(initial = emptyList())
                            ReciboScreenReal(
                                prices = prices,
                                marketName = selectedMarketName,
                                onRemoveItem = { id -> scope.launch { repository.delete(id) } },
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("auth") {
                            val authViewModel: AuthViewModel = viewModel { AuthViewModel() }
                            val authState by authViewModel.state.collectAsState()
                            var showGoogleInfo by remember { mutableStateOf(false) }

                            AuthScreen(
                                isLoading = authState is AuthState.Loading,
                                errorMessage = (authState as? AuthState.Error)?.message,
                                onContinueOffline = {
                                    settings.setUserEmail(null)
                                    navController.navigate("home") {
                                        popUpTo("auth") { inclusive = true }
                                    }
                                },
                                onGoogleSignIn = { showGoogleInfo = true },
                                onCreateAccount = { email, password ->
                                    authViewModel.signUp(email, password) {
                                        settings.setUserEmail(email)
                                        navController.navigate("home") {
                                            popUpTo("auth") { inclusive = true }
                                        }
                                    }
                                },
                                onLogin = { email, password ->
                                    authViewModel.signIn(email, password) {
                                        settings.setUserEmail(email)
                                        navController.navigate("home") {
                                            popUpTo("auth") { inclusive = true }
                                        }
                                    }
                                }
                            )

                            if (showGoogleInfo) {
                                AlertDialog(
                                    onDismissRequest = { showGoogleInfo = false },
                                    title = { Text("Login com Google", fontWeight = androidx.compose.ui.text.font.FontWeight.ExtraBold) },
                                    text = { Text("O login com Google ainda não está disponível nesta versão. Use e-mail e senha ou continue offline.") },
                                    confirmButton = {
                                        TextButton(onClick = { showGoogleInfo = false }) {
                                            Text("Ok", color = androidx.compose.ui.graphics.Color(0xFF1B8C42), fontWeight = androidx.compose.ui.text.font.FontWeight.Bold)
                                        }
                                    }
                                )
                            }
                        }

                        composable("sync") {
                            val syncEnabled by settings.syncEnabled.collectAsState()
                            SyncScreen(
                                userEmail = userEmail.orEmpty(),
                                userName = userEmail?.substringBefore("@") ?: "Convidado",
                                isSyncEnabled = syncEnabled,
                                onToggleSync = { enabled ->
                                    settings.setSyncEnabled(enabled)
                                },
                                onDisconnect = {
                                    settings.setUserEmail(null)
                                    settings.setSyncEnabled(false)
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
