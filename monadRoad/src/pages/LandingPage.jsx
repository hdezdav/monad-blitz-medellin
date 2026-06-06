import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ShieldCheck, Trophy } from "lucide-react";
import { useAccount } from "wagmi";
import { useOutletContext } from "react-router-dom";

import { BgGradient } from "@/components/ui/bg-gradient";
import { Button } from "@/components/ui/button";
import { MetaMaskButton } from "@/components/metamask-button";
import { GameCard } from "@/components/game-card";
import { heroCards } from "@/data/cards";
import { ROUTES } from "../routes/paths";

const fanCards = heroCards.slice(0, 3);
const fanLayout = [
  { rotate: -14, x: -150, y: 24, z: 10 },
  { rotate: 0, x: 0, y: -10, z: 30 },
  { rotate: 14, x: 150, y: 24, z: 10 },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { openWalletModal } = useOutletContext();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      openWalletModal();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const cta = isConnected ? () => navigate(ROUTES.pack) : handleConnect;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo degradado radial (claro → Monad púrpura) */}
      <BgGradient
        gradientFrom="#ffffff"
        gradientTo="#a99dff"
        gradientStop="38%"
        gradientPosition="50% 0%"
      />

      {/* HERO */}
      <section className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 pb-24 pt-16 lg:flex-row lg:pt-24">
        {/* Texto */}
        <div className="flex-1 text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-1.5 text-sm font-medium text-monad-ink shadow-sm backdrop-blur"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Aprende Web3 sin morir en el intento
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-monad-ink md:text-6xl"
          >
            Empieza a aprender{" "}
            <span className="text-gradient">Blockchain</span>
            <br /> jugando.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground lg:mx-0"
          >
            <strong className="text-foreground">Monad Road</strong> convierte
            cada concepto técnico en una carta. Conecta tu wallet, arma tu mazo y
            domina la blockchain batalla a batalla.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:items-start lg:justify-start"
          >
            {isConnected ? (
              <motion.button
                type="button"
                onClick={cta}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-monad to-monad-dark px-8 text-base font-bold text-white shadow-xl shadow-monad/30 border border-monad-dark/50 animate-purple-glow transition-all"
              >
                <span>Abrir mi sobre</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            ) : (
              <MetaMaskButton onClick={cta} loading={loading} label="Conectar con MetaMask" />
            )}
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(ROUTES.cards)}
              className="h-12 gap-2 bg-white/60 px-6 text-base backdrop-blur"
            >
              Ver mis cartas <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>

          <p className="mt-4 text-xs text-muted-foreground">
            Conexión Web3 real en Monad Testnet. Fricción cero para empezar. ✨
          </p>
        </div>

        {/* Abanico de cartas del héroe */}
        <div className="relative flex h-[26rem] flex-1 items-center justify-center">
          {fanCards.map((card, i) => (
            <motion.div
              key={card.name}
              className="absolute"
              initial={{ opacity: 0, y: 80, rotate: 0 }}
              animate={{
                opacity: 1,
                y: fanLayout[i].y,
                x: fanLayout[i].x,
                rotate: fanLayout[i].rotate,
              }}
              transition={{
                delay: 0.3 + i * 0.15,
                type: "spring",
                stiffness: 120,
                damping: 14,
              }}
              style={{ zIndex: fanLayout[i].z }}
            >
              <GameCard card={card} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* FRANJA DE FEATURES */}
      <section className="relative mx-auto -mt-6 max-w-6xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "Fase 1 · Fundamentos",
              text: "Bloques, transacciones y wallets en combates equilibrados para no frustrarte.",
            },
            {
              icon: ShieldCheck,
              title: "Fase 2 · Seguridad",
              text: "Scams, phishing y hackeos. Aprende a usar 'counters' contra amenazas reales.",
            },
            {
              icon: Trophy,
              title: "Fase 3 · Web3",
              text: "Smart Contracts, DeFi y gobernanza. Derrota al jefe final del ecosistema.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-monad-ink">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALERÍA DE CARTAS */}
      <section className="relative mx-auto max-w-6xl px-6 pb-28">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-monad-ink md:text-4xl">
            Tu mazo inicial
          </h2>
          <p className="mt-3 text-muted-foreground">
            Cada carta enseña un concept real. Pasa el cursor para verlas cobrar
            vida.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {heroCards.map((card, i) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.08 }}
            >
              <GameCard card={card} className="w-full max-w-[14rem]" />
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          {isConnected ? (
            <motion.button
              type="button"
              onClick={cta}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-monad to-monad-dark px-8 text-base font-bold text-white shadow-xl shadow-monad/30 border border-monad-dark/50 animate-purple-glow transition-all"
            >
              <span>Reclamar mi sobre gratis</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          ) : (
            <MetaMaskButton onClick={cta} loading={loading} label="Conectar Wallet para empezar" />
          )}
        </div>
      </section>
    </div>
  );
}
