import React from 'react';

export default function HospitalGraphVisualizer({ stepData, graphData }) {
  const { 
    activeNodes = [], 
    activeEdges = [], 
    prunedNodes = [], 
    prunedEdges = [],
    unexploredEdges = [],
    secondaryEdges = [], 
    optimalEdges = [],
    selectedNode = null
  } = stepData;

  const getNode = (id) => graphData.nodes.find((n) => n.id === id);

  return (
    <div className="relative w-full aspect-[650/660] flex items-center justify-center p-2 bg-black/60 rounded-2xl border border-white/10 overflow-hidden shadow-inner">
      <svg viewBox="0 0 200 245" className="w-full h-full overflow-visible select-none">
        
        <defs>
          <linearGradient id="optGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34c759" />
            <stop offset="100%" stopColor="#30d158" />
          </linearGradient>
          <linearGradient id="pruneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff453a" />
            <stop offset="100%" stopColor="#ff3b30" />
          </linearGradient>
          <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0071e3" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>

        {/* --- EDGES --- */}
        {graphData.edges.map((edge) => {
          const fromNode = getNode(edge.from);
          const toNode = getNode(edge.to);
          if (!fromNode || !toNode) return null;

          const isOptimal = optimalEdges.includes(edge.id);
          const isPruned = prunedEdges.includes(edge.id);
          const isActive = activeEdges.includes(edge.id);
          const isSecondary = secondaryEdges.includes(edge.id);
          const isUnexplored = unexploredEdges ? unexploredEdges.includes(edge.id) : (edge.unvisited && stepData.step >= 6);

          let stroke = 'rgba(255, 255, 255, 0.3)';
          let strokeWidth = '1.4';
          let dash = 'none';
          let opacity = '0.8';

          if (isOptimal) {
            stroke = '#34c759';
            strokeWidth = '2.4';
            opacity = '1';
          } else if (isPruned) {
            stroke = '#ff3b30';
            strokeWidth = '1.8';
            dash = '3 3';
            opacity = '1';
          } else if (isActive) {
            stroke = '#60a5fa';
            strokeWidth = '2.2';
            opacity = '1';
          } else if (isSecondary) {
            stroke = '#0071e3';
            strokeWidth = '1.6';
            dash = '3 2';
            opacity = '0.85';
          } else if (isUnexplored) {
            stroke = 'rgba(255, 59, 48, 0.5)';
            strokeWidth = '1.2';
            dash = '2.5 2.5';
            opacity = '0.5';
          }

          // Edge midpoint for label badge
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;

          return (
            <g key={edge.id}>
              {/* Edge Line */}
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={dash}
                opacity={opacity}
                className="transition-all duration-300"
              />

              {/* Edge Distance Label Badge */}
              <g transform={`translate(${midX}, ${midY})`}>
                <rect
                  x="-10.5"
                  y="-4.8"
                  width="21.0"
                  height="9.6"
                  rx="2.2"
                  fill="#060608"
                  stroke={stroke}
                  strokeWidth="0.8"
                  opacity={isUnexplored ? 0.75 : 0.98}
                />
                <text
                  y="1.8"
                  fill={
                    isOptimal ? '#34c759' : 
                    isPruned ? '#ff4d4f' : 
                    isActive ? '#60a5fa' : 
                    isUnexplored ? 'rgba(255,120,120,0.85)' :
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

              {/* Unexplored marker on Ward-C -> Lab edge */}
              {isUnexplored && (
                <g transform={`translate(${midX + 15}, ${midY + 1})`}>
                  <rect x="-1" y="-4.0" width="30" height="7.5" rx="1.8" fill="#2a090b" stroke="#ff3b30" strokeWidth="0.7" />
                  <text y="1.2" fill="#ff453a" fontSize="3.8" fontFamily="monospace" fontWeight="bold">
                    UNEXPLORED
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* --- NODES --- */}
        {graphData.nodes.map((node) => {
          const isSelected = selectedNode === node.id;
          const isActive = activeNodes.includes(node.id);
          const isPruned = prunedNodes.includes(node.id);
          
          let fill = '#121215';
          let stroke = 'rgba(255, 255, 255, 0.4)';
          let strokeWidth = '1.2';
          let textFill = '#ffffff';

          if (isSelected) {
            fill = '#0071e3';
            stroke = '#93c5fd';
            strokeWidth = '2.2';
            textFill = '#ffffff';
          } else if (isPruned) {
            fill = '#2a090b';
            stroke = '#ff3b30';
            strokeWidth = '1.8';
            textFill = '#f87171';
          } else if (isActive) {
            fill = '#06203a';
            stroke = '#3b82f6';
            strokeWidth = '1.8';
            textFill = '#93c5fd';
          } else if (node.type === 'lab' && stepData.step >= 7 && node.id === 'lab_icu') {
            fill = '#062810';
            stroke = '#34c759';
            strokeWidth = '2.2';
            textFill = '#4ade80';
          }

          const isMainLab = node.id === 'lab_icu' && (stepData.step === 4 || stepData.step === 7);

          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              
              {/* Pulse animation for selected node */}
              {isSelected && (
                <circle
                  r="9.0"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="1.0"
                  opacity="0.7"
                  className="animate-ping"
                />
              )}

              {/* Node Circle */}
              <circle
                r="6.0"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                className="transition-all duration-300"
              />

              {/* Node Icon / Symbol inside */}
              {node.id === 'hospital' && (
                <text y="2.0" fontSize="4.8" textAnchor="middle">🏥</text>
              )}
              {node.type === 'lab' && (
                <text y="2.0" fontSize="4.4" textAnchor="middle">🔬</text>
              )}

              {/* Label ABOVE node circle with generous clearance */}
              <text
                y="-9.5"
                fill={isPruned ? '#ff4d4f' : isSelected ? '#93c5fd' : isMainLab ? '#34c759' : textFill}
                fontSize="5.6"
                fontWeight="800"
                fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                textAnchor="middle"
              >
                {node.label}
              </text>

              {/* Subtitle / Note BELOW node circle */}
              <text
                y="13.5"
                fill={isPruned ? '#f87171' : 'rgba(255, 255, 255, 0.85)'}
                fontSize="4.4"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                {node.sub}
              </text>

              {/* Status Badges BELOW subtitle */}
              {isPruned && (
                <g transform="translate(0, 20.5)">
                  <rect x="-10.0" y="-3.2" width="20.0" height="6.4" rx="1.4" fill="#ff3b30" />
                  <text y="1.5" fill="#ffffff" fontSize="3.8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    ✕ PRUNED
                  </text>
                </g>
              )}

              {isSelected && (
                <g transform="translate(0, 20.5)">
                  <rect x="-9.5" y="-3.2" width="19.0" height="6.4" rx="1.4" fill="#0071e3" />
                  <text y="1.5" fill="#ffffff" fontSize="3.8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    E-NODE
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
