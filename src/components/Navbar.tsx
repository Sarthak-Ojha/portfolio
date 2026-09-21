import { Sun, Moon, Menu, X, ChevronDown, Download } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  darkMode: boolean;
  toggleDark: () => void;
}

const Navbar = ({ darkMode, toggleDark }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDownloadOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const downloadOptions = [
    {
      os: 'Windows',
      desc: 'Windows 10 / 11',
      href: '/ThailiSetup-v1.0.0.exe',
      type: 'Setup Installer (.exe)',
    },
    {
      os: 'macOS',
      desc: 'Apple Silicon & Intel',
      href: '/Thaili-macOS-Installer.dmg',
      type: 'Installer (.dmg)',
      note: 'Right-click > Open on first launch',
    },
  ];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[#0a0a0a] focus:text-[#fafafa] focus:rounded-lg focus:font-bold focus:border-2 focus:border-[#fafafa] focus:shadow-lg"
      >
        Skip to main content
      </a>
      <nav className="fixed top-0 left-0 w-full z-50 py-4 px-4 md:px-8 lg:px-16 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-transparent dark:border-[#1a1a1a] transition-colors duration-300">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-bold text-[#0a0a0a] dark:text-[#fafafa]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            aria-label="Sarthak Ojha - Home"
          >
            S
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#0a0a0a] dark:text-[#fafafa] hover:text-[#262626] dark:hover:text-[#d4d4d4] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.name}
              </a>
            ))}

            {/* Thaili Download Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDownloadOpen(!isDownloadOpen)}
                className="flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full border border-teal-500/40 text-teal-600 dark:text-teal-400 hover:bg-teal-500/10 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
                aria-label="Download Thaili"
                aria-expanded={isDownloadOpen}
              >
                <span>Thaili</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDownloadOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDownloadOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222] rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    Download for Desktop
                  </div>
                  {downloadOptions.map((opt) => (
                    <a
                      key={opt.os}
                      href={opt.href}
                      download
                      onClick={() => setIsDownloadOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-sm text-[#0a0a0a] dark:text-[#fafafa] hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-colors"
                    >
                      <div className="flex flex-col text-left">
                        <span className="font-medium text-sm">{opt.os}</span>
                        <span className="text-[11px] text-gray-500 dark:text-gray-400">{opt.type}</span>
                        {opt.note && (
                          <span className="text-[10px] text-teal-600/80 dark:text-teal-400/80">
                            {opt.note}
                          </span>
                        )}
                      </div>
                      <Download className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 ml-2" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleDark}
              className="text-[#0a0a0a] dark:text-[#fafafa] hover:opacity-60 transition-opacity"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleDark}
              className="text-[#0a0a0a] dark:text-[#fafafa] hover:opacity-60 transition-opacity"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#0a0a0a] dark:text-[#fafafa] hover:opacity-60 transition-opacity"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-[#1a1a1a] shadow-lg">
            <div className="flex flex-col py-4 px-4 gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-[#0a0a0a] dark:text-[#fafafa] hover:text-[#262626] dark:hover:text-[#d4d4d4] transition-colors py-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.name}
                </a>
              ))}

              {/* Mobile Download Section */}
              <div className="pt-2 border-t border-gray-100 dark:border-[#1a1a1a]">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                  Download Thaili
                </span>
                <div className="flex flex-col gap-2">
                  {downloadOptions.map((opt) => (
                    <a
                      key={opt.os}
                      href={opt.href}
                      download
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-2.5 px-3 rounded-lg border border-teal-500/30 text-teal-600 dark:text-teal-400 hover:bg-teal-500/10 transition-colors text-sm font-semibold"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <div className="flex flex-col text-left">
                        <span>Download for {opt.os}</span>
                        <span className="text-[11px] font-normal text-gray-500 dark:text-gray-400">{opt.type}</span>
                        {opt.note && (
                          <span className="text-[10px] font-normal text-teal-600/80 dark:text-teal-400/80">
                            {opt.note}
                          </span>
                        )}
                      </div>
                      <Download className="w-4 h-4 shrink-0 ml-2" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
