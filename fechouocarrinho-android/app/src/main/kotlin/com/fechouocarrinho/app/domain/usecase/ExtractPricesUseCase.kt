package com.fechouocarrinho.app.domain.usecase

import android.graphics.Bitmap
import com.fechouocarrinho.app.domain.model.Price
import com.fechouocarrinho.app.ocr.PriceExtractor
import com.fechouocarrinho.app.ocr.TextRecognitionHelper

class ExtractPricesUseCase(
    private val textRecognition: TextRecognitionHelper,
    private val priceExtractor: PriceExtractor
) {
    suspend operator fun invoke(bitmap: Bitmap): Result<List<Price>> {
        return textRecognition.recognizeText(bitmap).map { recognizedText ->
            priceExtractor.extract(recognizedText).map { extracted ->
                Price(
                    label = extracted.label,
                    value = extracted.value,
                    rawText = extracted.rawText,
                    syncStatus = "PENDING"
                )
            }
        }
    }
}
