package com.fechouocarrinho.app.ocr

import android.content.Context
import android.graphics.Bitmap
import android.util.Log
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.TextRecognizer
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlin.coroutines.resume

class TextRecognitionHelper(context: Context) {

    private val recognizer: TextRecognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)

    suspend fun recognizeText(bitmap: Bitmap): Result<String> = suspendCancellableCoroutine { continuation ->
        val image = InputImage.fromBitmap(bitmap, 0)
        val task = recognizer.process(image)
            .addOnSuccessListener { visionText ->
                continuation.resume(Result.success(visionText.text))
            }
            .addOnFailureListener { error ->
                Log.e(TAG, "Falha no OCR", error)
                continuation.resume(Result.failure(error))
            }

        continuation.invokeOnCancellation {
            task.isComplete // não cancelável nativamente, mas evita leak
        }
    }

    companion object {
        private const val TAG = "TextRecognitionHelper"
    }
}
