import React, { useState } from 'react';
import { Terminal, FileCode } from 'lucide-react';

export const Experiential: React.FC = () => {
  const [activeFile, setActiveFile] = useState('index.tsx');

  const filesContent: Record<string, string> = {
    'index.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import { DashboardCockpit } from './DashboardCockpit';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <DashboardCockpit />
  </React.StrictMode>
);`,
    'DashboardCockpit.tsx': `import React, { useState } from 'react';
import { ArrowUpRight, Shield } from 'lucide-react';

export const DashboardCockpit: React.FC = () => {
  const [activeGlow, setActiveGlow] = useState(true);
  
  return (
    <div className="p-8 bg-zinc-950 rounded-3xl border border-zinc-800">
      <h3 className="text-white text-lg font-bold">Cuvasol Sandbox</h3>
      <p className="text-zinc-500 text-xs">Verify your code compiled in real time.</p>
    </div>
  );
};`,
    'styles.css': `@import "tailwindcss";

.glassmorphism {
  background: rgba(9, 9, 11, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(63, 63, 70, 0.3);
}`
  };

  return (
    <div className="space-y-24 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header */}
      <section className="text-center space-y-6 pt-8">
        <span className="inline-flex px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          Direct Work Simulation
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-gradient-primary tracking-tight">
          Learn by Building. Not Watching.
        </h1>
        <p className="text-zinc-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Traditional engineering learning consists of passive video clips. Cuvasol's experiential workspace drops you directly into active project backlogs where you check out branches, submit PR logs, and run browser test suites.
        </p>
      </section>

      {/* 2. Interactive IDE Replica Panel */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white font-heading tracking-tight">Immersive Sandbox Preview</h2>
          <p className="text-zinc-400 text-xs">Try selecting different file explorer items to view sandbox compiler states.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-w-5xl mx-auto isometric-screen-3d float-gravity-3d">
          {/* Col 1: File Explorer (Sidebar) */}
          <div className="lg:col-span-3 bg-zinc-900 border-r border-zinc-850 p-4 font-mono text-xs space-y-4">
            <div className="text-zinc-500 font-semibold uppercase tracking-widest text-[9px] pb-2 border-b border-zinc-850">
              Workspace Files
            </div>
            <div className="space-y-1">
              {Object.keys(filesContent).map(fileName => (
                <button
                  key={fileName}
                  onClick={() => setActiveFile(fileName)}
                  className={`w-full flex items-center space-x-2 px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                    activeFile === fileName 
                      ? 'bg-zinc-800 text-white border-l-2 border-indigo-500' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  <FileCode className="h-4 w-4 text-zinc-550 shrink-0" />
                  <span className="truncate">{fileName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Col 2: Code Editor (Middle) */}
          <div className="lg:col-span-6 bg-zinc-950 p-6 font-mono text-xs flex flex-col justify-between min-h-[350px]">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-900 mb-4">
              <span className="text-[10px] text-zinc-450 uppercase font-semibold">TypeScript Code Editor</span>
              <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">AUTO-COMPILING</span>
            </div>
            
            <pre className="text-zinc-300 leading-relaxed overflow-x-auto select-all whitespace-pre flex-grow">
              <code>{filesContent[activeFile]}</code>
            </pre>

            <div className="mt-4 pt-4 border-t border-zinc-900 text-zinc-500 text-[10px] flex justify-between">
              <span>Lines: {filesContent[activeFile].split('\n').length}</span>
              <span>UTF-8</span>
            </div>
          </div>

          {/* Col 3: Browser Preview & Terminal (Right) */}
          <div className="lg:col-span-3 bg-zinc-900 border-l border-zinc-850 flex flex-col justify-between h-full font-mono text-[11px]">
            {/* Top Preview */}
            <div className="p-4 space-y-4">
              <div className="text-zinc-500 font-semibold uppercase tracking-widest text-[9px] pb-2 border-b border-zinc-850">
                Interactive Preview
              </div>
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-center space-y-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 mx-auto animate-ping" />
                <h4 className="text-xs font-semibold text-white">App Compiles</h4>
                <p className="text-[9px] text-zinc-455">Dashboard components rendering properly.</p>
              </div>
            </div>

            {/* Bottom Terminal */}
            <div className="bg-zinc-950 border-t border-zinc-850 p-4 text-[10px] space-y-2.5">
              <div className="flex items-center space-x-1.5 text-zinc-500">
                <Terminal className="h-3.5 w-3.5" />
                <span>Compiler Terminal Logs</span>
              </div>
              <div className="space-y-1 text-zinc-455">
                <p className="text-zinc-300">$ npm run test</p>
                <p className="text-emerald-450">PASS: src/DashboardCockpit.test.tsx (2.1s)</p>
                <p className="text-zinc-500">Done in 2.65 seconds.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Steps Details */}
      <section className="max-w-4xl mx-auto space-y-12">
        <h2 className="text-2xl font-bold text-white font-heading text-center tracking-tight">The Experiential Pipeline</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase font-mono">01. Setup Branch</span>
            <h4 className="text-sm font-semibold text-white font-heading">Accept Backlog Tickets</h4>
            <p className="text-zinc-450 text-xs leading-relaxed">
              Log in to checkout assignments. Read client feature specs, bug logs, and API routes needed to complete tasks.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold text-cyan-400 uppercase font-mono">02. Write and Refactor</span>
            <h4 className="text-sm font-semibold text-white font-heading">Resolve Sandboxed Checks</h4>
            <p className="text-zinc-455 text-xs leading-relaxed">
              Submit code. Our compiler automatically tests routing conditions, styling targets, and logic functions in real-time.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold text-purple-400 uppercase font-mono">03. Code Review Cycles</span>
            <h4 className="text-sm font-semibold text-white font-heading">Merge & Verify Portfolio</h4>
            <p className="text-zinc-455 text-xs leading-relaxed">
              Address automated PR audit logs. Once merged, your sandbox score rises, boosting your ranking in recruiter matches.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
