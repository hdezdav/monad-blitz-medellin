import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { useAccount } from 'wagmi'
import { heroCards } from '@/data/cards'

/**
 * WalletInventoryContext
 *
 * Manages the player's card collection (NFT inventory).
 *
 * ── Current implementation ──
 * In-memory React state. Cards start empty and are added via openPack / addCard.
 * State resets on page reload (no localStorage by design).
 *
 * ── Future contract integration ──
 * Replace the state hooks below with on-chain reads:
 *   - ownedCardIds  → read from ERC-721 / ERC-1155 balanceOf per card token
 *   - addCard()     → call contract mint / transfer, then refetch
 *   - openPack()    → call contract mintPack(), then refetch
 *   - hasOpenedPack → check if user holds any tokens from the pack contract
 *
 * The public API (useInventory) stays the same, so pages don't change.
 */

const InventoryContext = createContext(null)

export function InventoryProvider({ children }) {
  const { address } = useAccount()

  // ── State (replace with contract reads later) ──
  const [ownedCardIds, setOwnedCardIds] = useState([])
  const [hasOpenedPack, setHasOpenedPack] = useState(false)

  // Resolve full card objects from the catalog
  const ownedCards = useMemo(
    () => ownedCardIds
      .map((id) => heroCards.find((c) => c.id === id))
      .filter(Boolean),
    [ownedCardIds]
  )

  /**
   * Open the starter pack — adds the first 3 cards to the inventory.
   * Future: this will call the pack contract's mint function.
   */
  const openPack = useCallback(
    (cardIds) => {
      if (hasOpenedPack) return
      setOwnedCardIds((prev) => [...prev, ...cardIds])
      setHasOpenedPack(true)
    },
    [hasOpenedPack]
  )

  /**
   * Add a single card to the inventory (e.g. won from battle).
   * Future: this will call the NFT contract's transfer/mint function.
   */
  const addCard = useCallback((cardId) => {
    setOwnedCardIds((prev) => {
      if (prev.includes(cardId)) return prev // prevent duplicates
      return [...prev, cardId]
    })
  }, [])

  /**
   * Check if the player owns a specific card.
   */
  const ownsCard = useCallback(
    (cardId) => ownedCardIds.includes(cardId),
    [ownedCardIds]
  )

  const value = useMemo(
    () => ({
      /** The connected wallet address */
      address,
      /** Array of owned card IDs */
      ownedCardIds,
      /** Array of full card objects the player owns */
      ownedCards,
      /** Whether the player has opened their starter pack */
      hasOpenedPack,
      /** Open the starter pack (accepts array of card IDs to add) */
      openPack,
      /** Add a single card by ID (e.g. battle reward) */
      addCard,
      /** Check if a card ID is owned */
      ownsCard,
    }),
    [address, ownedCardIds, ownedCards, hasOpenedPack, openPack, addCard, ownsCard]
  )

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  )
}

/**
 * Hook to access the wallet inventory.
 * Must be used within <InventoryProvider>.
 */
export function useInventory() {
  const ctx = useContext(InventoryContext)
  if (!ctx) {
    throw new Error('useInventory must be used within <InventoryProvider>')
  }
  return ctx
}
