import React, { useState } from 'react';
import { useTheme, THEMES, ThemeName } from '../context/ThemeContext.js';
import { Palette, X, Sparkles } from 'lucide-react';

export const ThemeChooser: React.FC = () => {
  const { activeTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeList = Object.values(THEMES);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3.5 bg-brand-primary text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform cursor-pointer border border-white/20 flex items-center justify-center relative group"
        title="Choose Theme"
        aria-label="Theme Chooser Button"
      >
        {isOpen ? <X className="h-5.5 w-5.5" /> : <Palette className="h-5.5 w-5.5" />}
        <span className="absolute right-14 bg-zinc-900 border border-zinc-800 text-white text-[10px] font-semibold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
          Choose Theme (20 Options)
        </span>
      </button>

      {/* Themes Dropdown Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 max-h-[460px] glassmorphism rounded-2xl shadow-3d-rich p-5 flex flex-col space-y-4 border border-zinc-800 animate-fade-in overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center pb-2.5 border-b border-zinc-800/60 shrink-0">
            <div className="flex items-center space-x-1.5">
              <Sparkles className="h-4 w-4 text-brand-primary animate-pulse-slow" />
              <h4 className="font-heading font-bold text-white text-sm">Theme Selection Cockpit</h4>
            </div>
            <span className="text-[9px] font-mono uppercase bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded border border-brand-primary/20">
              20 Presets
            </span>
          </div>

          {/* Grid Selection list */}
          <div className="flex-grow overflow-y-auto pr-1 space-y-2 select-none scrollbar-thin">
            <div className="grid grid-cols-2 gap-2">
              {themeList.map((t) => {
                const isActive = t.name === activeTheme;
                const colors = t.colors;
                
                return (
                  <button
                    key={t.name}
                    onClick={() => setTheme(t.name as ThemeName)}
                    className={`flex items-center space-x-2.5 p-2 rounded-xl border text-[11px] font-medium text-left transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-brand-primary/10 border-brand-primary text-white shadow-sm' 
                        : 'bg-zinc-850/50 hover:bg-zinc-800/80 border-zinc-800/50 hover:border-zinc-800 text-zinc-500 hover:text-white'
                    }`}
                  >
                    {/* Color dot preview */}
                    <div className="flex space-x-0.5 shrink-0">
                      <span 
                        style={{ backgroundColor: colors.primary }} 
                        className="w-2.5 h-2.5 rounded-full border border-black/10" 
                      />
                      <span 
                        style={{ backgroundColor: colors.secondary }} 
                        className="w-2.5 h-2.5 rounded-full border border-black/10" 
                      />
                      <span 
                        style={{ backgroundColor: colors.bgMain }} 
                        className="w-2.5 h-2.5 rounded-full border border-black/10" 
                      />
                    </div>
                    <span className="truncate max-w-[80px]">{t.displayName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ThemeChooser;
