import React, { useState } from 'react';
import { ShieldAlert, Briefcase, UserCheck, Mail, Building } from 'lucide-react';

export const Talent: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Frontend Developer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (company && email) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setCompany('');
        setEmail('');
      }, 4000);
    }
  };

  return (
    <div className="space-y-24 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="text-center space-y-6 pt-8">
        <span className="inline-flex px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
          Employer Solutions
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-gradient-primary tracking-tight">
          Verify Skills Before the Interview
        </h1>
        <p className="text-zinc-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Pedigree is a weak proxy for engineering output. Cuvasol gives recruitment teams direct access to candidate sandbox logs, completed PR tests, and AI speech reviews, reducing hiring loops by 60%.
        </p>
      </section>

      {/* Benefits grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glassmorphism-light p-8 rounded-3xl border border-zinc-900 space-y-4">
          <div className="p-3 bg-purple-950/20 text-purple-400 rounded-2xl w-fit border border-purple-500/20">
            <UserCheck className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold font-heading text-white">Pre-Vetted Sandbox Metrics</h3>
          <p className="text-zinc-400 text-xs leading-relaxed font-sans">
            Browse portfolios where code has already compiled, tested, and resolved functional spec sheets. Skip traditional take-home homework.
          </p>
        </div>

        <div className="glassmorphism-light p-8 rounded-3xl border border-zinc-900 space-y-4">
          <div className="p-3 bg-purple-950/20 text-purple-400 rounded-2xl w-fit border border-purple-500/20">
            <Briefcase className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold font-heading text-white">Decoupled Tech Reviews</h3>
          <p className="text-zinc-400 text-xs leading-relaxed font-sans">
            Filter developers by precise runtime skill scores (e.g. state context handling, Express routing logs) instead of relying on resume keywords.
          </p>
        </div>

        <div className="glassmorphism-light p-8 rounded-3xl border border-zinc-900 space-y-4">
          <div className="p-3 bg-purple-950/20 text-purple-400 rounded-2xl w-fit border border-purple-500/20">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold font-heading text-white">Direct Sourcing Queue</h3>
          <p className="text-zinc-400 text-xs leading-relaxed font-sans">
            Connect directly with candidates matching your technology parameters. Review recorded AI voice screens to verify communication compatibility.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-xl mx-auto bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-bold font-heading text-white">Connect with Our Talent Coordinator</h3>
          <p className="text-zinc-500 text-xs font-sans">Submit your contact info to access the partner candidates database.</p>
        </div>

        {formSubmitted ? (
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center rounded-2xl space-y-2 animate-pulse">
            <h4 className="text-sm font-bold">Request Received Successfully!</h4>
            <p className="text-xs">Our talent matching manager will contact you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
            <div className="space-y-1.5">
              <label className="text-zinc-400 font-medium">Company Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Acme SaaS"
                  required
                  className="w-full bg-zinc-900 border border-zinc-855 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-zinc-550 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <Building className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-400 font-medium">Corporate Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="recruiting@acme.com"
                  required
                  className="w-full bg-zinc-900 border border-zinc-855 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-zinc-550 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-400 font-medium">Primary Role Needed</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-855 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="Frontend Developer">Frontend Developer (React/TS)</option>
                <option value="Backend Architect">Backend Architect (Node/Express/Mongo)</option>
                <option value="Product Manager">Technical Product Manager</option>
                <option value="Fullstack Generalist">Fullstack Developer</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-650 text-white font-semibold shadow-lg shadow-purple-650/10 transition-colors cursor-pointer text-center"
            >
              Request Candidate Catalog Access
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
