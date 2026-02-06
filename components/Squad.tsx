import { SQUAD } from "@/constant/constants";
import { Friend } from "@/types/types";
import { motion } from "framer-motion";
import Image from "next/image";

interface SquadProps {
	friend: Friend;
	idx: number;
}

const SquadCard: React.FC<SquadProps> = ({ friend, idx }) => {
	return (
		<motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.15, duration: 0.6 }}
      className="group relative"
    >
      <div className={`relative overflow-hidden rounded-4xl glass p-4 transition-all duration-500 group-hover:scale-[1.02] border-2 hover:${friend.color}`}>
        <div className="relative aspect-3/4 overflow-hidden rounded-2xl mb-6">
          <Image
            src={friend.image}
            alt={friend.name}
            fill
            className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-white/10">
            <span>{friend.shioIcon}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">{friend.shio}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-red-500 transition-colors">
            {friend.name}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed font-light italic">
            {`"${friend.message}"`}
          </p>
        </div>

        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-red-600/10 rounded-full blur-2xl group-hover:bg-red-600/40 transition-all" />
      </div>
    </motion.div>
	)
}

const Squad: React.FC = () => {
	return (
    <section className="py-32 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-red-500 font-bold uppercase tracking-[0.4em] text-xs">check check check</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mt-2">Our bros and sis</h2>
          </div>
          <p className="max-w-xs font-chinese text-gray-500 text-sm leading-relaxed">
            올해는 아프지 말고 건강하게 지내자! 그래야 많은 돈을 벌고 전 세계를 여행할 수 있어요. 가자!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SQUAD.map((friend, idx) => (
            <SquadCard key={friend.id} friend={friend} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Squad;