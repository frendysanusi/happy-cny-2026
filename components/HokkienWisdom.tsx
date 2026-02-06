
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HOKKIEN_WISDOM } from '@/constant/constants';

const HokkienWisdom: React.FC = () => {
  const [current, setCurrent] = useState(HOKKIEN_WISDOM[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const shuffle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const filtered = HOKKIEN_WISDOM.filter((b: { phrase: string; }) => b.phrase !== current.phrase);
      const next = filtered[Math.floor(Math.random() * filtered.length)];
      setCurrent(next);
      setIsAnimating(false);
    }, 400);
  };

  return (
    <section className="py-32 px-6 flex flex-col items-center justify-center text-center">
      <div className="mb-12">
        <h2 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter">HOKKIEN WISDOM</h2>
        <p className="text-red-500 font-chinese text-2xl">福建人的祝福</p>
      </div>

      <div className="relative w-full max-w-2xl aspect-video glass rounded-[4rem] flex flex-col items-center justify-center p-12 overflow-hidden">
        <AnimatePresence mode="wait">
          {!isAnimating && (
            <motion.div
              key={current.phrase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h3 className="text-4xl md:text-6xl font-black text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                {current.phrase}
              </h3>
              <p className="text-gray-400 text-lg md:text-xl font-light">
                ({current.translation})
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={shuffle}
          className="absolute bottom-8 px-8 py-3 bg-red-600 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-red-900/40"
        >
          Gimme more Huat
        </button>
      </div>
    </section>
  );
};

export default HokkienWisdom;
