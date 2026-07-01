import React from 'react';
import { motion } from 'framer-motion';
import { Tilt3D } from './Tilt3D.js';

interface BentoItem {
  title: string;
  description: string;
  className?: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bgElement?: React.ReactNode;
}

interface BentoGridProps {
  items: BentoItem[];
}

export const BentoGrid: React.FC<BentoGridProps> = ({ items }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      className="perspective-container-3d grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]"
    >
      {items.map((item, index) => {
        const Icon = item.icon;
        
        const glowColors: Record<string, string> = {
          indigo: 'group-hover:shadow-[0_0_30px_-5px_var(--primary)] group-hover:border-brand-primary/30',
          cyan: 'group-hover:shadow-[0_0_30px_-5px_var(--secondary)] group-hover:border-brand-secondary/30',
          purple: 'group-hover:shadow-[0_0_30px_-5px_var(--accent)] group-hover:border-brand-accent/30',
          emerald: 'group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.1)] group-hover:border-emerald-500/30',
        };

        const iconBgColors: Record<string, string> = {
          indigo: 'bg-brand-primary/10 text-brand-primary border-brand-primary/20',
          cyan: 'bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20',
          purple: 'bg-brand-accent/10 text-brand-accent border-brand-accent/20',
          emerald: 'bg-emerald-500/10 text-emerald-650 border-emerald-500/20',
        };

        const glow = glowColors[item.accentColor] || glowColors.indigo;
        const iconStyle = iconBgColors[item.accentColor] || iconBgColors.indigo;

        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`h-full ${item.className || ''}`}
          >
            <Tilt3D 
              className={`glow-card glassmorphism-light rounded-3xl p-8 flex flex-col justify-between relative group overflow-hidden border border-zinc-800 shadow-3d-rich h-full ${glow}`}
              maxTilt={8}
            >
              {/* Background element */}
              {item.bgElement && (
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                  {item.bgElement}
                </div>
              )}

              {/* Top row with 3D Float icon */}
              <div className="relative z-10 flex justify-between items-start tilt-inner-float">
                <div className={`p-3 rounded-2xl border ${iconStyle} transition-transform duration-350`}>
                  <Icon className="h-6 w-6" />
                </div>
                {item.badge && (
                  <span className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full ${iconStyle}`}>
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Bottom details with 3D tilt adjustments */}
              <div className="relative z-10 space-y-2 mt-auto tilt-inner-float">
                <h3 className="text-lg font-heading font-semibold text-white tracking-tight group-hover:text-indigo-650 transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            </Tilt3D>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
export default BentoGrid;
