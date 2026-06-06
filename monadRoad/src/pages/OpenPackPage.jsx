import { Link } from 'react-router-dom'
import { ROUTES } from '../routes/paths'
import './pages.css'

export default function OpenPackPage() {
  return (
    <section className="card page-card">
      <span className="chip">Sobre</span>
      <h1 className="page-title">Abrir sobre</h1>
      <p className="page-desc">
        Aquí podrás abrir sobres y revelar nuevas cartas para tu colección.
      </p>

      <div className="page-placeholder page-placeholder--lavender">
        <span className="page-placeholder-icon">📦</span>
        <p>Selecciona un sobre para abrirlo</p>
      </div>

      <div className="page-actions">
        <button className="btn btn--primary btn--large" type="button" disabled>
          Abrir sobre
        </button>
        <Link to={ROUTES.cards} className="btn btn--ghost">
          Ver mis cartas
        </Link>
      </div>
    </section>
  )
}
