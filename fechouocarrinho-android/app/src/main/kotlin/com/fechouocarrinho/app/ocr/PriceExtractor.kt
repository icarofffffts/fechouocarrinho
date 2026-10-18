package com.fechouocarrinho.app.ocr

import java.text.NumberFormat
import java.util.Locale

class PriceExtractor {

    data class ExtractedPrice(
        val label: String,
        val value: Double,
        val rawText: String,
        val confidence: Int = 94
    )

    fun extract(text: String): List<ExtractedPrice> {
        if (text.isBlank()) return emptyList()

        val results = mutableListOf<ExtractedPrice>()
        val lines = text.lines().map { it.trim() }.filter { it.isNotEmpty() }

        // 1. Padrões com prefixo explícito de moeda: R$, RS, $, R$ / UN
        val explicitMatches = EXPLICIT_PRICE_REGEX.findAll(text).toList()
        for (match in explicitMatches) {
            val raw = match.value
            val value = parsePriceValue(raw)
            if (isValidSupermarketPrice(value)) {
                val label = inferLabelFromContext(text, match.range.first, match.range.last, lines, raw)
                results.add(ExtractedPrice(label = label, value = value, rawText = raw))
            }
        }

        // 2. Se nenhum explícito foi encontrado, busca números com vírgula (ex: 14,90 ou 4,78 ou 1.234,56)
        if (results.isEmpty()) {
            val commaMatches = COMMA_PRICE_REGEX.findAll(text).toList()
            for (match in commaMatches) {
                val raw = match.value
                val value = parsePriceValue(raw)
                if (isValidSupermarketPrice(value) && !isDateOrWeight(text, match.range.first, match.range.last)) {
                    val label = inferLabelFromContext(text, match.range.first, match.range.last, lines, raw)
                    results.add(ExtractedPrice(label = label, value = value, rawText = raw))
                }
            }
        }

        // 3. Se ainda vazio, busca espaço decimal (ex: "10 98" do Zepa / etiquetas eletrônicas de gôndola)
        if (results.isEmpty()) {
            val spaceMatches = SPACE_DECIMAL_REGEX.findAll(text).toList()
            for (match in spaceMatches) {
                val raw = match.value
                val value = parsePriceValue(raw)
                if (isValidSupermarketPrice(value) && !isDateOrWeight(text, match.range.first, match.range.last)) {
                    val label = inferLabelFromContext(text, match.range.first, match.range.last, lines, raw)
                    results.add(ExtractedPrice(label = label, value = value, rawText = raw))
                }
            }
        }

        // 4. Se ainda vazio, busca ponto decimal (ex: "14.90")
        if (results.isEmpty()) {
            val dotMatches = DOT_DECIMAL_REGEX.findAll(text).toList()
            for (match in dotMatches) {
                val raw = match.value
                val value = parsePriceValue(raw)
                if (isValidSupermarketPrice(value) && !isDateOrWeight(text, match.range.first, match.range.last)) {
                    val label = inferLabelFromContext(text, match.range.first, match.range.last, lines, raw)
                    results.add(ExtractedPrice(label = label, value = value, rawText = raw))
                }
            }
        }

        return results.distinctBy { it.value }
    }

    private fun parsePriceValue(raw: String): Double {
        val cleaned = raw
            .replace(Regex("""(?i)[rR][sS]\$?"""), "")
            .replace("$", "")
            .trim()

        // Trata espaço como decimal se for formato "10 98"
        val normalized = if (cleaned.contains(" ") && !cleaned.contains(",") && !cleaned.contains(".")) {
            val parts = cleaned.split(Regex("\\s+"))
            if (parts.size == 2 && parts[1].length in 1..2) {
                "${parts[0]}.${parts[1]}"
            } else {
                cleaned.replace(" ", "")
            }
        } else if (cleaned.contains(".") && !cleaned.contains(",") && cleaned.matches(Regex(""".*\.\d{2}"""))) {
            // Ponto como decimal (ex: 18.50) - mantém o ponto
            cleaned.replace(" ", "")
        } else {
            cleaned.replace(" ", "")
                .replace(".", "")
                .replace(",", ".")
        }

        return normalized.toDoubleOrNull() ?: 0.0
    }

    private fun isValidSupermarketPrice(value: Double): Boolean {
        // Preço típico de item de supermercado: entre R$ 0,10 e R$ 2.000,00
        return value in 0.10..2000.00
    }

    private fun isDateOrWeight(text: String, start: Int, end: Int): Boolean {
        val before = text.substring(0.coerceAtLeast(start - 4), start).lowercase()
        val after = text.substring(end, (end + 4).coerceAtMost(text.length)).lowercase()

        if (before.endsWith("/") || after.startsWith("/")) return true
        if (after.startsWith("g") || after.startsWith("kg") || after.startsWith("ml") || after.startsWith("l")) return true
        return false
    }

    private fun inferLabelFromContext(
        text: String,
        matchStart: Int,
        matchEnd: Int,
        lines: List<String>,
        rawPrice: String
    ): String {
        val lineStart = text.lastIndexOf('\n', matchStart).coerceAtLeast(0)
        val lineEnd = text.indexOf('\n', matchEnd).let { if (it == -1) text.length else it }
        val currentLine = text.substring(lineStart, lineEnd).replace(rawPrice, "").trim()
        val cleanedCurrent = cleanLabelText(currentLine)
        if (isValidProductTitle(cleanedCurrent)) {
            return cleanedCurrent
        }

        // Prioriza a linha imediatamente anterior ao preço (caso Zepa: LEITE INTEGRAL 1L antes de 10 98)
        val priceLineIndex = lines.indexOfFirst { it.contains(rawPrice) || it.trim() == rawPrice.trim() }
        if (priceLineIndex > 0) {
            val prevLine = cleanLabelText(lines[priceLineIndex - 1].replace(rawPrice, ""))
            if (isValidProductTitle(prevLine) && prevLine.length >= 3) {
                // Verifica se não é palavra ignorada isolada
                val upperPrev = prevLine.uppercase()
                val isIgnored = setOf("EPA", "ZEPA", "BH", "SUPERMERCADOS", "CARREFOUR", "MART", "MINAS", "OFERTA", "PRECO", "VAL", "LOTE", "FAB", "TOTAL", "UN", "KG").any { upperPrev == it || upperPrev.startsWith("$it ") || upperPrev.endsWith(" $it") }
                if (!isIgnored) return prevLine
            }
        }
        val ignoreWords = setOf("EPA", "ZEPA", "BH", "SUPERMERCADOS", "CARREFOUR", "MART", "MINAS", "OFERTA", "PRECO", "VAL", "LOTE", "FAB", "TOTAL", "UN", "KG")
        val candidateLines = lines
            .map { cleanLabelText(it.replace(rawPrice, "")) }
            .filter { isValidProductTitle(it) && !ignoreWords.contains(it.uppercase()) }

        if (candidateLines.isNotEmpty()) {
            return candidateLines.maxByOrNull { it.length } ?: "Produto identificado"
        }

        return "Produto identificado"
    }

    private fun cleanLabelText(text: String): String {
        return text
            .replace(Regex("[^\\p{L}0-9\\s]"), " ")
            .replace(Regex("\\s+"), " ")
            .trim()
    }

    private fun isValidProductTitle(text: String): Boolean {
        val lettersCount = text.count { it.isLetter() }
        return text.length >= 3 && lettersCount >= 2
    }

    companion object {
        // R$ 14,90 | R$ 10 98 | R$14.90 | RS 4,78 | $ 12,50
        val EXPLICIT_PRICE_REGEX = Regex(
            """(?:R\$\s*|RS\s*|\$\s*)\d{1,3}(?:\.\d{3})*(?:[,\s.]\d{1,2})|(?i:R\$\s*|RS\s*|\$\s*)\d+(?:[,\s.]\d{1,2})?""",
            RegexOption.IGNORE_CASE
        )

        // 14,90 | 4,78 | 1.234,56
        val COMMA_PRICE_REGEX = Regex(
            """\b\d{1,3}(?:\.\d{3})*,\d{2}\b"""
        )

        // 10 98 | 14 90 (espaço decimal comum em etiquetas eletrônicas de gôndola Zepa/EPA)
        val SPACE_DECIMAL_REGEX = Regex(
            """\b\d{1,3}\s+\d{2}\b"""
        )

        // 14.90 | 4.78
        val DOT_DECIMAL_REGEX = Regex(
            """\b\d{1,3}\.\d{2}\b"""
        )

        // Regex mantido para compatibilidade
        val PRICE_REGEX = Regex(
            """(?:R\$\s*|RS\s*|\$\s*)?\b\d{1,3}(?:\.\d{3})*(?:[,\s.]\d{2})\b|(?:R\$\s*|RS\s*|\$\s*)\d+(?:[,\s.]\d{1,2})?""",
            RegexOption.IGNORE_CASE
        )

        fun formatCurrency(value: Double): String {
            return NumberFormat.getCurrencyInstance(Locale("pt", "BR")).format(value)
        }
    }
}