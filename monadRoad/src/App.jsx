import { useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import WalletModal from './components/WalletModal'
import StoryScroll from './components/StoryScroll'
import { BGPattern } from './components/BGPattern'
import './App.css'

function App() {
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const [showModal, setShowModal] = useState(false)

  const truncate = (addr) => (addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '')

  return (
    <div className="app">
      {/* ── Global dots background ── */}
      <BGPattern
        variant="dots"
        mask="none"
        size={28}
        fill="#d1d5db"
        style={{ position: 'fixed', zIndex: 0 }}
      />

      {/* ── Decorative blobs ── */}
      <div className="pastel-block pastel-block--lavender" aria-hidden="true" />
      <div className="pastel-block pastel-block--mint" aria-hidden="true" />
      <div className="pastel-block pastel-block--peach" aria-hidden="true" />

      {/* ── Top bar (full-bleed, sticky over the story scroll) ── */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <img src="/logo.png" alt="" className="brand-logo" />
            <div>
              <span className="brand-name">Monad Road</span>
              <span className="brand-tag">Testnet</span>
            </div>
          </div>

          {isConnected ? (
            <div className="header-actions">
              <span className="chip chip--success">Connected</span>
              <span className="wallet-address">{truncate(address)}</span>
              <button className="btn btn--ghost" onClick={() => disconnect()}>
                Disconnect
              </button>
            </div>
          ) : (
            <button className="btn btn--primary" onClick={() => setShowModal(true)}>
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {/* ── Narrative scroll hero ── */}
      <StoryScroll
        isConnected={isConnected}
        address={address}
        onConnect={() => setShowModal(true)}
      />

      {/* ── Feature cards ── */}
      <div className="app-inner app-inner--cards">
        <div className="section-head">
          <h2 className="section-title">Tu mazo de conocimiento</h2>
          <p className="section-sub">Tres formas de avanzar en Monad Road.</p>
        </div>

        <div className="card-grid">
          <article className="card card--feature card--learn">
            <div className="feature-badge">📖</div>
            <div className="feature-content">
              <div className="feature-rarity">Common</div>
              <h2>Learn</h2>
              <p>Study blockchain concepts through simple, bite-sized lessons.</p>
            </div>
            <div className="feature-glow" />
          </article>

          <article className="card card--feature card--collect">
            <div className="feature-badge">🎴</div>
            <div className="feature-content">
              <div className="feature-rarity feature-rarity--epic">Epic</div>
              <h2>Collect</h2>
              <p>Earn rare cards as on-chain proof of your knowledge.</p>
            </div>
            <div className="feature-glow" />
          </article>

          <article className="card card--feature card--play">
            <div className="feature-badge">⚡</div>
            <div className="feature-content">
              <div className="feature-rarity feature-rarity--legendary">Legendary</div>
              <h2>Play</h2>
              <p>Challenge others with your knowledge deck on Monad.</p>
            </div>
            <div className="feature-glow" />
          </article>
        </div>
      </div>

      {/* Wallet connect modal (triggered from top bar + story CTA) */}
      <WalletModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}

export default App
