package com.fechouocarrinho.app.ocr

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class PriceExtractorTest {

    private lateinit var extractor: PriceExtractor

    @Before
    fun setUp() {
        extractor = PriceExtractor()
    }

    @Test
    fun testExtractExplicitPriceWithRS() {
        val ocrText = """
            SUPERMERCADOS BH
            ARROZ CAMIL TIPO 1 5KG
            R$ 28,90
            PRECO POR UNIDADE
        """.trimIndent()

        val results = extractor.extract(ocrText)
        assertEquals(1, results.size)
        assertEquals(28.90, results[0].value, 0.001)
        assertTrue(results[0].label.contains("ARROZ CAMIL", ignoreCase = true))
    }

    @Test
    fun testExtractImplicitPriceWithoutRS() {
        val ocrText = """
            EPA SUPERMERCADOS
            FEIJAO CARIOCA CAMIL 1KG
            14,90
            UN
        """.trimIndent()

        val results = extractor.extract(ocrText)
        assertEquals(1, results.size)
        assertEquals(14.90, results[0].value, 0.001)
        assertTrue(results[0].label.contains("FEIJAO CARIOCA", ignoreCase = true))
    }

    @Test
    fun testExtractSpaceDecimalPriceZepa() {
        // Formato comum em etiquetas eletrônicas de gôndola do Zepa/EPA
        val ocrText = """
            SUPERMERCADO ZEPA
            LEITE INTEGRAL 1L
            10 98
            UNIDADE
        """.trimIndent()

        val results = extractor.extract(ocrText)
        assertEquals(1, results.size)
        assertEquals(10.98, results[0].value, 0.001)
        assertTrue(results[0].label.contains("LEITE INTEGRAL", ignoreCase = true))
    }

    @Test
    fun testExtractDotDecimalPrice() {
        val ocrText = """
            MART MINAS ATACADO
            CAFE TORRADO E MOIDO 500G
            18.50
        """.trimIndent()

        val results = extractor.extract(ocrText)
        assertEquals(1, results.size)
        assertEquals(18.50, results[0].value, 0.001)
        assertTrue(results[0].label.contains("CAFE TORRADO", ignoreCase = true))
    }

    @Test
    fun testFilterOutBarcodesAndDates() {
        val ocrText = """
            EPA
            SABONETE DOVE 90G
            COD: 7891234567890
            VAL: 10/12/2026
            R$ 4,78
        """.trimIndent()

        val results = extractor.extract(ocrText)
        assertEquals(1, results.size)
        assertEquals(4.78, results[0].value, 0.001)
    }
}
