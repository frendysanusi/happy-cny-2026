"use client"

import Hero from "@/components/Hero";
import Squad from "@/components/Squad";
import { VibeMode } from "@/types/types"
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react"

export default function Home() {
  const [vibe, setVibe] = useState<VibeMode>('redFlag');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  const bgStyles = vibe === 'redFlag' 
    ? 'bg-[#0d0202] text-[#fef2f2]' 
    : 'bg-[#1a0505] text-[#ffd700]';

  return (
    <div className={`min-h-screen transition-colors duration-700 ${bgStyles} overflow-x-hidden`}>
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-chinese text-red-600 tracking-widest drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]"
          >
            二零二六
          </motion.div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setVibe(vibe === 'redFlag' ? 'glowUp' : 'redFlag')}
              className="px-4 py-2 glass rounded-full text-xs font-bold uppercase tracking-tighter flex items-center gap-2 hover:bg-white/10 transition-colors"
            >
              <Sparkles size={14} className={vibe === 'glowUp' ? 'text-yellow-400' : 'text-red-500'} />
              {vibe === 'redFlag' ? 'Red Flag' : 'Glow Up'}
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <Hero vibe={vibe} />
        <Squad />
      </main>

      <footer className="py-20 text-center opacity-50 text-sm">
        <p>© 2026 • HUAT AH FOR THE REST OF OUR LIVES</p>
      </footer>
    </div>
  );
}