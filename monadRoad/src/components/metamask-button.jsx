import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function FoxIcon({ className }) {
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

export function MetaMaskButton({
  onClick,
  loading,
  className,
  label = "Conectar con MetaMask",
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={loading}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-white px-6 text-base font-semibold text-monad-ink shadow-lg shadow-primary/20 ring-1 ring-border transition-all hover:shadow-xl hover:ring-primary/40 disabled:opacity-70",
        className
      )}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      ) : (
        <FoxIcon className="h-6 w-6" />
      )}
      <span>{loading ? "Conectando…" : label}</span>
    </motion.button>
  );
}
