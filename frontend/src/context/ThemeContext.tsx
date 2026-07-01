import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  bgMain: string;
  bgCard: string;
  borderColor: string;
  textMain: string;
  textMuted: string;
  isDark: boolean;
}

export type ThemeName =
  | 'default-light'
  | 'default-dark'
  | 'cyberpunk'
  | 'nord'
  | 'solarized-light'
  | 'solarized-dark'
  | 'forest'
  | 'ocean'
  | 'sunset'
  | 'lavender'
  | 'minimalist'
  | 'rose-gold'
  | 'retro-terminal'
  | 'dracula'
  | 'emerald'
  | 'ruby'
  | 'slate'
  | 'luxury-gold'
  | 'mint'
  | 'coffee';

export interface ThemeConfig {
  name: string;
  displayName: string;
  colors: ThemeColors;
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  'default-light': {
    name: 'default-light',
    displayName: 'Default Light',
    colors: {
      primary: '#4f46e5', // Indigo
      secondary: '#0891b2', // Cyan
      accent: '#7c3aed', // Purple
      bgMain: '#f8fafc', // slate-50
      bgCard: '#ffffff', // White
      borderColor: '#e2e8f0', // slate-200
      textMain: '#0f172a', // slate-900
      textMuted: '#475569', // slate-600
      isDark: false
    }
  },
  'default-dark': {
    name: 'default-dark',
    displayName: 'Default Dark',
    colors: {
      primary: '#818cf8',
      secondary: '#22d3ee',
      accent: '#a78bfa',
      bgMain: '#090d16', // midnight black
      bgCard: '#111827',
      borderColor: '#1f2937',
      textMain: '#f9fafb',
      textMuted: '#9ca3af',
      isDark: true
    }
  },
  'cyberpunk': {
    name: 'cyberpunk',
    displayName: 'Cyberpunk',
    colors: {
      primary: '#ff007f', // Neon pink
      secondary: '#00f0ff', // Neon cyan
      accent: '#e0aaff', // Neon purple
      bgMain: '#0c001a', // Purple black
      bgCard: '#14002e',
      borderColor: 'rgba(255, 0, 127, 0.3)',
      textMain: '#00f0ff',
      textMuted: '#e0aaff',
      isDark: true
    }
  },
  'nord': {
    name: 'nord',
    displayName: 'Nord Arctic',
    colors: {
      primary: '#88c0d0', // Frost Blue
      secondary: '#8fbcbb', // Teal
      accent: '#b48ead', // Purple
      bgMain: '#2e3440',
      bgCard: '#3b4252',
      borderColor: '#4c566a',
      textMain: '#eceff4',
      textMuted: '#d8dee9',
      isDark: true
    }
  },
  'solarized-light': {
    name: 'solarized-light',
    displayName: 'Solarized Light',
    colors: {
      primary: '#b58900', // Yellow gold
      secondary: '#2aa198', // Teal
      accent: '#cb4b16', // Red
      bgMain: '#fdf6e3', // warm cream
      bgCard: '#eee8d5',
      borderColor: 'rgba(147, 161, 161, 0.3)',
      textMain: '#073642',
      textMuted: '#586e75',
      isDark: false
    }
  },
  'solarized-dark': {
    name: 'solarized-dark',
    displayName: 'Solarized Dark',
    colors: {
      primary: '#268bd2', // Blue
      secondary: '#2aa198', // Teal
      accent: '#859900', // Green
      bgMain: '#002b36',
      bgCard: '#073642',
      borderColor: 'rgba(88, 110, 117, 0.3)',
      textMain: '#93a1a1',
      textMuted: '#586e75',
      isDark: true
    }
  },
  'forest': {
    name: 'forest',
    displayName: 'Forest Sage',
    colors: {
      primary: '#10b981', // Emerald
      secondary: '#047857', // Forest
      accent: '#34d399', // Mint
      bgMain: '#f0fdf4',
      bgCard: '#ffffff',
      borderColor: '#d1fae5',
      textMain: '#064e3b',
      textMuted: '#047857',
      isDark: false
    }
  },
  'ocean': {
    name: 'ocean',
    displayName: 'Deep Ocean',
    colors: {
      primary: '#0ea5e9', // Sky blue
      secondary: '#0369a1', // Deep blue
      accent: '#38bdf8', // Light blue
      bgMain: '#f0f9ff',
      bgCard: '#ffffff',
      borderColor: '#e0f2fe',
      textMain: '#0c4a6e',
      textMuted: '#0369a1',
      isDark: false
    }
  },
  'sunset': {
    name: 'sunset',
    displayName: 'Sunset Glow',
    colors: {
      primary: '#f97316', // Orange
      secondary: '#db2777', // Pink
      accent: '#8b5cf6', // Purple
      bgMain: '#1e1b4b', // Deep indigo
      bgCard: '#2e1065',
      borderColor: 'rgba(219, 39, 119, 0.3)',
      textMain: '#fdf2f8',
      textMuted: '#f472b6',
      isDark: true
    }
  },
  'lavender': {
    name: 'lavender',
    displayName: 'Lavender Pastel',
    colors: {
      primary: '#6366f1',
      secondary: '#a78bfa',
      accent: '#ec4899',
      bgMain: '#f5f3ff',
      bgCard: '#ffffff',
      borderColor: '#ddd6fe',
      textMain: '#4c1d95',
      textMuted: '#7c3aed',
      isDark: false
    }
  },
  'minimalist': {
    name: 'minimalist',
    displayName: 'Minimal Stark',
    colors: {
      primary: '#000000',
      secondary: '#3f3f46',
      accent: '#71717a',
      bgMain: '#ffffff',
      bgCard: '#ffffff',
      borderColor: '#18181b', // stark border
      textMain: '#000000',
      textMuted: '#27272a',
      isDark: false
    }
  },
  'rose-gold': {
    name: 'rose-gold',
    displayName: 'Rose Gold',
    colors: {
      primary: '#e0a96d',
      secondary: '#d4a373',
      accent: '#f4e285',
      bgMain: '#fffbf5',
      bgCard: '#ffffff',
      borderColor: '#faedcd',
      textMain: '#5c3d2e',
      textMuted: '#865d36',
      isDark: false
    }
  },
  'retro-terminal': {
    name: 'retro-terminal',
    displayName: 'Retro Terminal',
    colors: {
      primary: '#33ff33', // Phosphor Green
      secondary: '#00ff00',
      accent: '#00cc00',
      bgMain: '#001100',
      bgCard: '#001a00',
      borderColor: 'rgba(51, 255, 51, 0.3)',
      textMain: '#33ff33',
      textMuted: '#00cc00',
      isDark: true
    }
  },
  'dracula': {
    name: 'dracula',
    displayName: 'Dracula Dark',
    colors: {
      primary: '#ff79c6', // Pink
      secondary: '#50fa7b', // Green
      accent: '#bd93f9', // Purple
      bgMain: '#282a36',
      bgCard: '#44475a',
      borderColor: '#6272a4',
      textMain: '#f8f8f2',
      textMuted: '#8be9fd',
      isDark: true
    }
  },
  'emerald': {
    name: 'emerald',
    displayName: 'Emerald Green',
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#6ee7b7',
      bgMain: '#f4fbf7',
      bgCard: '#ffffff',
      borderColor: '#e6f7ef',
      textMain: '#064e3b',
      textMuted: '#047857',
      isDark: false
    }
  },
  'ruby': {
    name: 'ruby',
    displayName: 'Ruby Red',
    colors: {
      primary: '#dc2626',
      secondary: '#ef4444',
      accent: '#fca5a5',
      bgMain: '#fef2f2',
      bgCard: '#ffffff',
      borderColor: '#fee2e2',
      textMain: '#7f1d1d',
      textMuted: '#b91c1c',
      isDark: false
    }
  },
  'slate': {
    name: 'slate',
    displayName: 'Slate Gray',
    colors: {
      primary: '#475569',
      secondary: '#64748b',
      accent: '#94a3b8',
      bgMain: '#f1f5f9',
      bgCard: '#ffffff',
      borderColor: '#e2e8f0',
      textMain: '#0f172a',
      textMuted: '#334155',
      isDark: false
    }
  },
  'luxury-gold': {
    name: 'luxury-gold',
    displayName: 'Luxury Obsidian Gold',
    colors: {
      primary: '#d4af37', // Gold
      secondary: '#aa7c11',
      accent: '#f3e5ab',
      bgMain: '#0d0d0d', // Obsidian
      bgCard: '#141414',
      borderColor: 'rgba(212, 175, 55, 0.3)',
      textMain: '#d4af37',
      textMuted: '#ffffff',
      isDark: true
    }
  },
  'mint': {
    name: 'mint',
    displayName: 'Ocean Mint',
    colors: {
      primary: '#00b4d8',
      secondary: '#48cae4',
      accent: '#90e0ef',
      bgMain: '#f7fdfd',
      bgCard: '#ffffff',
      borderColor: '#caf0f8',
      textMain: '#0077b6',
      textMuted: '#0096c7',
      isDark: false
    }
  },
  'coffee': {
    name: 'coffee',
    displayName: 'Espresso Latte',
    colors: {
      primary: '#8c6239',
      secondary: '#d9b48f',
      accent: '#e6ccb2',
      bgMain: '#fdfaf7',
      bgCard: '#f5ebe0',
      borderColor: '#e6ccb2',
      textMain: '#7f5539',
      textMuted: '#9c6644',
      isDark: false
    }
  }
};

interface ThemeContextType {
  activeTheme: ThemeName;
  setTheme: (name: ThemeName) => void;
  config: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTheme, setActiveThemeState] = useState<ThemeName>('default-light');

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cuvasol_theme_name') as ThemeName;
    if (saved && THEMES[saved]) {
      setActiveThemeState(saved);
    }
  }, []);

  const setTheme = (name: ThemeName) => {
    if (THEMES[name]) {
      setActiveThemeState(name);
      localStorage.setItem('cuvasol_theme_name', name);
    }
  };

  // Write variables to document root element style
  useEffect(() => {
    const current = THEMES[activeTheme].colors;
    const root = document.documentElement;

    root.style.setProperty('--primary', current.primary);
    root.style.setProperty('--secondary', current.secondary);
    root.style.setProperty('--accent', current.accent);
    root.style.setProperty('--bg-main', current.bgMain);
    root.style.setProperty('--bg-card', current.bgCard);
    root.style.setProperty('--border-color', current.borderColor);
    root.style.setProperty('--text-main', current.textMain);
    root.style.setProperty('--text-muted', current.textMuted);
    
    // Toggle standard browser theme tags
    if (current.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setTheme, config: THEMES[activeTheme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
