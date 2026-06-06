import { useEffect, useState } from 'react'
import './FloatingCards.css'

const CARD_IMAGES = [
  {
    id: 1,
    imgSrc: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=280&fit=crop',
    label: 'Blockchain',
    rarity: 'Legendary',
    rarityColor: '#f59e0b',
  },
  {
    id: 2,
    imgSrc: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=280&fit=crop',
    label: 'DeFi',
    rarity: 'Epic',
    rarityColor: '#8b5cf6',
  },
  {
    id: 3,
    imgSrc: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&h=280&fit=crop',
    label: 'NFT',
    rarity: 'Rare',
    rarityColor: '#3b82f6',
  },
  {
    id: 4,
    imgSrc: 'https://images.unsplash.com/photo-1642790551116-18e150f248e3?w=400&h=280&fit=crop',
    label: 'Web3',
    rarity: 'Common',
    rarityColor: '#10b981',
  },
  {
    id: 5,
    imgSrc: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=280&fit=crop',
    label: 'Monad',
    rarity: 'Legendary',
    rarityColor: '#f59e0b',
  },
  {
    id: 6,
    imgSrc: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=280&fit=crop',
    label: 'Wallet',
    rarity: 'Epic',
    rarityColor: '#8b5cf6',
  },
]

export default function FloatingCards() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const scrollPos = window.scrollY
      const slider = document.querySelector('.fc-slider')
      if (!slider) return
      const zOffset = scrollPos * 0.4
      slider.style.transform = `translate3d(-50%, -50%, 0) rotateX(0deg) rotateY(-25deg) rotateZ(-120deg) translateY(${zOffset}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseOver = (e) => {
    e.currentTarget.style.left = '18%'
  }

  const handleMouseOut = (e) => {
    e.currentTarget.style.left = '0%'
  }

  if (!mounted) return null

  return (
    <div className="fc-wrapper" aria-label="3D collectible cards">
      <div className="fc-slider">
        {CARD_IMAGES.map((card) => (
          <div
            key={card.id}
            className="fc-card"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <div className="fc-card-inner">
              <img
                src={card.imgSrc}
                alt={card.label}
                loading="lazy"
                className="fc-card-img"
              />
              <div className="fc-card-overlay">
                <span className="fc-card-rarity" style={{ color: card.rarityColor }}>
                  ★ {card.rarity}
                </span>
                <span className="fc-card-label">{card.label}</span>
              </div>
              <div className="fc-card-shine" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
