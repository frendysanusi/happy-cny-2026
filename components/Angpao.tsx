import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Coins, Receipt } from 'lucide-react';

const Angpao: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  const handleRunAway = () => {
    // Generate random movement within a 200px range
    const newX = Math.random() * 200 - 100;
    const newY = Math.random() * 200 - 100;
    setBtnPos({ x: newX, y: newY });
  };

  return (
    <section className="py-32 px-6 flex flex-col items-center">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black tracking-tighter mb-4">THE DIGITAL ANG PAO</h2>
        <p className="text-gray-500 text-sm tracking-[0.2em] uppercase font-bold">A little something for the heart</p>
      </div>

      <div className="relative w-full max-w-lg aspect-4/5">
        <AnimatePresence>
          {!isOpen ? (
            <motion.div
              key="closed"
              onClick={() => setIsOpen(true)}
              className="w-full h-full bg-[#cc2229] rounded-4xl shadow-2xl cursor-pointer relative overflow-hidden flex flex-col items-center justify-center border-4 border-[#b11b22]"
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              layoutId="envelope"
            >
              <div className="absolute top-0 w-full h-1/2 bg-[#b11b22] rounded-b-[4rem] flex items-end justify-center pb-8 border-b-2 border-yellow-600/30">
                <div className="w-20 h-20 bg-yellow-500 rounded-full border-4 border-yellow-600 flex items-center justify-center shadow-xl">
                  <span className="font-chinese text-4xl text-red-800">福</span>
                </div>
              </div>
              <div className="mt-40 text-center">
                <p className="font-chinese text-3xl text-yellow-500/80 mb-2">开</p>
                <p className="text-[10px] font-black uppercase text-yellow-600 tracking-widest">Tap to Open</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="w-full h-full glass rounded-4xl p-8 flex flex-col overflow-y-auto custom-scrollbar"
              layoutId="envelope"
            >
              <div className="space-y-6 text-center md:text-left">
                <div className="mt-8 p-6 bg-red-500/10 border-2 border-dashed border-red-500/50 rounded-2xl space-y-4 relative overflow-hidden">
                  <div className="absolute -right-2 -top-2 opacity-20 rotate-12 pointer-events-none">
                    <Coins size={80} />
                  </div>
                  
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle size={20} />
                    <span className="font-bold uppercase tracking-widest text-sm text-red-400">Transaction Alert</span>
                  </div>

                  <h5 className="text-xl font-black text-white italic">TAX INITIATED 💸</h5>
                  
                  <p className="text-sm text-gray-400">
                    Since you opened this Ang Pao, you officially agreed to the 
                    <span className="text-white italic"> 2026 Terms & Conditions</span>. 
                    Pay and gimme your <span className="text-yellow-500 font-bold">Qián</span> now!
                  </p>

                  <div className="space-y-2 bg-black/40 p-4 rounded-lg font-mono text-xs">
                    <div className="flex justify-between">
                      <span>Ang Pao Opening Fee:</span>
                      <span className="text-green-400">IDR 20000.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Emotional Support Tax:</span>
                      <span className="text-green-400">IDR 68000.00</span>
                    </div>
                    <div className="flex justify-between border-t border-white/20 pt-2 font-bold text-sm">
                      <span>TOTAL DEBT:</span>
                      <span className="text-yellow-500">IDR 88000.00</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-2">
                    <a 
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NO}?text=${encodeURIComponent("OI! I'M SORRY I'LL PAY!! 💸 MINTA REKENINGMU DONG")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black text-center rounded-xl transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                    >
                      <Receipt size={18} />
                      PAY NOW
                    </a>
                    
                    <motion.button
                      animate={{ x: btnPos.x, y: btnPos.y }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      onMouseEnter={handleRunAway}
                      onClick={handleRunAway} // In case they are fast enough on mobile
                      className="w-full py-3 bg-white/5 text-gray-500 font-bold text-xs rounded-xl border border-white/5 cursor-not-allowed"
                    >
                      I CAN'T PAY (BROKE AF)
                    </motion.button>
                  </div>

                  <p className="text-[10px] text-gray-500 text-center italic mt-4">
                    *Note: Trying to avoid payment will result in 10 years of bad luck and being the squad's designated driver.
                  </p>
                </div>
                
                <button 
                  onClick={() => setIsOpen(false)}
                  className="mt-8 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
                >
                  ← Close Ang Pao
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Angpao;
