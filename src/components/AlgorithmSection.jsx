import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, CheckCircle, ChevronRight, Terminal, Sparkles, Layers, Award } from 'lucide-react';

export default function AlgorithmSection() {
  const [activeStep, setActiveStep] = useState(2);

  const algorithmCode = `FUNCTION LC_Branch_And_Bound(root):
    liveNodes = NEW PriorityQueue()

    root.bound = CALCULATE_BOUND(root)
    liveNodes.insert(root)

    bestSolution = NULL
    bestCost = INFINITY

    WHILE liveNodes IS NOT EMPTY:
        currentNode = liveNodes.pop_least_cost()

        IF currentNode.bound >= bestCost:
            CONTINUE

        IF currentNode IS A COMPLETE FEASIBLE SOLUTION:
            currentCost = COST(currentNode)
            IF currentCost < bestCost:
                bestCost = currentCost
                bestSolution = currentNode
        ELSE:
            children = BRANCH(currentNode)
            FOR EACH child IN children:
                child.bound = CALCULATE_BOUND(child)
                IF child.bound < bestCost:
                    liveNodes.insert(child)

    RETURN (bestCost, bestSolution)`;

  const algorithmSteps = [
    {
      num: '1',
      title: 'Priority Queue & Root',
      pseudo: 'liveNodes = NEW PriorityQueue()\nroot.bound = CALCULATE_BOUND(root)\nliveNodes.insert(root)',
      detail: 'Initializes the live nodes priority queue (Min-Heap). Computes the optimistic lower bound for the root problem and inserts it as the first live candidate.'
    },
    {
      num: '2',
      title: 'Incumbent Benchmark Setup',
      pseudo: 'bestSolution = NULL\nbestCost = INFINITY',
      detail: 'Sets bestCost to INFINITY so that the very first complete feasible solution discovered will immediately become the incumbent.'
    },
    {
      num: '3',
      title: 'Extract Least-Cost Node',
      pseudo: 'currentNode = liveNodes.pop_least_cost()',
      detail: 'The signature LC Search rule: extracts the live node with the minimum bound across all live subproblems.',
      highlight: true
    },
    {
      num: '4',
      title: 'Pruning Filter Test',
      pseudo: 'IF currentNode.bound >= bestCost:\n    CONTINUE',
      detail: 'If the extracted node’s lower bound is already greater than or equal to our best known cost, its entire subtree is pruned and discarded.',
      highlight: true
    },
    {
      num: '5',
      title: 'Feasible Solution Update',
      pseudo: 'IF currentNode IS COMPLETE:\n    IF currentCost < bestCost:\n        bestCost = currentCost\n        bestSolution = currentNode',
      detail: 'When a complete feasible solution is reached, evaluate its exact cost. If it beats bestCost, update the incumbent.'
    },
    {
      num: '6',
      title: 'Branching & Child Pruning',
      pseudo: 'children = BRANCH(currentNode)\nFOR EACH child IN children:\n    child.bound = CALCULATE_BOUND(child)\n    IF child.bound < bestCost:\n        liveNodes.insert(child)',
      detail: 'Generate child subproblems. Calculate the lower bound for each child and only insert children with bound < bestCost into the priority queue.'
    },
    {
      num: '7',
      title: 'Optimal Return',
      pseudo: 'RETURN (bestCost, bestSolution)',
      detail: 'Once the priority queue is empty, all non-optimal branches have been pruned or evaluated. The returned solution is guaranteed to be globally optimal.'
    }
  ];

  return (
    <section id="algorithm" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.08]">
      
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#0071e3]">
          Algorithm
        </div>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          LC Search Algorithm
        </h2>
        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
          The complete algorithm using a Priority Queue to guide state-space search towards the optimal solution.
        </p>
      </div>

      {/* Main Algorithm Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Left Column: Interactive Step Walkthrough (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">
            Step-by-Step Execution Breakdown
          </div>
          {algorithmSteps.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer apple-button ${
                  isSelected
                    ? 'bg-[#0071e3]/20 border-[#0071e3] shadow-md shadow-[#0071e3]/20'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-[#0071e3] text-white' : 'bg-white/10 text-white/70'
                    }`}>
                      {step.num}
                    </span>
                    <span className="text-sm font-semibold text-white">{step.title}</span>
                  </div>
                  {step.highlight && (
                    <span className="text-[10px] font-mono text-[#34c759] font-bold">
                      LC RULE
                    </span>
                  )}
                </div>
                <div className="text-xs font-mono text-white/50 whitespace-pre-line pl-8 line-clamp-1">
                  {step.pseudo.split('\n')[0]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Code Window (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl apple-glass border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Window Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs font-mono text-white/50 ml-2">LC_Branch_And_Bound(root)</span>
            </div>
            <span className="text-xs font-mono text-[#34c759] font-semibold">Priority Queue Search</span>
          </div>

          {/* Formal Algorithm Code */}
          <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto bg-black/60">
            <pre className="text-white/90">
              <code>{algorithmCode}</code>
            </pre>
          </div>

          {/* Active Step Deep Explanation Box */}
          <div className="p-6 bg-white/[0.04] border-t border-white/10">
            <div className="text-xs uppercase font-mono tracking-wider text-[#0071e3] font-semibold mb-1">
              Phase {algorithmSteps[activeStep].num}: {algorithmSteps[activeStep].title}
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              {algorithmSteps[activeStep].detail}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
