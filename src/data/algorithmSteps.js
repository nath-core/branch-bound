/**
 * Algorithm state machine data for Smart Delivery Planning (Example 1)
 * Following specs in replace_example_1_smart_delivery_planning.md:
 * Route 1 (Hospital -> Mall -> Bus Terminal -> Tech Park) = 61 m
 * Route 2 (Campus -> Library -> Tech Park) = 53 m (Optimal Best)
 * Route 3 (Hospital -> Airport -> Cargo) = 56 m > 53 m (Pruned at Cargo before Tech Park)
 */

export const SIMULATION_STEPS = [
  {
    state: 0,
    title: "Initial Problem State (Root Node)",
    subtitle: "Warehouse Dispatch Center",
    phase: "INITIALIZATION",
    description: "The initial root node represents the dispatch origin with an admissible baseline bound estimate (Bound = 10). No branching has occurred yet.",
    currentBest: "∞ (None)",
    eNode: "Warehouse (Root)",
    liveNodes: [
      { id: "root", name: "Warehouse", bound: 10, status: "live", path: "Start", note: "Root problem node" }
    ],
    prunedNodes: [],
    explanation: "At the start of Branch and Bound, the root problem is created and its lower bound is computed. It enters the live-node priority queue.",
    tree: {
      nodes: [
        { id: "root", label: "Warehouse", bound: 10, x: 100, y: 18, status: "enode" }
      ],
      edges: []
    }
  },
  {
    state: 1,
    title: "Branching: First Level Sector Selection",
    subtitle: "Branching to Campus (18m) & Hospital (11m)",
    phase: "BRANCH",
    description: "Warehouse branches into two candidate delivery routes: Campus (18 m) and Hospital (11 m). Subproblems enter the priority queue.",
    currentBest: "∞ (None)",
    eNode: "Warehouse (Processed)",
    liveNodes: [
      { id: "hospital", name: "Hospital", bound: 11, status: "live", path: "Warehouse → Hospital", note: "Promising lower bound" },
      { id: "campus", name: "Campus", bound: 18, status: "live", path: "Warehouse → Campus", note: "Candidate partial route" }
    ],
    prunedNodes: [],
    explanation: "Branching divides the dispatch problem into smaller subproblems by committing to the first stop.",
    tree: {
      nodes: [
        { id: "root", label: "Warehouse", bound: 10, x: 100, y: 18, status: "dead" },
        { id: "campus", label: "Campus", bound: 18, x: 36, y: 75, status: "live" },
        { id: "hospital", label: "Hospital", bound: 11, x: 136, y: 75, status: "live" }
      ],
      edges: [
        { from: "root", to: "campus", label: "18m" },
        { from: "root", to: "hospital", label: "11m" }
      ]
    }
  },
  {
    state: 2,
    title: "LC Selection: Hospital Branch Selected (11m)",
    subtitle: "Min-Heap Priority Queue Inspection",
    phase: "LEAST-COST SELECTION",
    description: "Live nodes are compared: Campus has bound 18 m, Hospital has bound 11 m. LC Search selects Hospital (11 m) as it has the minimum bound.",
    currentBest: "∞ (None)",
    eNode: "Hospital (Selected)",
    liveNodes: [
      { id: "hospital", name: "Hospital", bound: 11, status: "selected", path: "Warehouse → Hospital", note: "Minimum bound among live nodes" },
      { id: "campus", name: "Campus", bound: 18, status: "live", path: "Warehouse → Campus", note: "Remains in priority queue" }
    ],
    prunedNodes: [],
    explanation: "LC (Least-Cost) Search selects the live node with the smallest bound (Hospital with 11 m) for immediate expansion.",
    tree: {
      nodes: [
        { id: "root", label: "Warehouse", bound: 10, x: 100, y: 18, status: "dead" },
        { id: "campus", label: "Campus", bound: 18, x: 36, y: 75, status: "live" },
        { id: "hospital", label: "Hospital", bound: 11, x: 136, y: 75, status: "enode" }
      ],
      edges: [
        { from: "root", to: "campus", label: "18m" },
        { from: "root", to: "hospital", label: "11m", active: true }
      ]
    }
  },
  {
    state: 3,
    title: "First Complete Solution Discovered (61m)",
    subtitle: "Route 1: Warehouse → Hospital → Mall → Bus Terminal → Tech Park",
    phase: "FIRST SOLUTION",
    description: "Expanding Hospital (11m) via Mall (+15m = 26m) and Bus Terminal (+20m = 46m) completes the first full route to Tech Park (+15m = 61m). Incumbent is set to 61 m!",
    currentBest: "61 m (Route 1)",
    eNode: "Tech Park (Complete)",
    liveNodes: [
      { id: "campus", name: "Campus", bound: 18, status: "live", path: "Warehouse → Campus", note: "Bound 18m < Current Best 61m" },
      { id: "airport", name: "Airport", bound: 36, status: "live", path: "Hospital → Airport", note: "Bound 36m < Current Best 61m" }
    ],
    prunedNodes: [],
    explanation: "Our first complete feasible route to Tech Park totals 61 m (11 + 15 + 20 + 15). This establishes our initial Current Best (Incumbent = 61 m).",
    tree: {
      nodes: [
        { id: "root", label: "Warehouse", bound: 10, x: 100, y: 18, status: "dead" },
        { id: "campus", label: "Campus", bound: 18, x: 36, y: 75, status: "live" },
        { id: "hospital", label: "Hospital", bound: 11, x: 136, y: 75, status: "dead" },
        { id: "mall", label: "Mall", bound: 26, x: 100, y: 135, status: "dead" },
        { id: "bus_terminal", label: "Bus Terminal", bound: 46, x: 100, y: 195, status: "dead" },
        { id: "techpark_mall", label: "Tech Park", bound: 61, x: 100, y: 255, status: "solution" }
      ],
      edges: [
        { from: "root", to: "campus", label: "18m" },
        { from: "root", to: "hospital", label: "11m" },
        { from: "hospital", to: "mall", label: "15m" },
        { from: "mall", to: "bus_terminal", label: "20m" },
        { from: "bus_terminal", to: "techpark_mall", label: "Cost=61m ✓", active: true }
      ]
    }
  },
  {
    state: 4,
    title: "Next LC Selection: Campus Branch (18m < 61m)",
    subtitle: "Exploring Remaining Promising Live Node",
    phase: "LEAST-COST SELECTION",
    description: "The live nodes are Campus (bound 18m) and Airport (bound 36m). Campus has the smaller bound (18 < 36 < 61) and is selected as the next E-node.",
    currentBest: "61 m (Route 1)",
    eNode: "Campus (Selected)",
    liveNodes: [
      { id: "campus", name: "Campus", bound: 18, status: "selected", path: "Warehouse → Campus", note: "Minimum bound (18m)" },
      { id: "airport", name: "Airport", bound: 36, status: "live", path: "Hospital → Airport", note: "Live node (36m)" }
    ],
    prunedNodes: [],
    explanation: "Finding a 61 m solution does not stop the search! Campus is live with cost 18 m < 61 m, so it must be expanded.",
    tree: {
      nodes: [
        { id: "root", label: "Warehouse", bound: 10, x: 100, y: 18, status: "dead" },
        { id: "campus", label: "Campus", bound: 18, x: 36, y: 75, status: "enode" },
        { id: "hospital", label: "Hospital", bound: 11, x: 136, y: 75, status: "dead" },
        { id: "mall", label: "Mall", bound: 26, x: 100, y: 135, status: "dead" },
        { id: "bus_terminal", label: "Bus Terminal", bound: 46, x: 100, y: 195, status: "dead" },
        { id: "techpark_mall", label: "Tech Park", bound: 61, x: 100, y: 255, status: "solution" }
      ],
      edges: [
        { from: "root", to: "campus", label: "18m", active: true },
        { from: "root", to: "hospital", label: "11m" },
        { from: "hospital", to: "mall", label: "15m" },
        { from: "mall", to: "bus_terminal", label: "20m" },
        { from: "bus_terminal", to: "techpark_mall", label: "61m" }
      ]
    }
  },
  {
    state: 5,
    title: "Optimal Solution Found (53m)",
    subtitle: "Route 2: Warehouse → Campus → Library → Tech Park",
    phase: "NEW INCUMBENT",
    description: "Expanding Campus (18m) via Library (+20m = 38m) reaches Tech Park (+15m = 53m). Since 53 m < 61 m, the Current Best updates to 53 m!",
    currentBest: "53 m (Route 2)",
    eNode: "Tech Park (Optimal Solution)",
    liveNodes: [
      { id: "airport", name: "Airport", bound: 36, status: "live", path: "Hospital → Airport", note: "Bound 36m < Current Best 53m" }
    ],
    prunedNodes: [],
    explanation: "This route is shorter! 18 + 20 + 15 = 53 m. The current best solution updates from 61 m to 53 m.",
    tree: {
      nodes: [
        { id: "root", label: "Warehouse", bound: 10, x: 100, y: 18, status: "dead" },
        { id: "campus", label: "Campus", bound: 18, x: 36, y: 75, status: "dead" },
        { id: "library", label: "Library", bound: 38, x: 36, y: 135, status: "dead" },
        { id: "techpark_campus", label: "Tech Park", bound: 53, x: 36, y: 195, status: "solution" },
        { id: "hospital", label: "Hospital", bound: 11, x: 136, y: 75, status: "dead" },
        { id: "mall", label: "Mall", bound: 26, x: 100, y: 135, status: "dead" },
        { id: "bus_terminal", label: "Bus Terminal", bound: 46, x: 100, y: 195, status: "dead" },
        { id: "techpark_mall", label: "Tech Park", bound: 61, x: 100, y: 255, status: "dead" }
      ],
      edges: [
        { from: "root", to: "campus", label: "18m" },
        { from: "campus", to: "library", label: "20m" },
        { from: "library", to: "techpark_campus", label: "Cost=53m ★", active: true },
        { from: "root", to: "hospital", label: "11m" },
        { from: "hospital", to: "mall", label: "15m" },
        { from: "mall", to: "bus_terminal", label: "20m" },
        { from: "bus_terminal", to: "techpark_mall", label: "61m" }
      ]
    }
  },
  {
    state: 6,
    title: "Early Pruning at Cargo (56m > 53m)",
    subtitle: "Airport Branch Exceeds Current Best — Discarded!",
    phase: "EARLY PRUNING",
    description: "Expanding Hospital → Airport (11m + 25m = 36m) → Cargo (+20m = 56m). At Cargo, current cost is 56 m. Since 56 m > 53 m, this branch is PRUNED immediately! The final edge Cargo → Tech Park (15m) is never traversed.",
    currentBest: "53 m (Route 2)",
    eNode: "Pruning Cargo Node",
    liveNodes: [],
    prunedNodes: [
      { id: "cargo", name: "Cargo Node", bound: 56, reason: "Cost (56m) > Current Best (53m)" }
    ],
    explanation: "Because 56 m > 53 m, this branch cannot beat our best route of 53 m. Since edge distances are non-negative, we PRUNE immediately at Cargo without reaching Tech Park!",
    tree: {
      nodes: [
        { id: "root", label: "Warehouse", bound: 10, x: 100, y: 18, status: "dead" },
        { id: "campus", label: "Campus", bound: 18, x: 36, y: 75, status: "dead" },
        { id: "library", label: "Library", bound: 38, x: 36, y: 135, status: "dead" },
        { id: "techpark_campus", label: "Tech Park", bound: 53, x: 36, y: 195, status: "solution" },
        { id: "hospital", label: "Hospital", bound: 11, x: 136, y: 75, status: "dead" },
        { id: "airport", label: "Airport", bound: 36, x: 172, y: 135, status: "dead" },
        { id: "cargo", label: "Cargo", bound: 56, x: 172, y: 195, status: "pruned" },
        { id: "techpark_cargo", label: "Tech Park", bound: 71, x: 172, y: 255, status: "unvisited" }
      ],
      edges: [
        { from: "root", to: "campus", label: "18m" },
        { from: "campus", to: "library", label: "20m" },
        { from: "library", to: "techpark_campus", label: "53m" },
        { from: "root", to: "hospital", label: "11m" },
        { from: "hospital", to: "airport", label: "25m" },
        { from: "airport", to: "cargo", label: "20m (PRUNED)", pruned: true },
        { from: "cargo", to: "techpark_cargo", label: "15m", unvisited: true }
      ]
    }
  },
  {
    state: 7,
    title: "Termination: Global Optimal Solution Confirmed (53m)",
    subtitle: "Warehouse → Campus → Library → Tech Park",
    phase: "TERMINATION",
    description: "All subproblems have either been fully expanded or pruned! The route Warehouse → Campus → Library → Tech Park (Cost: 53 m) is GUARANTEED optimal!",
    currentBest: "53 m (GLOBAL OPTIMUM)",
    eNode: "None (Search Complete)",
    liveNodes: [],
    prunedNodes: [
      { id: "cargo", name: "Cargo Node", bound: 56, reason: "Cost (56m) > Current Best (53m)" }
    ],
    explanation: "Search complete! First route (61m) was replaced by the Campus route (53m), and the Airport branch was pruned at Cargo (56m > 53m) before completing.",
    tree: {
      nodes: [
        { id: "root", label: "Warehouse", bound: 10, x: 100, y: 18, status: "optimal" },
        { id: "campus", label: "Campus", bound: 18, x: 36, y: 75, status: "optimal" },
        { id: "library", label: "Library", bound: 38, x: 36, y: 135, status: "optimal" },
        { id: "techpark_campus", label: "Tech Park", bound: 53, x: 36, y: 195, status: "optimal" },
        { id: "hospital", label: "Hospital", bound: 11, x: 136, y: 75, status: "dead" },
        { id: "mall", label: "Mall", bound: 26, x: 100, y: 135, status: "dead" },
        { id: "bus_terminal", label: "Bus Terminal", bound: 46, x: 100, y: 195, status: "dead" },
        { id: "techpark_mall", label: "Tech Park", bound: 61, x: 100, y: 255, status: "dead" },
        { id: "airport", label: "Airport", bound: 36, x: 172, y: 135, status: "dead" },
        { id: "cargo", label: "Cargo", bound: 56, x: 172, y: 195, status: "pruned" }
      ],
      edges: [
        { from: "root", to: "campus", label: "18m", optimal: true },
        { from: "campus", to: "library", label: "20m", optimal: true },
        { from: "library", to: "techpark_campus", label: "Optimal (53m)", optimal: true },
        { from: "root", to: "hospital", label: "11m" },
        { from: "hospital", to: "mall", label: "15m" },
        { from: "mall", to: "bus_terminal", label: "20m" },
        { from: "bus_terminal", to: "techpark_mall", label: "61m" },
        { from: "hospital", to: "airport", label: "25m" },
        { from: "airport", to: "cargo", label: "20m", pruned: true },
        { from: "cargo", to: "techpark_cargo", label: "15m", unvisited: true }
      ]
    }
  }
];

export const TERMINOLOGY_ITEMS = [
  {
    term: "Root Node",
    symbol: "●",
    color: "blue",
    tag: "Start Point",
    definition: "The initial unexpanded node representing the complete, undivided problem before any branch decisions are made."
  },
  {
    term: "Live Node",
    symbol: "○",
    color: "amber",
    tag: "Candidate Subproblem",
    definition: "A generated node that has not yet been expanded or pruned. Live nodes are stored in the priority queue waiting for selection."
  },
  {
    term: "E-Node (Expansion Node)",
    symbol: "◆",
    color: "purple",
    tag: "Active Focus",
    definition: "The specific live node currently selected by the LC Search rule (least cost/bound) for branching into child nodes."
  },
  {
    term: "Dead Node",
    symbol: "⊘",
    color: "secondary",
    tag: "Retired",
    definition: "A node that will never be expanded again because all its children have already been generated, or it has been processed."
  },
  {
    term: "Pruned Node",
    symbol: "✕",
    color: "red",
    tag: "Eliminated",
    definition: "A node discarded without further exploration because its calculated bound cannot improve upon the current best solution (Bound ≥ Incumbent)."
  },
  {
    term: "Current Best (Incumbent)",
    symbol: "★",
    color: "green",
    tag: "Benchmark",
    definition: "The best complete feasible solution discovered so far. It acts as the upper cutoff threshold for all pruning decisions."
  }
];
