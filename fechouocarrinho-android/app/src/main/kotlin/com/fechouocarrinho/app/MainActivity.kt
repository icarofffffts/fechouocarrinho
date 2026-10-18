package com.fechouocarrinho.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.fechouocarrinho.app.data.local.AppDatabase
import com.fechouocarrinho.app.data.remote.SupabaseService
import com.fechouocarrinho.app.data.repository.PriceRepositoryImpl
import com.fechouocarrinho.app.domain.usecase.ExtractPricesUseCase
import com.fechouocarrinho.app.domain.usecase.SavePriceUseCase
import com.fechouocarrinho.app.domain.usecase.SyncPricesUseCase
import com.fechouocarrinho.app.ocr.PriceExtractor
import com.fechouocarrinho.app.ocr.TextRecognitionHelper
import com.fechouocarrinho.app.presentation.camera.CameraScreen
import com.fechouocarrinho.app.presentation.camera.CameraViewModel
import com.fechouocarrinho.app.presentation.home.HomeScreen
import com.fechouocarrinho.app.presentation.home.HomeViewModel
import com.fechouocarrinho.app.presentation.list.PriceListScreen
import com.fechouocarrinho.app.presentation.list.PriceListViewModel
import com.fechouocarrinho.app.presentation.screens.CarrinhoFechadoScreenReal
import com.fechouocarrinho.app.presentation.screens.ComparadorScreenReal
import com.fechouocarrinho.app.presentation.screens.CorrecaoOcrScreenReal
import com.fechouocarrinho.app.presentation.screens.ListasScreenReal
import com.fechouocarrinho.app.presentation.screens.ManualScreenReal
import com.fechouocarrinho.app.presentation.screens.PerfilScreenReal
import com.fechouocarrinho.app.presentation.screens.ReciboScreenReal
import com.fechouocarrinho.app.presentation.screens.SelecaoMercadoScreenReal
import com.fechouocarrinho.app.presentation.screens.SplashScreenReal
import com.fechouocarrinho.app.presentation.theme.FechouOCarrinhoTheme

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
                    NavHost(navController = navController, startDestination = "home") {
                        composable("home") {
                            val viewModel: HomeViewModel = viewModel {
                                HomeViewModel(repository = repository)
                            }
                            HomeScreen(
                                viewModel = viewModel,
                                onNavigateToCamera = { navController.navigate("camera") },
                                onNavigateToList = { navController.navigate("list") },
                                onNavigateToSupermarkets = { navController.navigate("list") },
                                onNavigateToHelp = { navController.navigate("list") }
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
                                onNavigateToList = { navController.navigate("list") }
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
                        composable("carrinho") { CarrinhoFechadoScreenReal(onFinalizar = { navController.popBackStack() }, onCompartilhar = {}) }
                        composable("comparador") { ComparadorScreenReal(onRota = {}) }
                        composable("listas") { ListasScreenReal(onNovaLista = { navController.navigate("home") }) }
                        composable("perfil") { PerfilScreenReal() }
                        composable("splash") { SplashScreenReal(onComeçar = { navController.navigate("home") }) }
                        composable("selecao") { SelecaoMercadoScreenReal() }
                        composable("manual") { ManualScreenReal() }
                        composable("correcao") { CorrecaoOcrScreenReal() }
                        composable("recibo") { ReciboScreenReal() }
                    }
                }
            }
        }
    }
}
