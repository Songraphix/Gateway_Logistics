import React from 'react';
import { Globe, Ship, Plane, Truck, MapPin, CheckCircle2 } from 'lucide-react';

export default function NetworkGraphic() {
  const nodes = [
    { id: 1, icon: MapPin, label: 'Freetown HQ', x: '15%', y: '30%', color: 'border-brand-cyan text-brand-cyan' },
    { id: 2, icon: Plane, label: 'Lungi Cargo Hub', x: '35%', y: '20%', color: 'border-brand-cyan text-brand-cyan' },
    { id: 3, icon: Ship, label: 'Maritime Transit', x: '25%', y: '65%', color: 'border-brand-cyan text-brand-cyan' },
    { id: 4, icon: Truck, label: 'Inland Haulage', x: '65%', y: '75%', color: 'border-brand-gold text-brand-gold' },
    { id: 5, icon: Globe, label: 'Global Corridor', x: '85%', y: '35%', color: 'border-brand-cyan text-brand-cyan' },
    { id: 6, icon: CheckCircle2, label: 'Safe Delivery', x: '75%', y: '15%', color: 'border-brand-gold text-brand-gold' },
  ];

  const [activeNodeId, setActiveNodeId] = React.useState<number | null>(null);

  React.useEffect(() => {
    const handleOutsideClick = () => {
      setActiveNodeId(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div id="network-graphic-container" className="relative w-full overflow-hidden bg-gradient-to-b from-white via-sky-50/50 to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 py-20 text-slate-800 dark:text-slate-100">
      {/* Absolute grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      {/* Decorative ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-brand-gold/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Text panel */}
          <div id="network-info-panel" className="lg:col-span-5 space-y-6">
            <span className="text-xs font-black uppercase tracking-widest text-brand-cyan block">
              CONNECTING AFRICA & THE WORLD
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white md:text-4xl leading-tight">
              Sierra Leone's Preeminent <span className="text-brand-cyan">Operations Core</span>
            </h2>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-300 font-medium">
              Gateway Logistics integrates critical marine pipelines, time-sensitive air cargo charters, and specialized heavy hauling networks. Our infrastructure maintains persistent synchronization with global transport nodes to ensure direct deliveries for major mining operations.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 border border-slate-200/65 dark:border-white/10 rounded-2xl p-3.5 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-ping" />
                <span className="font-mono text-[10px] font-bold text-slate-700 dark:text-slate-200 uppercase">GPS Sync Live</span>
              </div>
              <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 border border-slate-200/65 dark:border-white/10 rounded-2xl p-3.5 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse" />
                <span className="font-mono text-[10px] font-bold text-slate-700 dark:text-slate-200 uppercase">Zero-Harm HSE</span>
              </div>
            </div>
          </div>

          {/* Interactive visual canvas representation */}
          <div id="network-visual-panel" className="relative lg:col-span-7 h-[380px] bg-white/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl backdrop-blur-md">
            
            {/* Center Master Pulsing Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10">
              <div className="relative">
                {/* Expanding pulse rings */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-gold/20 animate-ping" />
                <span className="absolute inline-flex h-20 w-20 -left-3 -top-3 rounded-full bg-brand-cyan/10 animate-pulse" />
                
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-navy text-white font-black shadow-lg border border-brand-cyan/20">
                  <span className="font-display text-sm tracking-tighter">GWY</span>
                </div>
              </div>
              <span className="mt-2.5 text-[9px] font-mono tracking-widest uppercase text-brand-navy dark:text-brand-gold font-bold">
                Operations Node
              </span>
            </div>

            {/* Glowing Connecting SVG Vector Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Line 1 */}
              <line x1="15%" y1="30%" x2="50%" y2="50%" stroke="rgba(0,144,216,0.18)" strokeWidth="1.5" strokeDasharray="5,5" />
              {/* Line 2 */}
              <line x1="35%" y1="20%" x2="50%" y2="50%" stroke="rgba(0,144,216,0.22)" strokeWidth="2" />
              {/* Line 3 */}
              <line x1="25%" y1="65%" x2="50%" y2="50%" stroke="rgba(0,144,216,0.18)" strokeWidth="1.5" />
              {/* Line 4 */}
              <line x1="65%" y1="75%" x2="50%" y2="50%" stroke="rgba(212,175,55,0.22)" strokeWidth="2" />
              {/* Line 5 */}
              <line x1="85%" y1="35%" x2="50%" y2="50%" stroke="rgba(0,144,216,0.18)" strokeWidth="1.5" strokeDasharray="4,4" />
              {/* Line 6 */}
              <line x1="75%" y1="15%" x2="50%" y2="50%" stroke="rgba(212,175,55,0.18)" strokeWidth="1.5" />

              {/* Animated pulses moving down the lines */}
              <circle r="4.5" fill="#D4AF37" className="animate-[pulse_2s_infinite]">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 15 30 L 50 50" />
              </circle>
              <circle r="4.5" fill="#0090D8" className="animate-[pulse_2.5s_infinite]">
                <animateMotion dur="5.5s" repeatCount="indefinite" path="M 35 20 L 50 50" />
              </circle>
              <circle r="3.5" fill="#0090D8">
                <animateMotion dur="6s" repeatCount="indefinite" path="M 85 35 L 50 50" />
              </circle>
              <circle r="5" fill="#D4AF37" className="animate-[pulse_3s_infinite]">
                <animateMotion dur="4.5s" repeatCount="indefinite" path="M 65 75 L 50 50" />
              </circle>
            </svg>

            {/* Render Nodes */}
            {nodes.map((node) => (
              <div
                key={node.id}
                className="absolute flex flex-col items-center group pointer-events-auto cursor-pointer"
                style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveNodeId(activeNodeId === node.id ? null : node.id);
                }}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border bg-white dark:bg-slate-900 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:border-brand-gold dark:border-white/10 ${node.color} ${activeNodeId === node.id ? 'scale-110 border-brand-gold ring-4 ring-brand-gold/25' : ''}`}>
                  <node.icon className="h-5 w-5" />
                </div>
                
                {/* Node Label Popover */}
                <div className={`mt-1.5 transition-all duration-200 pointer-events-none bg-brand-navy text-[9px] font-mono tracking-wider uppercase text-white px-2.5 py-1 rounded-lg border border-slate-100 dark:border-white/10 whitespace-nowrap shadow-lg ${activeNodeId === node.id ? 'scale-100 opacity-100' : 'scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`}>
                  {node.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
