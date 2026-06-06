import { useState } from 'react'
import { useAccount } from 'wagmi'
import WalletModal from './components/WalletModal'
import Dashboard from './components/Dashboard'
import './components/Dashboard.css'
import './App.css'

function App() {
  const { isConnected } = useAccount()
  const [showModal, setShowModal] = useState(false)

  if (isConnected) {
    return <Dashboard />
  }

  return (
    <div className="landing">
      {/* Animated background */}
      <div className="bg-grid" />
      <div className="bg-orb bg-orb--1" />
      <div className="bg-orb bg-orb--2" />
      <div className="bg-orb bg-orb--3" />

      {/* Floating particles */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      {/* Nav */}
      <nav className="nav">
        <div className="nav-brand">
          <img src="/logo.png" alt="" className="nav-logo" />
          <span className="nav-name">Monad Road</span>
        </div>
        <div className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#cards" className="nav-link">Cards</a>
          <button className="nav-connect" onClick={() => setShowModal(true)}>
            Connect Wallet
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Built on Monad
        </div>

        <h1 className="hero-title">
          Learn Crypto.
          <br />
          <span className="hero-gradient">Collect Cards.</span>
          <br />
          Own the Road.
        </h1>

        <p className="hero-desc">
          Monad Road is a Trading Card Game where every card you earn represents
          real blockchain knowledge. Learn concepts, complete challenges,
          and build your collection on the Monad network.
        </p>

        <div className="hero-actions">
          <button className="btn btn--primary" id="hero-connect" onClick={() => setShowModal(true)}>
            <span className="btn-glow" />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1L17 5v8l-8 4L1 13V5l8-4z" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="9" cy="9" r="2.5" fill="currentColor"/>
            </svg>
            Enter Monad Road
          </button>
          <a href="#about" className="btn btn--ghost" id="learn-more">
            Learn More
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Floating card preview */}
        <div className="hero-cards">
          <div className="preview-card preview-card--1">
            <div className="preview-card-inner">
              <div className="preview-card-shine" />
              <div className="preview-card-top">⚡</div>
              <div className="preview-card-name">Gas Fee</div>
              <div className="preview-card-type">Concept Card</div>
            </div>
          </div>
          <div className="preview-card preview-card--2">
            <div className="preview-card-inner">
              <div className="preview-card-shine" />
              <div className="preview-card-top">🔗</div>
              <div className="preview-card-name">Consensus</div>
              <div className="preview-card-type">Legendary</div>
            </div>
          </div>
          <div className="preview-card preview-card--3">
            <div className="preview-card-inner">
              <div className="preview-card-shine" />
              <div className="preview-card-top">🛡️</div>
              <div className="preview-card-name">Smart Contract</div>
              <div className="preview-card-type">Rare Card</div>
            </div>
          </div>
        </div>
      </main>

      {/* Features section */}
      <section className="features" id="about">
        <h2 className="features-title">How It Works</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">📖</div>
            <h3>Learn</h3>
            <p>Study blockchain concepts through interactive lessons and quizzes</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎴</div>
            <h3>Collect</h3>
            <p>Earn unique NFT cards as proof of your knowledge</p>
          </div>
          <div className="feature">
            <div className="feature-icon">⚔️</div>
            <h3>Battle</h3>
            <p>Challenge other learners with your knowledge deck</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🏆</div>
            <h3>Rank Up</h3>
            <p>Climb the leaderboard and become a crypto master</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Monad Road © 2026 — Built with 💜 on Monad</p>
      </footer>

      <WalletModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}

export default App
