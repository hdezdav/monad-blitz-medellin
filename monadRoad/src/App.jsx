import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'
import OpenPackPage from './pages/OpenPackPage'
import CardsPage from './pages/CardsPage'
import BattlePage from './pages/BattlePage'
import { ROUTES } from './routes/paths'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.home} element={<LandingPage />} />
          <Route path={ROUTES.pack} element={<OpenPackPage />} />
          <Route path={ROUTES.cards} element={<CardsPage />} />
          <Route path={ROUTES.battle} element={<BattlePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
