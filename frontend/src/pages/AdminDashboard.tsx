import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import { AdminLayout } from '../layouts/AdminLayout.js';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  RefreshCw, Plus, Trash2, 
  BookOpen, Users, Briefcase, MessageSquare 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);

  // Entities lists

  const [programs, setPrograms] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // Modals / Forms States
  const [showProgramForm, setShowProgramForm] = useState(false);
  const [progTitle, setProgTitle] = useState('');
  const [progDesc, setProgDesc] = useState('');
  const [progCat, setProgCat] = useState('Experiential Learning');
  const [progDur, setProgDur] = useState('6 Weeks');
  const [progDiff, setProgDiff] = useState('Intermediate');
  const [progPrice, setProgPrice] = useState(199);

  const [showBlogForm, setShowBlogForm] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const blogAuthor = 'Administrator';
  const [blogTags, setBlogTags] = useState('');
  const [blogStatus, setBlogStatus] = useState('draft');

  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [testName, setTestName] = useState('');
  const [testRole, setTestRole] = useState('Software Engineer');
  const [testCompany, setTestCompany] = useState('');
  const [testText, setTestText] = useState('');
  const [testRating, setTestRating] = useState(5);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // Fetch stats
      const statRes = await api.get('/analytics/admin');
      setAnalytics(statRes.data.data);

      // Fetch programs
      const progRes = await api.get('/programs');
      setPrograms(progRes.data.data);

      // Fetch blogs
      const blogRes = await api.get('/blogs');
      setBlogs(blogRes.data.data);

      // Fetch applications
      const appRes = await api.get('/applications');
      setApplications(appRes.data.data);

      // Fetch testimonials
      const testRes = await api.get('/testimonials');
      setTestimonials(testRes.data.data);
    } catch (err) {
      console.warn('Backend API offline. Using simulated admin dashboard data.', err);
      setAnalytics({
        users: { students: 124 },
        programs: { total: 2 },
        applications: { total: 2 },
        testimonials: { total: 3 },
        timeline: [
          { month: 'Jan', signups: 10, interviews: 15 },
          { month: 'Feb', signups: 25, interviews: 30 },
          { month: 'Mar', signups: 45, interviews: 60 },
          { month: 'Apr', signups: 60, interviews: 90 },
          { month: 'May', signups: 95, interviews: 130 },
          { month: 'Jun', signups: 124, interviews: 180 }
        ]
      });
      setPrograms([
        {
          _id: 'mock_prog_1',
          title: 'Frontend Engineering Simulation',
          category: 'Experiential Learning',
          description: 'A 6-week intensive simulation building responsive apps with React 19.',
          duration: '6 Weeks',
          difficulty: 'Intermediate',
          price: 199
        },
        {
          _id: 'mock_prog_2',
          title: 'Full-Stack Architecture Core',
          category: 'Skill Development',
          description: 'Learn Node.js, Express, MongoDB schemas, and scalable microservices.',
          duration: '12 Weeks',
          difficulty: 'Advanced',
          price: 299
        }
      ]);
      setBlogs([
        {
          _id: 'mock_blog_1',
          title: 'Optimizing Virtual DOM Reconciliation in React 19',
          author: 'Admin',
          slug: 'optimizing-virtual-dom-react-19',
          status: 'published'
        }
      ]);
      setApplications([
        {
          _id: 'mock_app_1',
          name: 'Alex Johnson',
          roleAppliedFor: 'Junior Frontend Engineer',
          experienceYears: 1,
          resumeUrl: 'https://cuvasol.com/verified-alex-johnson.pdf',
          status: 'reviewing'
        },
        {
          _id: 'mock_app_2',
          name: 'Jordan Smith',
          roleAppliedFor: 'Full-Stack Architect Associate',
          experienceYears: 3,
          resumeUrl: 'https://cuvasol.com/verified-jordan-smith.pdf',
          status: 'applied'
        }
      ]);
      setTestimonials([
        {
          _id: 'mock_test_1',
          name: 'Kaushik Narayan',
          role: 'Incoming Ivy college fresher',
          company: 'Ivy League',
          text: 'This is the best kept secret on the internet. Glad I found the Cuvasol app that helped to improve my test preparation for college admission and provided me direction to get accepted to my dream college.',
          rating: 5
        },
        {
          _id: 'mock_test_2',
          name: 'Gauri Katti',
          role: 'Consultant',
          company: 'MNC',
          text: "I was feeling nervous since hadn't received offers after applying to so many companies. Metaverse game app made it fun to prepare for interviews, practice, and the feedback loop allowed me to ace the interview and receive multiple offers!",
          rating: 5
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [activeTab]);

  // Create Program handler
  const handleCreateProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/programs', {
        title: progTitle,
        description: progDesc,
        category: progCat,
        duration: progDur,
        difficulty: progDiff,
        price: progPrice,
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop'
      });
      if (res.data.success) {
        setShowProgramForm(false);
        setProgTitle('');
        setProgDesc('');
        fetchAdminData();
      }
    } catch (err) {
      console.warn('Backend API offline. Creating program in local state.', err);
      const newProg = {
        _id: `mock_prog_${Date.now()}`,
        title: progTitle,
        description: progDesc,
        category: progCat,
        duration: progDur,
        difficulty: progDiff,
        price: progPrice
      };
      setPrograms(prev => [newProg, ...prev]);
      setShowProgramForm(false);
      setProgTitle('');
      setProgDesc('');
      if (analytics) {
        setAnalytics((prev: any) => ({
          ...prev,
          programs: { ...prev.programs, total: prev.programs.total + 1 }
        }));
      }
    }
  };

  // Delete Program
  const handleDeleteProgram = async (id: string) => {
    if (!window.confirm('Delete this program?')) return;
    try {
      await api.delete(`/programs/${id}`);
      fetchAdminData();
    } catch (err) {
      console.warn('Backend API offline. Deleting program from local state.', err);
      setPrograms(prev => prev.filter(p => p._id !== id));
      if (analytics) {
        setAnalytics((prev: any) => ({
          ...prev,
          programs: { ...prev.programs, total: Math.max(0, prev.programs.total - 1) }
        }));
      }
    }
  };

  // Create Blog handler
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tagsArray = blogTags.split(',').map(t => t.trim()).filter(Boolean);
      const res = await api.post('/blogs', {
        title: blogTitle,
        excerpt: blogExcerpt,
        content: blogContent,
        author: blogAuthor,
        tags: tagsArray,
        status: blogStatus
      });
      if (res.data.success) {
        setShowBlogForm(false);
        setBlogTitle('');
        setBlogExcerpt('');
        setBlogContent('');
        setBlogTags('');
        fetchAdminData();
      }
    } catch (err) {
      console.warn('Backend API offline. Writing blog in local state.', err);
      const tagsArray = blogTags.split(',').map(t => t.trim()).filter(Boolean);
      const newBlog = {
        _id: `mock_blog_${Date.now()}`,
        title: blogTitle,
        excerpt: blogExcerpt,
        content: blogContent,
        author: blogAuthor,
        tags: tagsArray,
        status: blogStatus,
        slug: blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      };
      setBlogs(prev => [newBlog, ...prev]);
      setShowBlogForm(false);
      setBlogTitle('');
      setBlogExcerpt('');
      setBlogContent('');
      setBlogTags('');
    }
  };

  // Delete Blog
  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      fetchAdminData();
    } catch (err) {
      console.warn('Backend API offline. Deleting blog from local state.', err);
      setBlogs(prev => prev.filter(b => b._id !== id));
    }
  };

  // Update Application Placement Status
  const handleUpdateAppStatus = async (id: string, status: string) => {
    try {
      await api.put(`/applications/${id}`, { status });
      fetchAdminData();
    } catch (err) {
      console.warn('Backend API offline. Updating application status in local state.', err);
      setApplications(prev => prev.map(app => app._id === id ? { ...app, status } : app));
    }
  };

  // Create Testimonial handler
  const handleCreateTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/testimonials', {
        name: testName,
        role: testRole,
        company: testCompany,
        text: testText,
        rating: testRating,
        isFeatured: true
      });
      if (res.data.success) {
        setShowTestimonialForm(false);
        setTestName('');
        setTestText('');
        fetchAdminData();
      }
    } catch (err) {
      console.warn('Backend API offline. Creating testimonial in local state.', err);
      const newTest = {
        _id: `mock_test_${Date.now()}`,
        name: testName,
        role: testRole,
        company: testCompany,
        text: testText,
        rating: testRating
      };
      setTestimonials(prev => [newTest, ...prev]);
      setShowTestimonialForm(false);
      setTestName('');
      setTestText('');
      if (analytics) {
        setAnalytics((prev: any) => ({
          ...prev,
          testimonials: { ...prev.testimonials, total: prev.testimonials.total + 1 }
        }));
      }
    }
  };

  // Delete Testimonial
  const handleDeleteTestimonial = async (id: string) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      fetchAdminData();
    } catch (err) {
      console.warn('Backend API offline. Deleting testimonial from local state.', err);
      setTestimonials(prev => prev.filter(t => t._id !== id));
      if (analytics) {
        setAnalytics((prev: any) => ({
          ...prev,
          testimonials: { ...prev.testimonials, total: Math.max(0, prev.testimonials.total - 1) }
        }));
      }
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="h-8 w-8 text-purple-400 animate-spin" />
        </div>
      )}

      {!loading && (
        <div className="space-y-12">
          {/* TAB 1: ANALYTICS SUMMARY OVERVIEW */}
          {activeTab === 'overview' && analytics && (
            <div className="space-y-10">
              {/* Stats cockpit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-zinc-900/20 border border-zinc-900 rounded-3xl p-6 flex justify-between items-center glow-card">
                  <div className="space-y-1">
                    <p className="text-[10px] text-zinc-550 uppercase tracking-widest font-semibold">Total Students</p>
                    <h3 className="text-2xl font-bold font-heading text-white">{analytics.users.students}</h3>
                  </div>
                  <div className="p-3 bg-purple-600/10 text-purple-400 border border-purple-500/20 rounded-2xl">
                    <Users className="h-5 w-5" />
                  </div>
                </div>

                <div className="bg-zinc-900/20 border border-zinc-900 rounded-3xl p-6 flex justify-between items-center glow-card">
                  <div className="space-y-1">
                    <p className="text-[10px] text-zinc-550 uppercase tracking-widest font-semibold">Programs catalog</p>
                    <h3 className="text-2xl font-bold font-heading text-white">{analytics.programs.total}</h3>
                  </div>
                  <div className="p-3 bg-indigo-650/10 text-indigo-400 border border-indigo-500/20 rounded-2xl">
                    <BookOpen className="h-5 w-5" />
                  </div>
                </div>

                <div className="bg-zinc-900/20 border border-zinc-900 rounded-3xl p-6 flex justify-between items-center glow-card">
                  <div className="space-y-1">
                    <p className="text-[10px] text-zinc-550 uppercase tracking-widest font-semibold">Active Candidates</p>
                    <h3 className="text-2xl font-bold font-heading text-white">{analytics.applications.total}</h3>
                  </div>
                  <div className="p-3 bg-cyan-600/10 text-cyan-400 border border-cyan-500/20 rounded-2xl">
                    <Briefcase className="h-5 w-5" />
                  </div>
                </div>

                <div className="bg-zinc-900/20 border border-zinc-900 rounded-3xl p-6 flex justify-between items-center glow-card">
                  <div className="space-y-1">
                    <p className="text-[10px] text-zinc-550 uppercase tracking-widest font-semibold">Testimonials settings</p>
                    <h3 className="text-2xl font-bold font-heading text-white">{analytics.testimonials.total}</h3>
                  </div>
                  <div className="p-3 bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 rounded-2xl">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Graphic stats */}
              <div className="bg-zinc-950 border border-zinc-900 p-6 md:p-8 rounded-3xl space-y-6">
                <h3 className="text-sm font-bold text-white font-heading">Candidate Registrations & Interview runs timeline</h3>
                <div className="h-72 text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analytics.timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#18181b" />
                      <XAxis dataKey="month" stroke="#52525b" />
                      <YAxis stroke="#52525b" />
                      <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }} />
                      <Area type="monotone" dataKey="signups" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorSignups)" />
                      <Area type="monotone" dataKey="interviews" stroke="#06b6d4" fillOpacity={1} fill="url(#colorInterviews)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USER MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden text-xs font-sans">
              <div className="p-6 border-b border-zinc-900">
                <h3 className="text-sm font-bold text-white font-heading">User Directory</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-900 text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                      <th className="p-5 font-medium">Name</th>
                      <th className="p-5 font-medium">Email</th>
                      <th className="p-5 font-medium">Role</th>
                      <th className="p-5 font-medium">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-900/60 hover:bg-zinc-900/10">
                      <td className="p-5 text-white font-medium">Cuvasol Administrator</td>
                      <td className="p-5 text-zinc-400">admin@cuvasol.com</td>
                      <td className="p-5">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20">admin</span>
                      </td>
                      <td className="p-5 text-zinc-500">2026-06-29</td>
                    </tr>
                    <tr className="border-b border-zinc-900/60 hover:bg-zinc-900/10">
                      <td className="p-5 text-white font-medium">Alex Johnson</td>
                      <td className="p-5 text-zinc-400">student@cuvasol.com</td>
                      <td className="p-5">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">student</span>
                      </td>
                      <td className="p-5 text-zinc-500">2026-06-29</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PROGRAMS MANAGEMENT */}
          {activeTab === 'programs' && (
            <div className="space-y-6 font-sans text-xs">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white font-heading">Course Programs Catalog</h3>
                <button
                  onClick={() => setShowProgramForm(true)}
                  className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-650 text-white font-semibold cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Program</span>
                </button>
              </div>

              {showProgramForm && (
                <form onSubmit={handleCreateProgram} className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4 max-w-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 font-medium">Program Title</label>
                      <input
                        type="text"
                        value={progTitle}
                        onChange={(e) => setProgTitle(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 font-medium">Category</label>
                      <select
                        value={progCat}
                        onChange={(e) => setProgCat(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-855 rounded-xl px-4 py-2.5 text-white"
                      >
                        <option value="Experiential Learning">Experiential Learning</option>
                        <option value="Skill Development">Skill Development</option>
                        <option value="AI Interview Preparation">AI Interview Prep</option>
                        <option value="Placement Support">Placement Support</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-400 font-medium">Description</label>
                    <textarea
                      value={progDesc}
                      onChange={(e) => setProgDesc(e.target.value)}
                      required
                      rows={3}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl p-4 text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 font-medium">Duration</label>
                      <input
                        type="text"
                        value={progDur}
                        onChange={(e) => setProgDur(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 font-medium">Difficulty</label>
                      <select
                        value={progDiff}
                        onChange={(e) => setProgDiff(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-855 rounded-xl px-3 py-2.5 text-white"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 font-medium">Price ($)</label>
                      <input
                        type="number"
                        value={progPrice}
                        onChange={(e) => setProgPrice(parseInt(e.target.value))}
                        required
                        className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-650 text-white font-semibold cursor-pointer"
                    >
                      Save Program
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowProgramForm(false)}
                      className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-450 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programs.map((item) => (
                  <div key={item._id} className="p-5 bg-zinc-900/10 border border-zinc-900 rounded-2xl flex justify-between items-start">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase font-bold text-indigo-400 tracking-wider">{item.category}</span>
                      <h4 className="font-semibold text-white font-heading">{item.title}</h4>
                      <p className="text-zinc-450 text-[11px] leading-relaxed line-clamp-2">{item.description}</p>
                      <div className="text-[10px] text-zinc-500 font-medium pt-2">
                        {item.duration} • {item.difficulty} • ${item.price}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProgram(item._id)}
                      className="p-2 text-zinc-550 hover:text-rose-400 hover:bg-rose-950/20 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BLOG MANAGEMENT */}
          {activeTab === 'blogs' && (
            <div className="space-y-6 font-sans text-xs">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white font-heading">Blog Posts</h3>
                <button
                  onClick={() => setShowBlogForm(true)}
                  className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-650 text-white font-semibold cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Write Post</span>
                </button>
              </div>

              {showBlogForm && (
                <form onSubmit={handleCreateBlog} className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4 max-w-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 font-medium">Post Title</label>
                      <input
                        type="text"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 font-medium">Status</label>
                      <select
                        value={blogStatus}
                        onChange={(e) => setBlogStatus(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-855 rounded-xl px-4 py-2.5 text-white"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-400 font-medium">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={blogTags}
                      onChange={(e) => setBlogTags(e.target.value)}
                      placeholder="React, TypeScript, Sourcing"
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-400 font-medium">Excerpt Summary</label>
                    <input
                      type="text"
                      value={blogExcerpt}
                      onChange={(e) => setBlogExcerpt(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-400 font-medium">Full Content Markdown</label>
                    <textarea
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      required
                      rows={5}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl p-4 text-white focus:outline-none"
                    />
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-650 text-white font-semibold cursor-pointer"
                    >
                      Publish Post
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBlogForm(false)}
                      className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-450 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {blogs.map((item) => (
                  <div key={item._id} className="p-5 bg-zinc-900/10 border border-zinc-900 rounded-2xl flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white font-heading">{item.title}</h4>
                      <p className="text-[10px] text-zinc-500 mt-1">Author: {item.author} • Slug: {item.slug}</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mt-2 border ${
                        item.status === 'published' 
                          ? 'bg-emerald-500/10 text-emerald-450 border-emerald-500/20' 
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteBlog(item._id)}
                      className="p-2 text-zinc-550 hover:text-rose-400 hover:bg-rose-955/20 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: HIRING MANAGEMENT */}
          {activeTab === 'applications' && (
            <div className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden text-xs font-sans">
              <div className="p-6 border-b border-zinc-900">
                <h3 className="text-sm font-bold text-white font-heading">Hiring Placement Pipeline</h3>
              </div>
              <div className="overflow-x-auto">
                {applications.length === 0 ? (
                  <p className="p-6 text-zinc-550 text-center italic">No candidates in pipeline.</p>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-900 text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                        <th className="p-5 font-medium">Candidate Name</th>
                        <th className="p-5 font-medium">Applied Role</th>
                        <th className="p-5 font-medium">Exp Years</th>
                        <th className="p-5 font-medium">Resume Coordinates</th>
                        <th className="p-5 font-medium">Status Selector</th>
                        <th className="p-5 font-medium">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app._id} className="border-b border-zinc-900/60 hover:bg-zinc-900/10">
                          <td className="p-5 text-white font-medium">{app.name}</td>
                          <td className="p-5 text-zinc-400">{app.roleAppliedFor}</td>
                          <td className="p-5 text-zinc-450">{app.experienceYears} Years</td>
                          <td className="p-5">
                            <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">Download Resume</a>
                          </td>
                          <td className="p-5">
                            <select
                              value={app.status}
                              onChange={(e) => handleUpdateAppStatus(app._id, e.target.value)}
                              className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-white focus:outline-none"
                            >
                              <option value="applied">Applied</option>
                              <option value="reviewing">Reviewing</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="p-5">
                            <button
                              onClick={async () => {
                                if (window.confirm('Remove this application?')) {
                                  await api.delete(`/applications/${app._id}`);
                                  fetchAdminData();
                                }
                              }}
                              className="p-1 text-zinc-600 hover:text-rose-455"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 font-sans text-xs">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white font-heading">Student Success Spotlights</h3>
                <button
                  onClick={() => setShowTestimonialForm(true)}
                  className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-650 text-white font-semibold cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Testimonial</span>
                </button>
              </div>

              {showTestimonialForm && (
                <form onSubmit={handleCreateTestimonial} className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4 max-w-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 font-medium">Customer Name</label>
                      <input
                        type="text"
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 font-medium">Corporate Role</label>
                      <input
                        type="text"
                        value={testRole}
                        onChange={(e) => setTestRole(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 font-medium">Company Name</label>
                      <input
                        type="text"
                        value={testCompany}
                        onChange={(e) => setTestCompany(e.target.value)}
                        placeholder="Stripe"
                        className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 font-medium">Rating (1 to 5 Stars)</label>
                      <input
                        type="number"
                        value={testRating}
                        onChange={(e) => setTestRating(parseInt(e.target.value))}
                        min={1}
                        max={5}
                        required
                        className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-400 font-medium">Review Text</label>
                    <textarea
                      value={testText}
                      onChange={(e) => setTestText(e.target.value)}
                      required
                      rows={3}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl p-4 text-white focus:outline-none"
                    />
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-650 text-white font-semibold cursor-pointer"
                    >
                      Save Testimonial
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowTestimonialForm(false)}
                      className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-450 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {testimonials.map((item) => (
                  <div key={item._id} className="p-5 bg-zinc-900/10 border border-zinc-900 rounded-2xl flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white font-heading">{item.name}</h4>
                      <p className="text-[10px] text-zinc-500 mt-1">{item.role} at {item.company} • Rating: {item.rating} Stars</p>
                      <p className="text-zinc-400 italic text-[11px] mt-2">"{item.text}"</p>
                    </div>
                    <button
                      onClick={() => handleDeleteTestimonial(item._id)}
                      className="p-2 text-zinc-550 hover:text-rose-400 hover:bg-rose-955/20 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};
