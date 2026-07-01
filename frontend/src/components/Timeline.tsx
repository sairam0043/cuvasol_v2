import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  stage: string;
  title: string;
  description: string;
  details: string[];
  duration: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative border-l border-zinc-800 ml-4 md:ml-32 space-y-12">
      {items.map((item, idx) => {
        return (
          <div key={idx} className="relative pl-8 md:pl-12 group">
            {/* Timeline Dot with Glow */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-indigo-500 group-hover:border-cyan-400 group-hover:scale-125 transition-all duration-350 z-10">
              <span className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping group-hover:bg-cyan-455/30" />
            </div>

            {/* Left Offset Time Stamp (Visible on MD and up) */}
            <div className="hidden md:block absolute -left-36 top-1 w-24 text-right">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">{item.duration}</span>
              <p className="text-[10px] text-zinc-500 font-medium">Stage {item.stage}</p>
            </div>

            {/* Mobile Time Stamp Info */}
            <div className="md:hidden flex items-center space-x-2 mb-1">
              <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest">{item.duration}</span>
              <span className="text-zinc-650">•</span>
              <span className="text-[10px] text-zinc-500">Stage {item.stage}</span>
            </div>

            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glassmorphism-light rounded-2xl p-6 md:p-8 border border-zinc-900 glow-card transition-all"
            >
              <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-indigo-300 transition-colors font-heading">
                {item.title}
              </h3>
              <p className="text-zinc-400 text-sm mt-1.5 leading-relaxed">
                {item.description}
              </p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {item.details.map((detail, dIdx) => (
                  <span 
                    key={dIdx} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300"
                  >
                    {detail}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
