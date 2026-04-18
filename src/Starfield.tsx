import React from 'react';

const NUM_STARS = 200;

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

const Starfield: React.FC = () => {
  const stars = Array.from({ length: NUM_STARS }).map((_, i) => {
    const sizeClass = ["w-[1px] h-[1px] opacity-70", "w-[2px] h-[2px] opacity-80", "w-[3px] h-[3px] opacity-90"][Math.floor(Math.random() * 3)];
    const style = {
      left: `${randomBetween(0, 100)}vw`,
      top: `${randomBetween(0, 100)}vh`,
    } as React.CSSProperties;
    return <div key={i} className={`absolute bg-white rounded-full ${sizeClass}`} style={style} />;
  });

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none starfield-bg overflow-hidden">
      {stars}
      <style>{`
        .starfield-bg {
          background: linear-gradient(135deg, #fce7f3 0%, #dbeafe 60%, #f3e8ff 100%);
        }
      `}</style>
    </div>
  );
};

export default Starfield;