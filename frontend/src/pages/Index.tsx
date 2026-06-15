import React, { useState, useEffect } from 'react';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Card } from '@/components/shared/Card';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  ArrowRight, Beaker, Microscope, FlaskConical, ArrowDownToLine, 
  RotateCcw, BrainCircuit, HeartHandshake, History, CheckCircle2 
} from 'lucide-react';
import Molecule, { MoleculeData } from '@/components/Molecule';
import MoleculeExportButton from '@/components/MoleculeExportButton';
import TrendCard from '@/components/TrendCard';
import { cn } from '@/lib/utils';

// Sample molecule data for demonstration
const sampleInputMolecule: MoleculeData = {
  id: 'aspirin',
  name: 'Input Drug',
  atoms: [
    { id: 'C1', element: 'C', x: 0, y: 0, z: 0 },
    { id: 'C2', element: 'C', x: 1.5, y: 0, z: 0 },
    { id: 'C3', element: 'C', x: 2.25, y: 1.3, z: 0 },
    { id: 'C4', element: 'C', x: 1.5, y: 2.6, z: 0 },
    { id: 'C5', element: 'C', x: 0, y: 2.6, z: 0 },
    { id: 'C6', element: 'C', x: -0.75, y: 1.3, z: 0 },
    { id: 'C7', element: 'C', x: 3.75, y: 1.3, z: 0 },
    { id: 'O1', element: 'O', x: 4.5, y: 0.3, z: 0 },
    { id: 'O2', element: 'O', x: 4.25, y: 2.6, z: 0 },
    { id: 'C8', element: 'C', x: 5.75, y: 2.6, z: 0 },
    { id: 'C9', element: 'C', x: 6.25, y: 4, z: 0 },
    { id: 'O3', element: 'O', x: 7.75, y: 4, z: 0 },
    { id: 'O4', element: 'O', x: 5.5, y: 5, z: 0 },
  ],
  bonds: [
    { id: 'b1', source: 'C1', target: 'C2', type: 'single' },
    { id: 'b2', source: 'C2', target: 'C3', type: 'single' },
    { id: 'b3', source: 'C3', target: 'C4', type: 'single' },
    { id: 'b4', source: 'C4', target: 'C5', type: 'single' },
    { id: 'b5', source: 'C5', target: 'C6', type: 'single' },
    { id: 'b6', source: 'C6', target: 'C1', type: 'single' },
    { id: 'b7', source: 'C3', target: 'C7', type: 'single' },
    { id: 'b8', source: 'C7', target: 'O1', type: 'double' },
    { id: 'b9', source: 'C7', target: 'O2', type: 'single' },
    { id: 'b10', source: 'O2', target: 'C8', type: 'single' },
    { id: 'b11', source: 'C8', target: 'C9', type: 'single' },
    { id: 'b12', source: 'C9', target: 'O3', type: 'single' },
    { id: 'b13', source: 'C9', target: 'O4', type: 'double' },
  ]
};

const sampleGeneratedMolecule: MoleculeData = {
  id: 'derivative',
  name: 'Generated Drug',
  atoms: [
    { id: 'C1', element: 'C', x: 0, y: 0, z: 0 },
    { id: 'C2', element: 'C', x: 1.5, y: 0, z: 0 },
    { id: 'C3', element: 'C', x: 2.25, y: 1.3, z: 0 },
    { id: 'C4', element: 'C', x: 1.5, y: 2.6, z: 0 },
    { id: 'C5', element: 'C', x: 0, y: 2.6, z: 0 },
    { id: 'C6', element: 'C', x: -0.75, y: 1.3, z: 0 },
    { id: 'C7', element: 'C', x: 3.75, y: 1.3, z: 0 },
    { id: 'O1', element: 'O', x: 4.5, y: 0.3, z: 0 },
    { id: 'O2', element: 'O', x: 4.25, y: 2.6, z: 0 },
    { id: 'C8', element: 'C', x: 5.75, y: 2.6, z: 0 },
    { id: 'C9', element: 'C', x: 6.25, y: 4, z: 0 },
    { id: 'O3', element: 'O', x: 7.75, y: 4, z: 0 },
    { id: 'O4', element: 'O', x: 5.5, y: 5, z: 0 },
    { id: 'F1', element: 'F', x: -2.25, y: 1.3, z: 0 },
    { id: 'N1', element: 'N', x: 2.25, y: 4, z: 0 },
  ],
  bonds: [
    { id: 'b1', source: 'C1', target: 'C2', type: 'single' },
    { id: 'b2', source: 'C2', target: 'C3', type: 'single' },
    { id: 'b3', source: 'C3', target: 'C4', type: 'single' },
    { id: 'b4', source: 'C4', target: 'C5', type: 'single' },
    { id: 'b5', source: 'C5', target: 'C6', type: 'single' },
    { id: 'b6', source: 'C6', target: 'C1', type: 'single' },
    { id: 'b7', source: 'C3', target: 'C7', type: 'single' },
    { id: 'b8', source: 'C7', target: 'O1', type: 'double' },
    { id: 'b9', source: 'C7', target: 'O2', type: 'single' },
    { id: 'b10', source: 'O2', target: 'C8', type: 'single' },
    { id: 'b11', source: 'C8', target: 'C9', type: 'single' },
    { id: 'b12', source: 'C9', target: 'O3', type: 'single' },
    { id: 'b13', source: 'C9', target: 'O4', type: 'double' },
    { id: 'b14', source: 'C6', target: 'F1', type: 'single' },
    { id: 'b15', source: 'C4', target: 'N1', type: 'single' },
  ]
};

// Sample trend data
const trendData = [
  {
    id: 1,
    title: 'Kinase Inhibitors',
    description: 'Rising interest in selective kinase inhibitors for cancer therapy with reduced side effects.',
    timestamp: 'Updated 3 hours ago',
    tags: ['Cancer', 'Kinase', 'Selective Targeting'],
    metric: {
      label: 'Publications this month',
      value: 287,
      trend: 'up' as const,
    }
  },
  {
    id: 2,
    title: 'Antibody-Drug Conjugates',
    description: 'ADCs showing increased effectiveness in clinical trials for targeted cancer treatment.',
    timestamp: 'Updated yesterday',
    tags: ['Antibody', 'Conjugates', 'Targeted Therapy'],
    metric: {
      label: 'Active clinical trials',
      value: 42,
      trend: 'up' as const,
    }
  },
  {
    id: 3,
    title: 'RNA Therapeutics',
    description: 'mRNA and siRNA technologies gaining traction beyond vaccines for treating genetic disorders.',
    timestamp: 'Updated 2 days ago',
    tags: ['RNA', 'Genetic', 'Novel Modality'],
    metric: {
      label: 'Market growth rate',
      value: '24%',
      trend: 'up' as const,
    }
  },
  {
    id: 4,
    title: 'Proteolysis Targeting Chimeras',
    description: 'PROTAC technology enabling degradation of previously "undruggable" protein targets.',
    timestamp: 'Updated 1 week ago',
    tags: ['PROTAC', 'Protein Degradation', 'Novel Mechanism'],
    metric: {
      label: 'Industry partnerships',
      value: 18,
      trend: 'up' as const,
    }
  }
];

const Index = () => {
  const { toast } = useToast();
  const [smiles, setSmiles] = useState('');
  const [inputMolecule, setInputMolecule] = useState<MoleculeData | null>(sampleInputMolecule);
  const [generatedMolecule, setGeneratedMolecule] = useState<MoleculeData | null>(sampleGeneratedMolecule);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('generation');
  const [activeVisualizerTab, setActiveVisualizerTab] = useState<'3d' | '2d'>('3d');
  const [inputImage, setInputImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [properties, setProperties] = useState<any | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);

  const handleGenerate = () => {
    if (!smiles.trim()) {
      toast({
        title: 'Please enter a SMILES string',
        description: 'A valid molecular structure is required for generation',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    fetch(`${(import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ smiles: smiles.trim() })
    })
      .then(async res => {
        if (!res.ok) {
          let errMsg = "Failed to process molecular structure on the backend.";
          try {
            const errData = await res.json();
            errMsg = errData.error || errMsg;
          } catch (_) {
            try {
              const rawText = await res.text();
              if (rawText && rawText.length < 100) {
                errMsg = rawText;
              }
            } catch (__) { }
          }
          throw new Error(errMsg);
        }
        return res.json();
      })
      .then(data => {
        setIsLoading(false);
        if (data.success) {
          setProperties(data);
          setPrediction(data.prediction);
          setInputMolecule({
            id: 'input-mol',
            name: 'Input Structure',
            atoms: data.input.conformer.atoms,
            bonds: data.input.conformer.bonds
          });
          setGeneratedMolecule({
            id: 'gen-mol',
            name: 'AI Optimized Derivative',
            atoms: data.generated.conformer.atoms,
            bonds: data.generated.conformer.bonds
          });
          setInputImage(`data:image/png;base64,${data.input.image}`);
          setGeneratedImage(`data:image/png;base64,${data.generated.image}`);
          setActiveTab('properties'); // Automatically open the Live Property Analysis comparison tab!
          toast({
            title: 'Molecule Optimized',
            description: 'AI inference and 3D molecular conformations generated successfully.',
          });
        } else {
          throw new Error(data.error || "Prediction did not return a valid result.");
        }
      })
      .catch(err => {
        setIsLoading(false);
        toast({
          title: 'Optimization Failed',
          description: err.message || "Could not connect to the ML backend. Ensure app.py is running.",
          variant: 'destructive',
        });
      });
  };

  const handleReset = () => {
    setSmiles('');
    setInputMolecule(sampleInputMolecule);
    setGeneratedMolecule(sampleGeneratedMolecule);
    setInputImage(null);
    setGeneratedImage(null);
    setProperties(null);
    setPrediction(null);
    setActiveVisualizerTab('3d');
  };

  const features = [
    { title: 'Molecule Design', desc: 'Enter SMILES strings to generate optimized chemical derivatives.', icon: Beaker },
    { title: 'Molecular Analysis', desc: 'Assess physical attributes like LogP, Molecular Weight, and rotatable bonds.', icon: Microscope },
    { title: 'Drug-Likeness Prediction', desc: 'AI evaluation of Lipinski suitability and QED candidate viability.', icon: FlaskConical },
    { title: 'Export & Save', desc: 'Download optimized structures, conformations, and property logs.', icon: ArrowDownToLine },
    { title: 'AI Insights', desc: 'Receive predictions for GPCR binding, kinase inhibition, and toxicity.', icon: BrainCircuit },
    { title: 'Research Workflow', desc: 'Accelerate hit-to-lead development with automated chemical workflows.', icon: History },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/50 to-indigo-50/50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 border-b border-slate-100 dark:border-slate-800/40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="container px-4 mx-auto max-w-7xl relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/45 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/40 mb-6 shadow-sm animate-pulse-subtle">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            Version 2.0 ML Pipeline Active
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-850 dark:text-slate-100 max-w-4xl leading-tight">
            AI-Powered{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Drug Discovery
            </span>{' '}
            Platform
          </h1>
          
          <p className="mt-6 text-sm sm:text-base lg:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Design, analyze and explore molecules using modern AI/ML computational tools. Instantly optimize chemical structures for absorption, bioavailability, and binding target scores.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' })}
              className="group rounded-xl shadow-lg"
            >
              Start Exploring
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="secondary"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Cards Showcase */}
      <section id="features" className="py-16 bg-slate-50/30 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800/30">
        <div className="container px-4 mx-auto max-w-7xl">
          <PageHeader 
            title="Core Platform"
            gradientTitle="Capabilities"
            subtitle="Explore our integrated chemical intelligence toolset supporting next-generation computational analysis."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {features.map((feature, i) => (
              <Card 
                key={feature.title} 
                className="flex flex-col items-start p-6 hover:-translate-y-1 transition-all duration-350"
              >
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl mb-4 shadow-inner">
                  {React.createElement(feature.icon, { className: "w-5.5 h-5.5" })}
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-2">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Molecule Studio (Generator) */}
      <section id="studio" className="py-16 border-b border-slate-100 dark:border-slate-800/40">
        <div className="container px-4 mx-auto max-w-7xl">
          <PageHeader 
            title="Interactive"
            gradientTitle="Molecule Studio"
            subtitle="Enter chemical structures via SMILES and view real-time AI optimized conformers."
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 mt-8">
            {/* Left Controls */}
            <div className="lg:col-span-4">
              <Card hoverEffect={false} className="overflow-hidden border border-slate-150/60 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm shadow-md">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800/80">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-850 dark:text-slate-100">
                    <Beaker className="w-5 h-5 text-blue-600" />
                    Molecule Optimizer
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                    Optimize chemical inputs for biological lead candidates
                  </p>
                </div>
                
                <div className="p-5 space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="smiles" className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      SMILES String
                    </label>
                    <Input
                      id="smiles"
                      placeholder="e.g. CC(=O)OC1=CC=CC=C1C(=O)O"
                      value={smiles}
                      onChange={(e) => setSmiles(e.target.value)}
                      isMono={true}
                    />
                    <p className="text-[10px] text-slate-450 dark:text-slate-400/70 leading-normal">
                      Example: Aspirin = <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-600 dark:text-blue-400 text-[9px]">CC(=O)OC1=CC=CC=C1C(=O)O</code>
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <Button
                      onClick={handleGenerate}
                      className="w-full text-center"
                      isLoading={isLoading}
                    >
                      Optimize Molecule
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleReset}
                      className="w-full text-center"
                    >
                      <RotateCcw className="w-4 h-4 mr-1.5" /> Reset Studio
                    </Button>
                  </div>
                </div>

                <div className="p-5 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-3">Target Criteria:</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-450 border border-emerald-250/30">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      Solubility LogP
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-450 border border-blue-250/30">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      Bioavailability
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-450 border border-purple-250/30">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      Low Toxicity
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Visualizer */}
            <div className="lg:col-span-8">
              <Card hoverEffect={false} className="h-full border border-slate-150/60 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm shadow-md flex flex-col justify-between">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2 text-slate-850 dark:text-slate-100">
                      <Microscope className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      Visual Representation
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                      Compare atomic 3D conformers side-by-side
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 p-1 gap-1 shadow-sm">
                      <Button
                        variant={activeVisualizerTab === '3d' ? 'primary' : 'ghost'}
                        size="sm"
                        className="h-8 px-3.5 rounded-lg text-xs"
                        onClick={() => setActiveVisualizerTab('3d')}
                      >
                        Interactive 3D
                      </Button>
                      <Button
                        variant={activeVisualizerTab === '2d' ? 'primary' : 'ghost'}
                        size="sm"
                        className="h-8 px-3.5 rounded-lg text-xs"
                        onClick={() => setActiveVisualizerTab('2d')}
                      >
                        2D Diagram
                      </Button>
                    </div>

                    <MoleculeExportButton
                      molecule={generatedMolecule}
                      moleculeImage={generatedImage}
                      smilesString={properties?.generated?.smiles}
                    />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input Molecule */}
                    <div className="flex flex-col items-center p-4 border border-slate-100 dark:border-slate-800/80 rounded-2xl bg-white dark:bg-slate-950 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-3 left-3 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold px-2 py-0.5 rounded-lg text-[9px] uppercase tracking-wider z-10">
                        Input Compound
                      </div>
                      <div className="flex items-center justify-center w-full h-72 bg-slate-50/40 dark:bg-slate-900/40 rounded-xl overflow-hidden mt-4 border border-slate-100/50 dark:border-slate-900/30">
                        {activeVisualizerTab === '3d' ? (
                          inputMolecule ? (
                            <Molecule data={inputMolecule} size="lg" animate={true} />
                          ) : (
                            <div className="flex flex-col items-center justify-center p-10 text-slate-400 dark:text-slate-500 text-xs">
                              <ArrowDownToLine className="w-8 h-8 mb-2 animate-bounce" />
                              <span>No Conformer Available</span>
                            </div>
                          )
                        ) : (
                          inputImage ? (
                            <img src={inputImage} alt="Input Chemical Diagram" className="object-contain w-full h-full max-h-64 p-2 transition-transform duration-300 hover:scale-105" />
                          ) : (
                            <div className="flex flex-col items-center justify-center p-10 text-slate-400 dark:text-slate-500 text-xs">
                              <Microscope className="w-8 h-8 mb-2" />
                              <span>Diagram loads on optimization</span>
                            </div>
                          )
                        )}
                      </div>
                      {properties && (
                        <div className="mt-4 text-[10px] font-mono text-center max-w-full truncate text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800">
                          SMILES: {properties.input.smiles}
                        </div>
                      )}
                    </div>

                    {/* Generated Molecule */}
                    <div className="flex flex-col items-center p-4 border border-slate-100 dark:border-slate-800/80 rounded-2xl bg-white dark:bg-slate-950 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-3 left-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-lg text-[9px] uppercase tracking-wider z-10">
                        Optimized Derivative
                      </div>
                      <div className="flex items-center justify-center w-full h-72 bg-slate-50/40 dark:bg-slate-900/40 rounded-xl overflow-hidden mt-4 border border-slate-100/50 dark:border-slate-900/30">
                        {activeVisualizerTab === '3d' ? (
                          generatedMolecule ? (
                            <Molecule data={generatedMolecule} size="lg" animate={true} />
                          ) : (
                            <div className="flex flex-col items-center justify-center p-10 text-slate-400 dark:text-slate-500 text-xs">
                              <ArrowDownToLine className="w-8 h-8 mb-2 animate-bounce" />
                              <span>No Conformer Available</span>
                            </div>
                          )
                        ) : (
                          generatedImage ? (
                            <img src={generatedImage} alt="Generated Chemical Diagram" className="object-contain w-full h-full max-h-64 p-2 transition-transform duration-300 hover:scale-105" />
                          ) : (
                            <div className="flex flex-col items-center justify-center p-10 text-slate-400 dark:text-slate-500 text-xs">
                              <Microscope className="w-8 h-8 mb-2" />
                              <span>Diagram loads on optimization</span>
                            </div>
                          )
                        )}
                      </div>
                      {properties && (
                        <div className="mt-4 text-[10px] font-mono text-center max-w-full truncate text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800">
                          SMILES: {properties.generated.smiles}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {properties && (
                  <div className="px-5 py-3.5 bg-indigo-50/20 dark:bg-indigo-950/20 border-t border-indigo-100/10 text-xs font-semibold text-indigo-700 dark:text-indigo-300 flex justify-between items-center rounded-b-2xl">
                    <span>Inference execution complete.</span>
                    <span>Structural Tanimoto Similarity: {(properties.similarity * 100).toFixed(1)}%</span>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Insights & Property Analysis (Analysis Section) */}
      <section id="analysis" className="py-16 bg-slate-50/30 dark:bg-slate-950/10">
        <div className="container px-4 mx-auto max-w-7xl">
          <PageHeader 
            title="Discovery Insights &"
            gradientTitle="Property Analysis"
            subtitle="Examine dynamic comparative properties and current pharmaceutical focus areas."
          />

          <div className="mt-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full sm:w-[460px] grid-cols-2 p-1 bg-slate-200/70 dark:bg-slate-800/80 rounded-2xl border border-slate-300/60 dark:border-slate-700/60 shadow-inner">
                  <TabsTrigger 
                    value="generation" 
                    className="rounded-xl py-2 text-xs sm:text-sm font-bold text-slate-650 dark:text-slate-350 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-md border border-transparent data-[state=active]:border-slate-205 dark:data-[state=active]:border-slate-805 transition-all"
                  >
                    Discovery Insights
                  </TabsTrigger>
                  <TabsTrigger 
                    value="properties" 
                    className="rounded-xl py-2 text-xs sm:text-sm font-bold text-slate-650 dark:text-slate-350 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-md border border-transparent data-[state=active]:border-slate-205 dark:data-[state=active]:border-slate-805 transition-all"
                  >
                    Live Property Analysis
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="generation" className="animate-fadeIn">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {trendData.map(trend => (
                    <TrendCard
                      key={trend.id}
                      title={trend.title}
                      description={trend.description}
                      timestamp={trend.timestamp}
                      tags={trend.tags}
                      metric={trend.metric}
                      className="shadow-sm border-slate-100 hover:shadow-md animate-fadeIn"
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="properties" className="animate-fadeIn">
                {prediction !== null && properties !== null && (
                  <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-6 border border-white/10 animate-fadeIn">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
                        <FlaskConical className="w-5 h-5 text-blue-200 animate-pulse" />
                        AI Drug-Likeness Index
                      </h3>
                      <p className="text-white/80 text-xs max-w-xl leading-relaxed">
                         Suitability score computed from structural classification, Lipinski rule violations, and quantitative estimates of drug-likeness.
                      </p>
                    </div>
                    <div className="flex items-center gap-4 bg-white/10 px-6 py-4.5 rounded-2xl backdrop-blur-md border border-white/10 w-full md:w-auto justify-around shadow-inner">
                      <div className="text-center">
                        <div className="text-[9px] uppercase tracking-widest text-indigo-200 font-bold">Predicted Index</div>
                        <div className="text-3xl font-extrabold font-mono tracking-tight text-white mt-1">
                          {prediction}%
                        </div>
                      </div>
                      <div className="h-8 w-px bg-white/20" />
                      <div className="text-center">
                        <div className="text-[9px] uppercase tracking-widest text-indigo-200 font-bold">Similarity Score</div>
                        <div className="text-3xl font-extrabold font-mono tracking-tight text-white mt-1">
                          {(properties.similarity * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {/* Pharmacokinetics */}
                  <Card hoverEffect={false} className="p-5 shadow-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                      Pharmacokinetic Profile
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
                        <span>Physical Metric</span>
                        <div className="flex gap-6">
                          <span className="w-14 text-right">Input</span>
                          <span className="w-14 text-right">Gen</span>
                        </div>
                      </li>
                      {[
                        ['LogP', properties ? properties.input.properties.logp : '1.19', properties ? properties.generated.properties.logp : '1.37'],
                        ['Molecular Weight', properties ? properties.input.properties.mw : '180.16', properties ? properties.generated.properties.mw : '198.15'],
                        ['QED Score', properties ? properties.input.properties.qed : '0.48', properties ? properties.generated.properties.qed : '0.52'],
                        ['H-Bond Donors', properties ? properties.input.properties.hbd : '1', properties ? properties.generated.properties.hbd : '1'],
                        ['H-Bond Acceptors', properties ? properties.input.properties.hba : '3', properties ? properties.generated.properties.hba : '3'],
                        ['Rotatable Bonds', properties ? properties.input.properties.rot_bonds : '2', properties ? properties.generated.properties.rot_bonds : '2'],
                      ].map(([label, inp, gen]) => (
                        <li key={String(label)} className="flex justify-between items-center text-xs p-1 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors duration-150">
                          <span className="text-slate-650 dark:text-slate-400 font-medium">{label}</span>
                          <div className="flex gap-6 font-mono text-xs">
                            <span className="w-14 text-right text-slate-400 font-medium">{inp}</span>
                            <span className="w-14 text-right text-teal-650 dark:text-teal-400 font-bold">{gen}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Bioactivity */}
                  <Card hoverEffect={false} className="p-5 shadow-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                      Bioactivity Target Profile
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
                        <span>Target Protein</span>
                        <span className="text-right">Probability</span>
                      </li>
                      {[
                        ['Kinase Inhibition', properties ? properties.bioactivity.kinase_inhibition : 87],
                        ['GPCR Binding', properties ? properties.bioactivity.gpcr_binding : 54],
                        ['Ion Channel Modulation', properties ? properties.bioactivity.ion_channel : 12],
                        ['Nuclear Receptor Binding', properties ? properties.bioactivity.nuclear_receptor : 78],
                      ].map(([label, val]) => {
                        const score = Number(val);
                        const isHigh = score > 60;
                        const isMed = score >= 40;
                        return (
                          <li key={String(label)} className="space-y-1 text-xs">
                            <div className="flex justify-between font-medium">
                              <span className="text-slate-650 dark:text-slate-400">{label}</span>
                              <span className={cn(
                                "font-bold",
                                isHigh ? 'text-emerald-600 dark:text-emerald-400' : isMed ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500'
                              )}>{score.toFixed(1)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full rounded-full transition-all duration-300",
                                  isHigh ? 'bg-emerald-500' : isMed ? 'bg-amber-500' : 'bg-slate-400'
                                )}
                                style={{ width: `${score}%` }}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </Card>

                  {/* Toxicity */}
                  <Card hoverEffect={false} className="p-5 shadow-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                      Toxicity Risk Classification
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
                        <span>Toxicology Category</span>
                        <span className="text-right">Risk Classification</span>
                      </li>
                      {[
                        ['Hepatotoxicity Risk', properties ? properties.toxicity.hepatotoxicity : 'Low Risk'],
                        ['Cardiotoxicity Risk', properties ? properties.toxicity.cardiotoxicity : 'Medium Risk'],
                        ['Mutagenicity Risk', properties ? properties.toxicity.mutagenicity : 'Low Risk'],
                        ['Skin Sensitization', properties ? properties.toxicity.skin_sensitization : 'Low Risk'],
                      ].map(([label, risk]) => {
                        const isHigh = risk === 'High Risk';
                        const isMed = risk === 'Medium Risk';
                        return (
                          <li key={String(label)} className="flex justify-between items-center text-xs p-1 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors duration-150">
                            <span className="text-slate-650 dark:text-slate-400 font-medium">{label}</span>
                            <span className={cn(
                              "font-bold px-2 py-0.5 rounded-lg text-[9px] uppercase tracking-wider select-none text-white",
                              isHigh ? 'bg-rose-500' : isMed ? 'bg-amber-500' : 'bg-emerald-500'
                            )}>
                              {risk}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
