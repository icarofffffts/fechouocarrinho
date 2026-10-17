plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.google.devtools.ksp")
    id("org.jetbrains.kotlin.plugin.serialization")
}

android {
    namespace = "com.fechouocarrinho.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.fechouocarrinho.app"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        // Low-end: reduzir recursos nativos desnecessários
        vectorDrawables.useSupportLibrary = true

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

        // Configurações Supabase (substituir pelos valores reais no CI/local.properties)
        buildConfigField("String", "SUPABASE_URL", "\"https://fechouocarrinho.supermarkets\"")
        buildConfigField("String", "SUPABASE_KEY", "\"YOUR_ANON_KEY\"")
        buildConfigField("String", "SUPABASE_PROFILE", "\"public\"")
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            // Ofuscação leve para manter stack traces úteis em low-end
            signingConfig = signingConfigs.getByName("debug")
        }
        debug {
            isMinifyEnabled = false
            applicationIdSuffix = ".debug"
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    buildFeatures {
        compose = true
        buildConfig = true
    }

    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.14"
    }

    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    val composeBom = platform("androidx.compose:compose-bom:2024.05.00")
    implementation(composeBom)
    androidTestImplementation(composeBom)

    // Core AndroidX
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.1")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.1")
    implementation("androidx.activity:activity-compose:1.9.0")

    // Compose UI
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.compose.material:material-icons-extended")

    // Navigation
    implementation("androidx.navigation:navigation-compose:2.7.7")
    debugImplementation("androidx.compose.ui:ui-tooling")
    debugImplementation("androidx.compose.ui:ui-test-manifest")

    // CameraX
    val cameraxVersion = "1.3.3"
    implementation("androidx.camera:camera-core:$cameraxVersion")
    implementation("androidx.camera:camera-camera2:$cameraxVersion")
    implementation("androidx.camera:camera-lifecycle:$cameraxVersion")
    implementation("androidx.camera:camera-view:$cameraxVersion")

    // ML Kit Text Recognition via Play Services (0MB no APK; modelo baixado sob demanda)
    implementation("com.google.android.gms:play-services-mlkit-text-recognition:19.0.1")

    // Room
    val roomVersion = "2.6.1"
    implementation("androidx.room:room-runtime:$roomVersion")
    implementation("androidx.room:room-ktx:$roomVersion")
    ksp("androidx.room:room-compiler:$roomVersion")

    // Network: OkHttp leve para low-end
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")

    // Serialization
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.3")

    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.1")

    // Tests
    testImplementation("junit:junit:4.13.2")
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.8.1")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
}
