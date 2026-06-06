import { useState } from "react";
import { useConnect } from "wagmi";
import { X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Real MetaMask Fox Icon SVG
export function FoxIcon({ className }) {
  return (
    <svg viewBox="0 0 318.6 318.6" className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fill="#e2761b" stroke="#e2761b" strokeLinecap="round" strokeLinejoin="round" d="m274.1 35.5-99.5 73.9L193 65.8z"/>
      <path fill="#e4761b" stroke="#e4761b" strokeLinecap="round" strokeLinejoin="round" d="m44.4 35.5 98.7 74.6-17.5-44.3zm193.9 171.3-26.5 40.6 56.7 15.6 16.3-55.3zm-204.4.9L50.1 263l56.7-15.6-26.5-40.6z"/>
      <path fill="#e4761b" stroke="#e4761b" strokeLinecap="round" strokeLinejoin="round" d="m103.6 138.2-15.8 23.9 56.3 2.5-2-60.5zm111.3 0-39-34.8-1.3 61.2 56.2-2.5zM106.8 247.4l33.8-16.5-29.2-22.8zm71.1-16.5 33.9 16.5-4.7-39.3z"/>
      <path fill="#d7c1b3" stroke="#d7c1b3" strokeLinecap="round" strokeLinejoin="round" d="m211.8 247.4-33.9-16.5 2.7 22.1-.3 9.3zm-105 0 31.5 14.9-.2-9.3 2.5-22.1z"/>
      <path fill="#233447" stroke="#233447" strokeLinecap="round" strokeLinejoin="round" d="m138.8 193.5-28.2-8.3 19.9-9.1zm40.9 0 8.3-17.4 20 9.1z"/>
      <path fill="#cd6116" stroke="#cd6116" strokeLinecap="round" strokeLinejoin="round" d="m106.8 247.4 4.8-40.6-31.3.9zM207 206.8l4.8 40.6 26.5-39.7zm23.8-44.7-56.2 2.5 5.2 28.9 8.3-17.4 20 9.1zm-120.2 23.1 20-9.1 8.2 17.4 5.3-28.9-56.3-2.5z"/>
      <path fill="#e4751f" stroke="#e4751f" strokeLinecap="round" strokeLinejoin="round" d="m87.8 162.1 23.6 46-.8-22.9zm120.3 23.1-1 22.9 23.7-46zm-64-20.6-5.3 28.9 6.6 34.1 1.5-44.9zm30.5 0-2.7 18 1.2 45 6.7-34.1z"/>
      <path fill="#f6851b" stroke="#f6851b" strokeLinecap="round" strokeLinejoin="round" d="m179.8 193.5-6.7 34.1 4.8 3.3 29.2-22.8 1-22.9zm-69.2-8.3.8 22.9 29.2 22.8 4.8-3.3-6.6-34.1z"/>
      <path fill="#c0ad9e" stroke="#c0ad9e" strokeLinecap="round" strokeLinejoin="round" d="m180.3 262.3.3-9.3-2.5-2.2h-37.7l-2.3 2.2.2 9.3-31.5-14.9 11 9 22.3 15.5h38.3l22.4-15.5 11-9z"/>
      <path fill="#161616" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" d="m177.9 230.9-4.8-3.3h-27.7l-4.8 3.3-2.5 22.1 2.3-2.2h37.7l2.5 2.2z"/>
      <path fill="#763d16" stroke="#763d16" strokeLinecap="round" strokeLinejoin="round" d="m278.3 114.2 8.5-40.8-12.7-37.9-96.2 71.4 37 31.3 52.3 15.3 11.6-13.5-5-3.6 8-7.3-6.2-4.8 8-6.1zM31.8 73.4l8.5 40.8-5.4 4 8 6.1-6.1 4.8 8 7.3-5 3.6 11.5 13.5 52.3-15.3 37-31.3-96.2-71.4z"/>
      <path fill="#f6851b" stroke="#f6851b" strokeLinecap="round" strokeLinejoin="round" d="m267.2 153.5-52.3-15.3 15.9 23.9-23.7 46 31.2-.4h46.5zm-163.6-15.3-52.3 15.3-17.4 54.2h46.4l31.1.4-23.6-46zm71 26.4 3.3-57.7 15.2-41.1h-67.5l15 41.1 3.5 57.7 1.2 18.2.1 44.8h27.7l.2-44.8z"/>
    </svg>
  );
}

// Real WalletConnect Icon SVG
export function WalletConnectIcon({ className }) {
  return (
    <img 
      src="https://walletconnect.network/icon.png?14b0dfc4ce526451" 
      alt="WalletConnect" 
      className={className} 
    />
  );
}

// Rabby Wallet SVG
export function RabbyIcon({ className }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="28" fill="#8697FF"/>
      <path d="M90 53H30C28.3 53 27 54.3 27 56V71C27 78.2 32.8 84 40 84H80C87.2 84 93 78.2 93 71V56C93 54.3 91.7 53 90 53Z" fill="white"/>
      <circle cx="48" cy="68" r="6" fill="#8697FF"/>
      <circle cx="72" cy="68" r="6" fill="#8697FF"/>
      <path d="M40 36H80C82.2 36 84 37.8 84 40V49H36V40C36 37.8 37.8 36 40 36Z" fill="#5F75FF"/>
    </svg>
  );
}

// Coinbase Wallet SVG
export function CoinbaseIcon({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="24" fill="#0052FF"/>
      <rect x="25" y="25" width="50" height="50" rx="12" fill="white"/>
    </svg>
  );
}

// Phantom Wallet SVG
export function PhantomIcon({ className }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="28" fill="#4B40DF"/>
      <path d="M78.8 45.2C75.2 41.5 69.8 39.5 60 39.5C50.2 39.5 44.8 41.5 41.2 45.2C37.6 48.8 36.2 54.5 36.2 62C36.2 69.5 37.6 75.2 41.2 78.8C44.8 82.5 50.2 84.5 60 84.5C69.8 84.5 75.2 82.5 78.8 78.8C82.4 75.2 83.8 69.5 83.8 62C83.8 54.5 82.4 48.8 78.8 45.2ZM52.5 59.5C50.6 59.5 49 57.9 49 56C49 54.1 50.6 52.5 52.5 52.5C54.4 52.5 56 54.1 56 56C56 57.9 54.4 59.5 52.5 59.5ZM67.5 59.5C65.6 59.5 64 57.9 64 56C64 54.1 65.6 52.5 67.5 52.5C69.4 52.5 71 54.1 71 56C71 57.9 69.4 59.5 67.5 59.5Z" fill="white"/>
      <path d="M52.5 65.5C55 65.5 57 67.5 57 70H48C48 67.5 50 65.5 52.5 65.5Z" fill="white"/>
    </svg>
  );
}

// Rainbow Wallet SVG
export function RainbowIcon({ className }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="28" fill="#1A1B1F"/>
      <path d="M85 75C85 55.67 69.33 40 50 40C30.67 40 15 55.67 15 75" stroke="#FF007A" strokeWidth="10" strokeLinecap="round"/>
      <path d="M85 75C85 60.91 73.53 49.44 59.44 49.44C45.36 49.44 33.89 60.91 33.89 75" stroke="#FFCD00" strokeWidth="10" strokeLinecap="round"/>
      <path d="M85 75C85 66.72 78.28 60 70 60C61.72 60 55 66.72 55 75" stroke="#00E0FF" strokeWidth="10" strokeLinecap="round"/>
    </svg>
  );
}

// Generic Wallet Premium SVG (Globe with lines representing Injected/Browser wallet)
export function GenericWalletIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#836ef9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
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
    if (id.includes("rabby") || name.toLowerCase().includes("rabby")) {
      return {
        name: "Rabby Wallet",
        icon: <RabbyIcon className="h-9 w-9" />,
        desc: "Conéctate usando la extensión de Rabby",
      };
    }
    if (id.includes("coinbase") || name.toLowerCase().includes("coinbase")) {
      return {
        name: "Coinbase Wallet",
        icon: <CoinbaseIcon className="h-9 w-9" />,
        desc: "Conéctate usando Coinbase Wallet",
      };
    }
    if (id.includes("phantom") || name.toLowerCase().includes("phantom")) {
      return {
        name: "Phantom",
        icon: <PhantomIcon className="h-9 w-9" />,
        desc: "Conéctate usando tu billetera Phantom",
      };
    }
    if (id.includes("rainbow") || name.toLowerCase().includes("rainbow")) {
      return {
        name: "Rainbow",
        icon: <RainbowIcon className="h-9 w-9" />,
        desc: "Conéctate usando Rainbow Wallet",
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
      icon: <GenericWalletIcon className="h-9 w-9" />,
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
