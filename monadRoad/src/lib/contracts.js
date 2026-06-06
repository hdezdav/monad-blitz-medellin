import NFTCardsArtifact from '../artifacts/contracts/MonadRoad_NFTCards.sol/MonadRoad_NFTCards.json';
import GameStateArtifact from '../artifacts/contracts/MonadRoad_GameState.sol/MonadRoad_GameState.json';

// Estas direcciones deben actualizarse una vez se haga el deploy en Monad Testnet
export const CONTRACT_ADDRESSES = {
  NFT_CARDS: import.meta.env.VITE_NFT_CARDS_ADDRESS || "0x0000000000000000000000000000000000000000",
  GAME_STATE: import.meta.env.VITE_GAME_STATE_ADDRESS || "0x0000000000000000000000000000000000000000",
};

export const NFT_CARDS_ABI = NFTCardsArtifact.abi;
export const GAME_STATE_ABI = GameStateArtifact.abi;
