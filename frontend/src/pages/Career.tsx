import React from 'react';


export const Career: React.FC = () => {
  const steps = [
    {
      title: 'Portfolio Packages verification',
      description: 'We pack your compiles history, coding sandbox progress scores, and active credentials into a verifiable employer-ready landing page.',
    },
    {
      title: 'Mock system screening runs',
      description: 'Engage in live iterations with alumni mentors and recruiting leads to brush up on architectural structures and design frameworks.',
    },
    {
      title: 'Direct corporate matchmaking',
      description: 'Once credentials parameters cross threshold levels, your profile is routed directly to hiring teams at Stripe, Vercel, and partner companies.',
    }
  ];

  return (
    <div className="space-y-24 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="text-center space-y-6 pt-8">
        <span className="inline-flex px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          Career Readiness
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-gradient-primary tracking-tight">
          Accelerate Your Sourcing Runway
        </h1>
        <p className="text-zinc-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Succeeding in technical roles requires more than passing coding screenings. We provide direct placement matching, resume architecture workshops, and mock system reviews with team leads.
        </p>
      </section>

      {/* Process list */}
      <section className="max-w-4xl mx-auto space-y-12">
        <h2 className="text-2xl font-bold text-white font-heading text-center tracking-tight">Career Sourcing Stages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="glassmorphism-light p-6 rounded-3xl border border-zinc-900 space-y-3">
              <span className="text-xs font-mono font-bold text-indigo-400">STAGE 0{idx + 1}</span>
              <h4 className="text-sm font-semibold text-white font-heading">{step.title}</h4>
              <p className="text-zinc-455 text-xs leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
