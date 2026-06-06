import { ethers } from "ethers";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  console.error("❌ PRIVATE_KEY is not defined in .env");
  process.exit(1);
}

const RPC_URL = "https://testnet-rpc.monad.xyz";
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(privateKey, provider);

function loadArtifact(contractName) {
  const artifactPath = path.resolve(
    `./src/artifacts/contracts/${contractName}.sol/${contractName}.json`
  );
  return JSON.parse(fs.readFileSync(artifactPath, "utf8"));
}

async function main() {
  console.log(`📡 Conectando a Monad Testnet (${RPC_URL})...`);
  console.log(`👛 Desplegando desde: ${wallet.address}`);
  
  const balance = await provider.getBalance(wallet.address);
  console.log(`💰 Saldo: ${ethers.formatEther(balance)} MON`);

  if (balance === 0n) {
    console.error("❌ No tienes fondos suficientes en la wallet para pagar el gas.");
    process.exit(1);
  }

  // 1. Deploy NFTCards
  console.log("\n📦 Desplegando MonadRoad_NFTCards...");
  const nftCardsArtifact = loadArtifact("MonadRoad_NFTCards");
  const NFTCardsFactory = new ethers.ContractFactory(
    nftCardsArtifact.abi,
    nftCardsArtifact.bytecode,
    wallet
  );
  const nftCards = await NFTCardsFactory.deploy("ipfs://QmDemoBaseURI/");
  await nftCards.waitForDeployment();
  const nftCardsAddress = await nftCards.getAddress();
  console.log(`✅ MonadRoad_NFTCards desplegado en: ${nftCardsAddress}`);

  // 2. Deploy GameState
  console.log("\n📦 Desplegando MonadRoad_GameState...");
  const gameStateArtifact = loadArtifact("MonadRoad_GameState");
  const GameStateFactory = new ethers.ContractFactory(
    gameStateArtifact.abi,
    gameStateArtifact.bytecode,
    wallet
  );
  const gameState = await GameStateFactory.deploy();
  await gameState.waitForDeployment();
  const gameStateAddress = await gameState.getAddress();
  console.log(`✅ MonadRoad_GameState desplegado en: ${gameStateAddress}`);

  // 3. Deploy DeckManager
  console.log("\n📦 Desplegando MonadRoad_DeckManager...");
  const deckManagerArtifact = loadArtifact("MonadRoad_DeckManager");
  const DeckManagerFactory = new ethers.ContractFactory(
    deckManagerArtifact.abi,
    deckManagerArtifact.bytecode,
    wallet
  );
  const deckManager = await DeckManagerFactory.deploy(nftCardsAddress);
  await deckManager.waitForDeployment();
  const deckManagerAddress = await deckManager.getAddress();
  console.log(`✅ MonadRoad_DeckManager desplegado en: ${deckManagerAddress}`);

  // Configure permissions
  console.log("\n⚙️ Configurando permisos...");
  const setMinterTx = await nftCards.setMinter(gameStateAddress, true);
  await setMinterTx.wait();
  console.log("✅ Permisos de Minter asignados a GameState");

  const setNFTTx = await gameState.setNFTContract(nftCardsAddress);
  await setNFTTx.wait();
  console.log("✅ Contrato NFT asignado a GameState");

  console.log("\n🎉 ¡Despliegue completado con éxito!");
  console.log("----------------------------------------");
  console.log(`VITE_NFT_CARDS_ADDRESS=${nftCardsAddress}`);
  console.log(`VITE_GAME_STATE_ADDRESS=${gameStateAddress}`);
  console.log(`VITE_DECK_MANAGER_ADDRESS=${deckManagerAddress}`);
  console.log("----------------------------------------");
}

main().catch((error) => {
  console.error("❌ Error durante el despliegue:", error);
  process.exit(1);
});
