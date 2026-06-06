import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Shield, Swords, Zap } from "lucide-react";

const rarityRing = {
  Común: "ring-slate-300",
  Rara: "ring-sky-400",
  Épica: "ring-fuchsia-400",
  Legendaria: "ring-amber-400",
};

const rarityBadge = {
  Común: "bg-slate-100 text-slate-600",
  Rara: "bg-sky-100 text-sky-700",
  Épica: "bg-fuchsia-100 text-fuchsia-700",
  Legendaria: "bg-amber-100 text-amber-700",
};

export function GameCard({ card, className, style }) {
  const Icon = card.icon;
  return (
    <motion.div
      style={style}
      whileHover={{ y: -14, rotateZ: 0, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className={cn(
        "relative w-56 select-none overflow-hidden rounded-2xl bg-white p-2 shadow-2xl ring-2",
        rarityRing[card.rarity] || "ring-slate-300",
        className
      )}
    >
      {/* Art panel */}
      <div
        className={cn(
          "relative flex h-36 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br",
          card.gradient
        )}
      >
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />
        <Icon className="h-16 w-16 text-white drop-shadow-lg" strokeWidth={1.5} />
        <span className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-monad-ink shadow">
          {card.energy}
        </span>
        <span
          className={cn(
            "absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
            rarityBadge[card.rarity] || "bg-slate-100 text-slate-600"
          )}
        >
          {card.rarity}
        </span>
      </div>

      {/* Body */}
      <div className="px-1.5 pb-1.5 pt-2">
        <h3 className="text-sm font-bold leading-tight text-monad-ink">
          {card.name}
        </h3>
        <p className="text-[11px] font-medium uppercase tracking-wide text-primary">
          {card.type}
        </p>
        <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
          {card.description}
        </p>

        <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-xs font-semibold">
          <span className="flex items-center gap-1 text-rose-500">
            <Swords className="h-3.5 w-3.5" /> {card.attack}
          </span>
          <span className="flex items-center gap-1 text-sky-500">
            <Shield className="h-3.5 w-3.5" /> {card.defense}
          </span>
          <span className="flex items-center gap-1 text-amber-500">
            <Zap className="h-3.5 w-3.5" /> {card.energy}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
