import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { heroCards } from '@/data/cards'
import { CONTRACT_ADDRESSES, NFT_CARDS_ABI, GAME_STATE_ABI } from '@/lib/contracts'

const InventoryContext = createContext(null)

export function InventoryProvider({ children }) {
  const { address } = useAccount()

  // 1. Fetch owned cards (ERC721) using our optimized view function
  const { data: ownedCardsData, refetch: refetchBalances, isLoading: isLoadingBalances } = useReadContract({
    address: CONTRACT_ADDRESSES.NFT_CARDS,
    abi: NFT_CARDS_ABI,
    functionName: 'getOwnedCards',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  // 2. Fetch PlayerState from GAME_STATE contract on-chain
  const { data: playerState, refetch: refetchGameState, isLoading: isLoadingGameState } = useReadContract({
    address: CONTRACT_ADDRESSES.GAME_STATE,
    abi: GAME_STATE_ABI,
    functionName: 'getPlayerState',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  // Resolve full card objects from the catalog matching on cardCatalogId
  const ownedCards = useMemo(() => {
    if (!ownedCardsData) return [];
    return ownedCardsData.map((item) => {
      // Support both object return and array tuple return from Viem
      const tokenId = Number(item.tokenId ?? item[0]);
      const cardCatalogId = Number(item.cardCatalogId ?? item[1]);
      
      const baseCard = heroCards.find((c) => c.tokenId === cardCatalogId);
      if (!baseCard) return null;
      
      return {
        ...baseCard,
        id: `${baseCard.id}-${tokenId}`, // Unique string ID for React keys and selection
        nftTokenId: tokenId,            // Unique on-chain NFT tokenId
        tokenId: cardCatalogId,         // Base catalog ID (1 to 10)
      };
    }).filter(Boolean);
  }, [ownedCardsData]);

  const ownedCardIds = useMemo(() => {
    return ownedCards.map((c) => c.id);
  }, [ownedCards]);

  // Check if player has registered / opened their pack
  const hasOpenedPack = useMemo(() => {
    if (!playerState) return false;
    const currentPhase = Number(playerState[0] || playerState.currentPhase || 0);
    return currentPhase > 0;
  }, [playerState]);

  // Extract other game states from playerState
  const currentPhase = useMemo(() => {
    if (!playerState) return 0;
    return Number(playerState[0] || playerState.currentPhase || 0);
  }, [playerState]);

  const hasSeedPhraseBackedUp = useMemo(() => {
    if (!playerState) return false;
    return !!(playerState[1] || playerState.hasSeedPhraseBackedUp);
  }, [playerState]);

  const hasDefeatedPhase1 = useMemo(() => {
    if (!playerState) return false;
    return !!(playerState[2] || playerState.hasDefeatedPhase1);
  }, [playerState]);

  const hasDefeatedPhase2 = useMemo(() => {
    if (!playerState) return false;
    return !!(playerState[3] || playerState.hasDefeatedPhase2);
  }, [playerState]);

  const hasDefeatedPhase3 = useMemo(() => {
    if (!playerState) return false;
    return !!(playerState[4] || playerState.hasDefeatedPhase3);
  }, [playerState]);

  // Refetch all on-chain states
  const refetchAll = useCallback(async () => {
    await Promise.all([
      refetchBalances(),
      refetchGameState()
    ]);
  }, [refetchBalances, refetchGameState]);

  // Refetch automatically when address changes
  useEffect(() => {
    if (address) {
      refetchAll();
    }
  }, [address, refetchAll]);

  const ownsCard = useCallback(
    (cardId) => {
      // Support checking by string ID or numeric tokenId
      return ownedCards.some(
        (c) => c.id === cardId || c.id.split('-')[0] === cardId || c.tokenId === Number(cardId)
      );
    },
    [ownedCards]
  );

  const value = useMemo(
    () => ({
      address,
      ownedCardIds,
      ownedCards,
      hasOpenedPack,
      currentPhase,
      hasSeedPhraseBackedUp,
      hasDefeatedPhase1,
      hasDefeatedPhase2,
      hasDefeatedPhase3,
      isLoading: isLoadingBalances || isLoadingGameState,
      ownsCard,
      refetch: refetchAll,
    }),
    [
      address,
      ownedCardIds,
      ownedCards,
      hasOpenedPack,
      currentPhase,
      hasSeedPhraseBackedUp,
      hasDefeatedPhase1,
      hasDefeatedPhase2,
      hasDefeatedPhase3,
      isLoadingBalances,
      isLoadingGameState,
      ownsCard,
      refetchAll
    ]
  );

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const ctx = useContext(InventoryContext)
  if (!ctx) {
    throw new Error('useInventory must be used within <InventoryProvider>')
  }
  return ctx
}
