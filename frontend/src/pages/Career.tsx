import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase } from 'lucide-react';

export const Career: React.FC = () => {
  const jobs = [
    {
      title: 'INTERN DEVELOPER',
      experience: '0-1 years',
      industry: 'Digital Education',
      description: [
        'Learn about the existing tech stacks & platform',
        'Incremental improvements to the existing system',
        'Redesigning existing systems from scratch based on changing trends and customer feedback',
        'Developing new systems in alignment to our core values',
        'Research & Development to increase the efficiency of the platform'
      ],
      qualifications: [
        'B.E / MCA in Computer Science.',
        'Strong knowledge of Computer Science fundamentals in object-oriented design, data structures, algorithm design, problem-solving, databases.',
        '1 year of experience with product development in Python.',
        'Experience in designing scalable architecture to support a data-intensive application.',
        'Excellent verbal and written skills.',
        'Good to have: Machine learning education.'
      ],
      queryKey: 'INTERN'
    },
    {
      title: 'FULL STACK DEVELOPER',
      experience: '1-2 years',
      industry: 'Digital Education',
      description: [
        'Define and communicate technical and design requirements.',
        'Build high-quality reusable code that can be used in the future.',
        'Create sustainable and functional web applications.',
        'Learn about new technologies and stay up to date with current best practices.',
        'Conduct UI tests and optimize performance.',
        'Mentor team members.'
      ],
      qualifications: [
        'B.E / MCA in Computer Science.',
        'Strong knowledge of Computer Science fundamentals in object-oriented design, data structures, algorithm design, problem-solving, databases.',
        '1-2 years of experience with product development in PHP.',
        '1 year experience in developing schemas, tables and SQL queries in MySQL database.',
        'Experience in designing scalable architecture to support web applications.',
        'Excellent verbal and written skills.'
      ],
      queryKey: 'FULL_STACK_DEVELOPER'
    },
    {
      title: 'MOBILE DEVELOPER',
      experience: '1-2 years',
      industry: 'Digital Education',
      description: [
        'Exposure on Mobile application.',
        'Swift, Kotlin or React app development experience.',
        'Integration experience with REST API or microservices.',
        'Learn about new technologies and stay up to date with current best practices.',
        'Conduct UI tests and optimize performance.',
        'Mentor team members.'
      ],
      qualifications: [
        'B.E / MCA in Computer Science.',
        'Strong knowledge of Computer Science fundamentals in object-oriented design, data structures, algorithm design, problem-solving, databases.',
        '1-2 years of experience with product development in SWIFT, Kotlin or React.',
        '1 year experience in integration with REST API or microservices.',
        'Experience in designing scalable architecture to support mobile applications.',
        'Excellent verbal and written skills.'
      ],
      queryKey: 'MOBILE_DEVELOPER'
    }
  ];

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header */}
      <section className="text-center space-y-6 pt-8">
        <span className="inline-flex px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider animate-pulse-slow">
          Careers
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white tracking-tight">
          Join Our Engineering Team
        </h1>
        <p className="text-zinc-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Explore current job openings at Cuvasol and help us shape the future of virtual assessments.
        </p>
      </section>

      {/* Jobs list */}
      <section className="max-w-4xl mx-auto space-y-10">
        {jobs.map((job, idx) => (
          <div key={idx} className="glassmorphism p-8 rounded-3xl border border-zinc-800 space-y-6 transition-all hover:border-zinc-700 duration-350 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white font-heading">{job.title}</h3>
                <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wide">
                  Experience: {job.experience} • Industry: {job.industry}
                </p>
              </div>
              <Briefcase className="h-6 w-6 text-brand-primary hidden md:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
              <div className="space-y-3">
                <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">Job Description:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-zinc-400">
                  {job.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">Qualifications:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-zinc-400">
                  {job.qualifications.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Link
                to={`/contact?position=${job.queryKey}`}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              >
                <span>Apply {job.title.toLowerCase().replace(/^\w/, c => c.toUpperCase())}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
export default Career;
