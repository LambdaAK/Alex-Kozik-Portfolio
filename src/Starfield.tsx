import React, { useRef, useEffect } from 'react';

const NUM_STARS = 180;
const NUM_GLOW_STARS = 8;
const SHOOTING_STARS = 2;

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  twinkle: number;
  glow?: boolean;
}

const colors = [
  'rgba(255,255,255,0.9)',
  'rgba(180,200,255,0.8)',
  'rgba(200,180,255,0.7)',
  'rgba(120,255,255,0.7)',
  'rgba(255,180,240,0.7)'
];

const glowColors = [
  'rgba(120,200,255,0.7)',
  'rgba(255,255,255,0.8)',
  'rgba(200,180,255,0.7)',
  'rgba(255,180,240,0.7)'
];

const CanvasStarfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const stars = useRef<Star[]>([]);
  const glowStars = useRef<Star[]>([]);

  // Initialize stars
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    stars.current = Array.from({ length: NUM_STARS }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: randomBetween(0.5, 1.8),
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: randomBetween(0.02, 0.08),
      twinkle: Math.random() * Math.PI * 2,
    }));
    glowStars.current = Array.from({ length: NUM_GLOW_STARS }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: randomBetween(12, 28),
      color: glowColors[Math.floor(Math.random() * glowColors.length)],
      speed: randomBetween(0.01, 0.03),
      twinkle: Math.random() * Math.PI * 2,
      glow: true,
    }));
  }, []);

  // Mouse movement for parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Animation loop
  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function drawNebula() {
      // Main galaxy glow
      const cx = canvas.width * 0.5;
      const cy = canvas.height * 0.45;
      const r = Math.max(canvas.width, canvas.height) * 0.5;
      const grad = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
      grad.addColorStop(0, 'rgba(80,200,255,0.25)');
      grad.addColorStop(0.3, 'rgba(80,200,255,0.10)');
      grad.addColorStop(0.7, 'rgba(60,0,80,0.10)');
      grad.addColorStop(1, 'rgba(10,6,24,1)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Top left purple
      const grad2 = ctx.createRadialGradient(0, 0, 0, canvas.width * 0.2, canvas.height * 0.1, canvas.width * 0.4);
      grad2.addColorStop(0, 'rgba(180,80,255,0.18)');
      grad2.addColorStop(1, 'rgba(10,6,24,0.8)');
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(canvas.width * 0.2, canvas.height * 0.1, canvas.width * 0.4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.globalAlpha = 1;

      // Top right pink
      const grad3 = ctx.createRadialGradient(canvas.width, 0, 0, canvas.width * 0.8, canvas.height * 0.1, canvas.width * 0.3);
      grad3.addColorStop(0, 'rgba(255,80,200,0.12)');
      grad3.addColorStop(1, 'rgba(10,6,24,0.8)');
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = grad3;
      ctx.beginPath();
      ctx.arc(canvas.width * 0.8, canvas.height * 0.1, canvas.width * 0.3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.globalAlpha = 1;

      // Bottom right blue
      const grad4 = ctx.createRadialGradient(canvas.width, canvas.height, 0, canvas.width * 0.8, canvas.height * 0.9, canvas.width * 0.4);
      grad4.addColorStop(0, 'rgba(80,200,255,0.12)');
      grad4.addColorStop(1, 'rgba(10,6,24,0.8)');
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = grad4;
      ctx.beginPath();
      ctx.arc(canvas.width * 0.8, canvas.height * 0.9, canvas.width * 0.4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    function drawStar(star: Star, parallax: number) {
      const px = star.x + (mouse.current.x - 0.5) * 80 * parallax;
      const py = star.y + (mouse.current.y - 0.5) * 80 * parallax;
      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, star.radius + Math.sin(Date.now() * 0.001 + star.twinkle) * 0.2, 0, 2 * Math.PI);
      ctx.fillStyle = star.color;
      ctx.shadowColor = star.color;
      ctx.shadowBlur = star.glow ? 32 : 0;
      ctx.globalAlpha = star.glow ? 0.7 : 1;
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawNebula();
      // Animate and draw regular stars
      for (let star of stars.current) {
        star.x += Math.sin(star.twinkle) * star.speed;
        star.y += Math.cos(star.twinkle) * star.speed;
        // Wrap around
        if (star.x < 0) star.x += canvas.width;
        if (star.x > canvas.width) star.x -= canvas.width;
        if (star.y < 0) star.y += canvas.height;
        if (star.y > canvas.height) star.y -= canvas.height;
        star.twinkle += 0.002 + star.speed * 0.2;
        drawStar(star, 0.5);
      }
      // Animate and draw glowing stars
      for (let star of glowStars.current) {
        star.x += Math.sin(star.twinkle) * star.speed * 0.5;
        star.y += Math.cos(star.twinkle) * star.speed * 0.5;
        if (star.x < 0) star.x += canvas.width;
        if (star.x > canvas.width) star.x -= canvas.width;
        if (star.y < 0) star.y += canvas.height;
        if (star.y > canvas.height) star.y -= canvas.height;
        star.twinkle += 0.001 + star.speed * 0.1;
        drawStar(star, 1.2);
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none"
      style={{ display: 'block', background: 'black' }}
    />
  );
};

export default CanvasStarfield; 