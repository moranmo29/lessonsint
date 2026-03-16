import { motion } from 'framer-motion';
import {
  ArrowRight, Clock, Signal, Wrench, Target, Lightbulb, ShieldAlert,
  CheckCircle2, ExternalLink, ChevronDown
} from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Module } from '../data/types';
import { useState } from 'react';

interface ModuleDetailProps {
  module: Module;
  unitColor: string;
  onBack: () => void;
}

const difficultyLabels = {
  beginner: 'מתחילים',
  intermediate: 'בינוני',
  advanced: 'מתקדם',
};

export default function ModuleDetail({ module, unitColor, onBack }: ModuleDetailProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['theory', 'mission']));
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[module.icon] || Icons.BookOpen;

  const toggleSection = (section: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 group transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <span className="text-sm">חזרה לתוכנית הלימודים</span>
        </button>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${unitColor}20`, color: unitColor }}
            >
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-mono text-gray-500 mb-1">{module.titleEn}</p>
              <h1 className="text-3xl font-bold text-white">{module.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400 mt-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {module.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Signal className="w-4 h-4" />
              {difficultyLabels[module.difficulty]}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${unitColor}15`, color: unitColor }}
            >
              {module.unit}
            </span>
          </div>
          <p className="text-gray-300 mt-4 text-lg leading-relaxed">{module.description}</p>
        </div>

        {/* Objectives */}
        <div className="bg-dark-800/60 border border-dark-700/50 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyber-400" />
            מה לומדים?
          </h2>
          <ul className="space-y-3">
            {module.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ backgroundColor: `${unitColor}20`, color: unitColor }}
                >
                  {i + 1}
                </span>
                {obj}
              </li>
            ))}
          </ul>
        </div>

        {/* Collapsible Sections */}
        <CollapsibleSection
          id="theory"
          title="הסבר תיאורטי"
          icon={<Icons.BookOpen className="w-5 h-5" />}
          isOpen={openSections.has('theory')}
          onToggle={() => toggleSection('theory')}
          color="#818cf8"
        >
          <div className="text-gray-300 leading-relaxed whitespace-pre-line text-[15px]">
            {module.theory}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="toolbox"
          title="ארגז כלים (Toolbox)"
          icon={<Wrench className="w-5 h-5" />}
          isOpen={openSections.has('toolbox')}
          onToggle={() => toggleSection('toolbox')}
          color="#38bdf8"
        >
          <div className="grid gap-3">
            {module.toolbox.map((tool, i) => (
              <div key={i} className="bg-dark-900/50 border border-dark-700/30 rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-info-400/10 flex items-center justify-center shrink-0">
                  <Wrench className="w-4 h-4 text-info-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm">{tool.name}</span>
                    {tool.url && (
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-info-400 hover:text-info-500 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="mission"
          title="המשימה הבלשית"
          icon={<Target className="w-5 h-5" />}
          isOpen={openSections.has('mission')}
          onToggle={() => toggleSection('mission')}
          color="#f43f5e"
        >
          <div>
            <h3 className="text-xl font-bold text-white mb-3">{module.mission.title}</h3>
            <div className="bg-dark-900/50 border border-danger-400/20 rounded-xl p-4 mb-5">
              <p className="text-gray-300 leading-relaxed">{module.mission.scenario}</p>
            </div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">שלבי המשימה:</h4>
            <ol className="space-y-3">
              {module.mission.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-danger-400/10 text-danger-400 flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-gray-300 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <MissionHint hint={module.mission.hint} />
            {module.mission.flag && (
              <div className="mt-4 bg-cyber-400/5 border border-cyber-400/20 rounded-xl p-4">
                <p className="text-cyber-400 font-mono text-sm">
                  FLAG: <span className="blur-sm hover:blur-none transition-all cursor-pointer select-all">{module.mission.flag}</span>
                </p>
              </div>
            )}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="protip"
          title="טיפ של מקצוענים"
          icon={<Lightbulb className="w-5 h-5" />}
          isOpen={openSections.has('protip')}
          onToggle={() => toggleSection('protip')}
          color="#fbbf24"
        >
          <div className="bg-warning-400/5 border border-warning-400/20 rounded-xl p-5">
            <p className="text-gray-300 leading-relaxed">{module.proTip}</p>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="ethics"
          title="דגש אתי ו-OPSEC"
          icon={<ShieldAlert className="w-5 h-5" />}
          isOpen={openSections.has('ethics')}
          onToggle={() => toggleSection('ethics')}
          color="#00e5a0"
        >
          <div className="bg-cyber-400/5 border border-cyber-400/20 rounded-xl p-5">
            <p className="text-gray-300 leading-relaxed">{module.ethicsNote}</p>
          </div>
        </CollapsibleSection>
      </div>
    </motion.div>
  );
}

function CollapsibleSection({
  id: _id,
  title,
  icon,
  isOpen,
  onToggle,
  color,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-dark-800/60 border border-dark-700/50 rounded-2xl mb-4 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-dark-700/20 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span style={{ color }}>{icon}</span>
          <h2 className="text-lg font-bold text-white">{title}</h2>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5">{children}</div>
      </motion.div>
    </div>
  );
}

function MissionHint({ hint }: { hint: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="mt-5">
      <button
        onClick={() => setRevealed(!revealed)}
        className="text-sm text-warning-400 hover:text-warning-500 flex items-center gap-2 cursor-pointer transition-colors"
      >
        <Lightbulb className="w-4 h-4" />
        {revealed ? 'הסתר רמז' : 'צריכים רמז?'}
      </button>
      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 bg-warning-400/5 border border-warning-400/20 rounded-lg p-3"
        >
          <p className="text-gray-400 text-sm">{hint}</p>
        </motion.div>
      )}
    </div>
  );
}
