import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setMessage('');
      }, 4000);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 font-sans">
      {/* Header */}
      <section className="text-center space-y-4 pt-8">
        <h1 className="text-3xl font-bold font-heading text-white tracking-tight">Get in Touch</h1>
        <p className="text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed">
          Have technical questions about our compilers, need dashboard help, or looking to join our hiring partner circle? Shoot us a ticket.
        </p>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
        {/* Left Side: Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glassmorphism-light p-6 rounded-2xl border border-zinc-900 flex items-start space-x-4">
            <div className="p-3 bg-indigo-950/20 text-indigo-400 border border-indigo-500/10 rounded-xl">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-heading">Support Mail</h4>
              <p className="text-xs text-zinc-400 mt-1">support@cuvasol.com</p>
              <p className="text-[10px] text-zinc-550 mt-0.5">Estimated reply: 4 hours</p>
            </div>
          </div>

          <div className="glassmorphism-light p-6 rounded-2xl border border-zinc-900 flex items-start space-x-4">
            <div className="p-3 bg-cyan-950/20 text-cyan-400 border border-cyan-500/10 rounded-xl">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-heading">Placement Relations</h4>
              <p className="text-xs text-zinc-400 mt-1">+1 (555) 234-5678</p>
              <p className="text-[10px] text-zinc-550 mt-0.5">Mon-Fri: 9am - 6pm EST</p>
            </div>
          </div>

          <div className="glassmorphism-light p-6 rounded-2xl border border-zinc-900 flex items-start space-x-4">
            <div className="p-3 bg-purple-950/20 text-purple-400 border border-purple-500/10 rounded-xl">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-heading">Corporate HQ</h4>
              <p className="text-xs text-zinc-400 mt-1">100 Pine Street, Floor 12</p>
              <p className="text-[10px] text-zinc-550 mt-0.5">San Francisco, CA 94111</p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-950/5 rounded-full blur-[80px] pointer-events-none" />

          {submitted ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center rounded-2xl space-y-2 animate-pulse">
              <h4 className="text-sm font-bold">Ticket Submitted Successfully!</h4>
              <p className="text-xs">A support coordinator will email you at your address shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 font-medium">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    required
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-white placeholder-zinc-550 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-400 font-medium">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    required
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-white placeholder-zinc-550 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 font-medium">Message Body</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you succeed?"
                  required
                  rows={5}
                  className="w-full bg-zinc-900 border border-zinc-850 rounded-2xl p-4 text-white placeholder-zinc-550 focus:outline-none focus:border-indigo-500 transition-colors resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center space-x-1.5 py-3 rounded-xl bg-indigo-650 hover:bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/10 transition-colors cursor-pointer"
              >
                <span>Submit Ticket</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
