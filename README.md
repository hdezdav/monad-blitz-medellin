# 🃏 MonadRoad
> Trading Card Game educativo sobre blockchain, construido en **Monad**.

Aprende criptomonedas, seguridad Web3 y contratos inteligentes jugando — cada batalla es un concepto real, cada victoria es un NFT único guardado directamente en tu wallet.

---

## 🎮 Cómo funciona

1. **Conecta tu wallet** → el juego te guía desde cero si no tienes una
2. **Recibe tu Starter Pack** → cartas NFT gratuitas no aleatorias que siguen el orden de la ruta de aprendizaje
3. **Combate y aprende** → cada enemigo representa una amenaza blockchain real
4. **Captura al jefe** → al ganar, la carta del enemigo y el sobre de la fase se mintean en tu wallet como NFTs individuales

### Las 3 Fases

| Fase | Temática | Jefe | Recompensa del Sobre |
|---|---|---|---|
| 🔹 Fase 1 — Primer Contacto | Wallets, bloques, transacciones | Hacker Duplicador | Frase Semilla Física |
| 🔸 Fase 2 — La Red y la Seguridad | Phishing, ransomware, seed phrases | Ransomware Interceptor | Firma Digital / Llave Privada |
| 🔺 Fase 3 — La Frontera Web3 | Smart Contracts, Gas, DeFi | Monstruo del Gas Alto | Paralelismo Monad |

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
| `MonadRoad_NFTCards.sol` | ERC-721 | Minteo del Starter Pack ordenado, sobres de recompensa individuales por fase y cartas de jefe. Almacena las estadísticas dinámicas on-chain y cuenta con una función optimizada `getOwnedCards` para consultar el inventario en una sola llamada. |
| `MonadRoad_GameState.sol` | Custom | Registro on-chain del progreso del jugador, verificación del evento educativo de seed phrase (Fase 2) y control de acceso entre fases |
| `MonadRoad_DeckManager.sol` | Custom + ERC-721 | Guardado y validación del mazo activo — verifica la propiedad mediante `ownerOf` de las cartas que el jugador quiere usar antes de cada combate |

---

## 🛠️ Stack

`Monad` · `Solidity` · `ERC-721` · `React` · `Wagmi` · `RainbowKit` · `IPFS`

---

## 🚀 Setup

```bash
# Clonar y entrar al proyecto
git clone https://github.com/tu-org/monadroad.git
cd monadroad/monadRoad

# Instalar dependencias
npm install

# Compilar contratos Solidity
npx hardhat compile

# Desplegar contratos inteligentes a Monad Testnet
node scripts/deploy-ethers.js

# Correr el servidor web localmente
npm run dev
```

---

MIT License