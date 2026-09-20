import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  ArrowRight,
  Layers,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  companyName: string;
  activePage: 'home' | 'devhub';
  onNavigate: (page: 'home' | 'devhub', targetId?: string) => void;
  onOpenConsultation: (preselectedService?: string) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  companyName,
  activePage,
  onNavigate,
  onOpenConsultation,
  onOpenContact
}) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (activePage === 'home') {
        const sections = ['home', 'about', 'services', 'why-us', 'process', 'technologies', 'industries', 'portfolio', 'calculator', 'contact'];
        const current = sections.find((section) => {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            return rect.top <= 120 && rect.bottom >= 120;
          }
          return false;
        });
        if (current) setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Process', href: '#process' },
    { label: 'Tech Stack', href: '#technologies' },
    { label: 'Industries', href: '#industries' },
    { label: 'Case Studies', href: '#portfolio' },
    { label: 'Development Hub', href: '#development-hub' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
        scrolled ? 'pt-2.5 pb-1' : 'pt-3 pb-1'
      }`}
    >
      {/* Top Translucent Blur Shield: Completely shields the top gap above the floating navbar when scrolling */}
      <div
        className={`fixed top-0 left-0 right-0 h-20 -z-10 pointer-events-none transition-all duration-300 ${
          scrolled
            ? 'opacity-100 bg-gradient-to-b from-white via-white/85 to-transparent dark:from-[#09090b] dark:via-[#09090b]/85 dark:to-transparent backdrop-blur-md'
            : 'opacity-0'
        }`}
      />

      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 dark:bg-[#121215]/95 backdrop-blur-md border border-slate-200/90 dark:border-zinc-800 shadow-sm py-2.5 px-4 sm:px-6'
            : 'bg-white/80 dark:bg-[#121215]/80 backdrop-blur-md border border-slate-200/70 dark:border-zinc-800/80 shadow-xs py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">

          {/* Logo & Brand */}
          <a
            href="#home"
            id="nav-logo-link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home', 'home');
            }}
            className="flex items-center gap-2.5 group text-left focus:outline-none rounded-lg cursor-pointer"
          >
            <div className="w-9 h-9 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shrink-0">
              <BrandLogo className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-display font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                  Algorudix<span className="text-emerald-600 dark:text-emerald-400">.ai</span>
                </span>
              </div>
              <p className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                AI Engineering & Business Analytics
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const targetId = link.href.replace('#', '');
              const isActive = activePage === 'devhub'
                ? targetId === 'development-hub'
                : activeSection === targetId;

              return (
                <a
                  key={link.label}
                  id={`nav-link-${targetId}`}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (targetId === 'development-hub') {
                      onNavigate('devhub');
                    } else {
                      onNavigate('home', targetId);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-slate-100 dark:bg-zinc-800 text-slate-950 dark:text-white font-semibold'
                      : 'text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Theme Switcher & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button with Zoom-in to Zoom-out Animation */}
            <button
              id="theme-toggle-btn"
              onClick={(e) => toggleTheme(e)}
              aria-label="Toggle light or dark theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 transition-all duration-200 active:scale-90 hover:scale-105 cursor-pointer overflow-hidden group shadow-2xs"
            >
              {theme === 'dark' ? (
                <Sun
                  key="sun-icon"
                  className="w-4 h-4 text-amber-400 theme-icon-dark-enter"
                />
              ) : (
                <Moon
                  key="moon-icon"
                  className="w-4 h-4 text-slate-700 dark:text-zinc-300 theme-icon-white-enter"
                />
              )}
            </button>

            {/* Book Consultation Button */}
            <button
              id="nav-consultation-btn"
              onClick={() => onOpenConsultation()}
              className="hidden md:inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 dark:text-zinc-100 bg-slate-100/90 hover:bg-slate-200/90 dark:bg-[#18181b] dark:hover:bg-zinc-800 border border-slate-200/90 dark:border-zinc-700/80 rounded-xl transition-all duration-150 cursor-pointer shadow-2xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Book Call</span>
            </button>

            {/* Primary Action Button */}
            <button
              id="nav-get-started-btn"
              onClick={onOpenContact}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl shadow-xs transition-all duration-150 cursor-pointer group"
            >
              <span>Get started</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl lg:hidden text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="lg:hidden mt-2 max-w-7xl mx-auto rounded-2xl bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 p-5 shadow-xl transition-all duration-200"
        >
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => {
              const targetId = link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    if (targetId === 'development-hub') {
                      onNavigate('devhub');
                    } else {
                      onNavigate('home', targetId);
                    }
                  }}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                >
                  <span className="font-medium text-sm">{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-100 dark:border-zinc-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-100 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-zinc-800"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Book a Consultation</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
              >
                <span>Get started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
