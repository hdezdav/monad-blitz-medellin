import { Link, useOutletContext } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { ROUTES } from '../routes/paths'
import './pages.css'

export default function LandingPage() {
  const { isConnected, address } = useAccount()
  const { openWalletModal } = useOutletContext()

  return (
    <>
      <section className="card card--hero">
        <span className="chip">Built on Monad</span>
        <h1 className="hero-title">
          Learn crypto.
          <br />
          <span className="hero-accent">Collect cards.</span>
        </h1>
        <p className="hero-desc">
          {isConnected
            ? 'Your wallet is ready. Explore packs, your collection, or enter battle.'
            : 'Connect your wallet to get started on Monad Testnet.'}
        </p>

        {!isConnected ? (
          <button className="btn btn--primary btn--large" onClick={openWalletModal}>
            Connect Wallet
          </button>
        ) : (
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
        <Link to={ROUTES.pack} className="card card--pastel card--lavender card--link">
          <span className="card-icon">📦</span>
          <h2>Abrir sobre</h2>
          <p>Descubre nuevas cartas en cada paquete.</p>
        </Link>

        <Link to={ROUTES.cards} className="card card--pastel card--mint card--link">
          <span className="card-icon">🎴</span>
          <h2>Mis cartas</h2>
          <p>Revisa tu colección y el progreso obtenido.</p>
        </Link>

        <Link to={ROUTES.battle} className="card card--pastel card--peach card--link">
          <span className="card-icon">⚔️</span>
          <h2>Combate</h2>
          <p>Enfrenta a otros jugadores con tu mazo.</p>
        </Link>
      </div>
    </>
  )
}
