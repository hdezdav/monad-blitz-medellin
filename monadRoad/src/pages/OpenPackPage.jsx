import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, PartyPopper } from "lucide-react";
import { useAccount } from "wagmi";

import { BgGradient } from "@/components/ui/bg-gradient";
import { Button } from "@/components/ui/button";
import { GiftPack } from "@/components/gift-pack";
import { heroCards } from "@/data/cards";
import { useInventory } from "@/context/InventoryContext";
import { ROUTES } from "../routes/paths";

const starterPack = heroCards.slice(0, 3);
const starterPackIds = starterPack.map((c) => c.id);

export default function OpenPackPage() {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { hasOpenedPack, openPack } = useInventory();
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    // Add the 3 starter pack cards to the wallet inventory
    openPack(starterPackIds);
    setOpened(true);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20">
      <BgGradient
        gradientFrom="#ffffff"
        gradientTo="#b9acff"
        gradientStop="30%"
        gradientPosition="50% 0%"
      />

      {/* Confetti dummy */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute top-0 h-2 w-2 rounded-sm"
          style={{
            left: `${(i * 53) % 100}%`,
            background: ["#836EF9", "#FBBF24", "#34D399", "#F472B6"][i % 4],
          }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{ y: "100vh", opacity: [0, 1, 1, 0], rotate: 360 }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            delay: (i % 6) * 0.4,
            ease: "linear",
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold text-primary shadow-sm backdrop-blur">
          <PartyPopper className="h-4 w-4" /> ¡Bienvenido a la Arena!
        </span>

        <h1 className="mt-6 max-w-2xl text-4xl font-extrabold tracking-tight text-monad-ink md:text-5xl">
          ¡Abre tu <span className="text-gradient">sobre de regalo</span>!
        </h1>
        <p className="mt-4 max-w-lg text-lg text-muted-foreground">
          {!isConnected
            ? "Conecta tu wallet para abrir tu primer sobre y empezar."
            : hasOpenedPack
              ? "Ya abriste tu sobre inicial. ¡Revisa tus cartas o ve al combate!"
              : "Tu wallet está vinculada. Abre el sobre para descubrir tus primeras cartas NFT y armar tu mazo inicial."}
        </p>

        <div className="mt-12">
          {isConnected ? (
            hasOpenedPack && !opened ? (
              /* Already opened in a previous session (future: from contract state) */
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-72 w-56 flex-col items-center justify-center rounded-3xl bg-primary/5 border-2 border-dashed border-primary/30 text-primary/60">
                  <span className="text-4xl mb-2">📦</span>
                  <p className="text-sm font-semibold">Sobre ya abierto</p>
                </div>
              </div>
            ) : (
              <GiftPack
                cards={starterPack}
                onOpened={handleOpen}
              />
            )
          ) : (
            <div className="flex h-72 w-56 flex-col items-center justify-center rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 text-slate-400">
              <span className="text-4xl mb-2">🔒</span>
              <p className="text-sm font-semibold">Wallet requerida</p>
            </div>
          )}
        </div>

        {(opened || hasOpenedPack) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: opened ? starterPack.length * 0.15 + 0.3 : 0 }}
            className="mt-12 flex gap-4"
          >
            <Button
              size="lg"
              onClick={() => navigate(ROUTES.cards)}
              className="h-12 gap-2 px-8 text-base shadow-lg shadow-primary/30"
            >
              Ver mis cartas <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate(ROUTES.battle)}
              className="h-12 gap-2 px-8 text-base bg-white/60 backdrop-blur"
            >
              Ir a Combate
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
