import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { heroCards } from '@/data/cards'
import { CONTRACT_ADDRESSES, NFT_CARDS_ABI, GAME_STATE_ABI } from '@/lib/contracts'

const InventoryContext = createContext(null)

export function InventoryProvider({ children }) {
  const { address } = useAccount()

  // 1. Fetch balances of all 10 cards from NFT_CARDS contract on-chain
  const { data: balances, refetch: refetchBalances, isLoading: isLoadingBalances } = useReadContract({
    address: CONTRACT_ADDRESSES.NFT_CARDS,
    abi: NFT_CARDS_ABI,
    functionName: 'balanceOfBatch',
    args: address ? [
      Array(10).fill(address),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    ] : undefined,
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

  // Derive ownedCardIds based on balances returned from ERC1155 contract
  const ownedCardIds = useMemo(() => {
    if (!balances) return [];
    return balances
      .map((bal, idx) => (bal > 0n ? idx + 1 : null))
      .filter((id) => id !== null);
  }, [balances]);

  // Resolve full card objects from the catalog matching on tokenId
  const ownedCards = useMemo(
    () => ownedCardIds
      .map((tokenId) => heroCards.find((c) => c.tokenId === tokenId))
      .filter(Boolean),
    [ownedCardIds]
  );

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
        (c) => c.id === cardId || c.tokenId === Number(cardId)
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
