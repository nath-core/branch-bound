import React from 'react';

const MASTER_NODES = [
  { id: "root", label: "Warehouse", bound: 10, x: 100, y: 18 },
  { id: "campus", label: "Campus", bound: 18, x: 36, y: 75 },
  { id: "hospital", label: "Hospital", bound: 11, x: 136, y: 75 },
  { id: "library", label: "Library", bound: 38, x: 36, y: 135 },
  { id: "mall", label: "Mall", bound: 26, x: 100, y: 135 },
  { id: "airport", label: "Airport", bound: 36, x: 172, y: 135 },
  { id: "techpark_campus", label: "Tech Park", bound: 53, x: 36, y: 195 },
  { id: "bus_terminal", label: "Bus Terminal", bound: 46, x: 100, y: 195 },
  { id: "cargo", label: "Cargo", bound: 56, x: 172, y: 195 },
  { id: "techpark_mall", label: "Tech Park", bound: 61, x: 100, y: 255 },
  { id: "techpark_cargo", label: "Tech Park", bound: 71, x: 172, y: 255 }
];

const MASTER_EDGES = [
  { from: "root", to: "campus", defaultLabel: "18m" },
  { from: "root", to: "hospital", defaultLabel: "11m" },
  { from: "campus", to: "library", defaultLabel: "20m" },
  { from: "library", to: "techpark_campus", defaultLabel: "15m" },
  { from: "hospital", to: "mall", defaultLabel: "15m" },
  { from: "mall", to: "bus_terminal", defaultLabel: "20m" },
  { from: "bus_terminal", to: "techpark_mall", defaultLabel: "15m" },
  { from: "hospital", to: "airport", defaultLabel: "25m" },
  { from: "airport", to: "cargo", defaultLabel: "20m" },
  { from: "cargo", to: "techpark_cargo", defaultLabel: "15m" }
];

export default function StateSpaceVisualizer({ currentStepData }) {
  const { tree } = currentStepData;

  // Build complete list of nodes and edges for full path visualization
  const allNodes = MASTER_NODES.map((master) => {
    const stepNode = tree.nodes.find((n) => n.id === master.id);
    return stepNode ? { ...master, ...stepNode } : { ...master, status: "unvisited" };
  });

  const allEdges = MASTER_EDGES.map((master) => {
    const stepEdge = tree.edges.find((e) => e.from === master.from && e.to === master.to);
    return stepEdge 
      ? { ...master, ...stepEdge } 
      : { ...master, label: master.defaultLabel, unvisited: true };
  });

  const getNode = (id) => allNodes.find((n) => n.id === id);

  return (
    <div className="relative w-full aspect-[650/700] flex items-center justify-center p-2 bg-black/40 rounded-2xl border border-white/10 overflow-hidden shadow-inner">
      <svg viewBox="0 0 200 275" className="w-full h-full overflow-visible select-none">
        
        {/* Draw Edges */}
        {allEdges.map((edge, idx) => {
          const from = getNode(edge.from);
          const to = getNode(edge.to);
          if (!from || !to) return null;

          const isOptimal = edge.optimal;
          const isPruned = edge.pruned;
          const isActive = edge.active;
          const isUnvisited = edge.unvisited;

          let stroke = 'rgba(255, 255, 255, 0.3)';
          let strokeWidth = '1.4';
          let dash = 'none';

          if (isOptimal) {
            stroke = '#34c759';
            strokeWidth = '2.4';
          } else if (isPruned) {
            stroke = '#ff3b30';
            strokeWidth = '1.8';
            dash = '3 3';
          } else if (isActive) {
            stroke = '#0071e3';
            strokeWidth = '2.2';
          } else if (isUnvisited) {
            stroke = 'rgba(255, 255, 255, 0.12)';
            strokeWidth = '1.0';
            dash = '2.5 2.5';
          }

          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;

          return (
            <g key={`edge-${idx}`}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={dash}
                className="transition-all duration-300"
              />
              
              {/* Edge cost/label */}
              {edge.label && (
                <g transform={`translate(${midX}, ${midY})`}>
                  <rect
                    x="-10.5"
                    y="-4.8"
                    width="21.0"
                    height="9.6"
                    rx="2.2"
                    fill="#000000"
                    stroke={stroke}
                    strokeWidth="0.8"
                    opacity={isUnvisited ? 0.6 : 0.95}
                  />
                  <text
                    y="1.8"
                    fill={
                      isOptimal ? '#34c759' : 
                      isPruned ? '#ff4d4f' : 
                      isActive ? '#60a5fa' : 
                      isUnvisited ? 'rgba(255,255,255,0.45)' : 
                      '#ffffff'
                    }
                    fontSize="5.0"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Draw Nodes */}
        {allNodes.map((node) => {
          const isENode = node.status === 'enode';
          const isLive = node.status === 'live';
          const isDead = node.status === 'dead';
          const isPruned = node.status === 'pruned';
          const isOptimal = node.status === 'optimal';
          const isSolution = node.status === 'solution';
          const isUnvisited = node.status === 'unvisited';

          let fill = '#18181b';
          let stroke = 'rgba(255,255,255,0.4)';
          let strokeWidth = '1.2';
          let textFill = '#ffffff';

          if (isENode) {
            fill = '#0071e3';
            stroke = '#93c5fd';
            strokeWidth = '2.2';
          } else if (isLive) {
            fill = '#2a1b02';
            stroke = '#f59e0b';
            strokeWidth = '1.6';
            textFill = '#fbbf24';
          } else if (isPruned) {
            fill = '#22080a';
            stroke = '#ff3b30';
            strokeWidth = '1.6';
            textFill = '#f87171';
          } else if (isOptimal || isSolution) {
            fill = '#062810';
            stroke = '#34c759';
            strokeWidth = '2.2';
            textFill = '#4ade80';
          } else if (isDead) {
            fill = '#1f1f23';
            stroke = 'rgba(255,255,255,0.25)';
            textFill = 'rgba(255,255,255,0.7)';
          } else if (isUnvisited) {
            fill = '#0c0c0e';
            stroke = 'rgba(255,255,255,0.15)';
            strokeWidth = '0.8';
            textFill = 'rgba(255,255,255,0.45)';
          }

          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              {/* Pulse animation for active E-node */}
              {isENode && (
                <circle
                  r="9.0"
                  fill="none"
                  stroke="#0071e3"
                  strokeWidth="1.0"
                  opacity="0.7"
                  className="animate-ping"
                />
              )}

              {/* Main Node Circle */}
              <circle
                r="6.0"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                className="transition-all duration-300"
              />

              {/* Bound estimate badge above */}
              <text
                y="-9.5"
                fill={
                  isOptimal ? '#34c759' : 
                  isPruned ? '#ff3b30' : 
                  isENode ? '#60a5fa' : 
                  isLive ? '#f59e0b' : 
                  isUnvisited ? 'rgba(255,255,255,0.4)' :
                  'rgba(255,255,255,0.75)'
                }
                fontSize="5.0"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                b={node.bound}
              </text>

              {/* Label below */}
              <text
                y="13.5"
                fill={textFill}
                fontSize="5.2"
                fontWeight="700"
                fontFamily="-apple-system, sans-serif"
                textAnchor="middle"
              >
                {node.label}
              </text>

              {/* Status pill under label */}
              {isPruned && (
                <g transform="translate(0, 20.5)">
                  <rect x="-10.0" y="-3.2" width="20.0" height="6.4" rx="1.4" fill="#ff3b30" />
                  <text y="1.5" fill="#ffffff" fontSize="3.8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    PRUNED
                  </text>
                </g>
              )}
              {isENode && (
                <g transform="translate(0, 20.5)">
                  <rect x="-9.5" y="-3.2" width="19.0" height="6.4" rx="1.4" fill="#0071e3" />
                  <text y="1.5" fill="#ffffff" fontSize="3.8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    E-NODE
                  </text>
                </g>
              )}
              {isOptimal && (
                <g transform="translate(0, 20.5)">
                  <rect x="-10.5" y="-3.2" width="21.0" height="6.4" rx="1.4" fill="#34c759" />
                  <text y="1.5" fill="#ffffff" fontSize="3.8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    OPTIMAL
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
