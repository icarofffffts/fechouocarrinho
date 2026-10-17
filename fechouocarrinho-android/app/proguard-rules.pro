# Keep MVVM / Compose / Room / Serialization / ML Kit
-keepclassmembers class * extends androidx.lifecycle.ViewModel {
    <init>(...);
}
-keep class androidx.compose.** { *; }
-keep class com.google.mlkit.** { *; }
-keep class com.fechouocarrinho.app.data.local.** { *; }
-keepclassmembers class com.fechouocarrinho.app.data.local.** { *; }
-dontwarn org.bouncycastle.**
-dontwarn org.conscrypt.**
-dontwarn org.openjsse.**
