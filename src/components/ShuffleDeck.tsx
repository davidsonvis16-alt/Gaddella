import { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from "framer-motion";
import Frame from "./Frame";
import { getArtist } from "../data/artists";
import type { Work } from "../data/works";
import { DECK_SPRING } from "../lib/motion";
import styles from "./ShuffleDeck.module.css";

/* ==========================================================================
   A deck of printed photographs.

   The top card is dominant; the rest sit under it, fractionally smaller and
   rotated by a degree or two so the stack looks placed by hand rather than
   generated. Throwing the top card away promotes the next one, and the thrown
   card returns silently to the back of the deck.

   Every gesture has a non-gesture equivalent: buttons, arrow keys, and the
   index strip underneath. Nobody is ever forced to swipe.
   ========================================================================== */

/** Where each card sits, by how far back it is in the deck. */
const SLOTS = [
  { y: 0, x: 0, scale: 1, rotate: 0, opacity: 1 },
  { y: -18, x: 16, scale: 0.955, rotate: 1.8, opacity: 1 },
  { y: -34, x: 29, scale: 0.914, rotate: -1.3, opacity: 0.9 },
  { y: -48, x: 39, scale: 0.876, rotate: 3.1, opacity: 0.66 },
];

const slotFor = (depth: number) => SLOTS[Math.min(depth, SLOTS.length - 1)];

/** Past this distance, or this speed, the throw counts. */
const THROW_DISTANCE = 110;
const THROW_VELOCITY = 480;

type Command = { id: string; type: "exit" | "enter"; dir: number; token: number };

type CardProps = {
  work: Work;
  depth: number;
  total: number;
  isTop: boolean;
  reduced: boolean;
  command: Command | null;
  /** Skip animation for one frame — used when a thrown card rejoins the back. */
  instant: boolean;
  onThrow: (dir: number) => void;
  onExited: (id: string) => void;
};

function DeckCard({ work, depth, total, isTop, reduced, command, instant, onThrow, onExited }: CardProps) {
  const ref = useRef<HTMLLIElement>(null);
  const x = useMotionValue(0);

  // Rotation and fade come from the drag itself, so the card feels weighted.
  const dragRotate = useTransform(x, [-300, 0, 300], [-9, 0, 9]);
  const dragOpacity = useTransform(x, [-460, -300, 0, 300, 460], [0, 1, 1, 1, 0]);

  const slot = slotFor(depth);
  const artist = work.artistId ? getArtist(work.artistId) : undefined;

  const travel = useCallback(() => (ref.current?.offsetWidth ?? 360) + 180, []);

  // The parent drives exits and entrances; the card owns the animation.
  useEffect(() => {
    if (!command) return;

    if (command.type === "exit") {
      if (reduced) {
        x.set(0);
        onExited(work.id);
        return;
      }
      animate(x, command.dir * travel(), {
        type: "spring",
        stiffness: 240,
        damping: 30,
        onComplete: () => {
          // Reset the sheet before the card is re-slotted, so it rejoins the
          // back of the deck square rather than carrying the throw with it.
          x.set(0);
          onExited(work.id);
        },
      });
    }

    if (command.type === "enter") {
      if (reduced) {
        x.set(0);
        return;
      }
      x.set(command.dir * travel());
      animate(x, 0, DECK_SPRING);
    }
    // Token makes repeat commands of the same type re-fire.
  }, [command?.token]); // eslint-disable-line react-hooks/exhaustive-deps

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const far = Math.abs(info.offset.x) > THROW_DISTANCE;
    const fast = Math.abs(info.velocity.x) > THROW_VELOCITY;
    if (far || fast) {
      onThrow(info.offset.x < 0 ? -1 : 1);
    } else {
      animate(x, 0, DECK_SPRING);
    }
  };

  const interactive = isTop && !reduced;

  return (
    <motion.li
      ref={ref}
      className={styles.card}
      style={{ zIndex: total - depth }}
      animate={{ y: slot.y, x: slot.x, scale: slot.scale, rotate: slot.rotate, opacity: slot.opacity }}
      transition={instant || reduced ? { duration: 0 } : DECK_SPRING}
      aria-hidden={!isTop}
    >
      <motion.div
        className={styles.sheet}
        style={interactive ? { x, rotate: dragRotate, opacity: dragOpacity } : undefined}
        drag={interactive ? "x" : false}
        dragMomentum={false}
        onDragEnd={interactive ? onDragEnd : undefined}
      >
        <button
          type="button"
          className={styles.face}
          tabIndex={isTop ? 0 : -1}
          onClick={() => isTop && onThrow(1)}
          aria-label={`${work.title}, ${work.placement}. Show the next piece.`}
        >
          <Frame image={work.imageId} ratio={0.78} still sizes="(max-width: 767px) 84vw, 34vw" />
        </button>
      </motion.div>

      <div className={styles.caption} aria-hidden={!isTop}>
        <p className={["label", styles.captionStyle].join(" ")}>{work.title}</p>
        <p className={styles.captionMeta}>
          {artist?.name ?? work.style} · {work.placement}
        </p>
      </div>
    </motion.li>
  );
}

export default function ShuffleDeck({ works }: { works: Work[] }) {
  const reduced = useReducedMotion() ?? false;
  const total = works.length;
  const [index, setIndex] = useState(0);
  const [command, setCommand] = useState<Command | null>(null);
  const [instantId, setInstantId] = useState<string | null>(null);
  const busy = useRef(false);
  const token = useRef(0);

  const current = works[index % total];

  /** Throw the top card away; the next one takes its place. */
  const next = useCallback(
    (dir = 1) => {
      if (busy.current || total < 2) return;
      busy.current = true;
      token.current += 1;
      setCommand({ id: works[index % total].id, type: "exit", dir, token: token.current });
    },
    [index, total, works],
  );

  /** Bring the card at the back of the deck around to the front. */
  const prev = useCallback(() => {
    if (busy.current || total < 2) return;
    busy.current = true;
    const target = (index - 1 + total) % total;
    token.current += 1;
    setIndex(target);
    setCommand({ id: works[target].id, type: "enter", dir: -1, token: token.current });
    window.setTimeout(() => {
      busy.current = false;
    }, 260);
  }, [index, total, works]);

  /** Jump straight to one card — used by the index strip. */
  const goTo = useCallback(
    (target: number) => {
      if (busy.current || target === index % total) return;
      busy.current = true;
      const dir = target > index % total ? 1 : -1;
      token.current += 1;
      setIndex(target);
      setCommand({ id: works[target].id, type: "enter", dir, token: token.current });
      window.setTimeout(() => {
        busy.current = false;
      }, 260);
    },
    [index, total, works],
  );

  /** Called once the thrown card is off screen: promote the next one, and drop
      the thrown card straight onto the back of the deck without a journey. */
  const onExited = useCallback(
    (id: string) => {
      setIndex((i) => (i + 1) % total);
      setInstantId(id);
      setCommand(null);
      busy.current = false;
    },
    [total],
  );

  // Release the instant flag on the next frame, so the card animates normally again.
  useEffect(() => {
    if (!instantId) return;
    const raf = requestAnimationFrame(() => setInstantId(null));
    return () => cancelAnimationFrame(raf);
  }, [instantId]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  return (
    <div className={styles.wrap}>
      <div
        className={styles.stage}
        role="group"
        aria-roledescription="Card deck"
        aria-label="Featured work"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <ul className={styles.deck}>
          {works.map((work, i) => {
            const depth = (i - index + total) % total;
            return (
              <DeckCard
                key={work.id}
                work={work}
                depth={depth}
                total={total}
                isTop={depth === 0}
                reduced={reduced}
                command={command?.id === work.id ? command : null}
                instant={instantId === work.id}
                onThrow={next}
                onExited={onExited}
              />
            );
          })}
        </ul>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {`${current.title}, ${current.placement}. Card ${(index % total) + 1} of ${total}.`}
      </p>

      <div className={styles.controls}>
        <div className={styles.buttons}>
          <button type="button" onClick={prev} className={styles.step} aria-label="Previous piece">
            <svg viewBox="0 0 24 10" width="24" height="10" aria-hidden="true">
              <path d="M24 5H1M5 1L0.5 5 5 9" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
          <button type="button" onClick={() => next(1)} className={styles.step} aria-label="Next piece">
            <svg viewBox="0 0 24 10" width="24" height="10" aria-hidden="true">
              <path d="M0 5h23M19 1l4.5 4L19 9" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
        </div>
        <p className={["label", styles.hint].join(" ")}>Drag, click or use the arrow keys</p>
      </div>

      {/* The index doubles as navigation and as the reference's caption row. */}
      <ol className={styles.index}>
        {works.map((work, i) => {
          const active = i === index % total;
          return (
            <li key={work.id}>
              <button
                type="button"
                onClick={() => goTo(i)}
                className={[styles.indexItem, active ? styles.indexActive : ""].filter(Boolean).join(" ")}
                aria-current={active ? "true" : undefined}
              >
                <span className={styles.indexStyle}>{work.title}</span>
                <span className={styles.indexNum}>
                  {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
