import React, { useEffect } from 'react';

const NUM_STARS = 200;
const SHOOTING_STARS = 3;

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

const Starfield: React.FC = () => {
  useEffect(() => {
    // No JS animation needed, all CSS
  }, []);

  const stars = Array.from({ length: NUM_STARS }).map((_, i) => {
    const sizeClass = ["w-[1px] h-[1px] opacity-70", "w-[2px] h-[2px] opacity-80", "w-[3px] h-[3px] opacity-90"][Math.floor(Math.random() * 3)];
    const style = {
      left: `${randomBetween(0, 100)}vw`,
      top: `${randomBetween(0, 100)}vh`,
      animationDelay: `${randomBetween(0, 2)}s`,
    } as React.CSSProperties;
    return <div key={i} className={`star absolute bg-white rounded-full ${sizeClass} twinkle`} style={style} />;
  });

  const shootingStars = Array.from({ length: SHOOTING_STARS }).map((_, i) => {
    const style = {
      left: `${randomBetween(0, 100)}vw`,
      top: `${randomBetween(0, 50)}vh`,
      animationDelay: `${randomBetween(0, 10)}s`,
      animationDuration: `${randomBetween(3, 5)}s`,
    } as React.CSSProperties;
    return <div key={i} className="shooting-star absolute" style={style} />;
  });

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none starfield-bg overflow-hidden">
      {stars}
      {shootingStars}
      <style>{`
        .starfield-bg {
          background: linear-gradient(135deg, #181A20 0%, #232a36 60%, #312e81 100%);
        }
        .twinkle {
          animation: twinkle 2s infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .shooting-star {
          width: 2px;
          height: 2px;
          background: linear-gradient(45deg, #fff, transparent);
          border-radius: 50%;
          animation: shoot 3s linear infinite;
          opacity: 0;
        }
        @keyframes shoot {
          0% { opacity: 0; transform: translateX(-100px) translateY(100px); }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translateX(1000px) translateY(-1000px); }
        }
      `}</style>
    </div>
  );
};

export default Starfield; 