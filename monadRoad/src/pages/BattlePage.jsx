import { Link } from 'react-router-dom'
import { ROUTES } from '../routes/paths'
import './pages.css'

export default function BattlePage() {
  return (
    <section className="card page-card">
      <span className="chip">Combate</span>
      <h1 className="page-title">Arena de combate</h1>
      <p className="page-desc">
        Enfréntate a otros jugadores usando las cartas de tu mazo.
      </p>

      <div className="battle-board">
        <div className="card card--pastel card--lavender battle-panel">
          <p className="battle-label">Jugador</p>
          <h2>Tu mazo</h2>
          <p>0 cartas listas</p>
        </div>

        <div className="battle-vs">VS</div>

        <div className="card card--pastel card--peach battle-panel">
          <p className="battle-label">Oponente</p>
          <h2>Esperando rival</h2>
          <p>Busca un combate para empezar</p>
        </div>
      </div>

      <div className="page-actions">
        <button className="btn btn--primary btn--large" type="button" disabled>
          Buscar combate
        </button>
        <Link to={ROUTES.cards} className="btn btn--ghost">
          Editar mazo
        </Link>
      </div>
    </section>
  )
}
