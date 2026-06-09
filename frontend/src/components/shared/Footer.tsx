import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FlaskConical, Github, Linkedin, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  const navigate = useNavigate();

  const handleHashNav = (hash: string) => {
    if (window.location.pathname === '/') {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${hash}`);
    }
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/50 py-12 transition-colors duration-300">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <Link 
              to="/" 
              className="flex items-center gap-2.5 font-bold text-lg text-slate-850 dark:text-slate-100"
            >
              <div className="p-1.5 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/10">
                <FlaskConical className="w-4.5 h-4.5" />
              </div>
              <span>DrugGen <span className="text-[10px] text-blue-500 font-bold">AI</span></span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-sm">
              An AI-powered molecule design and analysis application built for bioinformaticians and drug researchers. Accelerate research workflow by running generative pipelines on demand.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com/SharonDarla" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/sharon-darla/" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="mailto:darlasharon94@gmail.com"
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                aria-label="Email Support"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <button 
                  onClick={() => handleHashNav('studio')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left bg-transparent p-0 border-none shadow-none font-medium text-xs text-slate-500 dark:text-slate-400"
                >
                  Molecule Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleHashNav('analysis')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left bg-transparent p-0 border-none shadow-none font-medium text-xs text-slate-500 dark:text-slate-400"
                >
                  Analysis
                </button>
              </li>
              <li>
                <Link to="/history" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">History Log</Link>
              </li>
            </ul>
          </div>

          {/* Platform Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <li>
                <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Support</Link>
              </li>
              <li>
                <span className="cursor-not-allowed opacity-50">SMILES Documentation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-slate-200/50 dark:border-slate-800/50 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 dark:text-slate-500">
          <span>&copy; {new Date().getFullYear()} DrugGen AI. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Designed for biotechnology advancement with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          </span>
        </div>
      </div>
    </footer>
  );
};
