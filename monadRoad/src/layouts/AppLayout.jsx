import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAccount, useDisconnect } from 'wagmi'
import { Route } from 'lucide-react'
import WalletModal from '../components/WalletModal'
import { ROUTES } from '../routes/paths'
import { cn } from '@/lib/utils'

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
  const { pathname } = useLocation()

  const truncate = (addr) => (addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '')

  return (
    <div className="relative min-h-screen">
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 w-full"
      >
        <div className="glass mx-auto mt-4 flex w-[min(1100px,92%)] items-center justify-between rounded-2xl border border-border px-5 py-3 shadow-sm">
          <Link to={ROUTES.home} className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-monad to-monad-dark text-white shadow-md">
              <Route className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-monad-ink">
              Monad<span className="text-primary">Road</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  (item.to === ROUTES.home ? pathname === ROUTES.home : pathname.startsWith(item.to)) && "bg-secondary text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {isConnected ? (
            <button
              onClick={() => disconnect()}
              className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-1.5 text-sm font-semibold text-monad-ink transition hover:bg-accent"
              title="Desconectar"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {truncate(address)}
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Conectar Wallet
            </button>
          )}
        </div>
      </motion.header>

      <main className="relative z-10">
        <Outlet context={{ openWalletModal: () => setShowModal(true) }} />
      </main>

      <WalletModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
