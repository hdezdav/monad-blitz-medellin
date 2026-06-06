import { useState } from "react";
import { useConnect } from "wagmi";
import { X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Real MetaMask Fox Icon SVG
export function FoxIcon({ className }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        fill="#E2761B"
        d="M36 4 22 14l3-7 11-3Z M4 4l14 10-3-7L4 4Z"
      />
      <path
        fill="#E4761B"
        d="M31 28l-4 6 9 3 3-9-8 0Z M1 28l3 9 9-3-4-6-8 0Z"
      />
      <path
        fill="#F6851B"
        d="M13 18l-3 4 9 .4-.3-9.6L13 18Z M27 18l-6-5.3-.2 9.7 9-.4-2.8-4Z"
      />
      <path fill="#C0AD9E" d="M13 34l5-2-4-3-1 5Z M22 32l5 2-1-5-4 3Z" />
      <path fill="#763D16" d="M22 32l-2-1-2 1 .3 2 3.4 0 .3-2Z" />
    </svg>
  );
}

// Real WalletConnect Icon SVG
export function WalletConnectIcon({ className }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="none">
      <path
        d="M29.5 14.5c-5.2-5.2-13.8-5.2-19 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2l3 3c.3.3.8.3 1.1 0l1.4-1.4c3.3-3.3 8.7-3.3 12 0l1.4 1.4c.3.3.8.3 1.1 0l3-3c.6-.6.6-1.6 0-2.2l-1.4-1.4z"
        fill="#3B99FC"
      />
      <path
        d="M19.9 25c.3.3.8.3 1.1 0l6.2-6.2c.6-.6.6-1.6 0-2.2l-1.4-1.4c-.3-.3-.8-.3-1.1 0l-4.2 4.2-4.2-4.2c-.3-.3-.8-.3-1.1 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2l6.2 6.2z"
        fill="#3B99FC"
      />
    </svg>
  );
}

export default function WalletModal({ isOpen, onClose }) {
  const { connectors, connect, isPending, error } = useConnect();
  const [connectingId, setConnectingId] = useState(null);

  if (!isOpen) return null;

  const handleConnect = (connector) => {
    setConnectingId(connector.uid);
    connect(
      { connector },
      {
        onSuccess: () => {
          setConnectingId(null);
          onClose();
        },
        onError: () => {
          setConnectingId(null);
        },
      }
    );
  };

  const getWalletMeta = (connector) => {
    const id = connector.id.toLowerCase();
    const name = connector.name;

    if (id.includes("metamask") || name.toLowerCase().includes("metamask")) {
      return {
        name: "MetaMask",
        icon: <FoxIcon className="h-9 w-9" />,
        desc: "Conéctate usando tu extensión de MetaMask",
      };
    }
    if (id.includes("walletconnect")) {
      return {
        name: "WalletConnect",
        icon: <WalletConnectIcon className="h-9 w-9" />,
        desc: "Escanea el código QR para conectar",
      };
    }
    // Fallback for injected or generic browser wallets
    return {
      name: name,
      icon: <span className="text-2xl">💎</span>,
      desc: "Conéctate con tu billetera de navegador",
    };
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-white/95 p-6 shadow-2xl backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow decorations */}
        <div className="absolute -left-16 -top-16 -z-10 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
        <div className="absolute -bottom-16 -right-16 -z-10 h-32 w-32 rounded-full bg-purple-400/20 blur-2xl" />

        <button
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-monad to-monad-dark text-white shadow-md">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 2L26 8v12l-12 6L2 20V8l12-6z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="14" cy="14" r="4" fill="currentColor" />
            </svg>
          </div>
          <h2 className="mt-4 text-xl font-extrabold tracking-tight text-monad-ink">
            Conectar Wallet
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Selecciona tu wallet favorita para entrar a Monad Road
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {connectors.map((connector) => {
            const meta = getWalletMeta(connector);
            const isConnecting = connectingId === connector.uid;

            return (
              <button
                key={connector.uid}
                className={cn(
                  "w-full flex items-center gap-4 rounded-xl border border-border bg-white/60 p-4 text-left transition-all hover:bg-secondary/70 hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  isPending && !isConnecting && "opacity-50 pointer-events-none"
                )}
                onClick={() => handleConnect(connector)}
                disabled={isPending}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-border/40">
                  {meta.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-monad-ink text-sm sm:text-base truncate">
                    {meta.name}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {meta.desc}
                  </p>
                </div>
                {isConnecting ? (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                ) : (
                  <svg
                    className="h-5 w-5 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {error && (
          <div className="mt-4 flex gap-2 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
            <span className="font-bold">⚠️</span>
            <p className="flex-1 leading-snug">
              {error.message?.split(".")[0] || "Conexión fallida"}
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-col items-center gap-2 border-t border-border pt-4 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Monad Testnet
          </div>
          <p className="text-[10px] text-muted-foreground leading-normal max-w-[280px]">
            Al conectar, aceptas los Términos de Servicio y confirmas que estás
            usando la red de pruebas de Monad.
          </p>
        </div>
      </div>
    </div>
  );
}
