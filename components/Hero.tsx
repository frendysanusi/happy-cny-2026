import { VibeMode } from "@/types/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Eye, EyeOff } from "lucide-react";

interface HeroProps {
  vibe: VibeMode
}

const Hero: React.FC<HeroProps> = ({ vibe }) => {
	const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [isVideoVisible, setIsVideoVisible] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isMusicPlaying) {
                audioRef.current.pause();
                setIsMusicPlaying(false);
            } else {
                audioRef.current.play().then(() => setIsMusicPlaying(true));
            }
        }
    };

    useEffect(() => {
        // 1. Initial Auto-play attempt
        const playAttempt = audioRef.current?.play();
        if (playAttempt !== undefined) {
            playAttempt
                .then(() => setIsMusicPlaying(true))
                .catch(() => setIsMusicPlaying(false));
        }

        // 2. Event Listeners (Defined once on mount)
        const handleStopMusic = () => {
            if (audioRef.current) {
                audioRef.current.pause();
                setIsMusicPlaying(false);
            }
        };

        const handleResumeMusic = () => {
            if (audioRef.current) {
                audioRef.current.play().then(() => {
                    setIsMusicPlaying(true);
                }).catch(err => console.log("User interaction required to resume"));
            }
        };

        window.addEventListener('stopBackgroundMusic', handleStopMusic);
        window.addEventListener('resumeBackgroundMusic', handleResumeMusic);

        return () => {
            window.removeEventListener('stopBackgroundMusic', handleStopMusic);
            window.removeEventListener('resumeBackgroundMusic', handleResumeMusic);
        };
    }, []);

	return (
		<section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6">
			{/* Video on the side with hide/show toggle */}
			<AnimatePresence>
				{isVideoVisible && (
					<motion.div
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 100 }}
						transition={{ duration: 0.5 }}
						className="fixed right-6 top-32 z-20 group"
					>
						<div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-red-500/30 border-4 border-red-600/50">
							<video
								autoPlay
								loop
								muted
								playsInline
								className="w-64 h-64 md:w-80 md:h-80 object-cover"
							>
								<source src="/nailong-dance.mp4" type="video/mp4" />
							</video>
							{/* Hide button on video */}
							<button
								onClick={() => setIsVideoVisible(false)}
								className="absolute top-2 right-2 p-2 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-all duration-300 opacity-0 group-hover:opacity-100"
								aria-label="Hide video"
							>
								<EyeOff className="w-4 h-4 text-white" />
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Show video button when hidden */}
			{!isVideoVisible && (
				<motion.button
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
					onClick={() => setIsVideoVisible(true)}
					className="fixed right-6 top-32 z-20 p-4 rounded-full bg-red-600/80 backdrop-blur-md hover:bg-red-500 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
					aria-label="Show video"
				>
					<Eye className="w-6 h-6 text-white" />
				</motion.button>
			)}

			{/* Background Music */}
			<audio ref={audioRef} loop>
				<source src="/music.mp3" type="audio/mpeg" />
			</audio>

			{/* Music Control Button */}
			<motion.button
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 1, duration: 0.5 }}
				onClick={toggleMusic}
				className="fixed top-24 left-6 z-50 p-4 rounded-full bg-red-600/80 backdrop-blur-md hover:bg-red-500 transition-all duration-300 shadow-lg hover:shadow-red-500/50 group"
				aria-label={isMusicPlaying ? "Mute music" : "Play music"}
			>
				<motion.div
					animate={{ rotate: isMusicPlaying ? 360 : 0 }}
					transition={{ duration: 2, repeat: isMusicPlaying ? Infinity : 0, ease: "linear" }}
				>
					{isMusicPlaying ? (
						<Volume2 className="w-6 h-6 text-white" />
					) : (
						<VolumeX className="w-6 h-6 text-white" />
					)}
				</motion.div>
			</motion.button>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="text-center relative z-10"
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

			{/* Floating particles */}
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
        className="mt-12 text-red-500/50 relative z-10"
      >
        <div className="w-1 h-12 bg-linear-to-b from-red-600 to-transparent mx-auto rounded-full" />
        <p className="text-[10px] uppercase tracking-[0.3em] mt-4 font-bold">Scroll to see more</p>
      </motion.div>
		</section>
	)
}

export default Hero;