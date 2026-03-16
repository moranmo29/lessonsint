import { useState, useRef, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import UnitCard from './components/UnitCard';
import ModuleDetail from './components/ModuleDetail';
import { allModules, getModuleById, getUnitColor, units } from './data';

function App() {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const selectedModule = selectedModuleId ? getModuleById(selectedModuleId) : null;

  const filteredUnits = useMemo(() => {
    if (!searchQuery.trim()) return units;
    const q = searchQuery.toLowerCase();
    return units.filter(unit => {
      const unitModules = allModules.filter(m => m.unitId === unit.id);
      return (
        unit.title.toLowerCase().includes(q) ||
        unitModules.some(
          m =>
            m.title.toLowerCase().includes(q) ||
            m.titleEn.toLowerCase().includes(q) ||
            m.description.toLowerCase().includes(q) ||
            m.toolbox.some(t => t.name.toLowerCase().includes(q))
        )
      );
    });
  }, [searchQuery]);

  const handleModuleClick = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedModuleId(null);
  };

  const handleLogoClick = () => {
    setSelectedModuleId(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Module Detail View
  if (selectedModule) {
    return (
      <div className="min-h-screen bg-dark-950">
        <Navbar onSearch={setSearchQuery} onLogoClick={handleLogoClick} />
        <ModuleDetail
          module={selectedModule}
          unitColor={getUnitColor(selectedModule.unitId)}
          onBack={handleBack}
        />
        {/* Footer */}
        <Footer />
      </div>
    );
  }

  // Main View
  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar onSearch={setSearchQuery} onLogoClick={handleLogoClick} />

      {/* Hero */}
      {!searchQuery && (
        <HeroSection onScrollToContent={handleScrollToContent} totalModules={allModules.length} />
      )}

      {/* Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            {searchQuery ? `תוצאות חיפוש: "${searchQuery}"` : 'תוכנית הלימודים'}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {searchQuery
              ? `נמצאו ${filteredUnits.length} יחידות רלוונטיות`
              : '9 יחידות לימוד, מהיסודות ועד רמה מתקדמת. לחצו על שיעור כדי לצלול פנימה.'}
          </p>
        </div>

        {/* Difficulty Legend */}
        {!searchQuery && (
          <div className="flex items-center justify-center gap-6 mb-10 text-sm text-gray-500">
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-green-500" /> מתחילים</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> בינוני</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> מתקדם</span>
          </div>
        )}

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnits.map((unit, i) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              index={i}
              onModuleClick={handleModuleClick}
            />
          ))}
        </div>

        {filteredUnits.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">לא נמצאו תוצאות עבור "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-cyber-400 hover:text-cyber-500 cursor-pointer text-sm"
            >
              נקו חיפוש
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-dark-900/50 border-t border-dark-700/30 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-600 text-sm">
          OSINT Academy — תוכנית לימודים מקצועית במודיעין ממקורות פתוחים
        </p>
        <p className="text-gray-700 text-xs mt-2">
          כל הכלים והטכניקות מיועדים לשימוש חוקי ואתי בלבד
        </p>
      </div>
    </footer>
  );
}

export default App;
