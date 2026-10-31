# Anúncios

Os vídeos saem do projeto `motion/` (Remotion). Os arquivos `.mp4` ficam fora do git, então esta pasta guarda só a descrição.

## Spot vertical de 15 s (9:16, 1080×1920, 30 fps)

Composição `Spot15Vertical`, em `motion/src/Spot.tsx`:

| Cena | Tempo | Tela e fala |
|---|---|---|
| Abertura | 0–3 s | "Seu total, antes do caixa." |
| Leitor | 3–7 s | Tela do leitor de etiquetas, chip "+ R$ 28,90". "Aponte a câmera para a etiqueta…" |
| Total | 7–11 s | Tela inicial, total subindo até R$ 142,80. "…e veja o carrinho crescer, na hora." |
| Fechamento | 11,7–15 s | "Chegue ao caixa sabendo. Fechou o Carrinho." |

As falas estão em `motion/scripts/narration-eleven.mjs` (voz e modelo do ElevenLabs, chave só no ambiente).

```bash
cd motion
npm run prep                  # copia os mockups com as fotos embutidas
npm run render:spot           # motion/out/spot-15-vertical.mp4, sem áudio
node --env-file="$HOME/.env.local" scripts/narration-eleven.mjs spot1-hook   # idem spot1-scan e spot1-end
npm run render:spot:vo        # motion/out/spot-15-vertical-vo.mp4, com narração
```
