import React from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/shared/Card';
import { ShieldAlert, Award, BrainCircuit, Rocket, Code, Layers, Milestone, CheckCircle2 } from 'lucide-react';

import { SiReact, SiTypescript, SiVite, SiTailwindcss, SiRadixui, SiReactrouter, SiReactquery, SiPython, SiFlask, SiSupabase } from "react-icons/si";
import { Atom, BarChart2, Box, FlaskConical } from "lucide-react";

interface TechCardProps {
  name: string;
  icon: React.ElementType;
  desc: string;
  color: string;
}

const TechCard = ({ name, icon: Icon, desc, color }: TechCardProps) => (
  <div className="flex flex-col items-center text-center p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/40 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <div className={`p-3 rounded-xl mb-3 ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-0.5">{name}</h4>
    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{desc}</p>
  </div>
);

const About = () => {
  const technologies = [
    { name: 'React 18', desc: 'Component architecture and state management', icon: Code },
    { name: 'Tailwind CSS', desc: 'Modern responsive styling & design tokens', icon: Layers },
    { name: 'PyTorch', desc: 'Deep learning framework backing ML predictions', icon: BrainCircuit },
    { name: 'Flask / Python', desc: 'High-performance chemical inference API service', icon: Rocket },
  ];

  const milestones = [
    { phase: 'Phase 1', title: 'ML Model Integration', desc: 'Connected structural predictors & conformer render algorithms.', status: 'Completed' },
    { phase: 'Phase 2', title: '3D Interaction & Optimization', desc: 'Enabled real-time molecular orientation & visual feedback loop.', status: 'Completed' },
    { phase: 'Phase 3', title: 'High-Throughput Virtual Screening', desc: 'Enabling multi-smile batch job scheduling & screening workflows.', status: 'In Progress' },
    { phase: 'Phase 4', title: 'Generative Adversarial Design', desc: 'Reinforcement learning feedback loop for automated molecule editing.', status: 'Upcoming' },
  ];


  function TechCard({ name, icon: Icon, desc, color }: {
    name: string;
    icon: React.ElementType;
    desc: string;
    color: string;
  }) {
    return (
      <Card className="flex flex-col items-start p-5 gap-3">
        <div className={`p-2.5 rounded-xl ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-tight mb-0.5">
            {name}
          </h4>
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{desc}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/50 to-indigo-50/50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <Navbar />

      <main className="flex-grow container px-4 py-12 mx-auto max-w-7xl">
        <PageHeader
          title="About the AI-Powered"
          gradientTitle="Drug Discovery Platform"
          subtitle="Empowering computational chemists with deep learning pipelines to explore molecular properties and generate novel therapeutic derivatives."
        />

        {/* Project Overview & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400">
                <BrainCircuit className="w-6 h-6" />
                <h3 className="text-xl font-bold">Project Overview</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed mb-4">
                DrugGen Platform combines computational chemistry with modern machine learning to make early-stage drug discovery faster and more intuitive.
              </p>
              <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed mb-4">
                Researchers can paste a molecule's SMILES string directly into the workspace — the platform immediately runs property optimization, renders an interactive 3D atomic structure, and returns quantitative drug-likeness scores. No switching between tools, no multi-step modeling pipelines.
              </p>

              <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
                The goal is simple: put powerful molecular analysis in one place, so chemists can focus on the science rather than the workflow.
              </p>
            </div>
          </Card>

          {/*AIM SECTION */}
          <Card className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400">
                <Award className="w-6 h-6" />
                <h3 className="text-xl font-bold">Aim</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed mb-4">
                Traditional drug discovery takes 10–12 years and costs billions — much of that time lost in early screening phases that rely on fragmented, specialist tools.
              </p>
              <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed mb-4">
                DrugGen aims to change that. By bringing machine learning-powered screening directly into an accessible visual workspace, researchers can evaluate molecular candidates for drug-likeness, pharmacokinetics, and toxicity — all in one place, in real time.
              </p>

              <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed mb-4">
                The goal is to lower the barrier to early-stage drug discovery, so that promising molecular leads can be identified faster, without requiring a full computational chemistry infrastructure to get started.
              </p>
            </div>
          </Card>
        </div>

        {/* Technologies Used */}
        {/* <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8 text-center">
            Technological Stack
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech) => (
              <Card key={tech.name} className="flex flex-col items-center text-center p-6">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl mb-4">
                  {React.createElement(tech.icon, { className: "w-6 h-6" })}
                </div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">{tech.name}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{tech.desc}</p>
              </Card>
            ))}
          </div>
        </div> */}

        {/* Technologies Used */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8 text-center">
            Technological Stack
          </h3>

          {/* Core */}
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 px-1">
              Core
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "React", icon: SiReact, desc: "UI component library", color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400" },
                { name: "TypeScript", icon: SiTypescript, desc: "Type-safe JavaScript", color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400" },
                { name: "Vite", icon: SiVite, desc: "Fast build tooling", color: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400" },
              ].map((tech) => (
                <TechCard key={tech.name} {...tech} />
              ))}
            </div>
          </div>


          {/* Styling & UI */}
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 px-1">
              Styling & UI
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "Tailwind CSS", icon: SiTailwindcss, desc: "Utility-first styling", color: "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400" },
                { name: "Shadcn / Radix UI", icon: SiRadixui, desc: "Accessible components", color: "bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400" },
                { name: "Lucide React", icon: Box, desc: "Icon library", color: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400" },
              ].map((tech) => (
                <TechCard key={tech.name} {...tech} />
              ))}
            </div>
          </div>

          {/* Routing & State */}
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 px-1">
              Routing & State
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "React Router", icon: SiReactrouter, desc: "Client-side routing", color: "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400" },
                { name: "React Query", icon: SiReactquery, desc: "Server state management", color: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" },
              ].map((tech) => (
                <TechCard key={tech.name} {...tech} />
              ))}
            </div>
          </div>

          {/* Data & Chemistry */}
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 px-1">
              Data & Chemistry
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "Recharts", icon: BarChart2, desc: "Data visualization", color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400" },
                { name: "Marvin JS", icon: Atom, desc: "Chemical sketching", color: "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400" },
                { name: "RDKit", icon: FlaskConical, desc: "Structure validation", color: "bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400" },
              ].map((tech) => (
                <TechCard key={tech.name} {...tech} />
              ))}
            </div>
          </div>

          {/* Backend & Database */}
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 px-1">
              Backend & Database
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "Python", icon: SiPython, desc: "Server-side language", color: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" },
                { name: "Flask", icon: SiFlask, desc: "REST API framework", color: "bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400" },
                { name: "Supabase", icon: SiSupabase, desc: "PostgreSQL & auth", color: "bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400" },
              ].map((tech) => (
                <TechCard key={tech.name} {...tech} />
              ))}
            </div>
          </div>
        </div>

        {/* Future Roadmap */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8 text-center">
            Future Development Roadmap
          </h3>
          <div className="max-w-4xl mx-auto space-y-6">
            {milestones.map((m) => (
              <Card key={m.phase} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                    {m.phase}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{m.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{m.desc}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold select-none ${m.status === 'Completed'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/30'
                  : m.status === 'In Progress'
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/30'
                    : 'bg-slate-50 text-slate-600 dark:bg-slate-900/30 dark:text-slate-450 border border-slate-200/50 dark:border-slate-850/30'
                  }`}>
                  {m.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {m.status}
                </span>
              </Card>
            ))}
          </div>
        </div>

        {/* Developer Information */}
        <Card className="max-w-xl mx-auto p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg mb-4">
            SD
          </div>
          <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100">Sharon Darla</h3>
          <p className="text-blue-600 dark:text-blue-400 text-xs font-semibold mt-1">Computer Science Engineer</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-3 leading-relaxed max-w-sm">
            AI and web development enthusiast with a strong foundation in machine learning, cheminformatics, and software development. Passionate about building innovative solutions that accelerate drug discovery and improve patient outcomes.
          </p>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default About;
