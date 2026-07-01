import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import { Search, Clock, BarChart, X } from 'lucide-react';
import { Tilt3D } from '../components/Tilt3D.js';

export const Programs: React.FC = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null);

  const categories = [
    'All',
    'Experiential Learning',
    'Skill Development',
    'AI Interview Preparation',
    'Talent Acquisition',
    'Career Readiness',
    'Employer Solutions',
    'Student Programs',
    'Placement Support'
  ];

  useEffect(() => {
    api.get('/programs')
      .then(res => {
        setPrograms(res.data.data);
        setFilteredPrograms(res.data.data);
      })
      .catch(() => {
        const mock = [
          {
            _id: '1',
            title: 'Frontend Engineering Simulation',
            description: 'A 6-week intensive simulation building responsive apps with React 19, TypeScript, and Framer Motion. Master design-to-code pipelines.',
            category: 'Experiential Learning',
            duration: '6 Weeks',
            difficulty: 'Intermediate',
            price: 299,
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
            syllabus: [
              { week: 1, topic: 'Design Systems & Tailwind v4', description: 'Implement tokenized stylesheets, premium SaaS palettes, and layouts.' },
              { week: 2, topic: 'React 19 Hooks and Rendering', description: 'Master useTransition, context optimization, and structural patterns.' },
              { week: 3, topic: 'Advanced Routing & Layouts', description: 'Configure dynamic routing, nested layouts, and secure route guards.' }
            ],
            projects: [
              { title: 'Responsive Bento Grid Dashboard', description: 'Build an analytics cockpit with real-time graphs.', techStack: ['React', 'Tailwind'] }
            ]
          },
          {
            _id: '2',
            title: 'Full-Stack Architecture Core',
            description: 'Learn Node.js, Express, MongoDB schemas, indexes, and scalable microservice architectures. Deploy robust production-ready web platforms.',
            category: 'Skill Development',
            duration: '12 Weeks',
            difficulty: 'Advanced',
            price: 499,
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop',
            syllabus: [
              { week: 1, topic: 'Database Normalization', description: 'Establish schemas, indexing rules, and transaction boundaries.' }
            ],
            projects: []
          },
          {
            _id: '3',
            title: 'AI Tech Interview Bootcamp',
            description: 'Get matched with our automated interactive interviewer. Master DSA, system design, and behavior techniques with immediate analytics feedback.',
            category: 'AI Interview Preparation',
            duration: '4 Weeks',
            difficulty: 'Beginner',
            price: 149,
            image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop',
            syllabus: [],
            projects: []
          },
          {
            _id: '4',
            title: 'Global Career Placement Support',
            description: 'Gain access to premium hiring networks, direct developer placement roles, mock screenings, resume feedback, and placement guarantee assistance.',
            category: 'Placement Support',
            duration: '8 Weeks',
            difficulty: 'Intermediate',
            price: 199,
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
            syllabus: [],
            projects: []
          }
        ];
        setPrograms(mock);
        setFilteredPrograms(mock);
      });
  }, []);

  useEffect(() => {
    let result = programs;

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPrograms(result);
  }, [selectedCategory, searchQuery, programs]);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold font-heading text-white tracking-tight">Technical Programs Catalog</h1>
        <p className="text-zinc-400 text-sm max-w-lg leading-relaxed">
          Gain placement ready credentials through our verified curriculums. Click on any track below to review syllabus timelines and project requirements.
        </p>
      </section>

      {/* Filters & Search bar */}
      <section className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
        {/* Category selector */}
        <div className="flex flex-wrap gap-2 w-full lg:max-w-4xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                  : 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search programs..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
        </div>
      </section>

      {/* Programs grid list */}
      <section className="perspective-container-3d grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPrograms.map((program) => (
          <Tilt3D 
            key={program._id}
            onClick={() => setSelectedProgram(program)}
            className="group cursor-pointer flex flex-col justify-between bg-zinc-900/10 border border-zinc-800 rounded-3xl overflow-hidden transition-all duration-300 glow-card shadow-3d-rich h-full"
          >
            <div className="h-44 relative overflow-hidden">
              <img 
                src={program.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop'} 
                alt={program.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                {program.category}
              </span>
            </div>
            
            <div className="p-6 space-y-4">
              <h3 className="text-base font-bold font-heading text-white group-hover:text-indigo-300 transition-colors leading-snug">
                {program.title}
              </h3>
              <p className="text-zinc-405 text-xs leading-relaxed line-clamp-3">
                {program.description}
              </p>
            </div>

            <div className="px-6 pb-6 pt-4 border-t border-zinc-900/60 flex justify-between items-center text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
              <div className="flex items-center space-x-1">
                <Clock className="h-3.5 w-3.5 text-zinc-400" />
                <span>{program.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <BarChart className="h-3.5 w-3.5 text-zinc-400" />
                <span>{program.difficulty}</span>
              </div>
              <span className="text-white text-xs font-bold font-heading">${program.price}</span>
            </div>
          </Tilt3D>
        ))}
      </section>

      {/* Syllabus Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl relative">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProgram(null)}
              className="absolute right-6 top-6 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="p-8 pb-4 border-b border-zinc-900">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{selectedProgram.category}</span>
              <h2 className="text-xl md:text-2xl font-bold font-heading text-white mt-1 leading-snug">{selectedProgram.title}</h2>
              <div className="flex flex-wrap gap-4 mt-4 text-[11px] text-zinc-405 font-medium uppercase tracking-wider">
                <span>Duration: {selectedProgram.duration}</span>
                <span>•</span>
                <span>Difficulty: {selectedProgram.difficulty}</span>
                <span>•</span>
                <span className="text-indigo-300 font-bold">${selectedProgram.price} Enrollment</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white font-heading">Program Overview</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">{selectedProgram.description}</p>
              </div>

              {/* Syllabus Timeline */}
              {selectedProgram.syllabus && selectedProgram.syllabus.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white font-heading">Weekly Syllabus Breakdown</h4>
                  <div className="border-l border-zinc-800 pl-4 space-y-4">
                    {selectedProgram.syllabus.map((syll: any) => (
                      <div key={syll.week} className="relative">
                        <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 border-2 border-zinc-950" />
                        <h5 className="text-xs font-semibold text-white">Week {syll.week}: {syll.topic}</h5>
                        <p className="text-[11px] text-zinc-500 leading-relaxed mt-0.5">{syll.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects list */}
              {selectedProgram.projects && selectedProgram.projects.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white font-heading">Capstone Sandbox Projects</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedProgram.projects.map((proj: any, idx: number) => (
                      <div key={idx} className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-2xl space-y-2">
                        <h5 className="text-xs font-semibold text-indigo-300 leading-snug">{proj.title}</h5>
                        <p className="text-[11px] text-zinc-450 leading-relaxed">{proj.description}</p>
                        <div className="flex flex-wrap gap-1 pt-1.5">
                          {proj.techStack?.map((stack: string) => (
                            <span key={stack} className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-850 text-zinc-400">{stack}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="p-8 pt-4 border-t border-zinc-900 flex justify-end space-y-2">
              <button 
                onClick={() => setSelectedProgram(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 transition-colors mr-3"
              >
                Close View
              </button>
              <button 
                onClick={() => {
                  setSelectedProgram(null);
                  alert('To enroll, please complete registration or login to view your Student Dashboard program catalog.');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
              >
                Apply Enrollment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
