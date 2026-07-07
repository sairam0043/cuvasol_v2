import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { 
  Brain, Menu, X, LogOut, LayoutDashboard, Shield, Sparkles, ChevronDown
} from 'lucide-react';

interface NavItem {
  name: string;
  path?: string;
  external?: boolean;
  dropdown?: {
    name: string;
    path: string;
    external?: boolean;
  }[];
}

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks: NavItem[] = [
    { name: 'Home', path: '/' },
    {
      name: 'Experiential Learning',
      dropdown: [
        { name: 'Student Learning Hub', path: 'https://tutor.cuvasol.com', external: true },
        { name: 'Skill & Tech Learning', path: '/experiential' }
      ]
    },
    { name: 'Interview Prep', path: '/register' },
    {
      name: 'Talent Acquisition',
      dropdown: [
        { name: 'Hire Candidates', path: '/talent' },
        { name: 'Managed Hire Candidates', path: '/contact' }
      ]
    },
    { name: 'Resources', path: '/faq' },
    {
      name: 'Our Company',
      dropdown: [
        { name: 'About us', path: '/about' },
        { name: 'Contact us', path: '/contact' },
        { name: 'Careers', path: '/career' }
      ]
    }
  ];

  const isDropdownActive = (dropdown?: { path: string }[]) => {
    if (!dropdown) return false;
    return dropdown.some(item => location.pathname === item.path);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-lg shadow-zinc-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-brand-primary/10 rounded-xl border border-brand-primary/20 group-hover:border-brand-primary/45 transition-colors">
              <Brain className="h-6 w-6 text-brand-primary animate-pulse-slow" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-white group-hover:opacity-90 transition-colors">
              Cuva<span className="text-brand-primary">sol</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              if (link.dropdown) {
                const isActive = isDropdownActive(link.dropdown);
                return (
                  <div key={link.name} className="relative group py-2">
                    <button
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'text-white bg-zinc-900/60 border border-zinc-800'
                          : 'text-zinc-455 hover:text-white hover:bg-zinc-900/30 border border-transparent'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="h-3.5 w-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-250" />
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-1 w-56 rounded-2xl bg-zinc-950 border border-zinc-850 p-1.5 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {link.dropdown.map((subItem) => {
                        const isSubActive = location.pathname === subItem.path;
                        if (subItem.external) {
                          return (
                            <a
                              key={subItem.name}
                              href={subItem.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                            >
                              {subItem.name}
                            </a>
                          );
                        }
                        return (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className={`block px-4 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                              isSubActive
                                ? 'text-brand-primary bg-brand-primary/10 font-semibold'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              const isActive = location.pathname === link.path;
              if (link.external && link.path) {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-455 hover:text-white hover:bg-zinc-900/30 transition-all border border-transparent"
                  >
                    {link.name}
                  </a>
                );
              }
              return (
                <Link
                  key={link.name}
                  to={link.path || '/'}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                    isActive
                      ? 'text-white bg-zinc-900/60 border border-zinc-800'
                      : 'text-zinc-455 hover:text-white hover:bg-zinc-900/30 border-transparent'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-medium text-brand-primary bg-brand-primary/10 border border-brand-primary/20 hover:bg-brand-primary/20 hover:border-brand-primary/40 transition-all cursor-pointer"
                >
                  {user.role === 'admin' ? (
                    <>
                      <Shield className="h-4 w-4" />
                      <span>Admin Panel</span>
                    </>
                  ) : (
                    <>
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </>
                  )}
                </Link>
                <div className="h-8 w-px bg-zinc-800" />
                <div className="flex items-center space-x-2 text-zinc-300">
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                    alt="avatar"
                    className="h-8 w-8 rounded-full border border-zinc-700 bg-zinc-800 object-cover"
                  />
                  <span className="text-xs font-semibold max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-950/20 transition-all cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-455 hover:text-white transition-colors cursor-pointer"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="relative group px-4 py-2 rounded-xl text-sm font-medium text-white bg-brand-primary hover:opacity-90 transition-colors overflow-hidden cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-1">
                    Get Started <Sparkles className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full glassmorphism border-t border-zinc-800 shadow-2xl py-4 px-6 space-y-3 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              if (link.dropdown) {
                const isDropdownOpen = activeDropdown === link.name;
                const isAct = isDropdownActive(link.dropdown);
                return (
                  <div key={link.name} className="flex flex-col">
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className={`flex justify-between items-center px-3 py-2.5 rounded-xl text-base font-medium transition-all text-left ${
                        isAct
                          ? 'text-white bg-zinc-900/50 font-semibold'
                          : 'text-zinc-450 hover:text-white hover:bg-zinc-900/40'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-brand-primary' : 'text-zinc-550'}`} />
                    </button>
                    {isDropdownOpen && (
                      <div className="pl-4 pr-2 py-1 space-y-1 mt-1 border-l border-zinc-800 ml-3">
                        {link.dropdown.map((subItem) => {
                          const isSubActive = location.pathname === subItem.path;
                          if (subItem.external) {
                            return (
                              <a
                                key={subItem.name}
                                href={subItem.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-3 py-2 rounded-xl text-sm text-zinc-450 hover:text-white hover:bg-zinc-900/30"
                              >
                                {subItem.name}
                              </a>
                            );
                          }
                          return (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className={`block px-3 py-2 rounded-xl text-sm ${
                                isSubActive
                                  ? 'text-brand-primary bg-brand-primary/5 font-semibold'
                                  : 'text-zinc-450 hover:text-white hover:bg-zinc-900/30'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = location.pathname === link.path;
              if (link.external && link.path) {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 rounded-xl text-base font-medium text-zinc-450 hover:text-white hover:bg-zinc-900/55"
                  >
                    {link.name}
                  </a>
                );
              }
              return (
                <Link
                  key={link.name}
                  to={link.path || '/'}
                  className={`px-3 py-2.5 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'text-white bg-zinc-900 border border-zinc-850'
                      : 'text-zinc-450 hover:text-white hover:bg-zinc-900/55'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="h-px bg-zinc-800 my-2" />

          {/* Mobile Actions */}
          <div>
            {isAuthenticated && user ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 px-3">
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                    alt="avatar"
                    className="h-10 w-10 rounded-full border border-zinc-700 bg-zinc-800"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-white">{user.name}</h4>
                    <p className="text-xs text-zinc-500 capitalize">{user.role}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    className="flex justify-center items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-brand-primary"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex justify-center items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 hover:text-rose-400 hover:bg-rose-950/20"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="flex justify-center items-center px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-455 hover:text-white bg-zinc-900 border border-zinc-850"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex justify-center items-center space-x-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-brand-primary hover:opacity-90"
                >
                  <span>Get Started</span>
                  <Sparkles className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
