import { useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import WalletModal from './components/WalletModal'
import './App.css'

function App() {
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const [showModal, setShowModal] = useState(false)

  const truncate = (addr) => (addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '')

  return (
    <div className="app">
      <div className="pastel-block pastel-block--lavender" aria-hidden="true" />
      <div className="pastel-block pastel-block--mint" aria-hidden="true" />
      <div className="pastel-block pastel-block--peach" aria-hidden="true" />

      <div className="app-inner">
        <header className="card card--header">
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
        </header>

        <main className="main">
          <section className="card card--hero">
            <span className="chip">Built on Monad</span>
            <h1 className="hero-title">
              Learn crypto.
              <br />
              <span className="hero-accent">Collect cards.</span>
            </h1>
            <p className="hero-desc">
              {isConnected
                ? 'Your wallet is ready. You can start exploring Monad Road.'
                : 'Connect your wallet to get started on Monad Testnet.'}
            </p>

            {!isConnected && (
              <button className="btn btn--primary btn--large" onClick={() => setShowModal(true)}>
                Connect Wallet
              </button>
            )}

            {isConnected && (
              <div className="status-card">
                <div className="status-dot" />
                <div>
                  <p className="status-label">Wallet address</p>
                  <p className="status-value">{address}</p>
                </div>
              </div>
            )}
          </section>

          <div className="card-grid">
            <article className="card card--pastel card--lavender">
              <span className="card-icon">📖</span>
              <h2>Learn</h2>
              <p>Study blockchain concepts through simple lessons.</p>
            </article>

            <article className="card card--pastel card--mint">
              <span className="card-icon">🎴</span>
              <h2>Collect</h2>
              <p>Earn cards as proof of your knowledge.</p>
            </article>

            <article className="card card--pastel card--peach">
              <span className="card-icon">⚡</span>
              <h2>Play</h2>
              <p>Challenge others with your knowledge deck.</p>
            </article>
          </div>
        </main>
      </div>

      <WalletModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}

export default App
