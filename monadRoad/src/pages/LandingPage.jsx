import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  Trophy, 
  Wallet, 
  Layers, 
  Swords,
  ChevronDown
} from "lucide-react";
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

  const tutorialSteps = [
    {
      icon: Wallet,
      title: "La Wallet",
      subtitle: "Es tu Inventario",
      text: "No es solo una billetera. Es tu mochila criptográfica donde se guardan tus cartas (NFTs). Tú tienes el control absoluto de lo que hay dentro.",
      color: "text-blue-500",
      bg: "bg-blue-100",
      borderColor: "border-blue-200"
    },
    {
      icon: Layers,
      title: "Las Cripto",
      subtitle: "Son tus Cartas",
      text: "Los tokens y activos digitales aquí toman forma de cartas. Cada carta que posees tiene una utilidad única y te pertenece de forma comprobable.",
      color: "text-purple-500",
      bg: "bg-purple-100",
      borderColor: "border-purple-200"
    },
    {
      icon: Swords,
      title: "La Blockchain",
      subtitle: "Es el Combate",
      text: "El campo de batalla es la red pública. Cada movimiento táctico que realizas requiere firmar una transacción real y queda registrado para siempre.",
      color: "text-orange-500",
      bg: "bg-orange-100",
      borderColor: "border-orange-200"
    }
  ];

  return (
    // Limitamos a h-screen (100% del alto) y activamos scroll interno.
    // Si está conectado, activamos el "snap-y" para el efecto magnético.
    <div className={`relative h-screen w-full overflow-x-hidden overflow-y-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isConnected ? "snap-y snap-mandatory" : ""}`}>
      
      {/* Fondo fijo */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <BgGradient
          gradientFrom="#ffffff"
          gradientTo="#a99dff"
          gradientStop="38%"
          gradientPosition="50% 0%"
        />
      </div>

      {isConnected ? (
        /* =========================================================
           ESTADO LOGGEADO: SCROLL STORYTELLING TUTORIAL
           ========================================================= */
        <div className="flex w-full flex-col">
          
          {/* PANTALLA 1: Bienvenida */}
          {/* Añadimos h-screen, shrink-0 y snap-center para que encaje exacto */}
          <section className="flex h-screen w-full shrink-0 snap-center flex-col items-center justify-center px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-1.5 text-sm font-bold text-emerald-600 shadow-sm backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Wallet Conectada con Éxito
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-monad-ink md:text-7xl"
            >
              Bienvenido al mundo Web3.<br />
              <span className="text-gradient">Aquí están las reglas.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground"
            >
              Antes de abrir tu primer sobre, descubre cómo se conectan los conceptos del juego con la tecnología real.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-12 flex flex-col items-center gap-2"
            >
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Haz scroll para aprender</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ChevronDown className="h-8 w-8 text-primary" />
              </motion.div>
            </motion.div>
          </section>

          {/* PANTALLAS 2, 3 y 4: Las Analogías */}
          {tutorialSteps.map((step) => (
            <section 
              key={step.title}
              className="flex h-screen w-full shrink-0 snap-center flex-col items-center justify-center px-6 py-20 text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`flex max-w-3xl flex-col items-center rounded-[2rem] border ${step.borderColor} bg-white/60 p-12 shadow-xl backdrop-blur-md`}
              >
                <div className={`mb-8 flex h-24 w-24 items-center justify-center rounded-3xl ${step.bg}`}>
                  <step.icon className={`h-12 w-12 ${step.color}`} />
                </div>
                
                <h2 className="text-4xl font-extrabold text-monad-ink md:text-6xl">{step.title}</h2>
                <p className="mt-2 text-lg font-bold uppercase tracking-widest text-primary">{step.subtitle}</p>
                <p className="mt-8 text-xl leading-relaxed text-muted-foreground md:text-2xl">
                  {step.text}
                </p>
              </motion.div>
            </section>
          ))}

          {/* PANTALLA 5: Call To Action Final */}
          <section className="flex h-screen w-full shrink-0 snap-center flex-col items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              className="flex max-w-2xl flex-col items-center"
            >
              <Trophy className="mb-6 h-20 w-20 text-yellow-500 drop-shadow-md" />
              <h2 className="text-5xl font-extrabold text-monad-ink md:text-6xl">Todo listo.</h2>
              <p className="mt-6 text-2xl text-muted-foreground">
                Ya conoces las reglas básicas. Es momento de armar tu mazo y prepararte para el combate.
              </p>

              <div className="mt-12">
                <Button
                  size="lg"
                  onClick={cta}
                  className="group relative inline-flex h-16 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-monad to-monad-dark px-12 text-xl font-bold text-white shadow-xl shadow-monad/30 border border-monad-dark/50 animate-purple-glow transition-all hover:scale-105"
                >
                  Abrir mi primer sobre <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </section>

        </div>
      ) : (

        /* =========================================================
           ESTADO NO LOGGEADO: LANDING ORIGINAL
           ========================================================= */
        <div className="flex w-full flex-col">
          {/* HERO */}
          <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-6 py-24 lg:flex-row">
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
                <MetaMaskButton onClick={cta} loading={loading} label="Conectar Wallet para empezar" />
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate(ROUTES.cards)}
                  className="h-12 gap-2 bg-white/60 px-6 text-base backdrop-blur"
                >
                  Ver cartas <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>

              <p className="mt-4 text-xs text-muted-foreground">
                Conexión Web3 real en Monad Testnet. Fricción cero para empezar. ✨
              </p>
            </div>

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
          <section className="relative mx-auto max-w-6xl px-6 pb-20">
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
        </div>
      )}
    </div>
  );
}