import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Tag } from 'lucide-react';

export const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  useEffect(() => {
    api.get('/blogs?status=published')
      .then(res => setBlogs(res.data.data))
      .catch(() => {
        setBlogs([
          {
            _id: '1',
            title: 'The Evolution of Technical Recruiting in 2026',
            slug: 'evolution-of-technical-recruiting-2026',
            excerpt: 'How AI-boosted screening and immersive work simulations are changing the recruitment landscape.',
            content: 'The traditional tech interview process is broken. Resume screens screen out highly capable self-taught devs, while whiteboarding tests concepts candidates never use in their day-to-day. In 2026, companies are prioritizing direct experiential skills over credentials. Tools like simulated workspaces and interactive coding environments allow employers to check practical execution. By leveraging AI-boosted interview coaches, students can build confidence and master architectural patterns asynchronously.',
            author: 'Alex Rivera',
            coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop',
            tags: ['Recruiting', 'AI', 'Tech Careers'],
            publishedAt: new Date().toISOString()
          },
          {
            _id: '2',
            title: 'Mastering React 19 State Management & Transition Hooks',
            slug: 'mastering-react-19-state-management',
            excerpt: 'A deep dive into new Server Actions, useActionState, useFormStatus, and structural state patterns.',
            content: 'React 19 is officially here, and it simplifies async processes, loading indicators, and form layouts. In this deep dive, we walk through using the new useTransition hook to manage background loading states seamlessly without manual toggles. We also review form actions, context efficiency improvements, and how to build components that integrate nicely with state containers.',
            author: 'Emily Watson',
            coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
            tags: ['React', 'TypeScript', 'Frontend'],
            publishedAt: new Date().toISOString()
          }
        ]);
      });
  }, []);

  if (selectedBlog) {
    return (
      <div className="py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in font-sans">
        <button
          onClick={() => setSelectedBlog(null)}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer text-xs"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Articles</span>
        </button>

        <article className="space-y-6">
          <img 
            src={selectedBlog.coverImage} 
            alt={selectedBlog.title} 
            className="w-full h-64 md:h-96 object-cover rounded-3xl border border-zinc-850"
          />

          <div className="flex flex-wrap gap-4 text-xs text-zinc-500 font-medium">
            <span className="flex items-center space-x-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{new Date(selectedBlog.publishedAt).toLocaleDateString()}</span>
            </span>
            <span className="flex items-center space-x-1">
              <User className="h-3.5 w-3.5" />
              <span>{selectedBlog.author}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="h-3.5 w-3.5" />
              <span>5 min read</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-heading text-white tracking-tight leading-tight">
            {selectedBlog.title}
          </h1>

          <div className="flex flex-wrap gap-2 pt-2">
            {selectedBlog.tags?.map((tag: string) => (
              <span key={tag} className="flex items-center space-x-1 text-[10px] font-semibold text-indigo-400 bg-indigo-550/5 border border-indigo-500/10 px-2.5 py-1 rounded-full">
                <Tag className="h-2.5 w-2.5" />
                <span>{tag}</span>
              </span>
            ))}
          </div>

          <div className="h-px bg-zinc-900 my-6" />

          <div className="text-zinc-300 text-sm md:text-base leading-relaxed space-y-6">
            {selectedBlog.content.split('\n\n').map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold font-heading text-white tracking-tight">Platform Insights & News</h1>
        <p className="text-zinc-400 text-sm max-w-lg leading-relaxed">
          Read articles on technical recruiting cycles, React updates, state patterns, and interview preparations.
        </p>
      </section>

      {/* Blog List Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <div 
            key={blog._id}
            onClick={() => setSelectedBlog(blog)}
            className="group cursor-pointer flex flex-col justify-between bg-zinc-900/10 border border-zinc-900 rounded-3xl overflow-hidden hover:border-zinc-800 transition-all duration-300 glow-card"
          >
            <div className="h-56 relative overflow-hidden">
              <img 
                src={blog.coverImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop'} 
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            </div>

            <div className="p-6 md:p-8 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
                  {new Date(blog.publishedAt).toLocaleDateString()} • By {blog.author}
                </span>
                <h3 className="text-lg font-bold font-heading text-white group-hover:text-indigo-300 transition-colors leading-snug">
                  {blog.title}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-zinc-900/60 text-xs text-zinc-450">
                <div className="flex gap-2.5">
                  {blog.tags?.slice(0, 2).map((tag: string) => (
                    <span key={tag} className="text-[9px] font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-lg">{tag}</span>
                  ))}
                </div>
                <span className="flex items-center space-x-1 text-indigo-400 font-semibold group-hover:text-white transition-colors">
                  <span>Read Post</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
