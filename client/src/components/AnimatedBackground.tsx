import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  opacitySpeed: number;
  color: string;
  type: "circle" | "paw" | "diamond";
  rotation: number;
  rotationSpeed: number;
  wobble: number;
  wobbleSpeed: number;
  antigravity: number;
}

interface WavePoint {
  x: number;
  y: number;
  originalY: number;
  speed: number;
  amplitude: number;
  phase: number;
}

export function AntigravityParticles({ count = 28 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = [
      "rgba(201, 148, 74,",
      "rgba(212, 169, 106,",
      "rgba(255, 248, 240,",
      "rgba(184, 137, 90,",
      "rgba(160, 120, 58,",
    ];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const init = () => {
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3.5 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: -(Math.random() * 0.6 + 0.15),
        opacity: Math.random() * 0.5 + 0.1,
        opacitySpeed: (Math.random() - 0.5) * 0.006,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: (["circle", "diamond", "circle"] as const)[Math.floor(Math.random() * 3)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        wobble: 0,
        wobbleSpeed: Math.random() * 0.04 + 0.01,
        antigravity: Math.random() * 0.4 + 0.05,
      }));
    };
    init();

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      particlesRef.current.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.4;
        p.y += p.speedY - p.antigravity;
        p.rotation += p.rotationSpeed;
        p.opacity += p.opacitySpeed;

        if (p.opacity > 0.65) p.opacitySpeed *= -1;
        if (p.opacity < 0.05) p.opacitySpeed = Math.abs(p.opacitySpeed);
        if (p.y < -20) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 10;
        if (p.x > canvas.width + 20) p.x = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (p.type === "diamond") {
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.5);
          ctx.lineTo(p.size, 0);
          ctx.lineTo(0, p.size * 1.5);
          ctx.lineTo(-p.size, 0);
          ctx.closePath();
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.fill();
        }
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

export function WindsurfWaves({ color = "#B87A38", opacity = 0.12, speed = 1 }: {
  color?: string;
  opacity?: number;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let offset = 0;

    const drawWave = (
      yBase: number,
      amplitude: number,
      frequency: number,
      phaseOffset: number,
      alpha: number,
      lineWidth: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, yBase);

      for (let x = 0; x <= canvas.width; x += 2) {
        const y =
          yBase +
          Math.sin((x * frequency + offset + phaseOffset) * 0.01) * amplitude +
          Math.sin((x * frequency * 0.6 + offset * 1.3 + phaseOffset) * 0.015) * amplitude * 0.5;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      offset += speed;

      const h = canvas.height;
      drawWave(h * 0.3, 18, 4, 0, opacity, 1.5);
      drawWave(h * 0.5, 22, 3, 80, opacity * 0.75, 1);
      drawWave(h * 0.65, 16, 5, 160, opacity * 0.6, 0.8);
      drawWave(h * 0.8, 12, 6, 240, opacity * 0.4, 0.6);

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [color, opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

export function ReptileScalePattern({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full reptile-pattern"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="reptile-scales" x="0" y="0" width="40" height="34.64" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="rgba(184,122,56,0.07)" strokeWidth="0.8">
              <path d="M20 0 L40 17.32 L20 34.64 L0 17.32 Z" />
              <path d="M0 0 L20 17.32 L0 34.64" />
              <path d="M40 0 L20 17.32 L40 34.64" />
              <circle cx="20" cy="17.32" r="2" fill="rgba(184,122,56,0.04)" stroke="none" />
            </g>
          </pattern>
          <radialGradient id="reptile-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#reptile-scales)" />
        <rect width="100%" height="100%" fill="url(#reptile-fade)" />
      </svg>
    </div>
  );
}

export function SerpentineLine({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute overflow-hidden pointer-events-none ${className}`}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
        <path
          d="M0,60 C150,20 350,100 600,60 C850,20 1050,100 1200,60"
          fill="none"
          stroke="rgba(184,122,56,0.25)"
          strokeWidth="1.5"
          className="serpentine-path"
        />
        <path
          d="M0,80 C200,40 400,120 600,80 C800,40 1000,120 1200,80"
          fill="none"
          stroke="rgba(196,152,90,0.15)"
          strokeWidth="1"
          className="serpentine-path-2"
        />
      </svg>
    </div>
  );
}

export function MagneticOrb({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <div className="magnetic-orb w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(184,122,56,0.12) 0%, rgba(184,122,56,0.04) 50%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
    </div>
  );
}

export function FloatingDiamond({ size = 12, delay = 0, className = "" }: {
  size?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute pointer-events-none antigravity-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <svg width={size} height={size} viewBox="0 0 12 12">
        <polygon
          points="6,0 12,6 6,12 0,6"
          fill="none"
          stroke="rgba(184,122,56,0.35)"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}

export function WindTrail({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute overflow-hidden pointer-events-none ${className}`}>
      <div className="wind-trail-1" />
      <div className="wind-trail-2" />
      <div className="wind-trail-3" />
    </div>
  );
}
