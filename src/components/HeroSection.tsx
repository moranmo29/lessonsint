import { motion } from 'framer-motion';
import { Shield, Eye, Target, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollToContent: () => void;
  totalModules: number;
}

export default function HeroSection({ onScrollToContent, totalModules }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,160,0.03)_0%,transparent_70%)]" />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-dark-800/80 border border-dark-600/50 rounded-full px-4 py-2 mb-8"
        >
          <span className="w-2 h-2 bg-cyber-400 rounded-full animate-pulse" />
          <span className="text-sm text-gray-400">תוכנית לימודים מקצועית | {totalModules} מודולים</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
        >
          <span className="bg-gradient-to-l from-cyber-400 via-accent-400 to-info-400 bg-clip-text text-transparent">
            OSINT Academy
          </span>
          <br />
          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-300">
            מודיעין ממקורות פתוחים
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          מהיסודות ועד לטכניקות מתקדמות — תוכנית לימודים אינטראקטיבית שתהפוך אתכם
          לחוקרי OSINT מקצועיים. עם משימות מעשיות, כלים אמיתיים, ודגש על אתיקה.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-8 mb-12"
        >
          <StatItem icon={<Eye className="w-5 h-5" />} value={`${totalModules}+`} label="מודולים" color="#00e5a0" />
          <StatItem icon={<Target className="w-5 h-5" />} value="50+" label="משימות מעשיות" color="#818cf8" />
          <StatItem icon={<Shield className="w-5 h-5" />} value="100+" label="כלים וטכניקות" color="#38bdf8" />
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          onClick={onScrollToContent}
          className="bg-gradient-to-l from-cyber-400 to-cyber-600 text-dark-950 font-bold px-8 py-4 rounded-xl
            hover:shadow-lg hover:shadow-cyber-400/20 transition-all cursor-pointer text-lg"
        >
          בואו נתחיל →
        </motion.button>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-gray-600 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

function StatItem({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
        {icon}
      </div>
      <div className="text-right">
        <div className="text-xl font-bold text-white">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
}
