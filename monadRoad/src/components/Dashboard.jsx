import { useAccount, useDisconnect, useBalance } from 'wagmi'

export default function Dashboard() {
  const { address, chain } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address })

  const truncate = (addr) => addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : ''

  return (
    <div className="dashboard">
      {/* Floating orbs */}
      <div className="dash-orb dash-orb--1" />
      <div className="dash-orb dash-orb--2" />
      <div className="dash-orb dash-orb--3" />

      <div className="dash-header">
        <div className="dash-logo-row">
          <img src="/logo.png" alt="Monad Road" className="dash-logo" />
          <h1 className="dash-brand">Monad Road</h1>
        </div>
        <button className="dash-disconnect" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>

      <div className="dash-welcome">
        <div className="dash-welcome-icon">🎴</div>
        <h2>Welcome, Traveler</h2>
        <p>Your crypto learning journey begins here</p>
      </div>

      <div className="dash-cards">
        <div className="dash-card dash-card--wallet">
          <div className="dash-card-header">
            <span className="dash-card-icon">💎</span>
            <span className="dash-card-label">Wallet</span>
          </div>
          <div className="dash-card-value">{truncate(address)}</div>
          <div className="dash-card-sub">
            <span className="dash-chain-indicator" />
            {chain?.name || 'Monad Testnet'}
          </div>
        </div>

        <div className="dash-card dash-card--balance">
          <div className="dash-card-header">
            <span className="dash-card-icon">⚡</span>
            <span className="dash-card-label">Balance</span>
          </div>
          <div className="dash-card-value">
            {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '—'}
          </div>
          <div className="dash-card-sub">Available for gas</div>
        </div>

        <div className="dash-card dash-card--cards">
          <div className="dash-card-header">
            <span className="dash-card-icon">🃏</span>
            <span className="dash-card-label">Cards Collected</span>
          </div>
          <div className="dash-card-value">0</div>
          <div className="dash-card-sub">Start learning to collect</div>
        </div>

        <div className="dash-card dash-card--level">
          <div className="dash-card-header">
            <span className="dash-card-icon">🏆</span>
            <span className="dash-card-label">Level</span>
          </div>
          <div className="dash-card-value">Novice</div>
          <div className="dash-card-sub">
            <div className="dash-xp-bar">
              <div className="dash-xp-fill" style={{ width: '0%' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="dash-cta-grid">
        <button className="dash-cta dash-cta--primary" id="start-learning">
          <span className="dash-cta-emoji">📚</span>
          <div>
            <strong>Start Learning</strong>
            <span>Begin your crypto journey</span>
          </div>
        </button>
        <button className="dash-cta dash-cta--secondary" id="view-collection">
          <span className="dash-cta-emoji">🎴</span>
          <div>
            <strong>My Collection</strong>
            <span>View earned cards</span>
          </div>
        </button>
        <button className="dash-cta dash-cta--secondary" id="leaderboard">
          <span className="dash-cta-emoji">🏅</span>
          <div>
            <strong>Leaderboard</strong>
            <span>Compare with others</span>
          </div>
        </button>
      </div>
    </div>
  )
}
