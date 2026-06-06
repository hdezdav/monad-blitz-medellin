import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, PartyPopper, Loader2 } from "lucide-react";
import { useAccount, useWriteContract, usePublicClient } from "wagmi";
import { NFT_CARDS_ABI, GAME_STATE_ABI, CONTRACT_ADDRESSES } from "@/lib/contracts";

import { BgGradient } from "@/components/ui/bg-gradient";
import { Button } from "@/components/ui/button";
import { GiftPack } from "@/components/gift-pack";
import { heroCards } from "@/data/cards";
import { useInventory } from "@/context/InventoryContext";
import { ROUTES } from "../routes/paths";

const starterPack = [
  heroCards.find((c) => c.tokenId === 1),
  heroCards.find((c) => c.tokenId === 3),
  heroCards.find((c) => c.tokenId === 4),
  heroCards.find((c) => c.tokenId === 6),
].filter(Boolean);

export default function OpenPackPage() {
  const navigate = useNavigate();
  const { isConnected, address } = useAccount();
  const { hasOpenedPack, ownedCardIds, refetch } = useInventory();
  const [opened, setOpened] = useState(false);
  const [txStep, setTxStep] = useState(0); // 0: Idle, 1: Minting NFTs, 2: Registering Game, 3: Completed
  const [errorText, setErrorText] = useState("");

  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const isAlreadyPackOpened = hasOpenedPack && ownedCardIds.length > 0;

  const handleOpen = async () => {
    if (txStep > 0) return;
    setErrorText("");
    try {
      // Step 1: Mint Starter Pack
      setTxStep(1);
      const mintTx = await writeContractAsync({
        address: CONTRACT_ADDRESSES.NFT_CARDS,
        abi: NFT_CARDS_ABI,
        functionName: 'mintStarterPack',
        args: [address],
      });
      await publicClient.waitForTransactionReceipt({ hash: mintTx });

      // Step 2: Register Player in GameState (if not already registered)
      setTxStep(2);
      if (!hasOpenedPack) {
        const registerTx = await writeContractAsync({
          address: CONTRACT_ADDRESSES.GAME_STATE,
          abi: GAME_STATE_ABI,
          functionName: 'registerPlayer',
        });
        await publicClient.waitForTransactionReceipt({ hash: registerTx });
      }

      // Sync the context state
      await refetch();
      
      setTxStep(3);
      setOpened(true);
    } catch (err) {
      console.error(err);
      setErrorText(err.message || "Error al procesar transacciones en la red.");
      setTxStep(0);
    }
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
      {(opened || isAlreadyPackOpened) && Array.from({ length: 18 }).map((_, i) => (
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
            : isAlreadyPackOpened
              ? "Ya abriste tu sobre inicial. ¡Revisa tus cartas o ve al combate!"
              : "Tu wallet está vinculada. Abre el sobre para descubrir tus primeras cartas NFT y registrarte en el juego."}
        </p>

        {errorText && (
          <p className="mt-4 max-w-md text-sm text-red-500 font-semibold bg-red-50 px-4 py-2 rounded-lg border border-red-200 break-words">
            {errorText}
          </p>
        )}

        <div className="mt-12">
          {isConnected ? (
            isAlreadyPackOpened && !opened ? (
              /* Already opened */
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-72 w-56 flex-col items-center justify-center rounded-3xl bg-primary/5 border-2 border-dashed border-primary/30 text-primary/60">
                  <span className="text-4xl mb-2">📦</span>
                  <p className="text-sm font-semibold">Sobre ya abierto</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                {txStep > 0 && txStep < 3 && (
                  <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-3xl bg-black/70 backdrop-blur-sm text-white p-6">
                    <Loader2 className="h-10 w-10 animate-spin mb-3 text-primary" />
                    <span className="text-sm font-bold text-center">
                      {txStep === 1
                        ? "Paso 1/2: Minteando tus cartas iniciales (NFTs)..."
                        : "Paso 2/2: Registrando tu progreso en Monad Testnet..."}
                    </span>
                    <span className="text-xs text-slate-400 mt-2 text-center">
                      Por favor, firma la transacción en tu wallet.
                    </span>
                  </div>
                )}
                <GiftPack
                  cards={starterPack}
                  onOpened={handleOpen}
                  isOpened={opened}
                />
              </div>
            )
          ) : (
            <div className="flex h-72 w-56 flex-col items-center justify-center rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 text-slate-400">
              <span className="text-4xl mb-2">🔒</span>
              <p className="text-sm font-semibold">Wallet requerida</p>
            </div>
          )}
        </div>

        {(opened || isAlreadyPackOpened) && (
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
