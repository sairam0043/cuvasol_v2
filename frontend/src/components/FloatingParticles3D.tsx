import React, { useMemo } from 'react';
import { 
  BrainCircuit, GraduationCap, BookOpen, Code2, 
  Database, Sparkles, Terminal, Cpu 
} from 'lucide-react';

const PARTICLE_TEMPLATES = [
  { Icon: BrainCircuit, color: 'text-brand-primary/25' },
  { Icon: GraduationCap, color: 'text-brand-primary/25' },
  { Icon: Code2, color: 'text-brand-secondary/25' },
  { Icon: BookOpen, color: 'text-brand-accent/25' },
  { Icon: Database, color: 'text-brand-secondary/25' },
  { Icon: Sparkles, color: 'text-amber-500/28' },
  { Icon: Terminal, color: 'text-brand-primary/25' },
  { Icon: Cpu, color: 'text-brand-accent/25' },
];

const SPEED_CLASSES = ['animate-float-slow', 'animate-float-medium', 'animate-float-fast'];

export const FloatingParticles3D: React.FC = () => {
  // Memoize constellation grid using absolute viewport height (vh) coordinates
  const particles = useMemo(() => {
    const list = [];
    const count = 35; // Maximum particle capacity for very long pages
    
    for (let i = 0; i < count; i++) {
      const template = PARTICLE_TEMPLATES[i % PARTICLE_TEMPLATES.length];
      const speed = SPEED_CLASSES[i % SPEED_CLASSES.length];
      
      // Vertical position locked to constant Viewport Height intervals (13vh ~100px gap)
      // This guarantees the vertical gap between particles never changes, even on short pages.
      const topVal = 5 + i * 13;
      const top = `${topVal}vh`;
      
      // Horizontal column placement (0 to 5) alternating across the screen width (3% to 93%)
      const col = i % 6;
      const staggerX = (i % 2) * 5; // Slight stagger to avoid rigid grid alignment
      const leftVal = 3 + col * 16.5 + staggerX;
      const left = `${leftVal}%`;
      
      const size = 22 + (i % 3) * 5; // 22px, 27px, 32px
      const depth = `${-80 + (i % 4) * 45}px`; // -80px, -35px, 10px, 55px

      list.push({
        ...template,
        size,
        speed,
        left,
        top,
        depth,
      });
    }
    return list;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((item, index) => {
        const IconComponent = item.Icon;
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: item.left,
              top: item.top,
              transform: `translateZ(${item.depth})`,
              transformStyle: 'preserve-3d',
            }}
            className="select-none filter drop-shadow-[0_1px_4px_rgba(99,102,241,0.03)]"
          >
            <div className={item.speed}>
              <IconComponent size={item.size} strokeWidth={1.15} className={item.color} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default FloatingParticles3D;
