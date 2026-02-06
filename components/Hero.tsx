import { VibeMode } from "@/types/types";
import { motion } from "framer-motion";

interface HeroProps {
  vibe: VibeMode
}

const Hero: React.FC<HeroProps> = ({ vibe }) => {
	return (
		<section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="text-center"
			>
				<h2 className="text-red-600 font-chinese text-4xl md:text-6xl mb-4 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]">
          恭喜发财
        </h2>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-6 leading-none">
          <span className="block text-white">Happy Lunar</span>
          <span className={`block transition-colors duration-500 ${vibe === 'glowUp' ? 'text-yellow-400' : 'text-red-700'}`}>New Year 2026</span>
        </h1>
        <div className="max-w-2xl mx-auto glass p-8 rounded-3xl relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-linear-to-br from-red-600/10 to-transparent"
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <p className="relative z-10 text-lg md:text-xl font-light leading-relaxed text-gray-300">
            Stepping into a <span className="text-red-500 font-bold">New Year</span> with these people 🧧🔥
          </p>
        </div>
			</motion.div>

			<div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-red-600/30 rounded-full blur-xl"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: (typeof window !== 'undefined' ? window.innerHeight : 1080) + 100,
              width: Math.random() * 50 + 20,
              height: Math.random() * 50 + 20
            }}
            animate={{ 
              y: -200,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 5, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

			<motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-12 text-red-500/50"
      >
        <div className="w-1 h-12 bg-linear-to-b from-red-600 to-transparent mx-auto rounded-full" />
        <p className="text-[10px] uppercase tracking-[0.3em] mt-4 font-bold">Scroll to see more</p>
      </motion.div>
		</section>
	)
}

export default Hero;