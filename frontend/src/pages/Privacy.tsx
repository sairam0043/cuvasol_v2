import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="space-y-16 py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="text-center space-y-6 pt-8">
        <span className="inline-flex px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider">
          Legal Docs
        </span>
        <h1 className="text-4xl font-bold font-heading text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-zinc-550 text-xs">
          Last updated: July 2026
        </p>
      </section>

      <div className="glassmorphism p-8 rounded-3xl border border-zinc-900 space-y-8 text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white font-heading">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when registering an account, submitting mock screenings, coding inside our sandboxes, or communicating with tutor channels. This includes your email, name, skill scores, and feedback logs.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white font-heading">2. How We Use Information</h2>
          <p>
            We use your data to maintain mock evaluations, connect dashboard records to potential placement pipelines, audit code submissions in browser compiles, and improve local validation scripts.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white font-heading">3. Sourcing & Sharing</h2>
          <p>
            When matching is activated, verified developer scores and git check-in timelines are visible to partner recruiters. We do not distribute raw personal details for third-party commercial campaigns.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white font-heading">4. Contact Information</h2>
          <p>
            If you have questions regarding this privacy statement, please contact us at info@cuvasol.com.
          </p>
        </section>
      </div>
    </div>
  );
};
export default Privacy;
