import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import {
  Swords,
  Shield,
  Zap,
  Trophy,
  Skull,
  RotateCcw,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { GameCard } from "@/components/game-card";
import { heroCards } from "@/data/cards";
import { useInventory } from "@/context/InventoryContext";
import { ROUTES } from "../routes/paths";
import "./BattlePage.css";

/* ─── Constants ─── */
const MAX_HAND_SIZE = 3;
const HP_MULTIPLIER = 10;
const PLAY_DELAY_MS = 1200;
const DAMAGE_DISPLAY_MS = 1400;

/* ─── Helpers ─── */
function computeDamage(card, enemy) {
  const counter = card.counters?.find((c) => c.target === enemy.id);
  const baseDmg = card.attack;
  if (counter) {
    return {
      damage: Math.round(baseDmg * counter.multiplier),
      isCounter: true,
      multiplier: counter.multiplier,
    };
  }
  return { damage: baseDmg, isCounter: false, multiplier: 1 };
}

function hpBarClass(pct) {
  if (pct > 55) return "health-bar__fill--healthy";
  if (pct > 25) return "health-bar__fill--warning";
  return "health-bar__fill--critical";
}

/* ─── Phases ─── */
const PHASE = { PRE: "pre", BATTLE: "battle", POST: "post" };

/* ─── Pick a random enemy (always the "threat" cards) ─── */
function pickEnemy() {
  // For now use the last card "Enlace Malicioso"
  return heroCards[heroCards.length - 1];
}

/* ════════════════════════════════════════════════════════════
   BattlePage
   ════════════════════════════════════════════════════════════ */
export default function BattlePage() {
  const { isConnected } = useAccount();
  const { ownedCards, addCard } = useInventory();

  /* ── Game state ── */
  const [phase, setPhase] = useState(PHASE.PRE);
  const [enemy] = useState(pickEnemy);

  // Pre-battle: card selection
  const [selectedIds, setSelectedIds] = useState([]);

  // Battle state
  const [hand, setHand] = useState([]);
  const [playedIndices, setPlayedIndices] = useState([]);
  const [enemyHp, setEnemyHp] = useState(0);
  const [maxHp, setMaxHp] = useState(0);
  const [currentPlay, setCurrentPlay] = useState(null); // card being played
  const [damagePopup, setDamagePopup] = useState(null);
  const [counterText, setCounterText] = useState(null);
  const [combatLog, setCombatLog] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shakeEnemy, setShakeEnemy] = useState(false);

  // Post-battle
  const [didWin, setDidWin] = useState(false);

  const roundRef = useRef(0);

  /* ── Card selection toggle ── */
  const toggleCard = useCallback(
    (cardId) => {
      setSelectedIds((prev) => {
        if (prev.includes(cardId)) return prev.filter((id) => id !== cardId);
        if (prev.length >= MAX_HAND_SIZE) return prev;
        return [...prev, cardId];
      });
    },
    []
  );

  /* ── Start battle ── */
  const startBattle = useCallback(() => {
    const selectedCards = selectedIds.map((id) =>
      ownedCards.find((c) => c.id === id)
    ).filter(Boolean);
    const hp = enemy.defense * HP_MULTIPLIER;
    setHand(selectedCards);
    setPlayedIndices([]);
    setEnemyHp(hp);
    setMaxHp(hp);
    setCurrentPlay(null);
    setDamagePopup(null);
    setCounterText(null);
    setCombatLog([]);
    roundRef.current = 0;
    setPhase(PHASE.BATTLE);
  }, [selectedIds, enemy, ownedCards]);

  /* ── Play a card ── */
  const playCard = useCallback(
    (index) => {
      if (isPlaying || playedIndices.includes(index)) return;
      setIsPlaying(true);

      const card = hand[index];
      const { damage, isCounter, multiplier } = computeDamage(card, enemy);
      roundRef.current += 1;
      const round = roundRef.current;

      // Show card moving to center
      setCurrentPlay(card);
      setPlayedIndices((prev) => [...prev, index]);

      // After a brief delay, show damage
      setTimeout(() => {
        setDamagePopup({ damage, isCounter });
        if (isCounter) {
          setCounterText(`¡COUNTER! ×${multiplier}`);
        }
        setShakeEnemy(true);

        // Update HP
        setEnemyHp((prev) => {
          const newHp = Math.max(0, prev - damage);

          // Add to combat log
          setCombatLog((log) => [
            ...log,
            {
              round,
              card: card.name,
              damage,
              isCounter,
              remainingHp: newHp,
            },
          ]);

          // Check if battle is over (after all 3 cards or enemy dead)
          const allPlayed = round >= MAX_HAND_SIZE;
          if (newHp <= 0 || allPlayed) {
            const won = newHp <= 0;
            // Future: this addCard call will trigger a contract mint/transfer
            if (won) addCard(enemy.id);
            setTimeout(() => {
              setDidWin(won);
              setPhase(PHASE.POST);
            }, DAMAGE_DISPLAY_MS + 400);
          }

          return newHp;
        });
      }, PLAY_DELAY_MS / 2);

      // Cleanup damage popup
      setTimeout(() => {
        setDamagePopup(null);
        setCounterText(null);
        setShakeEnemy(false);
        setCurrentPlay(null);
        setIsPlaying(false);
      }, PLAY_DELAY_MS + DAMAGE_DISPLAY_MS);
    },
    [hand, enemy, isPlaying, playedIndices]
  );

  /* ── Retry ── */
  const retry = useCallback(() => {
    setSelectedIds([]);
    setPhase(PHASE.PRE);
  }, []);

  /* ── Render helpers ── */
  const hpPct = maxHp > 0 ? (enemyHp / maxHp) * 100 : 100;

  /* ════════════════════════════════════════════════════════ */
  return (
    <div className="battle-arena">
      <div className="battle-content">
        {!isConnected ? (
          /* ── Wallet locked ── */
          <div className="battle-locked">
            <span className="battle-locked__icon">🔒</span>
            <h3 className="battle-locked__title">Wallet no conectada</h3>
            <p className="battle-locked__desc">
              Conecta tu wallet para acceder a la arena y luchar contra
              oponentes on-chain.
            </p>
          </div>
        ) : ownedCards.length === 0 ? (
          /* ── No cards yet ── */
          <div className="battle-locked">
            <span className="battle-locked__icon">📦</span>
            <h3 className="battle-locked__title">No tienes cartas</h3>
            <p className="battle-locked__desc">
              Abre tu primer sobre de regalo para recibir cartas y poder
              entrar en combate.
            </p>
            <Link to={ROUTES.pack} className="btn-start-battle" style={{ marginTop: 16 }}>
              Abrir mi Sobre
            </Link>
          </div>
        ) : (
          <>
            {/* ═══════ PHASE: PRE-BATTLE ═══════ */}
            <AnimatePresence mode="wait">
              {phase === PHASE.PRE && (
                <motion.div
                  key="pre"
                  className="pre-battle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Header */}
                  <div className="pre-battle__header">
                    <span className="pre-battle__badge">
                      <Swords size={14} /> Arena de Combate
                    </span>
                    <h1 className="pre-battle__title">
                      Elige tu <span>Estrategia</span>
                    </h1>
                    <p className="pre-battle__subtitle">
                      Analiza al enemigo, elige sabiamente tus 3 cartas y
                      entra en batalla.
                    </p>
                  </div>

                  {/* Enemy preview */}
                  <motion.div
                    className="enemy-preview"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <span className="enemy-preview__label">
                      Próximo Enemigo
                    </span>
                    <h2 className="enemy-preview__name">{enemy.name}</h2>
                    <span className="enemy-preview__type">{enemy.type}</span>
                    <p className="enemy-preview__desc">{enemy.description}</p>

                    <div className="enemy-stats">
                      <div className="enemy-stat">
                        <Swords
                          size={16}
                          className="enemy-stat__value--atk"
                        />
                        <span className="enemy-stat__value enemy-stat__value--atk">
                          {enemy.attack}
                        </span>
                        <span className="enemy-stat__label">Ataque</span>
                      </div>
                      <div className="enemy-stat">
                        <Shield
                          size={16}
                          className="enemy-stat__value--def"
                        />
                        <span className="enemy-stat__value enemy-stat__value--def">
                          {enemy.defense}
                        </span>
                        <span className="enemy-stat__label">Defensa</span>
                      </div>
                      <div className="enemy-stat">
                        <Zap size={16} className="enemy-stat__value--nrg" />
                        <span className="enemy-stat__value enemy-stat__value--nrg">
                          {enemy.energy}
                        </span>
                        <span className="enemy-stat__label">Energía</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card selection */}
                  <div className="card-selection">
                    <p className="card-selection__label">
                      Selecciona <strong>{MAX_HAND_SIZE} cartas</strong> de tu
                      wallet ({selectedIds.length}/{MAX_HAND_SIZE})
                    </p>
                    <div className="card-selection__grid">
                      {ownedCards
                        .filter((c) => c.id !== enemy.id)
                        .map((card, i) => {
                          const isSelected = selectedIds.includes(card.id);
                          const isFull =
                            selectedIds.length >= MAX_HAND_SIZE &&
                            !isSelected;

                          return (
                            <motion.div
                              key={card.id}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + i * 0.06 }}
                              className={[
                                "card-select-wrapper",
                                isSelected && "card-select-wrapper--selected",
                                isFull && "card-select-wrapper--disabled",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              onClick={() => toggleCard(card.id)}
                            >
                              <GameCard card={card} />
                            </motion.div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pre-battle__actions">
                    <button
                      className="btn-start-battle"
                      disabled={selectedIds.length < MAX_HAND_SIZE}
                      onClick={startBattle}
                    >
                      <Swords size={18} />
                      Iniciar Combate
                    </button>
                    {selectedIds.length < MAX_HAND_SIZE && (
                      <span className="pre-battle__hint">
                        Selecciona {MAX_HAND_SIZE - selectedIds.length} carta
                        {MAX_HAND_SIZE - selectedIds.length !== 1 && "s"} más
                      </span>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ═══════ PHASE: BATTLE ═══════ */}
              {phase === PHASE.BATTLE && (
                <motion.div
                  key="battle"
                  className="battle-table"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Enemy zone */}
                  <div className="enemy-zone">
                    <span className="enemy-zone__name">
                      <Skull size={14} />
                      {enemy.name}
                    </span>

                    <motion.div
                      className={`enemy-card-container ${
                        shakeEnemy ? "enemy-card-container--hit" : ""
                      }`}
                      initial={{ opacity: 0, y: -40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <GameCard card={enemy} />
                    </motion.div>

                    {/* Health bar */}
                    <div className="health-bar-wrap">
                      <div className="health-bar">
                        <div
                          className={`health-bar__fill ${hpBarClass(hpPct)}`}
                          style={{ width: `${hpPct}%` }}
                        />
                      </div>
                      <span className="health-bar__text">
                        HP {enemyHp} / {maxHp}
                      </span>
                    </div>
                  </div>

                  {/* Play zone */}
                  <div className="play-zone">
                    {/* Card being played */}
                    <AnimatePresence>
                      {currentPlay && (
                        <motion.div
                          className="play-zone__card"
                          initial={{ y: 200, opacity: 0, scale: 0.7 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          exit={{ y: -60, opacity: 0, scale: 0.8 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 18,
                          }}
                        >
                          <GameCard card={currentPlay} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Damage popup */}
                    <AnimatePresence>
                      {damagePopup && (
                        <motion.span
                          key="dmg"
                          className={`damage-popup ${
                            damagePopup.isCounter ? "damage-popup--bonus" : ""
                          }`}
                          initial={{ opacity: 0, scale: 0.4 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          -{damagePopup.damage}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Counter bonus text */}
                    <AnimatePresence>
                      {counterText && (
                        <motion.span
                          key="counter"
                          className="counter-text"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          {counterText}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Combat log */}
                    {combatLog.length > 0 && (
                      <div className="combat-log">
                        <span className="combat-log__title">
                          Registro de Transacciones
                        </span>
                        {combatLog.map((entry, i) => (
                          <div key={i} className="combat-log__entry">
                            <strong>R{entry.round}:</strong> {entry.card} →{" "}
                            <span className="dmg">-{entry.damage}</span>
                            {entry.isCounter && (
                              <span className="bonus"> ★ Counter</span>
                            )}
                            <br />
                            HP restante: {entry.remainingHp}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Round indicator */}
                  <div className="round-indicator">
                    <span className="round-indicator__text">
                      Ronda <span>{roundRef.current + 1}</span> de{" "}
                      {MAX_HAND_SIZE}
                      {!isPlaying &&
                        playedIndices.length < MAX_HAND_SIZE &&
                        " — Elige una carta para jugar"}
                    </span>
                  </div>

                  {/* Player hand */}
                  <div className="player-hand">
                    {hand.map((card, i) => {
                      const wasPlayed = playedIndices.includes(i);
                      return (
                        <motion.div
                          key={card.id}
                          className={[
                            "hand-card-slot",
                            wasPlayed && "hand-card-slot--played",
                            !wasPlayed &&
                              !isPlaying &&
                              "hand-card-slot--active",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          initial={{ opacity: 0, y: 80 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          onClick={() => playCard(i)}
                        >
                          <GameCard card={card} />
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ═══════ PHASE: POST-BATTLE ═══════ */}
              {phase === PHASE.POST && (
                <motion.div
                  key="post"
                  className="post-battle"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {didWin ? (
                    <>
                      {/* Victory confetti */}
                      {Array.from({ length: 24 }).map((_, i) => (
                        <span
                          key={i}
                          className="victory-particle"
                          style={{
                            left: `${(i * 41) % 100}%`,
                            top: 0,
                            background: [
                              "#fbbf24",
                              "#836ef9",
                              "#34d399",
                              "#f472b6",
                              "#60a5fa",
                            ][i % 5],
                            animationDuration: `${3 + (i % 4)}s`,
                            animationDelay: `${(i % 8) * 0.3}s`,
                          }}
                        />
                      ))}

                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 12,
                        }}
                      >
                        <Trophy
                          size={72}
                          color="#fbbf24"
                          strokeWidth={1.5}
                        />
                      </motion.div>

                      <h1 className="victory-title">¡Victoria!</h1>
                      <p className="post-battle__subtitle">
                        Has derrotado a {enemy.name}. Su NFT ha sido reclamado
                        y añadido a tu wallet.
                      </p>

                      {/* NFT claimed */}
                      <motion.div
                        className="nft-claimed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <span className="nft-claimed__label">
                          <Sparkles size={14} /> NFT Reclamado
                        </span>
                        <GameCard card={enemy} />
                      </motion.div>

                      <div className="post-battle__actions">
                        <Link to={ROUTES.cards} className="btn-start-battle">
                          Ver mi Colección <ArrowRight size={16} />
                        </Link>
                        <button className="btn-secondary" onClick={retry}>
                          <RotateCcw size={14} /> Otra Batalla
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 12,
                        }}
                      >
                        <Skull size={72} color="#ef4444" strokeWidth={1.5} />
                      </motion.div>

                      <h1 className="defeat-title">Derrota</h1>
                      <p className="post-battle__subtitle">
                        {enemy.name} ha resistido tu ataque. Revisa tu
                        estrategia y vuelve a intentarlo.
                      </p>

                      {/* Battle summary */}
                      <div
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 16,
                          padding: 20,
                          maxWidth: 340,
                          width: "100%",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "rgba(255,255,255,0.3)",
                          }}
                        >
                          Resumen
                        </span>
                        {combatLog.map((entry, i) => (
                          <div
                            key={i}
                            style={{
                              fontSize: 13,
                              color: "rgba(255,255,255,0.55)",
                              padding: "8px 0",
                              borderBottom:
                                i < combatLog.length - 1
                                  ? "1px solid rgba(255,255,255,0.04)"
                                  : "none",
                            }}
                          >
                            <strong style={{ color: "rgba(255,255,255,0.8)" }}>
                              R{entry.round}:
                            </strong>{" "}
                            {entry.card} →{" "}
                            <span style={{ color: "#f87171", fontWeight: 700 }}>
                              -{entry.damage}
                            </span>
                            {entry.isCounter && (
                              <span
                                style={{ color: "#fbbf24", fontWeight: 700 }}
                              >
                                {" "}
                                ★ Counter
                              </span>
                            )}
                          </div>
                        ))}
                        <div
                          style={{
                            marginTop: 12,
                            fontSize: 13,
                            color: "#ef4444",
                            fontWeight: 700,
                          }}
                        >
                          HP restante del enemigo: {enemyHp}
                        </div>
                      </div>

                      <div className="post-battle__actions">
                        <button className="btn-start-battle" onClick={retry}>
                          <RotateCcw size={16} /> Reintentar
                        </button>
                        <Link to={ROUTES.home} className="btn-secondary">
                          Retirarse
                        </Link>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
