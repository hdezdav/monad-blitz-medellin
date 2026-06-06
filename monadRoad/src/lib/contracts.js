import NFTCardsArtifact from '../artifacts/contracts/MonadRoad_NFTCards.sol/MonadRoad_NFTCards.json';
import GameStateArtifact from '../artifacts/contracts/MonadRoad_GameState.sol/MonadRoad_GameState.json';
import DeckManagerArtifact from '../artifacts/contracts/MonadRoad_DeckManager.sol/MonadRoad_DeckManager.json';

// Estas direcciones deben actualizarse una vez se haga el deploy en Monad Testnet
export const CONTRACT_ADDRESSES = {
  NFT_CARDS: import.meta.env.VITE_NFT_CARDS_ADDRESS || "0x8337B68cB0b30E88A9F7CbD81a6A7c91abe52688",
  GAME_STATE: import.meta.env.VITE_GAME_STATE_ADDRESS || "0xd5145eAEc7510DFa6cD590e6Ca3e6954e3b3c843",
  DECK_MANAGER: import.meta.env.VITE_DECK_MANAGER_ADDRESS || "0x9d9718E794ec0EA3ac726acbC05920A05f532dFF",
};

export const NFT_CARDS_ABI = NFTCardsArtifact.abi;
export const GAME_STATE_ABI = GameStateArtifact.abi;
export const DECK_MANAGER_ABI = DeckManagerArtifact.abi;
