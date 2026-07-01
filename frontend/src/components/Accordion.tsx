import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = activeIndex === idx;
        return (
          <div 
            key={idx} 
            className="border border-zinc-900 bg-zinc-900/10 hover:bg-zinc-900/30 rounded-2xl overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full flex justify-between items-center px-6 py-5 text-left text-white focus:outline-none cursor-pointer"
            >
              <span className="font-heading font-medium text-sm md:text-base leading-relaxed">
                {item.question}
              </span>
              <span className={`p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`}>
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed border-t border-zinc-900/50 pt-4">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
