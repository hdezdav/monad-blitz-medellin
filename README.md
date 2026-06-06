# 🃏 MonadRoad
> Trading Card Game educativo sobre blockchain, construido en **Monad**.

Aprende criptomonedas, seguridad Web3 y contratos inteligentes jugando — cada batalla es un concepto real, cada victoria es un NFT en tu wallet.

---

## 🎮 Cómo funciona

1. **Conecta tu wallet** → el juego te guía desde cero si no tienes una
2. **Recibe tu Starter Pack** → cartas NFT gratuitas para armar tu primer mazo
3. **Combate y aprende** → cada enemigo representa una amenaza blockchain real
4. **Captura al jefe** → al ganar, la carta del enemigo se mintea en tu wallet

### Las 3 Fases

| Fase | Temática | Jefe |
|---|---|---|
| 🔹 Fase 1 — Primer Contacto | Wallets, bloques, transacciones | Hacker Duplicador |
| 🔸 Fase 2 — La Red y la Seguridad | Phishing, ransomware, seed phrases | Ransomware Interceptor |
| 🔺 Fase 3 — La Frontera Web3 | Smart Contracts, Gas, DeFi | Monstruo del Gas Alto |

> **Evento especial Fase 2:** el enemigo "hackea" el juego en tiempo real y el jugador debe demostrar que tiene su seed phrase respaldada para ganar ventaja táctica — aprendizaje real integrado en la mecánica.

---

## 🃏 Cartas

| Nombre | Rareza | ATK | DEF | Rol |
|---|---|---|---|---|
| Filtro Anti-Phishing | Common | 30 | 50 | Counter phishing |
| Frase Semilla Física | Rare | 0 | 90 | Defensa / restauración |
| Canal de Capa 2 (Rollup) | Common | 20 | 20 | Reduce gas fees |
| Smart Contract Blindado | Common | 45 | 30 | Ataque directo |
| Firma Digital (Llave Privada) | Rare | 60 | 10 | Daño doble si contrato expuesto |
| Libro Contable Inmutable | Common | 15 | 60 | Revela cartas ocultas |
| Paralelismo Monad | Legendary | 70 | 40 | Juega 2 cartas ofensivas en 1 turno |
| Hacker Duplicador *(capturable)* | Legendary | 40 | 100 | Duplica efecto de tu próxima carta |
| Ransomware Interceptor *(capturable)* | Legendary | 60 | 150 | Congela al rival 1 turno |
| Monstruo del Gas Alto *(capturable)* | Legendary | 80 | 200 | Reduce cooldown entre salas |

---

## 📦 Contratos Inteligentes

Todos los contratos están desplegados sobre **Monad** (EVM, ejecución paralela).

| Contrato | Estándar | Dónde se usa |
|---|---|---|
| `MonadRoad_NFTCards.sol` | ERC-1155 | Minteo del Starter Pack gratuito, sobres de recompensa por fase y minteo de la carta del jefe al capturarlo |
| `MonadRoad_GameState.sol` | Custom | Registro on-chain del progreso del jugador, verificación del evento educativo de seed phrase (Fase 2) y control de acceso entre fases |
| `MonadRoad_DeckManager.sol` | Custom + ERC-1155 | Guardado y validación del mazo activo — verifica que el jugador posea las cartas que quiere usar antes de cada combate |

---

## 🛠️ Stack

`Monad` · `Solidity` · `ERC-1155` · `React` · `Wagmi` · `RainbowKit` · `IPFS`

---

## 🚀 Setup

```bash
git clone https://github.com/tu-org/monadroad.git
cd monadroad
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network monad-testnet
npm run dev
```

---

MIT License