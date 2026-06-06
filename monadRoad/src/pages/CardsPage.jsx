import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { Gift, PackageOpen } from "lucide-react";

import { BgGradient } from "@/components/ui/bg-gradient";
import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/game-card";
import { useInventory } from "@/context/InventoryContext";
import { ROUTES } from "../routes/paths";

export default function CardsPage() {
  const { isConnected } = useAccount();
  const { ownedCards, hasOpenedPack } = useInventory();

  return (
    <div className="relative min-h-screen px-6 py-16">
      <BgGradient
        gradientFrom="#ffffff"
        gradientTo="#c3b8ff"
        gradientStop="42%"
        gradientPosition="50% 8%"
      />

      <div className="mx-auto max-w-6xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-1.5 text-sm font-medium text-monad-ink shadow-sm backdrop-blur"
        >
          <Gift className="h-4 w-4 text-primary" /> Colección de Cartas
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-4xl font-extrabold tracking-tight text-monad-ink md:text-5xl"
        >
          Tu mazo de <span className="text-gradient">Conocimiento</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-muted-foreground"
        >
          {isConnected
            ? ownedCards.length > 0
              ? `Tienes ${ownedCards.length} carta${ownedCards.length !== 1 ? "s" : ""} NFT en tu wallet.`
              : "Aún no tienes cartas. ¡Abre tu primer sobre para empezar!"
            : "Conecta tu wallet para visualizar tu colección de cartas NFT reales en Monad Testnet."}
        </motion.p>
      </div>

      <div className="mx-auto mt-16 max-w-6xl">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-dashed border-border bg-white/50 backdrop-blur">
            <span className="text-4xl mb-4">🔒</span>
            <h3 className="text-lg font-bold text-monad-ink">Wallet no conectada</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs text-center">
              Conecta tu wallet para visualizar tu colección de cartas NFT reales en Monad Testnet.
            </p>
          </div>
        ) : ownedCards.length === 0 ? (
          /* Empty state — no cards yet */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-16 rounded-2xl border border-dashed border-border bg-white/50 backdrop-blur"
          >
            <PackageOpen className="h-16 w-16 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-bold text-monad-ink">
              Tu colección está vacía
            </h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm text-center">
              Aún no tienes cartas NFT. Abre tu primer sobre de regalo para
              recibir tu mazo inicial de 3 cartas.
            </p>
            <Button
              asChild
              className="mt-6 shadow-lg shadow-primary/30"
            >
              <Link to={ROUTES.pack}>Abrir mi Sobre</Link>
            </Button>
          </motion.div>
        ) : (
          /* Card collection */
          <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {ownedCards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <GameCard card={card} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-16 flex justify-center gap-4">
        <Button asChild variant="outline" className="bg-white/60 backdrop-blur">
          <Link to={ROUTES.home}>Volver al inicio</Link>
        </Button>
        {ownedCards.length > 0 && (
          <Button asChild className="shadow-lg shadow-primary/30">
            <Link to={ROUTES.battle}>Ir a Combate</Link>
          </Button>
        )}
        {!hasOpenedPack && (
          <Button asChild className="shadow-lg shadow-primary/30">
            <Link to={ROUTES.pack}>Abrir sobre</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
