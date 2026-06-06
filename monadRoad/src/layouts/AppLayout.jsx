import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAccount, useDisconnect } from 'wagmi'
import WalletModal from '../components/WalletModal'
import { ROUTES } from '../routes/paths'
import '../App.css'

const NAV_ITEMS = [
  { to: ROUTES.home, label: 'Inicio' },
  { to: ROUTES.pack, label: 'Sobre' },
  { to: ROUTES.cards, label: 'Cartas' },
  { to: ROUTES.battle, label: 'Combate' },
]

export default function AppLayout() {
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
          <Link to={ROUTES.home} className="brand">
            <img src="/logo.png" alt="" className="brand-logo" />
            <div>
              <span className="brand-name">Monad Road</span>
              <span className="brand-tag">Testnet</span>
            </div>
          </Link>

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

        <nav className="app-nav">
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ROUTES.home}
              className={({ isActive }) => `app-nav-link${isActive ? ' app-nav-link--active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <main className="main">
          <Outlet context={{ openWalletModal: () => setShowModal(true) }} />
        </main>
      </div>

      <WalletModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
