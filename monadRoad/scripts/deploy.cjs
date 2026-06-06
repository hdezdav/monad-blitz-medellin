const hre = require("hardhat");

async function main() {
  console.log("Desplegando contratos en Monad Testnet...");

  // 1. Deploy NFTCards
  const NFTCards = await hre.ethers.getContractFactory("MonadRoad_NFTCards");
  const nftCards = await NFTCards.deploy("ipfs://QmDemoBaseURI/");
  await nftCards.waitForDeployment();
  const nftCardsAddress = await nftCards.getAddress();
  console.log(`✅ MonadRoad_NFTCards desplegado en: ${nftCardsAddress}`);

  // 2. Deploy GameState
  const GameState = await hre.ethers.getContractFactory("MonadRoad_GameState");
  const gameState = await GameState.deploy();
  await gameState.waitForDeployment();
  const gameStateAddress = await gameState.getAddress();
  console.log(`✅ MonadRoad_GameState desplegado en: ${gameStateAddress}`);

  // 3. Deploy DeckManager
  const DeckManager = await hre.ethers.getContractFactory("MonadRoad_DeckManager");
  const deckManager = await DeckManager.deploy(nftCardsAddress);
  await deckManager.waitForDeployment();
  const deckManagerAddress = await deckManager.getAddress();
  console.log(`✅ MonadRoad_DeckManager desplegado en: ${deckManagerAddress}`);

  // Configure permissions
  console.log("Configurando permisos...");
  await nftCards.setMinter(gameStateAddress, true);
  console.log("✅ Permisos configurados");

  console.log("Despliegue completado.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
