import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header */}
      <section className="text-center space-y-6 pt-8">
        <span className="inline-flex px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider animate-pulse-slow">
          Our Company
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white tracking-tight">
          About Cuvasol
        </h1>
        <p className="text-zinc-405 text-sm max-w-2xl mx-auto leading-relaxed">
          Driven by team members from Fortune 500 companies, technologists, and educators.
        </p>
      </section>

      {/* 2. Core Bio */}
      <section className="max-w-4xl mx-auto">
        <div className="glassmorphism p-8 md:p-12 rounded-3xl border border-zinc-800 space-y-6 text-zinc-300 font-sans text-sm sm:text-base leading-relaxed relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
          
          <p className="font-semibold text-white text-lg leading-relaxed">
            Cuvasol is a full-service video interviewing company driven by an internal team of talented professionals from Fortune 500 companies whose combined breadth of experience includes all areas of education and hiring development.
          </p>
          <p>
            We are proud of our executive team that consists of teachers, technologists and mothers who have provided wisdom in building a platform to help students gain that edge during the interview process, and also support companies that are looking to hire exceptional candidates in an efficient manner.
          </p>
          <p>
            Join us as so many others who have experienced great success in interview preparation or hiring candidates from all across the world.
          </p>
        </div>
      </section>
    </div>
  );
};
export default About;
