package com.fechouocarrinho.app.ocr

import java.text.NumberFormat
import java.util.Locale

class PriceExtractor {

    data class ExtractedPrice(
        val label: String,
        val value: Double,
        val rawText: String
    )

    fun extract(text: String): List<ExtractedPrice> {
        val matches = PRICE_REGEX.findAll(text)
        return matches.mapIndexed { index, matchResult ->
            val raw = matchResult.value
            // Remove prefixo "R$" e separadores de milhar; troca virgula decimal por ponto
            val numeric = raw
                .replace("R$", "", ignoreCase = true)
                .replace(" ", "")
                .replace(".", "")
                .replace(",", ".")
                .trim()
            val value = numeric.toDoubleOrNull() ?: 0.0

            // Tenta inferir um rotulo a partir do texto imediatamente anterior a linha
            val lineStart = text.lastIndexOf('\n', matchResult.range.first).coerceAtLeast(0)
            val lineEnd = text.indexOf('\n', matchResult.range.last).let { if (it == -1) text.length else it }
            val line = text.substring(lineStart, lineEnd).trim()
            val label = inferLabel(line, raw, index)

            ExtractedPrice(
                label = label,
                value = value,
                rawText = raw
            )
        }.toList()
    }

    private fun inferLabel(line: String, rawPrice: String, index: Int): String {
        // Remove o proprio preco da linha e limpa
        val cleaned = line.replace(rawPrice, "")
            .replace(Regex("[^\\p{L}0-9\\s]"), " ")
            .trim()
            .replace(Regex("\\s+"), " ")
        return if (cleaned.length >= 2) cleaned else "Item ${index + 1}"
    }

    companion object {
        // Captura padroes como R$ 1.234,56, R$1234,56, R$ 12,34, R$ 10
        val PRICE_REGEX = Regex(
            """R\$\s*\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?(?![\d.])|R\$\s*\d+(?:,\d{1,2})?(?![\d.])""",
            RegexOption.IGNORE_CASE
        )

        fun formatCurrency(value: Double): String {
            return NumberFormat.getCurrencyInstance(Locale("pt", "BR")).format(value)
        }
    }
}