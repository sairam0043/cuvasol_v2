import React from 'react';
import { Accordion } from '../components/Accordion.js';
import { HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      question: 'What makes Cuvasol different from standard coding bootcamps?',
      answer: 'Standard bootcamps rely on passive lectures, basic todo-app tutorials, and portfolio projects that look identical. Cuvasol is built around experiential sandboxes. You work inside browser compilers on actual sprint tickets, resolving bug logs and checking in code just like a commercial software team. We verify your Git history directly.'
    },
    {
      question: 'How does the AI Interview Prep coach evaluate my answers?',
      answer: 'Our AI engine analyzes voice patterns, structural content, terminology checks, and logical clarity. It checks if you cover critical components (such as memory leakage, runtime complexity, browser reconciliation steps) and details exactly which parts were solid vs. what requires brushing up, grading you from 1 to 10.'
    },
    {
      question: 'How do hiring partners access my sandbox profile?',
      answer: 'When you complete course projects and mock screenings, your metrics are consolidated into a verified public credentials link. Partner corporations search this database, filtering by specific capabilities score. They review your actual code branch PR logs and interview voice feedback transcripts directly.'
    },
    {
      question: 'Are there any prerequisites for enrolling in the Experiential Learning tracks?',
      answer: 'While we offer beginner-friendly foundations, our core Experiential and Full-Stack tracks require a basic understanding of computer logic, variable states, and terminal commands. We suggest taking our diagnostic code test upon registering to map your path.'
    },
    {
      question: 'How does the placement guarantee program work?',
      answer: 'Our Placement Support module provides direct matchmaking buffers. If you complete all capstone sandboxes with a score of 80/100 or higher and complete 10 mock interviews, our talent relations coordinators route your verified credentials profile to top tier partner hiring blocks.'
    }
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      {/* Header */}
      <section className="text-center space-y-6 pt-8">
        <span className="inline-flex px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          Support Hub
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-heading text-gradient-primary tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed">
          Learn how our mock interview sandboxes, certified portfolios, and matchmaking programs can streamline your technical placement journey.
        </p>
      </section>

      {/* Accordion container */}
      <section className="pt-6">
        <Accordion items={faqs} />
      </section>

      {/* Quick Help Card */}
      <section className="max-w-xl mx-auto bg-zinc-950 border border-zinc-900 rounded-3xl p-6 text-center space-y-3 relative overflow-hidden">
        <div className="p-2.5 bg-indigo-950/20 text-indigo-400 border border-indigo-500/15 rounded-xl w-fit mx-auto">
          <HelpCircle className="h-5 w-5" />
        </div>
        <h4 className="text-sm font-semibold text-white font-heading">Still have questions?</h4>
        <p className="text-zinc-550 text-xs">Our placement coordinators are ready to support. Drop us a ticket directly from the Contact page.</p>
      </section>
    </div>
  );
};
