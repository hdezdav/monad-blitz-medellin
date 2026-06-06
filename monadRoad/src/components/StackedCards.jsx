import './StackedCards.css'

const CARDS = [
  {
    id: 1,
    imgSrc: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=260&fit=crop',
    label: 'Blockchain',
    rarity: 'Legendary',
    rarityColor: '#f59e0b',
    borderColor: 'rgba(245, 158, 11, 0.6)',
  },
  {
    id: 2,
    imgSrc: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&h=260&fit=crop',
    label: 'NFT',
    rarity: 'Epic',
    rarityColor: '#8b5cf6',
    borderColor: 'rgba(139, 92, 246, 0.6)',
  },
  {
    id: 3,
    imgSrc: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=260&fit=crop',
    label: 'DeFi',
    rarity: 'Rare',
    rarityColor: '#3b82f6',
    borderColor: 'rgba(59, 130, 246, 0.6)',
  },
  {
    id: 4,
    imgSrc: 'https://images.unsplash.com/photo-1642790551116-18e150f248e3?w=400&h=260&fit=crop',
    label: 'Web3',
    rarity: 'Rare',
    rarityColor: '#3b82f6',
    borderColor: 'rgba(59, 130, 246, 0.5)',
  },
  {
    id: 5,
    imgSrc: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=260&fit=crop',
    label: 'AI × Crypto',
    rarity: 'Common',
    rarityColor: '#10b981',
    borderColor: 'rgba(16, 185, 129, 0.45)',
  },
]

export default function StackedCards() {
  return (
    <div className="sc-scene" aria-label="Collectible card stack">
      <div className="sc-stack">
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            className="sc-card"
            style={{
              '--i': i,
              '--border': card.borderColor,
              zIndex: CARDS.length - i,
              animationDelay: `${i * 0.15}s`,
            }}
          >
            {/* Card face */}
            <div className="sc-card-inner">
              <img
                src={card.imgSrc}
                alt={card.label}
                className="sc-card-img"
                loading="lazy"
              />
              <div className="sc-card-body">
                <span className="sc-rarity" style={{ color: card.rarityColor }}>
                  ★ {card.rarity}
                </span>
                <span className="sc-label">{card.label}</span>
              </div>
              <div className="sc-shine" />
            </div>
          </div>
        ))}
      </div>

      {/* Ambient glow underneath the stack */}
      <div className="sc-glow" />
    </div>
  )
}
