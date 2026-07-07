import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="space-y-16 py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="text-center space-y-6 pt-8">
        <span className="inline-flex px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider">
          Legal Docs
        </span>
        <h1 className="text-4xl font-bold font-heading text-white tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-zinc-555 text-xs">
          Last updated: July 2026
        </p>
      </section>

      <div className="glassmorphism p-8 rounded-3xl border border-zinc-900 space-y-8 text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white font-heading">1. Term Agreement</h2>
          <p>
            By launching the Cuvasol platform, you agree to comply with our runtime protocols. If you do not accept these constraints, you are restricted from utilizing our sandboxed compiles and tutor matchmaking hubs.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white font-heading">2. Sandbox & Compiling License</h2>
          <p>
            All sandboxed terminals, browser compilers, and assignment logs remain intellectual properties of Cuvasol. Users are granted a limited capacity license to write code within assessments. Scraping simulated questions or logic runtimes is prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white font-heading">3. Talent Profiles Accuracy</h2>
          <p>
            You agree to maintain valid details when submitting mock screenings. Artificially inflating scores or falsifying git timeline logs may result in removal from candidate matching pipelines.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white font-heading">4. Placement Disclaimer</h2>
          <p>
            Cuvasol serves as an accelerator hub connecting candidates to recruiters. We do not guarantee employment or accept liability for recruiter interview outcomes.
          </p>
        </section>
      </div>
    </div>
  );
};
export default Terms;
