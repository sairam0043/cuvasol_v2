import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Send, Twitter, Linkedin, Github, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-900/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-1/10 w-80 h-80 bg-cyan-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Logo & Pitch */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-brand-primary/10 rounded-xl border border-brand-primary/20 group-hover:border-brand-primary/45 transition-colors">
                <Brain className="h-6 w-6 text-brand-primary" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-white group-hover:opacity-90 transition-colors">
                Cuva<span className="text-brand-primary">sol</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              Human-Driven. AI-Boosted. Job Ready. Building the future of technical education and talent acquisition with immersive simulations and direct employer matchmaking.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://facebook.com/CuvasolTechnologies" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/20 transition-all"
                title="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/cuvasol-technologies-private-limited/about/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/20 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase font-heading">Solutions</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/experiential" className="text-zinc-450 hover:text-white text-sm transition-colors">Experiential Labs</Link>
              </li>
              <li>
                <Link to="/ai-interview" className="text-zinc-450 hover:text-white text-sm transition-colors">AI Interview Prep</Link>
              </li>
              <li>
                <Link to="/talent" className="text-zinc-450 hover:text-white text-sm transition-colors">Talent Acquisition</Link>
              </li>
              <li>
                <Link to="/career" className="text-zinc-450 hover:text-white text-sm transition-colors">Placement Support</Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase font-heading">Resources</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/programs" className="text-zinc-450 hover:text-white text-sm transition-colors">Programs Catalog</Link>
              </li>
              <li>
                <Link to="/blog" className="text-zinc-450 hover:text-white text-sm transition-colors">Blogs & News</Link>
              </li>
              <li>
                <Link to="/faq" className="text-zinc-450 hover:text-white text-sm transition-colors">Frequently Asked FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-zinc-450 hover:text-white text-sm transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase font-heading">Stay Connected</h4>
            <p className="text-zinc-450 text-xs leading-relaxed">
              Get the latest insights on technical hiring, React updates, and program enrollments.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 bg-indigo-650 hover:bg-indigo-600 rounded-lg text-white transition-colors cursor-pointer"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
              {subscribed && (
                <p className="text-emerald-450 text-xs animate-pulse">
                  Subscribed successfully! Thank you.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="h-px bg-zinc-900 my-8" />

        {/* Footer Bottom info */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-xs text-zinc-500">
          <p>© 2025 Cuvasol Technologies, Pvt Ltd. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-zinc-300 transition-colors">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
