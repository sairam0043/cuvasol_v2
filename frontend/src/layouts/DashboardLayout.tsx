import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { 
  Brain, LayoutDashboard, BrainCircuit, Briefcase, 
  LogOut, UserCircle, Menu, X, ArrowLeft 
} from 'lucide-react';

export const DashboardLayout: React.FC<{ 
  children: React.ReactNode, 
  activeTab: string, 
  setActiveTab: (tab: string) => void 
}> = ({ children, activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'interviews', name: 'AI Interview Simulation', icon: BrainCircuit },
    { id: 'placements', name: 'Placements & Jobs', icon: Briefcase },
    { id: 'profile', name: 'Profile Settings', icon: UserCircle },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-100 font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Sidebar Brand Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="p-1.5 bg-brand-primary/10 rounded-lg border border-brand-primary/20 group-hover:border-brand-primary/45 transition-colors">
                <Brain className="h-5 w-5 text-brand-primary" />
              </div>
              <span className="font-heading text-base font-bold tracking-tight text-white group-hover:opacity-90 transition-colors">
                Cuva<span className="text-brand-primary">sol</span>
                <span className="text-[10px] font-normal text-zinc-450 block -mt-1 leading-none">Student Hub</span>
              </span>
            </Link>
            <button 
              className="lg:hidden p-1 text-zinc-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-650 text-white shadow-lg shadow-indigo-600/10 border-l-4 border-indigo-450'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer User Widget */}
        <div className="p-4 border-t border-zinc-800 space-y-3">
          <div className="flex items-center space-x-3 px-2">
            <img 
              src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} 
              alt="Avatar" 
              className="h-9 w-9 rounded-full border border-zinc-700 object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-zinc-500 truncate">{user?.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              className="flex justify-center items-center space-x-1 p-2 rounded-lg text-xs font-medium text-zinc-450 bg-zinc-800/40 hover:bg-zinc-800 hover:text-white transition-all border border-zinc-850"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex justify-center items-center space-x-1 p-2 rounded-lg text-xs font-medium text-rose-350 bg-rose-955/10 hover:bg-rose-950/20 transition-all border border-rose-950/20 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Topbar */}
        <header className="h-16 border-b border-zinc-850 flex items-center justify-between px-6 bg-zinc-950 sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <button 
              className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-xl bg-zinc-900 border border-zinc-800"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-base font-bold text-white font-heading tracking-tight capitalize">
              {activeTab === 'overview' ? 'Dashboard Summary' : activeTab.replace('-', ' ')}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 bg-emerald-450 rounded-full mr-1.5 animate-pulse" />
              Student Status
            </span>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 md:p-8 flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
};
