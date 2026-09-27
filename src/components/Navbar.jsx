import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, Code2, BookOpen, Layers, Play, CheckCircle2, ChevronRight, Menu, X } from 'lucide-react';

export default function Navbar({ activeSection, scrollProgress }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'why', label: 'Why B&B' },
    { id: 'branch', label: 'Branch' },
    { id: 'bound', label: 'Bound' },
    { id: 'prune', label: 'Prune' },
    { id: 'lc-search', label: 'LC Search' },
    { id: 'terminology', label: 'Terms' },
    { id: 'simulation', label: 'Delivery Lab' },
    { id: 'hospital-simulation', label: 'Hospital Lab', highlight: true },
    { id: 'algorithm', label: 'LC Search Algorithm' },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0071e3] via-[#34c759] to-[#af52de] z-50 transition-all duration-75 origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-black/75 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* KTU Seminar Brand Pill */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center space-x-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] rounded-full p-1"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0071e3] to-[#2563eb] flex items-center justify-center shadow-lg shadow-[#0071e3]/20 group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-semibold tracking-tight text-white flex items-center gap-1.5">
                <span>Branch & Bound</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/70 font-mono">LC</span>
              </div>
              <p className="text-[10px] text-white/50 tracking-wider uppercase font-mono">Algorithm Seminar</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 bg-white/[0.04] backdrop-blur-md p-1.5 rounded-full border border-white/[0.08]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-150 apple-button ${
                    link.highlight
                      ? 'bg-[#0071e3] text-white shadow-md shadow-[#0071e3]/30 hover:bg-[#0077ed]'
                      : isActive
                      ? 'bg-white/15 text-white shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {link.label}
                  {isActive && !link.highlight && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0071e3]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right action button */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => scrollTo('simulation')}
              className="flex items-center space-x-2 text-xs font-medium text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-full px-3.5 py-1.5 transition-all apple-button active:scale-95"
            >
              <Play className="w-3 h-3 text-[#34c759] fill-[#34c759]" />
              <span>Launch Lab</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-b border-white/10 bg-black/95 backdrop-blur-2xl px-6 py-6 space-y-3">
            <div className="text-[11px] uppercase tracking-wider text-white/40 font-mono font-medium">Sections</div>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    link.highlight
                      ? 'bg-[#0071e3] text-white'
                      : activeSection === link.id
                      ? 'bg-white/15 text-white'
                      : 'bg-white/5 text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
