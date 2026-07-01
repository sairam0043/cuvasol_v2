import React from 'react';

import { Users, Target, Rocket, Linkedin, Twitter } from 'lucide-react';

export const About: React.FC = () => {
  const team = [
    {
      name: 'Alex Rivera',
      role: 'Chief Executive Officer',
      bio: 'Former Technical Director at Stripe. Passionate about decoupling engineering hiring from university pedigree.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
    {
      name: 'Emily Watson',
      role: 'Chief Technology Officer',
      bio: 'Vercel framework engineer alumnus. Specialized in building secure browser sandbox IDE compiler nodes.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Head of Talent Sourcing',
      bio: '8+ years managing technical recruitment pipelines for Linear and Supabase. Connected with 100+ global hiring hubs.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    }
  ];

  return (
    <div className="space-y-24 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header */}
      <section className="text-center space-y-6 pt-8">
        <span className="inline-flex px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          Our Identity
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-gradient-primary tracking-tight">
          Decoupling Talent from Pedigree
        </h1>
        <p className="text-zinc-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Cuvasol was established to close the gap between theoretical computing coursework and practical software team output. We combine sandbox simulators and AI tutoring to get developers placement ready.
        </p>
      </section>

      {/* 2. Core Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glassmorphism-light p-8 rounded-3xl border border-zinc-900 space-y-4">
          <div className="p-3 bg-indigo-950/20 text-indigo-455 rounded-2xl w-fit border border-indigo-500/20">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold font-heading text-white">Targeted Simulations</h3>
          <p className="text-zinc-400 text-xs leading-relaxed">
            Passive videos don't build runtime intuition. Our core pedagogical framework forces students to resolve Git bugs, review PR code comments, and write compilable systems.
          </p>
        </div>

        <div className="glassmorphism-light p-8 rounded-3xl border border-zinc-900 space-y-4">
          <div className="p-3 bg-cyan-950/20 text-cyan-455 rounded-2xl w-fit border border-cyan-500/20">
            <Rocket className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold font-heading text-white">AI-Guided Acceleration</h3>
          <p className="text-zinc-400 text-xs leading-relaxed">
            Personalized coding reviews shouldn't exceed student budgets. Our LLM-powered feedback checks syntactic choices, style standards, and complexity parameters asynchronously.
          </p>
        </div>

        <div className="glassmorphism-light p-8 rounded-3xl border border-zinc-900 space-y-4">
          <div className="p-3 bg-purple-950/20 text-purple-455 rounded-2xl w-fit border border-purple-500/20">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold font-heading text-white">Verified Pipelines</h3>
          <p className="text-zinc-400 text-xs leading-relaxed">
            We provide employers with active developer portfolios instead of standard PDFs. Recruiters review sandbox score transcripts and Git logs to hire with confidence.
          </p>
        </div>
      </section>

      {/* 3. Team grid */}
      <section className="space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">Led by Engineers & Recruiter Leads</h2>
          <p className="text-zinc-400 text-xs">Bringing operational guidelines from leading SaaS platforms like Stripe and Vercel.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="group glassmorphism-light rounded-3xl p-6 border border-zinc-900 text-center space-y-4 hover:border-zinc-800 transition-all">
              <img 
                src={member.avatar} 
                alt={member.name} 
                className="h-20 w-20 rounded-full border border-zinc-800 mx-auto bg-zinc-900 p-1 group-hover:scale-105 transition-transform"
              />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-heading">{member.name}</h4>
                <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">{member.role}</p>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed px-2">
                {member.bio}
              </p>
              <div className="flex justify-center space-x-3 pt-2">
                <a href="#" className="p-1.5 rounded-lg bg-zinc-900 text-zinc-500 hover:text-white transition-colors">
                  <Twitter className="h-3.5 w-3.5" />
                </a>
                <a href="#" className="p-1.5 rounded-lg bg-zinc-900 text-zinc-500 hover:text-white transition-colors">
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
