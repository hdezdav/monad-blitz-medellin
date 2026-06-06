import { Link } from 'react-router-dom'
import { ROUTES } from '../routes/paths'
import './pages.css'

const PLACEHOLDER_CARDS = [
  { id: 1, name: 'Gas Fee', type: 'Concepto', tone: 'lavender' },
  { id: 2, name: 'Consensus', type: 'Legendary', tone: 'mint' },
  { id: 3, name: 'Smart Contract', type: 'Rare', tone: 'peach' },
]

export default function CardsPage() {
  return (
    <section className="card page-card">
      <span className="chip">Colección</span>
      <h1 className="page-title">Mis cartas</h1>
      <p className="page-desc">
        Todas las cartas que has obtenido aparecerán aquí.
      </p>

      <div className="cards-grid">
        {PLACEHOLDER_CARDS.map((card) => (
          <article key={card.id} className={`card card--pastel card--${card.tone} card-item`}>
            <span className="card-item-type">{card.type}</span>
            <h2>{card.name}</h2>
            <p>Carta de ejemplo</p>
          </article>
        ))}
      </div>

      <div className="page-actions">
        <Link to={ROUTES.pack} className="btn btn--primary">
          Abrir otro sobre
        </Link>
      </div>
    </section>
  )
}
