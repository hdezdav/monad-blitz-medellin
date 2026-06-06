import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { Swords, Shield, Zap, Search } from "lucide-react";

import { BgGradient } from "@/components/ui/bg-gradient";
import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/game-card";
import { heroCards } from "@/data/cards";
import { ROUTES } from "../routes/paths";

export default function BattlePage() {
  const { isConnected } = useAccount();
  const [searching, setSearching] = useState(false);
  const [battleStarted, setBattleStarted] = useState(false);

  // Player and opponent cards
  const playerCard = heroCards[0]; // Bloque Génesis
  const opponentCard = heroCards[5]; // Enlace Malicioso

  const startSearch = () => {
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      setBattleStarted(true);
    }, 2500);
  };

  return (
    <div className="relative min-h-screen px-6 py-16">
      <BgGradient
        gradientFrom="#ffffff"
        gradientTo="#ffd2bb"
        gradientStop="40%"
        gradientPosition="50% 5%"
      />

      <div className="mx-auto max-w-6xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-1.5 text-sm font-medium text-monad-ink shadow-sm backdrop-blur"
        >
          <Swords className="h-4 w-4 text-rose-500 animate-pulse" /> Arena de Combate
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-4xl font-extrabold tracking-tight text-monad-ink md:text-5xl"
        >
          Demuestra tu <span className="text-gradient">Poder Web3</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-muted-foreground"
        >
          Reta a contratos inteligentes u otros jugadores en combates de estrategia basados en tus conocimientos blockchain.
        </motion.p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-dashed border-border bg-white/50 backdrop-blur">
            <span className="text-4xl mb-4">🔒</span>
            <h3 className="text-lg font-bold text-monad-ink">Wallet no conectada</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs text-center">
              Conecta tu wallet para acceder a la arena y luchar contra oponentes on-chain.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8">
            {/* Tablero de Batalla */}
            <div className="w-full grid md:grid-cols-3 items-center justify-items-center gap-6 rounded-3xl border border-border bg-white/40 p-8 shadow-xl backdrop-blur">
              {/* Lado Jugador */}
              <div className="flex flex-col items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Tú (Jugador)</span>
                {battleStarted ? (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <GameCard card={playerCard} />
                  </motion.div>
                ) : (
                  <div className="flex h-72 w-56 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-white/60 text-muted-foreground">
                    <Zap className="h-10 w-10 text-muted-foreground/40 mb-2 animate-bounce" />
                    <p className="text-xs font-semibold">Listo para combatir</p>
                    <p className="text-[10px] text-muted-foreground/60">{playerCard.name} seleccionado</p>
                  </div>
                )}
              </div>

              {/* Centro: VS / Estado */}
              <div className="flex flex-col items-center gap-4">
                {searching ? (
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-8 w-8 text-primary animate-spin" />
                    <span className="text-sm font-bold text-monad-ink animate-pulse">Buscando rival...</span>
                  </div>
                ) : battleStarted ? (
                  <div className="flex flex-col items-center gap-2">
                    <span className="rounded-full bg-rose-100 px-4 py-1 text-xs font-extrabold text-rose-700 uppercase tracking-widest animate-pulse">¡En Combate!</span>
                    <span className="text-2xl font-black text-monad-ink">VS</span>
                    <Button variant="destructive" size="sm" onClick={() => setBattleStarted(false)}>
                      Retirarse
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl font-black text-monad-ink/20">VS</span>
                    <Button onClick={startSearch} className="shadow-lg shadow-primary/30 h-11 px-6 font-bold">
                      Buscar Oponente
                    </Button>
                  </div>
                )}
              </div>

              {/* Lado Oponente */}
              <div className="flex flex-col items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Oponente</span>
                {battleStarted ? (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <GameCard card={opponentCard} />
                  </motion.div>
                ) : (
                  <div className="flex h-72 w-56 flex-col items-center justify-center rounded-2xl border bg-slate-50/50 text-muted-foreground/40">
                    <Shield className="h-10 w-10 mb-2" />
                    <p className="text-xs font-semibold">Esperando rival...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Acciones extra */}
            {!battleStarted && (
              <div className="flex gap-4">
                <Button asChild variant="outline" className="bg-white/60 backdrop-blur">
                  <Link to={ROUTES.cards}>Editar mi Mazo</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-16 flex justify-center">
        <Button asChild variant="outline" className="bg-white/60 backdrop-blur">
          <Link to={ROUTES.home}>Volver al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
