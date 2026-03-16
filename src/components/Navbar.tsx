import { useState, useEffect } from 'react';
import { Eye, Menu, X, Search } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onLogoClick: () => void;
}

export default function Navbar({ onSearch, onLogoClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setSearchOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-900/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-dark-700/50' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={onLogoClick} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-9 h-9 bg-gradient-to-br from-cyber-400 to-accent-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Eye className="w-5 h-5 text-dark-950" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-white">OSINT</span>
              <span className="text-lg font-light text-cyber-400 mr-1"> Academy</span>
            </div>
          </button>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="חפשו נושא, כלי, או מושג..."
                  className="bg-dark-700/50 border border-dark-600 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-400 w-64"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setQuery(''); onSearch(''); }}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer p-2"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            <div className="text-xs text-gray-600 font-mono border border-dark-700 rounded px-2 py-1">
              50+ מודולים
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-400 hover:text-white cursor-pointer"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-900/95 backdrop-blur-xl border-t border-dark-700/50 p-4">
          <form onSubmit={handleSearch} className="mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חפשו נושא..."
              className="w-full bg-dark-700/50 border border-dark-600 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-400"
            />
          </form>
        </div>
      )}
    </nav>
  );
}
