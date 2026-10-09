import { useEffect, useRef } from "react";
import helloGif from "../assets/minecraft-hello.gif.asset.json";

/**
 * Minecraft "Hello" sticker that smoothly trails the mouse cursor.
 * Uses requestAnimationFrame lerp for a laggy, floaty follow.
 * pointer-events: none so it never blocks clicks. Hidden on touch devices.
 */
export function CursorFollower() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      el.style.display = "none";
      return;
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
      // Flip the sprite to face the direction of travel
      const dx = e.movementX ?? 0;
      if (Math.abs(dx) > 1) {
        el.style.transform = `scaleX(${dx < 0 ? -1 : 1})`;
      }
    };

    const tick = () => {
      // Lerp factor controls the "lag" of the follow
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      const flip = el.style.transform.includes("-1") ? -1 : 1;
      el.style.transform = `translate(${x + 24}px, ${y + 28}px) scaleX(${flip})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <img
      ref={ref}
      src={helloGif.url}
      alt=""
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 h-20 w-20 opacity-0 transition-opacity duration-500"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
