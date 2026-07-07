import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api.js';
import { StatsCounter } from '../components/StatsCounter.js';
import { BentoGrid } from '../components/BentoGrid.js';
import { Timeline } from '../components/Timeline.js';
import { Tilt3D } from '../components/Tilt3D.js';
import { Section3D } from '../components/Section3D.js';
import { Accordion } from '../components/Accordion.js';
import { 
  ArrowRight, Sparkles, ShieldCheck, 
  ChevronLeft, ChevronRight, BrainCircuit, Terminal, Star, ArrowUpRight 
} from 'lucide-react';

export const Home: React.FC = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    // Fetch programs
    api.get('/programs')
      .then(res => setPrograms(res.data.data.slice(0, 3)))
      .catch(() => {
        // Fallback mock programs
        setPrograms([
          {
            _id: '1',
            title: 'Frontend Engineering Simulation',
            description: 'A 6-week intensive simulation building responsive apps with React 19, TypeScript, and Framer Motion.',
            category: 'Experiential Learning',
            duration: '6 Weeks',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
            difficulty: 'Intermediate'
          },
          {
            _id: '2',
            title: 'Full-Stack Architecture Core',
            description: 'Learn Node.js, Express, MongoDB schemas, indexes, and scalable microservice architectures.',
            category: 'Skill Development',
            duration: '12 Weeks',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop',
            difficulty: 'Advanced'
          },
          {
            _id: '3',
            title: 'AI Tech Interview Bootcamp',
            description: 'Get matched with our automated interactive interviewer. Master DSA, system design, and behavior.',
            category: 'AI Interview Preparation',
            duration: '4 Weeks',
            image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop',
            difficulty: 'Beginner'
          }
        ]);
      });

    // Fetch testimonials
    api.get('/testimonials?featured=true')
      .then(res => setTestimonials(res.data.data))
      .catch(() => {
        // Fallback mock testimonials
        setTestimonials([
          {
            name: 'Kaushik Narayan',
            role: 'Incoming Ivy college fresher',
            company: 'Ivy League',
            text: 'This is the best kept secret on the internet. Glad I found the Cuvasol app that helped to improve my test preparation for college admission and provided me direction to get accepted to my dream college.',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kaushik&backgroundColor=indigo'
          },
          {
            name: 'Gauri Katti',
            role: 'Consultant',
            company: 'MNC',
            text: "I was feeling nervous since hadn't received offers after applying to so many companies. Metaverse game app made it fun to prepare for interviews, practice, and the feedback loop allowed me to ace the interview and receive multiple offers!",
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gauri&backgroundColor=cyan'
          },
          {
            name: 'Lakhan Singh',
            role: 'Future Data scientist',
            company: 'Tech Academy',
            text: 'After research and guidance, I found the courses in Machine learning that were even better than my state college. Do yourself a favor and change your life with this free app that will help find a good college fit.',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lakhan&backgroundColor=purple'
          }
        ]);
      });
  }, []);

  const bentoItems = [
    {
      title: 'Simulated Production Sandbox',
      description: 'Interact with virtual Docker containers, review legacy PR logs, and write live code inside browser terminals.',
      icon: Terminal,
      accentColor: 'indigo',
      badge: 'Lab System'
    },
    {
      title: 'AI Speech & Code Analysis',
      description: 'Receive real-time sentiment scoring, keyword coverage feedback, and computational complexity metrics.',
      icon: BrainCircuit,
      accentColor: 'cyan',
      badge: 'Cognitive Engine'
    },
    {
      title: 'Employer Placement Dashboard',
      description: 'Unlock direct matching queues. Companies browse verified project archives instead of standard resume text.',
      icon: ShieldCheck,
      accentColor: 'purple',
      badge: 'Talent Sync'
    }
  ];

  const timelineItems = [
    {
      stage: '1',
      title: 'Skills Diagnostics & Roadmap',
      description: 'Complete baseline coding tasks and identify core framework deficiencies. Generate a customized career track path.',
      duration: 'Week 1',
      details: ['React Testing', 'API Architecture', 'OOP Logic']
    },
    {
      stage: '2',
      title: 'Experiential Engineering Labs',
      description: 'Take on simulated project sprints. Work on feature backlogs, code review comments, and API mock-ups.',
      duration: 'Weeks 2 - 5',
      details: ['Dynamic Sprints', 'Pull Requests', 'Git Workflow']
    },
    {
      stage: '3',
      title: 'AI Interview Simulations',
      description: 'Engage in video/text mock screenings. Review questions on language runtimes, styling systems, and system design.',
      duration: 'Weeks 6 - 7',
      details: ['Live Evaluations', 'Instant Scores', 'Confidence Metrics']
    },
    {
      stage: '4',
      title: 'Talent Sourcing Sync',
      description: 'Publish your verified sandbox credentials and project scores directly to hiring coordinators and placement recruiters.',
      duration: 'Week 8',
      details: ['Direct Placement', 'Resume Verified', 'Employer Queue']
    }
  ];



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
    <div className="space-y-24 pb-20 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-12 overflow-hidden perspective-container-3d">
        {/* Glow Effects */}
        <div className="absolute top-1/10 left-1/4 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-1/10 right-1/4 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />

        {/* 3D Floating Blobs */}
        <div className="absolute top-1/4 left-1/10 w-32 h-32 rounded-full bg-gradient-to-tr from-brand-primary/10 to-brand-accent/10 blur-xl blob-float-3d-1 pointer-events-none hidden md:block" />
        <div className="absolute bottom-1/3 right-1/10 w-40 h-40 rounded-full bg-gradient-to-br from-brand-secondary/10 to-brand-primary/10 blur-xl blob-float-3d-2 pointer-events-none hidden md:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider animate-pulse-slow"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Redefining Tech Placement • 2026 Edition</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-heading leading-tight"
            >
              <span className="text-gradient-primary">Human-Driven.</span><br />
              <span className="text-gradient-neon">AI-Boosted. Job Ready.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl font-medium"
            >
              Mentor + Machines = Your Career Breakthrough.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                to="/register"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-2xl bg-brand-primary hover:opacity-90 text-white font-semibold shadow-xl shadow-brand-primary/20 transition-all cursor-pointer group"
              >
                <span>Signup</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Floating 3D Dashboard Mockup */}
          <div className="lg:col-span-5 hidden lg:block perspective-container-3d">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden font-sans text-xs isometric-screen-3d float-gravity-3d w-full select-none"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800/60 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold border border-brand-primary/20">
                    AJ
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Alex Johnson</h4>
                    <p className="text-[10px] text-zinc-550">Student Developer</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-brand-primary">85% Ready</span>
                  <p className="text-[9px] text-zinc-550">Rank #12</p>
                </div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-zinc-850 rounded-xl border border-zinc-800 space-y-2">
                  <span className="text-[9px] text-zinc-550 font-semibold uppercase tracking-wider">Completed Sprints</span>
                  <h5 className="font-bold text-white text-sm">4 of 6 Finished</h5>
                  <div className="w-full bg-zinc-850 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-primary h-full rounded-full" style={{ width: '66%' }} />
                  </div>
                </div>

                <div className="p-3.5 bg-zinc-850 rounded-xl border border-zinc-800 space-y-2">
                  <span className="text-[9px] text-zinc-550 font-semibold uppercase tracking-wider">AI Voice Coach</span>
                  <h5 className="font-bold text-white text-sm">Score Avg: 8.4/10</h5>
                  <div className="w-full bg-zinc-850 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-secondary h-full rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>
              </div>

              {/* Placement Matcher Indicator */}
              <div className="mt-4 p-3 bg-brand-primary/5 rounded-xl border border-brand-primary/10 flex justify-between items-center text-[10px]">
                <span className="text-zinc-550 font-semibold uppercase">Hiring Queues Status</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-650 border border-emerald-500/20 font-bold tracking-wider">
                  MATCHING ACTIVE
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. PLACEMENT SUCCESS (DREAMS TO OFFERS) */}
      <Section3D className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-900/10 border border-zinc-800 p-8 md:p-12 rounded-3xl glassmorphism relative overflow-hidden">
          {/* Neon background ambient glows */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Left: The Brand Logos Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">
            {/* Microsoft Logo Card */}
            <div className="group bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800/80 rounded-2xl p-5 flex items-center justify-center h-20 transition-all hover:bg-zinc-900/40 hover:scale-102 hover:shadow-lg duration-300">
              <svg className="h-6 w-auto" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g className="transition-colors duration-300 fill-zinc-500 group-hover:fill-none">
                  <rect className="group-hover:hidden" x="0" y="2" width="9" height="9" fill="currentColor" />
                  <rect className="group-hover:hidden" x="10" y="2" width="9" height="9" fill="currentColor" />
                  <rect className="group-hover:hidden" x="0" y="12" width="9" height="9" fill="currentColor" />
                  <rect className="group-hover:hidden" x="10" y="12" width="9" height="9" fill="currentColor" />
                </g>
                <rect className="hidden group-hover:block" x="0" y="2" width="9" height="9" fill="#f25022" />
                <rect className="hidden group-hover:block" x="10" y="2" width="9" height="9" fill="#7fba00" />
                <rect className="hidden group-hover:block" x="0" y="12" width="9" height="9" fill="#00a4ef" />
                <rect className="hidden group-hover:block" x="10" y="12" width="9" height="9" fill="#ffb900" />
                <text x="25" y="17" className="fill-zinc-400 group-hover:fill-white font-sans font-semibold text-xs tracking-tight transition-colors duration-300">Microsoft</text>
              </svg>
            </div>

            {/* Columbia Logo Card */}
            <div className="group bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800/80 rounded-2xl p-5 flex items-center justify-center h-20 transition-all hover:bg-zinc-900/40 hover:scale-102 hover:shadow-lg duration-300">
              <svg className="h-6 w-auto" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g className="fill-zinc-500 group-hover:fill-[#0072BC] transition-colors duration-300">
                  <rect x="0" y="7" width="8" height="3" transform="rotate(-45 0 7)" />
                  <rect x="5" y="12" width="8" height="3" transform="rotate(-45 5 12)" />
                  <rect x="8" y="3" width="8" height="3" transform="rotate(45 8 3)" />
                  <rect x="3" y="8" width="8" height="3" transform="rotate(45 3 8)" />
                  <rect x="8" y="12" width="8" height="3" transform="rotate(-45 8 12)" />
                  <rect x="13" y="17" width="8" height="3" transform="rotate(-45 13 17)" />
                  <rect x="16" y="8" width="8" height="3" transform="rotate(45 16 8)" />
                  <rect x="11" y="13" width="8" height="3" transform="rotate(45 11 13)" />
                </g>
                <text x="26" y="17" className="fill-zinc-400 group-hover:fill-white font-serif font-bold text-xs tracking-wide transition-colors duration-300">Columbia</text>
              </svg>
            </div>

            {/* Cognizant Logo Card */}
            <div className="group bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800/80 rounded-2xl p-5 flex items-center justify-center h-20 transition-all hover:bg-zinc-900/40 hover:scale-102 hover:shadow-lg duration-300">
              <svg className="h-6 w-auto" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g className="stroke-zinc-500 group-hover:stroke-[#00B0F0] transition-colors duration-300" strokeWidth="2">
                  <path d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8" strokeLinecap="round" />
                  <path d="M8 12c0-2.209 1.791-4 4-4s4 1.791 4 4" strokeLinecap="round" />
                </g>
                <text x="24" y="17" className="fill-zinc-400 group-hover:fill-white font-sans font-medium text-xs transition-colors duration-300">cognizant</text>
              </svg>
            </div>

            {/* Pontres Logo Card */}
            <div className="group bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800/80 rounded-2xl p-5 flex items-center justify-center h-20 transition-all hover:bg-zinc-900/40 hover:scale-102 hover:shadow-lg duration-300">
              <svg className="h-7 w-auto" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-zinc-700 group-hover:fill-[#00F5A0] transition-colors duration-300" x="0" y="1" width="22" height="22" rx="4" />
                <path className="fill-zinc-400 group-hover:fill-zinc-950 transition-colors duration-300" d="M6 6h10v2.5H8.5V11H14v2.5H8.5v4.5H6V6z" />
                <text x="28" y="17" className="fill-zinc-400 group-hover:fill-white font-sans font-bold text-[10px] uppercase tracking-widest transition-colors duration-300">PONTRES</text>
              </svg>
            </div>

            {/* Capgemini Logo Card */}
            <div className="group bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800/80 rounded-2xl p-5 flex items-center justify-center h-20 transition-all hover:bg-zinc-900/40 hover:scale-102 hover:shadow-lg duration-300">
              <svg className="h-6 w-auto" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="fill-zinc-500 group-hover:fill-[#0070AD] transition-colors duration-300" d="M10 2c-4.418 0-8 3.582-8 8 0 3 1.5 5.5 4 7l-2 5h12l-2-5c2.5-1.5 4-4 4-7 0-4.418-3.582-8-8-8z" />
                <text x="24" y="17" className="fill-zinc-400 group-hover:fill-white font-serif italic font-bold text-xs transition-colors duration-300">Capgemini</text>
              </svg>
            </div>

            {/* Extra Card to balance grid (Vercel) */}
            <div className="group bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800/80 rounded-2xl p-5 flex items-center justify-center h-20 transition-all hover:bg-zinc-900/40 hover:scale-102 hover:shadow-lg duration-300">
              <svg className="h-5 w-auto" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="fill-zinc-500 group-hover:fill-white transition-colors duration-300" d="M10 2l10 18H0L10 2z" />
                <text x="24" y="17" className="fill-zinc-400 group-hover:fill-white font-sans font-semibold text-xs tracking-wider transition-colors duration-300">VERCEL</text>
              </svg>
            </div>
          </div>

          {/* Right: Text and CTA Start Button */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 relative z-10 pl-0 lg:pl-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-heading text-white tracking-tight leading-tight">
                <span className="text-gradient-neon">Dreams That turned into Offers!</span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                Few of the companies that hired our Students.
              </p>
            </div>
            <Link
              to="/experiential"
              className="flex items-center justify-center space-x-2 px-8 py-3.5 rounded-2xl bg-brand-primary hover:opacity-90 text-white font-semibold shadow-xl shadow-brand-primary/10 transition-all cursor-pointer group"
            >
              <span>START</span>
              <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Section3D>

      {/* TUTOR FINDER SECTION */}
      <Section3D className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-900/10 border border-zinc-800 p-8 md:p-12 rounded-3xl glassmorphism relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 relative z-10">
            <span className="inline-flex px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider animate-pulse-slow">
              Personalized Mentorship
            </span>
            <h2 className="text-3xl font-bold font-heading text-white tracking-tight leading-tight">
              Find the Perfect Tutor!
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Find expert tutors in academics, music, art, and more. Book a demo, schedule classes, and start your personalized learning journey today.
            </p>
            <a
              href="https://tutor.cuvasol.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-8 py-3.5 rounded-2xl bg-brand-secondary hover:opacity-90 text-zinc-955 font-semibold shadow-xl shadow-brand-secondary/10 transition-all cursor-pointer group"
            >
              <span>Become a tutor</span>
              <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform text-zinc-955" />
            </a>
          </div>

          <div className="lg:col-span-7 flex justify-center items-center relative z-10 w-full">
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-zinc-400 max-w-md w-full font-sans text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-zinc-900 mb-4">
                <span className="font-semibold text-white">Tutor Profiles Hub</span>
                <span className="text-[9px] text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded">ACTIVE DEMOS</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center space-x-2.5">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=tutor1" className="h-9 w-9 rounded-full bg-zinc-850" alt="Tutor" />
                    <div>
                      <h4 className="font-semibold text-white">Dr. Sarah L.</h4>
                      <p className="text-[10px] text-zinc-500">Advanced Mathematics</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-brand-primary">★ 4.9</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center space-x-2.5">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=tutor2" className="h-9 w-9 rounded-full bg-zinc-850" alt="Tutor" />
                    <div>
                      <h4 className="font-semibold text-white">Marcus Vance</h4>
                      <p className="text-[10px] text-zinc-500">Classical Piano & Music</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-brand-primary">★ 5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section3D>

      {/* 3. STATISTICS COUNTERS */}
      <Section3D className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 bg-zinc-950/20 p-8 rounded-3xl border border-zinc-800 glassmorphism-light">
          <div className="text-center space-y-1">
            <h4 className="text-3xl sm:text-4xl text-white font-heading">
              <StatsCounter value={0.3} prefix="+" suffix="L" decimals={1} />
            </h4>
            <p className="text-xs text-zinc-550 font-medium">Interviews</p>
          </div>
          <div className="text-center space-y-1">
            <h4 className="text-3xl sm:text-4xl text-white font-heading">
              <StatsCounter value={3} prefix="+" decimals={0} />
            </h4>
            <p className="text-xs text-zinc-550 font-medium">Continents</p>
          </div>
          <div className="text-center space-y-1">
            <h4 className="text-3xl sm:text-4xl text-white font-heading">
              <StatsCounter value={6436} prefix="+" decimals={0} />
            </h4>
            <p className="text-xs text-zinc-550 font-medium">International Educational Institutes</p>
          </div>
        </div>
      </Section3D>

      {/* 4. FEATURED PROGRAMS */}
      <Section3D className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">Accelerate Your Technical Career</h2>
            <p className="text-zinc-400 text-sm max-w-lg">Preserving our core modules. Explore program tracks designed by industry leads.</p>
          </div>
          <Link to="/programs" className="flex items-center space-x-1 text-sm font-semibold text-indigo-400 hover:text-indigo-300 group">
            <span>View Catalog</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="perspective-container-3d grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program) => (
            <Tilt3D key={program._id} className="group flex flex-col justify-between bg-zinc-900/20 border border-zinc-800 rounded-3xl overflow-hidden transition-all glow-card shadow-3d-rich h-full">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <span className="absolute top-4 left-4 px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg bg-zinc-950/80 border border-zinc-800 text-indigo-300">
                  {program.category}
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-white group-hover:text-indigo-350 transition-colors font-heading leading-snug">
                    {program.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {program.description}
                  </p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-zinc-900">
                  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">{program.duration} • {program.difficulty}</span>
                  <Link 
                    to="/programs" 
                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-colors"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>
      </Section3D>

      {/* 5. EXPERIENTIAL LEARNING BENTO GRID */}
      <Section3D className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">Experiential Learning Sandbox</h2>
          <p className="text-zinc-400 text-sm">We replace passive videos with simulated workspaces. Build, test, and present just like a production role.</p>
        </div>
        <BentoGrid items={bentoItems} />
      </Section3D>

      {/* 6. AI INTERVIEW PREPARATION MOCKUP */}
      <Section3D className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-zinc-950/20 p-8 md:p-12 rounded-3xl border border-zinc-900 glassmorphism relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-900/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="lg:col-span-5 space-y-6 relative z-10">
            <span className="inline-flex px-2.5 py-1 text-[10px] font-bold text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20 uppercase tracking-widest">
              AI Interview Platform
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight leading-tight">
              Instant feedback, zero anxiety.
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Launch our interactive chatbot coach to simulate frontend, backend, or product management screenings. Speak or write answers, and receive key concepts checklists, scoring breakdown, and overall career summaries.
            </p>
            <div className="pt-2">
              <Link 
                to="/ai-interview" 
                 className="inline-flex items-center space-x-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 group"
              >
                <span>Launch Interactive Coach</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 bg-zinc-900 rounded-2xl border border-zinc-800 p-6 shadow-2xl relative overflow-hidden font-mono text-xs isometric-screen-3d float-gravity-3d">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-900 mb-4">
              <div className="flex space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[10px] text-zinc-550">Cuvasol Coach Simulator v1.02</span>
            </div>
            
            <div className="space-y-4">
              <div className="text-brand-primary flex items-start space-x-2">
                <span className="shrink-0">[AI Interviewer]:</span>
                <p className="text-zinc-300">"Explain the concept of Virtual DOM in React and how the reconciliation process works."</p>
              </div>
              
              <div className="text-cyan-400 flex items-start space-x-2 pt-2">
                <span className="shrink-0">[Your Answer]:</span>
                <p className="text-zinc-400 italic">"The virtual DOM is a light replica of the real DOM. When states update, React creates a new tree and compares it with the previous node tree using a diffing algorithm..."</p>
              </div>

              <div className="text-emerald-400 pt-2 border-t border-zinc-900 space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span>[FEEDBACK CORE SCORES]</span>
                  <span className="font-bold">SCORE: 8/10</span>
                </div>
                <ul className="text-zinc-550 space-y-1 text-[10px]">
                  <li className="text-emerald-555">• [CHECK] Mentioned Virtual DOM definition</li>
                  <li className="text-emerald-555">• [CHECK] Stated Diffing Algorithm process</li>
                  <li className="text-amber-555">• [WARN] Missed fiber updates, batching reconciliation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section3D>

      {/* 7. TALENT ACQUISITION */}
      <Section3D className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">Talent Match Pipeline</h2>
          <p className="text-zinc-400 text-sm">Empowering partners. Sourcing candidates with verified project credentials instead of simple credentials text.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="bg-zinc-900/10 p-6 md:p-8 rounded-3xl border border-zinc-800 space-y-6">
            <h3 className="text-lg font-bold font-heading text-white">For Students</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Showcase your actual skill capacity. Every assignment, PR log, and AI interview simulation is verified and packaged into an active recruitment portfolio visible to top companies.
            </p>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                <span>Verified Git log integrations</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                <span>AI verified scores transcripts</span>
              </li>
            </ul>
          </div>

          <div className="bg-brand-primary/10 p-6 md:p-8 rounded-3xl border border-brand-primary/20 space-y-6">
            <h3 className="text-lg font-bold font-heading text-white">For Employers</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Hiring shouldn't be a gamble. Source pre-vetted developer assets with recorded performance metrics. Cut interview loops by 60% with instant candidate sandboxes.
            </p>
            <ul className="space-y-2.5 text-xs text-zinc-350">
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>Sandbox reviews on actual PRs</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>Filter by precise stack skills score</span>
              </li>
            </ul>
          </div>
        </div>
      </Section3D>

      {/* 8. CAREER JOURNEY TIMELINE */}
      <Section3D className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">The Placement Runway</h2>
          <p className="text-zinc-400 text-sm">Your step-by-step roadmap from initial diagnostic to confirmed placement.</p>
        </div>
        <Timeline items={timelineItems} />
      </Section3D>

      {/* 9. TESTIMONIAL FEEDBACK CAROUSEL */}
      {testimonials.length > 0 && (
        <Section3D className="max-w-6xl mx-auto px-4">
          <div className="glassmorphism rounded-3xl border border-zinc-850 p-8 md:p-12 text-center space-y-6 relative overflow-hidden">
            <div className="flex justify-center text-amber-500 space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            
            <p className="text-base md:text-lg text-white font-medium max-w-2xl mx-auto italic leading-relaxed">
              "{testimonials[testimonialIndex]?.text}"
            </p>
            
            <div className="flex items-center justify-center space-x-3 pt-2">
              <img 
                src={testimonials[testimonialIndex]?.avatar} 
                alt={testimonials[testimonialIndex]?.name} 
                className="h-9 w-9 rounded-full border border-zinc-800 object-cover bg-zinc-800"
              />
              <div className="text-left">
                <h5 className="font-semibold text-white text-xs">{testimonials[testimonialIndex]?.name}</h5>
                <p className="text-[10px] text-zinc-500 font-medium">
                  {testimonials[testimonialIndex]?.role} at {testimonials[testimonialIndex]?.company}
                </p>
              </div>
            </div>

            {/* Testimonials controls */}
            <div className="flex justify-center space-x-1.5 pt-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    index === testimonialIndex ? 'bg-brand-primary w-6' : 'bg-zinc-800'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={() => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-white rounded-full transition-all hidden md:block cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-white rounded-full transition-all hidden md:block cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Section3D>
      )}

      {/* 10. SUCCESS STORIES */}
      <Section3D className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">Student Success Stories</h2>
          <p className="text-zinc-400 text-sm">Read how students transitioned from foundational stages to placement landing roles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glassmorphism-light p-8 rounded-3xl border border-zinc-800 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-brand-primary tracking-widest uppercase">Self-Taught Dev • Placed in 8 Weeks</span>
              <h3 className="text-lg font-semibold font-heading text-white">How Alex Went from Local Projects to Stripe Core APIs</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                "I had standard portfolios but failed basic automated screeners. Cuvasol's experiential sandboxes let me show my Git history directly. An employer coordinator reviewed my code verification and fast-tracked me to system rounds."
              </p>
            </div>
            <p className="text-[11px] text-zinc-550 font-medium">— Alex Rivera, Frontend Engineer at Stripe</p>
          </div>

          <div className="glassmorphism-light p-8 rounded-3xl border border-zinc-800 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase">Career Switcher • Placed in 12 Weeks</span>
              <h3 className="text-lg font-semibold font-heading text-white">Transitioning from Marketing Executive to Node.js Dev</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                "The hardest part of switching career paths was proving I could code under pressure. The AI Interview Coach gave me 45 mock iterations. By the time I spoke with Vercel leads, I knew all event loops inside-out."
              </p>
            </div>
            <p className="text-[11px] text-zinc-550 font-medium">— David Chen, Product Engineer at Vercel</p>
          </div>
        </div>
      </Section3D>

      {/* 11. FAQ SECTION */}
      <Section3D className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="inline-flex px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider">
            Support FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-sm">
            Everything you need to know about our experiential learning platform, mock interview coaches, and hiring sync dashboard.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqs} />
        </div>
      </Section3D>

      {/* APP DOWNLOAD SECTION */}
      <Section3D className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950/20 p-8 md:p-12 rounded-3xl border border-zinc-800 glassmorphism relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="lg:col-span-7 space-y-6 relative z-10 text-left">
            <span className="inline-flex px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider animate-pulse-slow">
              Free Access
            </span>
            <h2 className="text-3xl font-bold font-heading text-white tracking-tight leading-tight">
              Download our App for Free!
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
              Download cuvasol now for a transformative learning experience. Elevate communication, ace interviews, and access exclusive features. Available on Google play store and the Apple App store.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 w-full">
            <a 
              href="https://apps.apple.com/us/app/cuvasol-pro/id6448352595" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 text-white font-medium transition-all shadow-lg cursor-pointer"
            >
              <span className="text-xs font-semibold">Download on App Store</span>
            </a>
            <a 
              href="https://play.google.com/store/apps/details?id=com.cuvasol.newcandidateapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 text-white font-medium transition-all shadow-lg cursor-pointer"
            >
              <span className="text-xs font-semibold">Get it on Google Play</span>
            </a>
          </div>
        </div>
      </Section3D>

      {/* 12. CTA SECTION */}
      <Section3D className="max-w-6xl mx-auto px-4 relative">
        <div className="glassmorphism rounded-3xl border border-zinc-800 p-8 md:p-16 text-center space-y-8 relative overflow-hidden">
          {/* Neon back glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight">
            Ready to Accelerate Your Placement Runway?
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed">
            Get instant access to experiential sandbox workspaces, interactive chatbot coaches, and placement queues.
          </p>
          <div className="flex justify-center pt-2">
            <Link
              to="/register"
              className="flex items-center space-x-2 px-8 py-4 rounded-2xl bg-brand-primary hover:opacity-90 text-white font-semibold transition-all shadow-xl shadow-brand-primary/10 cursor-pointer"
            >
              <span>Get Started Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section3D>
    </div>
  );
};
export default Home;
