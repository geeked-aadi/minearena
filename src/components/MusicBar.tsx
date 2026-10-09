import { useEffect, useRef, useState } from "react";
import { Music, Play, Pause, SkipBack, Volume2, VolumeX } from "lucide-react";

const TRACK_TITLE = "WORLD: OVERWORLD SUNSET FOREST";
const TRACK_NUMBER = 10;
const TRACK_LENGTH = 182; // seconds, visual progress

/**
 * Ambient music bar matching the reference design. Plays a soft chiptune-style
 * loop synthesized with WebAudio (no audio file needed); falls back to a
 * visual-only progress bar if audio is unavailable.
 */
export function MusicBar() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const audioRef = useRef<{ ctx: AudioContext; gain: GainNode; stop: () => void } | null>(null);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(
      () => setElapsed((s) => (s + 1) % TRACK_LENGTH),
      1000,
    );
    return () => clearInterval(id);
  }, [playing]);

  const startChiptune = () => {
    const ctx = new AudioContext();
    const gain = ctx.createGain();
    gain.gain.value = muted ? 0 : 0.06;
    gain.connect(ctx.destination);

    // Simple square-wave arpeggio loop (C major pentatonic)
    const notes = [261.6, 329.6, 392.0, 523.3, 392.0, 329.6];
    let step = 0;
    let nextTime = ctx.currentTime + 0.1;
    const scheduler = setInterval(() => {
      while (nextTime < ctx.currentTime + 0.4) {
        const osc = ctx.createOscillator();
        osc.type = "square";
        osc.frequency.value = notes[step % notes.length] ?? 261.6;
        const env = ctx.createGain();
        env.gain.setValueAtTime(0.5, nextTime);
        env.gain.exponentialRampToValueAtTime(0.001, nextTime + 0.28);
        osc.connect(env).connect(gain);
        osc.start(nextTime);
        osc.stop(nextTime + 0.3);
        step += 1;
        nextTime += 0.3;
      }
    }, 100);

    const stop = () => {
      clearInterval(scheduler);
      ctx.close();
    };
    audioRef.current = { ctx, gain, stop };
  };

  const togglePlay = () => {
    if (playing) {
      audioRef.current?.stop();
      audioRef.current = null;
      setPlaying(false);
    } else {
      try {
        startChiptune();
      } catch {
        // Audio unavailable — keep visual player running
      }
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    setMuted((m) => {
      if (audioRef.current) audioRef.current.gain.gain.value = m ? 0.06 : 0;
      return !m;
    });
  };

  const mm = String(Math.floor(elapsed / 60)).padStart(1, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2">
        <span className="pixel-heading hidden text-[8px] tracking-wider text-primary text-glow-green sm:block">
          {TRACK_TITLE}
        </span>
        <Music className="h-4 w-4 shrink-0 text-primary sm:hidden" />

        <div className="flex flex-1 items-center gap-3">
          <div className="relative h-2 flex-1 border border-border bg-secondary">
            <div
              className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-1000 ease-linear"
              style={{ width: `${(elapsed / TRACK_LENGTH) * 100}%` }}
            />
          </div>
          <span className="pixel-heading text-[9px] text-primary">
            {mm}:{ss}
          </span>
          <span className="pixel-heading hidden text-[9px] text-muted-foreground sm:inline">
            #{TRACK_NUMBER}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Previous track"
            className="flex h-8 w-8 items-center justify-center border-2 border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setElapsed(0)}
          >
            <SkipBack className="h-4 w-4" />
          </button>
          <button
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-8 w-8 items-center justify-center border-2 border-border bg-secondary text-primary transition-colors hover:text-accent"
            onClick={togglePlay}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            aria-label={muted ? "Unmute" : "Mute"}
            className="flex h-8 w-8 items-center justify-center border-2 border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground"
            onClick={toggleMute}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
