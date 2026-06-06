import { useState } from 'react'
import { useConnect } from 'wagmi'
import './WalletModal.css'

const WALLET_META = {
  injected: {
    name: 'MetaMask',
    icon: '🦊',
    desc: 'Connect with browser wallet',
  },
  walletConnect: {
    name: 'WalletConnect',
    icon: '🔗',
    desc: 'Scan QR code to connect',
  },
}

export default function WalletModal({ isOpen, onClose }) {
  const { connectors, connect, isPending, error } = useConnect()
  const [connectingId, setConnectingId] = useState(null)

  if (!isOpen) return null

  const handleConnect = (connector) => {
    setConnectingId(connector.uid)
    connect(
      { connector },
      {
        onSuccess: () => {
          setConnectingId(null)
          onClose()
        },
        onError: () => {
          setConnectingId(null)
        },
      }
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Decorative elements */}
        <div className="modal-glow modal-glow--top" />
        <div className="modal-glow modal-glow--bottom" />

        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="modal-header">
          <div className="modal-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 2L26 8v12l-12 6L2 20V8l12-6z" stroke="url(#g)" strokeWidth="2"/>
              <circle cx="14" cy="14" r="4" fill="url(#g)"/>
              <defs>
                <linearGradient id="g" x1="2" y1="2" x2="26" y2="26">
                  <stop stopColor="#836EF9"/>
                  <stop offset="1" stopColor="#c084fc"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 className="modal-title">Connect Wallet</h2>
          <p className="modal-subtitle">Choose your preferred wallet to enter Monad Road</p>
        </div>

        <div className="modal-wallets">
          {connectors.map((connector) => {
            const meta = WALLET_META[connector.id] || {
              name: connector.name,
              icon: '💎',
              desc: 'Connect wallet',
            }
            const isConnecting = connectingId === connector.uid

            return (
              <button
                key={connector.uid}
                className={`wallet-option ${isConnecting ? 'wallet-option--loading' : ''}`}
                onClick={() => handleConnect(connector)}
                disabled={isPending}
              >
                <span className="wallet-icon">{meta.icon}</span>
                <div className="wallet-info">
                  <span className="wallet-name">{meta.name}</span>
                  <span className="wallet-desc">{meta.desc}</span>
                </div>
                {isConnecting ? (
                  <div className="wallet-spinner" />
                ) : (
                  <svg className="wallet-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            )
          })}
        </div>

        {error && (
          <div className="modal-error">
            <span>⚠️</span>
            <p>{error.message?.split('.')[0] || 'Connection failed'}</p>
          </div>
        )}

        <div className="modal-footer">
          <div className="modal-chain-badge">
            <span className="chain-dot" />
            Monad Testnet
          </div>
          <p className="modal-legal">
            By connecting, you agree to the Terms of Service
          </p>
        </div>
      </div>
    </div>
  )
}
