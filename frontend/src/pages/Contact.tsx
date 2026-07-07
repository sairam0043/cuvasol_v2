import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const position = searchParams.get('position');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    position ? `Hi, I would like to apply for the ${position.replace(/_/g, ' ')} position.` : ''
  );
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert("Please agree to the Term of Service.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setAgree(false);
    }, 4000);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 font-sans">
      {/* Header */}
      <section className="text-center space-y-4 pt-8">
        <span className="inline-flex px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider animate-pulse-slow">
          Contact us
        </span>
        <h1 className="text-3xl font-bold font-heading text-white tracking-tight">Please enter your details</h1>
        <p className="text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed">
          Submit your queries or job application details. Our team will get back to you shortly.
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
              <p className="text-xs text-zinc-400 mt-1">info@cuvasol.com</p>
            </div>
          </div>

          <div className="glassmorphism-light p-6 rounded-2xl border border-zinc-900 flex items-start space-x-4">
            <div className="p-3 bg-cyan-950/20 text-cyan-400 border border-cyan-500/10 rounded-xl">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-heading">Phone Number</h4>
              <p className="text-xs text-zinc-400 mt-1">+91 95385 17963</p>
            </div>
          </div>

          <div className="glassmorphism-light p-6 rounded-2xl border border-zinc-900 flex items-start space-x-4">
            <div className="p-3 bg-purple-950/20 text-purple-400 border border-purple-500/10 rounded-xl">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-heading">Corporate Office</h4>
              <p className="text-xs text-zinc-450 leading-relaxed mt-1">
                Cuvasol Technologies Private Limited,<br />
                HD-169, We Work, 78 Old Madras Road, Salarpuria Magnifica, Tin Factory, Mahadevapura, Bangalore 560016, Karnataka, IN
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-950/5 rounded-full blur-[80px] pointer-events-none" />

          {submitted ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center rounded-2xl space-y-2 animate-pulse">
              <h4 className="text-sm font-bold">Details Submitted Successfully!</h4>
              <p className="text-xs">Thank you for reaching out. We will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 font-medium">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-white placeholder-zinc-550 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-400 font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-white placeholder-zinc-550 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 font-medium">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-white placeholder-zinc-550 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 font-medium">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter message details"
                  required
                  rows={5}
                  className="w-full bg-zinc-900 border border-zinc-850 rounded-2xl p-4 text-white placeholder-zinc-550 focus:outline-none focus:border-indigo-500 transition-colors resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2 text-zinc-400">
                <input
                  type="checkbox"
                  id="agree-checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="rounded border-zinc-800 bg-zinc-900 text-brand-primary focus:ring-brand-primary"
                />
                <label htmlFor="agree-checkbox" className="select-none leading-normal">
                  I agree to receiving marketing and interview emails and Term of Service
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center space-x-1.5 py-3 rounded-xl bg-indigo-650 hover:bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/10 transition-colors cursor-pointer"
              >
                <span>Submit Details</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
export default Contact;
