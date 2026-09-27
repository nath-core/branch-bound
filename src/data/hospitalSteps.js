/**
 * Step-by-step algorithm state machine for Hospital → Laboratory LC Branch & Bound
 * Following specifications in 2nd example.md
 */

export const HOSPITAL_STEPS = [
  {
    step: 0,
    title: "Initial Network Topology",
    subtitle: "Hospital → Laboratory Navigation Network",
    phase: "INITIALIZATION",
    currentCost: "—",
    bestCost: "∞",
    statusText: "READY",
    statusColor: "blue",
    explanation: "The algorithm begins at the Hospital. Our goal is to find the minimum distance route to the Laboratory using Least-Cost Branch & Bound. Each edge represents distance in meters.",
    activeNodes: ["hospital"],
    activeEdges: [],
    prunedNodes: [],
    prunedEdges: [],
    secondaryEdges: [],
    optimalEdges: [],
    pathAccumulated: []
  },
  {
    step: 1,
    title: "Step 1 — Initial Branching (LC Selection)",
    subtitle: "Branching to ICU (20m), Emergency (25m), & Pharmacy (30m)",
    phase: "BRANCH & SELECT",
    currentCost: "20 m",
    bestCost: "∞",
    statusText: "ICU SELECTED (20 m)",
    statusColor: "amber",
    explanation: "Hospital branches into three immediate nodes: ICU (20 m), Emergency (25 m), and Pharmacy (30 m). LC Search evaluates the live queue and selects ICU (20 m) first as it has the minimum current distance.",
    activeNodes: ["hospital", "icu_1", "emergency", "pharmacy_1"],
    activeEdges: ["h-icu1", "h-emerg", "h-pharm1"],
    selectedNode: "icu_1",
    prunedNodes: [],
    prunedEdges: [],
    secondaryEdges: [],
    optimalEdges: [],
    pathAccumulated: [
      { label: "Hospital → ICU", dist: "20 m", total: "20 m" }
    ]
  },
  {
    step: 2,
    title: "Step 2 — First Complete Solution (70 m)",
    subtitle: "Path 1: Hospital → ICU → Ward-A → Laboratory",
    phase: "FIRST SOLUTION",
    currentCost: "70 m",
    bestCost: "70 m",
    statusText: "FIRST BEST = 70 m",
    statusColor: "green",
    explanation: "Expanding ICU (20m) leads to Ward-A (+25m = 45m) and then Laboratory (+25m = 70m). This complete path provides our first feasible solution of 70 m, setting our initial Current Best (Incumbent = 70 m).",
    activeNodes: ["hospital", "icu_1", "ward_a", "lab_a"],
    activeEdges: ["h-icu1", "icu1-warda", "warda-laba"],
    prunedNodes: [],
    prunedEdges: [],
    secondaryEdges: [],
    optimalEdges: [],
    pathAccumulated: [
      { label: "Hospital → ICU", dist: "20 m", total: "20 m" },
      { label: "ICU → Ward-A", dist: "25 m", total: "45 m" },
      { label: "Ward-A → Laboratory", dist: "25 m", total: "70 m" }
    ]
  },
  {
    step: 3,
    title: "Step 3 — Do Not Stop (Evaluate Remaining Live Branches)",
    subtitle: "Emergency (25 m) & Pharmacy (30 m) remain live",
    phase: "QUEUE INSPECTION",
    currentCost: "25 m",
    bestCost: "70 m",
    statusText: "EXPANDING EMERGENCY (25 m)",
    statusColor: "blue",
    explanation: "Finding a solution (70 m) does not mean we can stop. Emergency (25 m) and Pharmacy (30 m) are live nodes in the queue with distance < 70 m. Emergency (25 m) is selected next as the least-cost live node.",
    activeNodes: ["hospital", "emergency", "pharmacy_1"],
    activeEdges: ["h-emerg", "h-pharm1"],
    selectedNode: "emergency",
    prunedNodes: [],
    prunedEdges: [],
    secondaryEdges: ["h-icu1", "icu1-warda", "warda-laba"],
    optimalEdges: [],
    pathAccumulated: [
      { label: "Hospital → Emergency", dist: "25 m", total: "25 m" }
    ]
  },
  {
    step: 4,
    title: "Step 4 — Second Complete Solution (60 m)",
    subtitle: "Path 2: Hospital → Emergency → ICU → Laboratory",
    phase: "NEW INCUMBENT",
    currentCost: "60 m",
    bestCost: "60 m",
    statusText: "NEW BEST = 60 m",
    statusColor: "green",
    explanation: "Expanding Emergency (25m) via ICU (+20m = 45m) to Laboratory (+15m = 60m) yields a complete route of 60 m. Since 60 m < 70 m, the Current Best updates from 70 m to 60 m!",
    activeNodes: ["hospital", "emergency", "icu_2", "lab_icu"],
    activeEdges: ["h-emerg", "emerg-icu2", "icu2-labicu"],
    prunedNodes: [],
    prunedEdges: [],
    secondaryEdges: ["h-icu1", "icu1-warda", "warda-laba"],
    optimalEdges: ["h-emerg", "emerg-icu2", "icu2-labicu"],
    pathAccumulated: [
      { label: "Hospital → Emergency", dist: "25 m", total: "25 m" },
      { label: "Emergency → ICU", dist: "20 m", total: "45 m" },
      { label: "ICU → Laboratory", dist: "15 m", total: "60 m" }
    ]
  },
  {
    step: 5,
    title: "Step 5 — Third Branch (Pharmacy → Ward-C)",
    subtitle: "Path 3: Hospital → Pharmacy → Ward-C",
    phase: "BRANCH EVALUATION",
    currentCost: "65 m",
    bestCost: "60 m",
    statusText: "COMPARING: 65 m > 60 m",
    statusColor: "purple",
    explanation: "Next, we branch from Hospital (30m) to Pharmacy → Ward-C (+35m = 65m). We stop at Ward-C. The accumulated distance is 65 m, which is greater than our current best of 60 m.",
    activeNodes: ["hospital", "pharmacy_1", "ward_c"],
    activeEdges: ["h-pharm1", "pharm1-wardc"],
    prunedNodes: [],
    prunedEdges: [],
    secondaryEdges: ["h-icu1", "icu1-warda", "warda-laba"],
    optimalEdges: ["h-emerg", "emerg-icu2", "icu2-labicu"],
    pathAccumulated: [
      { label: "Hospital → Pharmacy", dist: "30 m", total: "30 m" },
      { label: "Pharmacy → Ward-C", dist: "35 m", total: "65 m" }
    ]
  },
  {
    step: 6,
    title: "Step 6 — Early Pruning (65 m > 60 m)",
    subtitle: "Branch Pruned Immediately — Laboratory Unreached!",
    phase: "EARLY PRUNING",
    currentCost: "65 m",
    bestCost: "60 m",
    statusText: "✕ PRUNED (65 m > 60 m)",
    statusColor: "red",
    explanation: "Because 65 m > 60 m, this branch cannot beat our best route of 60 m. Since edge distances are non-negative, we PRUNE immediately! The remaining edge Ward-C → Laboratory (15m) is never traversed.",
    activeNodes: ["hospital", "pharmacy_1"],
    activeEdges: [],
    prunedNodes: ["ward_c"],
    prunedEdges: ["pharm1-wardc"],
    unexploredEdges: ["wardc-labc"],
    secondaryEdges: ["h-icu1", "icu1-warda", "warda-laba"],
    optimalEdges: ["h-emerg", "emerg-icu2", "icu2-labicu"],
    pathAccumulated: [
      { label: "Hospital → Pharmacy", dist: "30 m", total: "30 m" },
      { label: "Pharmacy → Ward-C", dist: "35 m", total: "65 m (PRUNED)" }
    ]
  },
  {
    step: 7,
    title: "Step 7 — Final State & Algorithm Summary",
    subtitle: "Optimal Route Confirmed: 60 meters",
    phase: "FINAL RESULT",
    currentCost: "60 m",
    bestCost: "60 m",
    statusText: "OPTIMAL ROUTE CONFIRMED",
    statusColor: "green",
    explanation: "All branches have either reached completion or been pruned! The shortest route is Hospital → Emergency → ICU → Laboratory with a total distance of 60 meters.",
    activeNodes: ["hospital", "emergency", "icu_2", "lab_icu"],
    activeEdges: [],
    prunedNodes: ["ward_c"],
    prunedEdges: ["pharm1-wardc"],
    unexploredEdges: ["wardc-labc"],
    secondaryEdges: ["h-icu1", "icu1-warda", "warda-laba"],
    optimalEdges: ["h-emerg", "emerg-icu2", "icu2-labicu"],
    pathAccumulated: [
      { label: "Hospital → Emergency", dist: "25 m", total: "25 m" },
      { label: "Emergency → ICU", dist: "20 m", total: "45 m" },
      { label: "ICU → Laboratory", dist: "15 m", total: "60 m (OPTIMAL)" }
    ]
  }
];

export const HOSPITAL_GRAPH = {
  nodes: [
    { id: "hospital", label: "Hospital", sub: "Start", x: 97, y: 18, type: "start" },
    
    // Level 1
    { id: "icu_1", label: "ICU", sub: "20m", x: 34, y: 75, type: "level1" },
    { id: "emergency", label: "Emergency", sub: "25m", x: 106, y: 75, type: "level1" },
    { id: "pharmacy_1", label: "Pharmacy", sub: "30m", x: 160, y: 75, type: "level1" },

    // Level 2
    { id: "ward_a", label: "Ward-A", sub: "+25m", x: 16, y: 135, type: "level2" },
    { id: "ward_b", label: "Ward-B", sub: "+30m", x: 52, y: 135, type: "level2" },
    { id: "icu_2", label: "ICU", sub: "+20m", x: 88, y: 135, type: "level2" },
    { id: "pharmacy_2", label: "Pharmacy", sub: "+30m", x: 124, y: 135, type: "level2" },
    { id: "ward_c", label: "Ward-C", sub: "+35m", x: 160, y: 135, type: "level2" },

    // Level 3 (Laboratories)
    { id: "lab_a", label: "Laboratory", sub: "+25m", x: 16, y: 195, type: "lab" },
    { id: "lab_b", label: "Laboratory", sub: "+20m", x: 52, y: 195, type: "lab" },
    { id: "lab_icu", label: "Laboratory", sub: "+15m", x: 88, y: 195, type: "lab" },
    { id: "lab_pharm", label: "Laboratory", sub: "+10m", x: 124, y: 195, type: "lab" },
    { id: "lab_c", label: "Laboratory", sub: "Unexplored", x: 160, y: 195, type: "lab" }
  ],
  edges: [
    { id: "h-icu1", from: "hospital", to: "icu_1", label: "20m" },
    { id: "h-emerg", from: "hospital", to: "emergency", label: "25m" },
    { id: "h-pharm1", from: "hospital", to: "pharmacy_1", label: "30m" },

    { id: "icu1-warda", from: "icu_1", to: "ward_a", label: "25m" },
    { id: "icu1-wardb", from: "icu_1", to: "ward_b", label: "30m" },

    { id: "emerg-icu2", from: "emergency", to: "icu_2", label: "20m" },
    { id: "emerg-pharm2", from: "emergency", to: "pharmacy_2", label: "30m" },

    { id: "pharm1-wardc", from: "pharmacy_1", to: "ward_c", label: "35m" },

    { id: "warda-laba", from: "ward_a", to: "lab_a", label: "25m" },
    { id: "wardb-labb", from: "ward_b", to: "lab_b", label: "20m" },
    { id: "icu2-labicu", from: "icu_2", to: "lab_icu", label: "15m" },
    { id: "pharm2-labpharm", from: "pharmacy_2", to: "lab_pharm", label: "10m" },
    { id: "wardc-labc", from: "ward_c", to: "lab_c", label: "15m", unvisited: true }
  ]
};
