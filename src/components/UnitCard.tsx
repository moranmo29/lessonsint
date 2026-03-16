import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { Unit } from '../data/types';
import { getModulesByUnit } from '../data';

interface UnitCardProps {
  unit: Unit;
  index: number;
  onModuleClick: (moduleId: string) => void;
}

export default function UnitCard({ unit, index, onModuleClick }: UnitCardProps) {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[unit.icon] || Icons.BookOpen;
  const modules = getModulesByUnit(unit.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-dark-800/40 border border-dark-700/40 rounded-2xl overflow-hidden hover:border-dark-600/60 transition-all group"
    >
      {/* Unit Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
            style={{ backgroundColor: `${unit.color}15`, color: unit.color }}
          >
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{unit.title}</h3>
            <span className="text-xs text-gray-500">{modules.length} שיעורים</span>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="px-4 pb-4">
        <div className="space-y-1">
          {modules.map((module) => {
            const ModIcon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[module.icon] || Icons.Circle;
            return (
              <button
                key={module.id}
                onClick={() => onModuleClick(module.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-dark-700/40 transition-colors cursor-pointer text-right group/item"
              >
                <ModIcon className="w-4 h-4 shrink-0 text-gray-600 group-hover/item:text-gray-400 transition-colors" />
                <span className="text-sm text-gray-400 group-hover/item:text-gray-200 transition-colors flex-1 truncate">
                  {module.title}
                </span>
                <DifficultyDot difficulty={module.difficulty} />
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function DifficultyDot({ difficulty }: { difficulty: string }) {
  const colors = {
    beginner: 'bg-green-500',
    intermediate: 'bg-yellow-500',
    advanced: 'bg-red-500',
  };
  const color = colors[difficulty as keyof typeof colors] || 'bg-gray-500';
  return <span className={`w-2 h-2 rounded-full ${color} shrink-0`} />;
}
