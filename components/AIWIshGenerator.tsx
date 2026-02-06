"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, RefreshCw, Copy, Check } from 'lucide-react';
import { generateAIWish } from '@/services/gemini';

const AIWishGenerator: React.FC = () => {
  const [vibe, setVibe] = useState('Gen Z Slang');
  const [target, setTarget] = useState('Best Friend');
	const [language, setLanguage] = useState('Medanese Hokkien');
  const [loading, setLoading] = useState(false);
  const [wish, setWish] = useState('');
  const [copied, setCopied] = useState(false);

  const vibes = ['Funny', 'Savage', 'Deep', 'Gen Z Slang', 'Flex'];
  const targets = ['Best Friend', 'Crush', 'Parents', 'Sibling', 'Colleague'];
	const languages = ['Medanese Hokkien', 'English', 'Indonesian', 'Chinese', 'Korean']

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateAIWish(vibe, target, language);
    setWish(result);
    setLoading(false);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(wish);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl glass p-8 md:p-12 rounded-[3rem] relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-red-500 mb-4">
              <Sparkles size={20} />
              <span className="font-bold uppercase tracking-widest text-xs">AI Wish Generator</span>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-3 block tracking-widest">Select Vibe</label>
                <div className="flex flex-wrap gap-2">
                  {vibes.map(v => (
                    <button
                      key={v}
                      onClick={() => setVibe(v)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                        vibe === v ? 'bg-red-600 text-white neon-glow-red' : 'bg-white/5 hover:bg-white/10 text-gray-400'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-3 block tracking-widest">Target Audience</label>
                <div className="flex flex-wrap gap-2">
                  {targets.map(t => (
                    <button
                      key={t}
                      onClick={() => setTarget(t)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                        target === t ? 'bg-amber-600 text-white neon-glow-gold' : 'bg-white/5 hover:bg-white/10 text-gray-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

							<div>
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-3 block tracking-widest">Target Language</label>
                <div className="flex flex-wrap gap-2">
                  {languages.map(l => (
                    <button
                      key={l}
                      onClick={() => setLanguage(l)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                        language === l ? 'bg-teal-600 text-white neon-glow-teal' : 'bg-white/5 hover:bg-white/10 text-gray-400'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full mt-6 bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:scale-[0.98] transition-transform disabled:opacity-50"
              >
                {loading ? <RefreshCw className="animate-spin" /> : <Send size={18} />}
                {loading ? 'Consulting with Gemini...' : 'GENERATE WISH'}
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="bg-black/40 rounded-3xl p-8 min-h-62.5 flex flex-col items-center justify-center text-center border border-white/5 relative">
              <AnimatePresence mode="wait">
                {wish ? (
                  <motion.div
                    key="wish"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="space-y-6"
                  >
                    <p className="text-md md:text-lg leading-relaxed text-red-100">
                      {wish}
                    </p>
                    <div className="flex justify-center gap-4">
                      <button 
                        onClick={copyToClipboard}
                        className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                      >
                        {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    className="text-gray-600"
                  >
                    <p className="italic">Your customized 2026 blessing will appear here.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-64 h-64 bg-red-600/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-[100px] -z-10" />
    </section>
  );
};

export default AIWishGenerator;
