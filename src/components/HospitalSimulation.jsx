import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipForward, SkipBack, RotateCcw, 
  Sparkles, CheckCircle2, AlertTriangle, XCircle, Info, ArrowRight, ShieldCheck, HelpCircle
} from 'lucide-react';
import { HOSPITAL_STEPS, HOSPITAL_GRAPH } from '../data/hospitalSteps';
import HospitalGraphVisualizer from './HospitalGraphVisualizer';

export default function HospitalSimulation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play timer
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < HOSPITAL_STEPS.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const stepData = HOSPITAL_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < HOSPITAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <section id="hospital-simulation" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      
      {/* 1. Header & Title Section */}
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/30 text-xs font-mono uppercase tracking-widest text-[#60a5fa]">
          🏥 Practical Example 2 • Hospital Route Optimization
        </div>
        
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white flex items-center justify-center gap-3">
          <span>Hospital → Laboratory</span>
        </h2>
        
        <p className="text-xl text-[#60a5fa] font-semibold tracking-wide">
          Least-Cost Branch & Bound
        </p>

        {/* Problem Box */}
        <div className="max-w-3xl mx-auto mt-6 rounded-2xl apple-glass border border-white/10 p-6 text-left relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0071e3]" />
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#60a5fa] shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70 font-mono">
                Problem Statement
              </h4>
              <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                “Find the minimum-distance route from the <strong className="text-[#60a5fa]">Hospital</strong> to the <strong className="text-[#34c759]">Laboratory</strong> using Least-Cost Branch and Bound.”
              </p>
              <div className="text-xs text-white/60 font-mono pt-1">
                ⚡ Each edge represents a distance in meters.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Simulation Card */}
      <div className="rounded-3xl apple-glass border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
        
        {/* Step Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#0071e3]/20 text-[#60a5fa] border border-[#0071e3]/40 text-[11px] font-mono font-bold">
                STEP {stepData.step} OF {HOSPITAL_STEPS.length - 1}
              </span>
              <span className="text-xs uppercase tracking-wider text-white/50 font-mono">
                {stepData.phase}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {stepData.title}
            </h3>
            <p className="text-xs text-white/60">{stepData.subtitle}</p>
          </div>

          {/* Interactive Player Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed apple-button"
              aria-label="Previous step"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-5 py-2.5 rounded-full bg-[#0071e3] text-white hover:bg-[#0077ed] flex items-center gap-2 text-xs font-semibold shadow-lg shadow-[#0071e3]/25 apple-button"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStep === HOSPITAL_STEPS.length - 1}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed apple-button"
              aria-label="Next step"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white apple-button ml-2"
              title="Reset simulation"
              aria-label="Reset simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Scrubber */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {HOSPITAL_STEPS.map((s, idx) => {
            const isCurrent = idx === currentStep;
            const isCompleted = idx < currentStep;
            return (
              <button
                key={idx}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStep(idx);
                }}
                className={`py-2 px-2 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-[#0071e3] border-[#60a5fa] text-white shadow-md'
                    : isCompleted
                    ? 'bg-white/10 border-white/20 text-white/80'
                    : 'bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/5'
                }`}
              >
                <div className="text-[11px] font-mono font-bold leading-none">Step {idx}</div>
                <div className="text-[9px] uppercase tracking-tighter truncate mt-1 font-mono hidden sm:block">
                  {s.phase.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Status Dashboard Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/50">Current Cost</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">{stepData.currentCost}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
              m
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/50">Current Best</div>
              <div className="text-2xl font-bold font-mono text-[#34c759] mt-1">{stepData.bestCost}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#34c759] font-bold">
              ★
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/50">Algorithm Status</div>
              <div className="text-sm font-bold font-mono text-[#60a5fa] mt-1 truncate max-w-[180px]">
                {stepData.statusText}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
              LC
            </div>
          </div>
        </div>

        {/* Centerpiece Layout: Vector Graph + Live Step Data */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Graph Visualizer Canvas (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-white/40 font-mono px-1">
              <span>HOSPITAL → LAB NETWORK GRAPH</span>
              <span>Minimization Problem</span>
            </div>

            <HospitalGraphVisualizer stepData={stepData} graphData={HOSPITAL_GRAPH} />

            {/* Live Explanation Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white/90 leading-relaxed font-sans shadow-lg">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider text-[#60a5fa]">
                <Sparkles className="w-3.5 h-3.5 text-[#60a5fa]" />
                <span>Step Analysis</span>
              </div>
              <p>{stepData.explanation}</p>
            </div>
          </div>

          {/* Right Side: Accumulated Path & Live Queue Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Active Path Breakdown Card */}
            <div className="rounded-2xl bg-black/40 border border-white/10 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-white/60">Active Traversal Path</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">
                  {stepData.pathAccumulated.length} Hop(s)
                </span>
              </div>

              <div className="space-y-2.5">
                {stepData.pathAccumulated.length === 0 ? (
                  <div className="text-xs text-white/40 italic font-mono py-4 text-center">
                    No route active. Click Next to begin branching.
                  </div>
                ) : (
                  stepData.pathAccumulated.map((hop, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center font-mono text-[10px] text-white/70">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-white">{hop.label}</span>
                      </div>
                      <div className="text-right font-mono">
                        <span className="text-white/60 text-[11px] block">+{hop.dist}</span>
                        <span className="text-[#60a5fa] font-bold">Total: {hop.total}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Special Callout Card for Pruning & Incumbent */}
            {stepData.step === 6 && (
              <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-3 animate-pulse">
                <div className="flex items-center gap-2 text-red-400 font-mono font-bold text-xs uppercase tracking-wider">
                  <XCircle className="w-4 h-4" />
                  <span>Early Pruning Triggered</span>
                </div>
                <div className="text-sm font-semibold text-white">
                  65 m &gt; 60 m → CANNOT BEAT CURRENT BEST
                </div>
                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  The Ward-C branch reaches 65 meters. Since our current best is 60 meters, continuing to the Laboratory (+15m) would yield at least 80 meters. We prune immediately without traversing Ward-C → Laboratory!
                </p>
              </div>
            )}

            {stepData.step === 4 && (
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-[#34c759] font-mono font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>New Incumbent Discovered</span>
                </div>
                <div className="text-sm font-semibold text-white">
                  70 m → 60 m (Shorter Route Found)
                </div>
                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  Route Hospital → Emergency → ICU → Laboratory totals 60 meters, replacing the previous 70 m best solution!
                </p>
              </div>
            )}

            {/* Final Result Card on Step 7 */}
            {stepData.step === 7 && (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-4">
                <div className="flex items-center gap-2 text-[#34c759] font-mono font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Final Result Summary</span>
                </div>
                <div>
                  <div className="text-xs text-white/60 font-mono">Shortest Route Identified</div>
                  <div className="text-xl font-bold text-white font-mono mt-1">
                    Hospital → Emergency → ICU → Laboratory
                  </div>
                  <div className="text-2xl font-black text-[#34c759] font-mono mt-1">
                    TOTAL = 60 m
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    <span className="text-[#34c759] font-bold">2</span> Complete Solutions
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    <span className="text-red-400 font-bold">1</span> Branch Pruned
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 14. Three-Stage Summary Cards */}
        <div className="pt-8 border-t border-white/10 space-y-6">
          <h4 className="text-center text-xs font-mono uppercase tracking-widest text-white/50">
            Three-Stage Algorithm Execution Summary
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 space-y-2 relative overflow-hidden">
              <div className="text-2xl font-black text-white/30 font-mono">01</div>
              <div className="text-xs font-mono font-bold text-[#60a5fa] uppercase tracking-wider">First Solution</div>
              <div className="text-3xl font-extrabold text-white font-mono">70 m</div>
              <p className="text-xs text-white/60 font-sans">
                Hospital → ICU → Ward-A → Laboratory = 70 m
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-5 space-y-2 relative overflow-hidden">
              <div className="text-2xl font-black text-[#34c759]/40 font-mono">02</div>
              <div className="text-xs font-mono font-bold text-[#34c759] uppercase tracking-wider">Better Solution</div>
              <div className="text-3xl font-extrabold text-white font-mono">60 m</div>
              <p className="text-xs text-white/80 font-sans">
                Hospital → Emergency → ICU → Laboratory = 60 m
              </p>
            </div>

            <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-5 space-y-2 relative overflow-hidden">
              <div className="text-2xl font-black text-red-500/40 font-mono">03</div>
              <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">Early Pruning</div>
              <div className="text-xl font-bold text-white font-mono">65 m &gt; 60 m</div>
              <div className="inline-block px-2 py-0.5 rounded bg-red-500 text-white font-mono font-bold text-[10px]">
                ✕ PRUNED BEFORE LAB
              </div>
              <p className="text-xs text-white/80 font-sans pt-1">
                Ward-C reached 65 m; pruned immediately without exploring Laboratory.
              </p>
            </div>
          </div>
        </div>

        {/* 15. Key Concept & Mathematical Explanation */}
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-[#60a5fa]" />
            <div>
              <h4 className="text-lg font-bold text-white">Why didn't we explore the whole tree?</h4>
              <p className="text-xs text-white/60 font-mono">Core Branch & Bound Minimization Theorem</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <div className="text-xs font-mono text-white/50">Condition</div>
              <div className="text-sm font-bold text-[#60a5fa] font-mono">Current Cost &gt; Current Best</div>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <div className="text-xs font-mono text-white/50">Deduction</div>
              <div className="text-sm font-bold text-amber-400 font-mono">Cannot Improve Solution</div>
            </div>
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 space-y-1">
              <div className="text-xs font-mono text-red-400 font-bold">Action</div>
              <div className="text-sm font-bold text-red-400 font-mono">✕ PRUNE IMMEDIATELY</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-white/80 leading-relaxed font-sans space-y-2">
            <p className="font-semibold text-white">
              “Branch and Bound does not necessarily explore the entire state-space tree.”
            </p>
            <p className="text-white/70">
              In this example, the current cost itself at Ward-C (65 m) is already greater than the best solution (60 m), so it is enough to prune immediately. In general Branch and Bound problems, an optimistic lower bound (<code className="text-[#60a5fa]">Bound ≥ Current Best</code>) may include an estimate of remaining cost to prune even earlier!
            </p>
          </div>
        </div>

        {/* 16. LC Search Connection Control Abstraction */}
        <div className="p-6 rounded-2xl bg-black/50 border border-white/10 space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#60a5fa] font-bold">
            LC Search Algorithmic Flow
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/80 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">GENERATE</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/40 shrink-0" />
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">CALCULATE COST</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/40 shrink-0" />
            <span className="px-3 py-1.5 rounded-lg bg-[#0071e3]/20 border border-[#0071e3]/40 text-[#60a5fa] font-bold">SELECT LEAST-COST</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/40 shrink-0" />
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">EXPAND</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/40 shrink-0" />
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-[#34c759] font-bold">UPDATE BEST</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/40 shrink-0" />
            <span className="px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 font-bold">PRUNE NON-PROMISING</span>
          </div>
        </div>

        {/* Final Teaching Callout Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0071e3]/15 via-purple-500/10 to-emerald-500/15 border border-white/15 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/70">
            <Sparkles className="w-4 h-4 text-[#34c759]" />
            <span>Key Takeaway Message</span>
          </div>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-sans italic">
            “First, LC finds a complete solution of 70 meters. Then another branch gives a better solution of 60 meters. When the third branch reaches Ward-C, it has already travelled 65 meters. Since 65 meters is greater than the current best of 60 meters, there is no reason to continue. The branch is pruned immediately without reaching the Laboratory. This clearly demonstrates how Branch and Bound avoids exploring unnecessary parts of the state-space tree.”
          </p>
        </div>

      </div>
    </section>
  );
}
