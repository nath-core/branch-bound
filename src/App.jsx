import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyBranchBound from './components/WhyBranchBound';
import BranchSection from './components/BranchSection';
import BoundSection from './components/BoundSection';
import PruningSection from './components/PruningSection';
import LCSearchSection from './components/LCSearchSection';
import TerminologySection from './components/TerminologySection';
import DeliverySimulation from './components/DeliverySimulation';
import HospitalSimulation from './components/HospitalSimulation';
import AlgorithmSection from './components/AlgorithmSection';
import ThankYou from './components/ThankYou';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track overall scroll progress for top progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for highlighting active section in navigation
  useEffect(() => {
    const sectionIds = [
      'why',
      'branch',
      'bound',
      'prune',
      'lc-search',
      'terminology',
      'simulation',
      'hospital-simulation',
      'algorithm',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-[#f5f5f7] selection:bg-[#0071e3]/30 selection:text-white">
      {/* Floating Translucent Navigation */}
      <Navbar activeSection={activeSection} scrollProgress={scrollProgress} />

      {/* Main Educational Flow */}
      <main className="space-y-0">
        <Hero />
        <WhyBranchBound />
        <BranchSection />
        <BoundSection />
        <PruningSection />
        <LCSearchSection />
        <TerminologySection />
        <DeliverySimulation />
        <HospitalSimulation />
        <AlgorithmSection />
      </main>

      {/* Concluding Seminar Slide & Credits */}
      <ThankYou />
    </div>
  );
}
