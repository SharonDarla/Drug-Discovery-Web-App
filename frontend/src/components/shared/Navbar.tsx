import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FlaskConical, Menu, X, Sun, Moon, History, Info, Mail, Beaker, BarChart } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle smooth scroll for hashed navigation
  const handleHashNav = (hash: string) => {
    setIsOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${hash}`);
    }
  };

  // Scroll to hash on page load if hash exists
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const hash = location.hash.replace('#', '');
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const navLinks = [
    { label: 'Home', path: '/', isHash: false },
    { label: 'Molecule Studio', path: 'studio', isHash: true, icon: Beaker },
    { label: 'Analysis', path: 'analysis', isHash: true, icon: BarChart },
    { label: 'History', path: '/history', isHash: false, icon: History },
    { label: 'About', path: '/about', isHash: false, icon: Info },
    { label: 'Contact', path: '/contact', isHash: false, icon: Mail },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/40 dark:border-slate-800/40 transition-colors duration-300">
      <div className="container px-4 mx-auto max-w-7xl flex items-center justify-between h-16">
        {/* Logo + Name */}
        <Link 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 font-bold text-xl text-slate-800 dark:text-slate-100 hover:opacity-90 transition-opacity"
        >
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <FlaskConical className="w-5 h-5" />
          </div>
          <span className="tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            DrugGen <span className="text-xs font-semibold text-blue-500 align-super">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = link.isHash 
              ? location.pathname === '/' && location.hash === `#${link.path}`
              : location.pathname === link.path && !location.hash;

            return (
              <button
                key={link.label}
                onClick={() => link.isHash ? handleHashNav(link.path) : navigate(link.path)}
                className={cn(
                  "px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 bg-transparent shadow-none hover:bg-slate-100 dark:hover:bg-slate-800/60 border-none",
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-950/20"
                    : "text-slate-650 dark:text-slate-405 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Theme + Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm"
            title="Toggle Theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4.5 h-4.5 text-slate-700" />
            ) : (
              <Sun className="w-4.5 h-4.5 text-amber-400" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm"
          >
            {isOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl animate-fadeIn p-4 space-y-2 z-40 shadow-xl">
          {navLinks.map((link) => {
            const isActive = link.isHash 
              ? location.pathname === '/' && location.hash === `#${link.path}`
              : location.pathname === link.path && !location.hash;

            return (
              <button
                key={link.label}
                onClick={() => link.isHash ? handleHashNav(link.path) : (setIsOpen(false), navigate(link.path))}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl text-left border-none shadow-none bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900/60",
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-950/20"
                    : "text-slate-650 dark:text-slate-400"
                )}
              >
                {link.icon && React.createElement(link.icon, { className: "w-4 h-4" })}
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
