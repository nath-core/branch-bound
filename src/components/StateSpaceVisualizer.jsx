import React from 'react';

const MASTER_NODES = [
  { id: "root", label: "Warehouse", bound: 10, x: 135, y: 22 },
  
  // Level 1
  { id: "campus", label: "Campus", bound: 18, x: 50, y: 62 },
  { id: "hospital", label: "Hospital", bound: 11, x: 185, y: 62 },

  // Level 2
  { id: "library", label: "Library", bound: 38, x: 50, y: 102 },
  { id: "mall", label: "Mall", bound: 26, x: 135, y: 102 },
  { id: "airport", label: "Airport", bound: 36, x: 220, y: 102 },

  // Level 3
  { id: "techpark_campus", label: "Tech Park", bound: 53, x: 50, y: 142 },
  { id: "bus_terminal", label: "Bus Terminal", bound: 46, x: 135, y: 142 },
  { id: "cargo", label: "Cargo", bound: 56, x: 220, y: 142 },

  // Level 4
  { id: "techpark_mall", label: "Tech Park", bound: 61, x: 135, y: 182 },
  { id: "techpark_cargo", label: "Tech Park", bound: 71, x: 220, y: 182 }
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
  // Keep master x and y coordinates so tree structure is fixed across steps
  const allNodes = MASTER_NODES.map((master) => {
    const stepNode = tree.nodes.find((n) => n.id === master.id);
    return stepNode 
      ? { ...master, ...stepNode, x: master.x, y: master.y } 
      : { ...master, status: "unvisited" };
  });

  const allEdges = MASTER_EDGES.map((master) => {
    const stepEdge = tree.edges.find((e) => e.from === master.from && e.to === master.to);
    return stepEdge 
      ? { ...master, ...stepEdge } 
      : { ...master, label: master.defaultLabel, unvisited: true };
  });

  const getNode = (id) => allNodes.find((n) => n.id === id);

  return (
    <div className="relative w-full aspect-[270/216] flex items-center justify-center p-2 bg-black/50 rounded-2xl border border-white/10 overflow-hidden shadow-inner">
      <svg viewBox="0 0 270 216" className="w-full h-full select-none">
        
        {/* Draw Edges */}
        {allEdges.map((edge, idx) => {
          const from = getNode(edge.from);
          const to = getNode(edge.to);
          if (!from || !to) return null;

          const isOptimal = edge.optimal;
          const isPruned = edge.pruned;
          const isActive = edge.active;
          const isUnvisited = edge.unvisited;

          let stroke = 'rgba(255, 255, 255, 0.28)';
          let strokeWidth = '1.2';
          let dash = 'none';

          if (isOptimal) {
            stroke = '#34c759';
            strokeWidth = '2.2';
          } else if (isPruned) {
            stroke = '#ff3b30';
            strokeWidth = '1.6';
            dash = '2.5 2.5';
          } else if (isActive) {
            stroke = '#0071e3';
            strokeWidth = '2.0';
          } else if (isUnvisited) {
            stroke = 'rgba(255, 255, 255, 0.12)';
            strokeWidth = '0.8';
            dash = '2 2';
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
                    x="-10"
                    y="-4.5"
                    width="20"
                    height="9.0"
                    rx="2.0"
                    fill="#0a0a0c"
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
                    fontSize="4.2"
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
          let stroke = 'rgba(255,255,255,0.35)';
          let strokeWidth = '1.0';
          let textFill = '#ffffff';

          if (isENode) {
            fill = '#0071e3';
            stroke = '#60a5fa';
            strokeWidth = '1.8';
          } else if (isLive) {
            fill = '#2a1b02';
            stroke = '#f59e0b';
            strokeWidth = '1.4';
            textFill = '#fbbf24';
          } else if (isPruned) {
            fill = '#22080a';
            stroke = '#ff3b30';
            strokeWidth = '1.2';
            textFill = '#f87171';
          } else if (isOptimal || isSolution) {
            fill = '#062810';
            stroke = '#34c759';
            strokeWidth = '1.8';
            textFill = '#4ade80';
          } else if (isDead) {
            fill = '#1f1f23';
            stroke = 'rgba(255,255,255,0.25)';
            textFill = 'rgba(255,255,255,0.7)';
          } else if (isUnvisited) {
            fill = '#0c0c0e';
            stroke = 'rgba(255,255,255,0.15)';
            strokeWidth = '0.7';
            textFill = 'rgba(255,255,255,0.45)';
          }

          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              {/* Pulse animation for active E-node */}
              {isENode && (
                <circle
                  r="8.5"
                  fill="none"
                  stroke="#0071e3"
                  strokeWidth="1.0"
                  opacity="0.65"
                  className="animate-ping"
                />
              )}

              {/* Main Node Circle */}
              <circle
                r="5.5"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                className="transition-all duration-300"
              />

              {/* Bound estimate badge above */}
              <text
                y="-8.5"
                fill={
                  isOptimal ? '#34c759' : 
                  isPruned ? '#ff3b30' : 
                  isENode ? '#60a5fa' : 
                  isLive ? '#f59e0b' : 
                  isUnvisited ? 'rgba(255,255,255,0.4)' :
                  'rgba(255,255,255,0.75)'
                }
                fontSize="4.4"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                b={node.bound}
              </text>

              {/* Label below */}
              <text
                y="11.5"
                fill={textFill}
                fontSize="4.6"
                fontWeight="700"
                fontFamily="-apple-system, sans-serif"
                textAnchor="middle"
              >
                {node.label}
              </text>

              {/* Status pill under label */}
              {isPruned && (
                <g transform="translate(0, 17.5)">
                  <rect x="-9.0" y="-2.8" width="18.0" height="5.6" rx="1.2" fill="#ff3b30" />
                  <text y="1.4" fill="#ffffff" fontSize="3.2" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    PRUNED
                  </text>
                </g>
              )}
              {isENode && (
                <g transform="translate(0, 17.5)">
                  <rect x="-8.5" y="-2.8" width="17.0" height="5.6" rx="1.2" fill="#0071e3" />
                  <text y="1.4" fill="#ffffff" fontSize="3.2" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    E-NODE
                  </text>
                </g>
              )}
              {(isOptimal || isSolution) && (
                <g transform="translate(0, 17.5)">
                  <rect x="-9.5" y="-2.8" width="19.0" height="5.6" rx="1.2" fill="#34c759" />
                  <text y="1.4" fill="#ffffff" fontSize="3.2" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    {isOptimal ? "OPTIMAL" : "SOLUTION"}
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

