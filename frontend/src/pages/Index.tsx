import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight, Beaker, Microscope, FlaskConical, ArrowDownToLine, RotateCcw, Sun, Moon, History } from 'lucide-react';
import { Link } from 'react-router-dom';
import Molecule, { MoleculeData } from '@/components/Molecule';
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

    fetch("http://localhost:5000/predict", {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/50 dark:border-slate-800/50 mb-6">
        <div className="container px-4 mx-auto max-w-7xl flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg text-slate-800 dark:text-slate-100 hover:opacity-80 transition-opacity">
              <FlaskConical className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              DrugGen 
            </Link>
            <div className="flex items-center gap-1">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  <Beaker className="w-4 h-4 mr-1.5" /> Generator
                </Button>
              </Link>
              <Link to="/history">
                <Button variant="ghost" size="sm" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                  <History className="w-4 h-4 mr-1.5" /> History
                </Button>
              </Link>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="w-9 h-9 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-sm hover:shadow transition-all duration-200 hover:scale-105"
            title="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-slate-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </Button>
        </div>
      </nav>

      <div className="container px-4 py-4 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center mb-12 text-center animate-fadeIn">
          <div className="flex items-center gap-2 mb-4">
            <FlaskConical className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">Drug Molecule Generator</h1>
          </div>
          <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-350">
            Transform chemical structures using advanced AI to discover new drug candidates with enhanced properties and therapeutic potential.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column - Controls */}
          <div className="lg:col-span-4">
            <Card className="overflow-hidden h-full animate-fadeIn transition-all duration-200 hover:-translate-y-1 hover:shadow-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xl font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-100">
                  <Beaker className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Molecule Generator
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 text-sm">
                  Enter a SMILES string to generate novel molecular structures
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="smiles" className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    SMILES String
                  </label>
                  <Input
                    id="smiles"
                    placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
                    value={smiles}
                    onChange={(e) => setSmiles(e.target.value)}
                    className="font-mono rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 focus-visible:ring-blue-500/30 transition-all text-slate-800 dark:text-slate-100"
                  />
                  <p className="text-xs text-muted-foreground dark:text-slate-400/70">
                    Example: Aspirin = CC(=O)OC1=CC=CC=C1C(=O)O
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={handleGenerate}
                    className="w-full font-bold bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="font-bold flex items-center justify-center gap-1">
                        Generating<span className="loading font-bold">...</span>
                      </span>
                    ) : (
                      <span className="font-bold flex items-center justify-center gap-1">
                        Generate Molecule <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </div>

                <div className="pt-2">
                  <Button
                    variant="link"
                    onClick={handleReset}
                    className="w-full text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-semibold transition-all duration-200 hover:no-underline flex items-center justify-center gap-1.5 shadow-none bg-transparent hover:bg-transparent"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800 p-4">
                <div className="text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-3">Property Optimization:</div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 border border-green-200/50 dark:border-green-800/30">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Improved solubility
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/30">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Enhanced bioavailability
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/30">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    Reduced toxicity
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/30">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    Targeted binding affinity
                  </span>
                </div>
              </CardFooter>
            </Card>
          </div>


          {/* Right Column - Visualization */}
          <div className="lg:col-span-8">
            <Card className="h-full animate-fadeIn border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 rounded-xl flex flex-col justify-between">
              <CardHeader className="bg-gradient-to-r from-indigo-50/10 to-blue-50/10 dark:from-indigo-950/20 dark:to-blue-950/20 pb-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2 text-indigo-900 dark:text-indigo-300">
                    <Microscope className="w-5 h-5 text-indigo-650 dark:text-indigo-400" />
                    Interactive Molecular Explorer
                  </CardTitle>
                  <CardDescription className="text-slate-550 dark:text-slate-400 text-sm">
                    Explore and compare 3D conformations and 2D chemical structure diagrams side-by-side
                  </CardDescription>
                </div>
                <div className="flex border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-950 p-1 gap-1 shadow-sm">
                  <Button
                    variant={activeVisualizerTab === '3d' ? 'default' : 'ghost'}
                    size="sm"
                    className="h-8 px-3 rounded-md text-xs font-semibold"
                    onClick={() => setActiveVisualizerTab('3d')}
                  >
                    Interactive 3D
                  </Button>
                  <Button
                    variant={activeVisualizerTab === '2d' ? 'default' : 'ghost'}
                    size="sm"
                    className="h-8 px-3 rounded-md text-xs font-semibold"
                    onClick={() => setActiveVisualizerTab('2d')}
                  >
                    2D Diagram
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Left Column: Input Structure */}
                  <div className="flex flex-col items-center p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 shadow-sm relative overflow-hidden group transition-all duration-300 hover:shadow-md">
                    <div className="absolute top-3 left-3 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider z-10 shadow-sm">
                      Input Structure
                    </div>
                    <div className="flex items-center justify-center w-full h-80 bg-slate-50/40 dark:bg-slate-900/40 rounded-lg overflow-hidden mt-4 border border-slate-50 dark:border-slate-900">
                      {activeVisualizerTab === '3d' ? (
                        inputMolecule ? (
                          <Molecule data={inputMolecule} size="lg" animate={true} />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-10 text-slate-400 dark:text-slate-500">
                            <ArrowDownToLine className="w-10 h-10 mb-2 animate-bounce" />
                            <span>No Conformer Available</span>
                          </div>
                        )
                      ) : (
                        inputImage ? (
                          <img src={inputImage} alt="Input Chemical Diagram" className="object-contain w-full h-full max-h-72 p-2 mix-blend-multiply dark:mix-blend-normal transition-transform duration-300 hover:scale-105" />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-10 text-slate-400 dark:text-slate-500">
                            <Microscope className="w-10 h-10 mb-2" />
                            <span>Diagram loads on generation</span>
                          </div>
                        )
                      )}
                    </div>
                    {properties && (
                      <div className="mt-4 text-[11px] font-mono text-center max-w-full truncate text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded border border-slate-100 dark:border-slate-800">
                        SMILES: {properties.input.smiles}
                      </div>
                    )}
                  </div>

                  {/* Right Column: AI Derivative */}
                  <div className="flex flex-col items-center p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 shadow-sm relative overflow-hidden group transition-all duration-300 hover:shadow-md">
                    <div className="absolute top-3 left-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider z-10 shadow-sm">
                      AI Optimized Derivative
                    </div>
                    <div className="flex items-center justify-center w-full h-80 bg-slate-50/40 dark:bg-slate-900/40 rounded-lg overflow-hidden mt-4 border border-slate-50 dark:border-slate-900">
                      {activeVisualizerTab === '3d' ? (
                        generatedMolecule ? (
                          <Molecule data={generatedMolecule} size="lg" animate={true} />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-10 text-slate-400 dark:text-slate-500">
                            <ArrowDownToLine className="w-10 h-10 mb-2 animate-bounce" />
                            <span>No Conformer Available</span>
                          </div>
                        )
                      ) : (
                        generatedImage ? (
                          <img src={generatedImage} alt="Generated Chemical Diagram" className="object-contain w-full h-full max-h-72 p-2 mix-blend-multiply dark:mix-blend-normal transition-transform duration-300 hover:scale-105" />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-10 text-slate-400 dark:text-slate-500">
                            <Microscope className="w-10 h-10 mb-2" />
                            <span>Diagram loads on generation</span>
                          </div>
                        )
                      )}
                    </div>
                    {properties && (
                      <div className="mt-4 text-[11px] font-mono text-center max-w-full truncate text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded border border-slate-100 dark:border-slate-800">
                        SMILES: {properties.generated.smiles}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              {properties && (
                <div className="px-6 py-3 bg-indigo-50/20 dark:bg-indigo-950/20 border-t border-indigo-50/30 dark:border-indigo-900/30 text-xs font-semibold text-indigo-700 dark:text-indigo-300 flex justify-between items-center rounded-b-xl">
                  <span>ML structural optimization complete.</span>
                  <span>Fingerprint Similarity Index: {(properties.similarity * 100).toFixed(1)}%</span>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Trends & Property Comparison Sections */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Chemical Profiling & Discovery Trends</h2>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full sm:w-[450px] grid-cols-2 mb-6 bg-slate-100 dark:bg-slate-850 p-1 rounded-lg">
              <TabsTrigger value="generation" className="rounded-md py-2 font-semibold text-slate-700 dark:text-slate-300 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white">Discovery Insights</TabsTrigger>
              <TabsTrigger value="properties" className="rounded-md py-2 font-semibold text-slate-700 dark:text-slate-300 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white">Live Property Analysis</TabsTrigger>
            </TabsList>

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
                    className="shadow-sm hover:shadow-md border-slate-100 animate-fadeIn"
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="properties" className="animate-fadeIn">
              {prediction !== null && properties !== null && (
                <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg animate-fadeIn flex flex-col justify-between gap-4 border border-indigo-100/10">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-2 text-left">
                      <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <Beaker className="w-5 h-5 text-indigo-200 animate-pulse" />
                        AI DRUG-LIKENESS INDEX
                      </h3>
                      <p className="text-white/80 text-sm max-w-xl leading-relaxed">
                        This represents the overall suitability of the generated molecule as a therapeutic candidate, computed from the model's structural similarity score, Lipinski violations, and quantitative estimate of drug-likeness (QED).
                      </p>
                    </div>
                    <div className="flex items-center gap-4 bg-white/10 px-6 py-4 rounded-xl backdrop-blur-md border border-white/20 shadow-inner w-full md:w-auto justify-around">
                      <div className="text-center">
                        <div className="text-[10px] uppercase tracking-widest text-indigo-100/70 font-bold">PREDICTED INDEX</div>
                        <div className="text-4xl font-black font-mono tracking-tight text-white drop-shadow">
                          {prediction}%
                        </div>
                      </div>
                      <div className="h-10 w-px bg-white/20" />
                      <div className="text-center">
                        <div className="text-[10px] uppercase tracking-widest text-indigo-100/70 font-bold">SIMILARITY SCORE</div>
                        <div className="text-4xl font-black font-mono tracking-tight text-white drop-shadow">
                          {(properties.similarity * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-indigo-100/80 border-t border-white/10 pt-3 text-left">
                    💡 <span className="font-semibold">Hint:</span> A higher index score suggests superior pharmacokinetic suitability and drug-likeness, while similarity score indicates structural alignment with the input compound.
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                {/* Pharmacokinetic Profile */}
                <Card className="p-4 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm">
                  <CardHeader className="p-0 pb-3 bg-transparent border-b border-slate-100 dark:border-slate-800">
                    <CardTitle className="text-lg font-semibold text-slate-850 dark:text-slate-100">Pharmacokinetic Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-4">
                    <ul className="space-y-2">
                      <li className="flex justify-between border-b border-slate-100 dark:border-slate-850 pb-2 mb-1 text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold px-1">
                        <span>Physical Metric</span>
                        <div className="flex gap-6">
                          <span className="w-16 text-right">Input</span>
                          <span className="w-16 text-right">Generated</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors duration-150 px-1">
                        <span className="text-slate-600 dark:text-slate-450 font-medium">LogP</span>
                        <div className="flex gap-6 font-mono">
                          <span className="w-16 text-right text-slate-400 dark:text-slate-500 font-medium">{properties ? properties.input.properties.logp : "1.19"}</span>
                          <span className="w-16 text-right text-teal-600 dark:text-teal-400 font-bold">{properties ? properties.generated.properties.logp : "1.37"}</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors duration-150 px-1">
                        <span className="text-slate-600 dark:text-slate-450 font-medium">Molecular Weight</span>
                        <div className="flex gap-6 font-mono">
                          <span className="w-16 text-right text-slate-400 dark:text-slate-500 font-medium">{properties ? properties.input.properties.mw : "180.16"}</span>
                          <span className="w-16 text-right text-teal-600 dark:text-teal-400 font-bold">{properties ? properties.generated.properties.mw : "198.15"}</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors duration-150 px-1">
                        <span className="text-slate-600 dark:text-slate-450 font-medium">QED score</span>
                        <div className="flex gap-6 font-mono">
                          <span className="w-16 text-right text-slate-400 dark:text-slate-500 font-medium">{properties ? properties.input.properties.qed : "0.48"}</span>
                          <span className="w-16 text-right text-teal-600 dark:text-teal-400 font-bold">{properties ? properties.generated.properties.qed : "0.52"}</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors duration-150 px-1">
                        <span className="text-slate-600 dark:text-slate-450 font-medium">H-Bond Donors</span>
                        <div className="flex gap-6 font-mono">
                          <span className="w-16 text-right text-slate-400 dark:text-slate-500 font-medium">{properties ? properties.input.properties.hbd : "1"}</span>
                          <span className="w-16 text-right text-teal-600 dark:text-teal-400 font-bold">{properties ? properties.generated.properties.hbd : "1"}</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors duration-150 px-1">
                        <span className="text-slate-600 dark:text-slate-450 font-medium">H-Bond Acceptors</span>
                        <div className="flex gap-6 font-mono">
                          <span className="w-16 text-right text-slate-400 dark:text-slate-500 font-medium">{properties ? properties.input.properties.hba : "3"}</span>
                          <span className="w-16 text-right text-teal-600 dark:text-teal-400 font-bold">{properties ? properties.generated.properties.hba : "3"}</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors duration-150 px-1">
                        <span className="text-slate-600 dark:text-slate-450 font-medium">Rotatable Bonds</span>
                        <div className="flex gap-6 font-mono">
                          <span className="w-16 text-right text-slate-400 dark:text-slate-500 font-medium">{properties ? properties.input.properties.rot_bonds : "2"}</span>
                          <span className="w-16 text-right text-teal-600 dark:text-teal-400 font-bold">{properties ? properties.generated.properties.rot_bonds : "2"}</span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Bioactivity Predictions */}
                <Card className="p-4 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm">
                  <CardHeader className="p-0 pb-3 bg-transparent border-b border-slate-100 dark:border-slate-800">
                    <CardTitle className="text-lg font-semibold text-slate-850 dark:text-slate-100">Bioactivity Profile (AI Model)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-4">
                    <ul className="space-y-2">
                      <li className="flex justify-between border-b border-slate-100 dark:border-slate-850 pb-2 mb-1 text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold px-1">
                        <span>Target Protein</span>
                        <span className="text-right">Probability</span>
                      </li>
                      <li className="flex justify-between items-center text-sm p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors duration-150 px-1">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Kinase Inhibition</span>
                        <div className="flex items-center gap-3 w-40 justify-end">
                          <div className="relative w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "absolute top-0 left-0 h-full rounded-full transition-all duration-300",
                                (properties ? properties.bioactivity.kinase_inhibition : 87) > 60
                                  ? "bg-emerald-500"
                                  : (properties ? properties.bioactivity.kinase_inhibition : 87) >= 40
                                    ? "bg-amber-500"
                                    : "bg-slate-400 dark:bg-slate-500"
                              )}
                              style={{ width: `${properties ? properties.bioactivity.kinase_inhibition : 87}%` }}
                            />
                          </div>
                          <span className={cn(
                            "font-bold text-xs px-2 py-0.5 rounded min-w-[45px] text-right border",
                            (properties ? properties.bioactivity.kinase_inhibition : 87) > 60
                              ? "text-emerald-700 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30"
                              : (properties ? properties.bioactivity.kinase_inhibition : 87) >= 40
                                ? "text-amber-700 dark:text-amber-455 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30"
                                : "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800"
                          )}>
                            {properties ? `${properties.bioactivity.kinase_inhibition}%` : "87.0%"}
                          </span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors duration-150 px-1">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">GPCR Binding</span>
                        <div className="flex items-center gap-3 w-40 justify-end">
                          <div className="relative w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "absolute top-0 left-0 h-full rounded-full transition-all duration-300",
                                (properties ? properties.bioactivity.gpcr_binding : 54) > 60
                                  ? "bg-emerald-500"
                                  : (properties ? properties.bioactivity.gpcr_binding : 54) >= 40
                                    ? "bg-amber-500"
                                    : "bg-slate-400 dark:bg-slate-500"
                              )}
                              style={{ width: `${properties ? properties.bioactivity.gpcr_binding : 54}%` }}
                            />
                          </div>
                          <span className={cn(
                            "font-bold text-xs px-2 py-0.5 rounded min-w-[45px] text-right border",
                            (properties ? properties.bioactivity.gpcr_binding : 54) > 60
                              ? "text-emerald-700 dark:text-emerald-455 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30"
                              : (properties ? properties.bioactivity.gpcr_binding : 54) >= 40
                                ? "text-amber-700 dark:text-amber-455 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30"
                                : "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800"
                          )}>
                            {properties ? `${properties.bioactivity.gpcr_binding}%` : "54.0%"}
                          </span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors duration-150 px-1">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Ion Channel Modulation</span>
                        <div className="flex items-center gap-3 w-40 justify-end">
                          <div className="relative w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "absolute top-0 left-0 h-full rounded-full transition-all duration-300",
                                (properties ? properties.bioactivity.ion_channel : 12) > 60
                                  ? "bg-emerald-500"
                                  : (properties ? properties.bioactivity.ion_channel : 12) >= 40
                                    ? "bg-amber-500"
                                    : "bg-slate-400 dark:bg-slate-500"
                              )}
                              style={{ width: `${properties ? properties.bioactivity.ion_channel : 12}%` }}
                            />
                          </div>
                          <span className={cn(
                            "font-bold text-xs px-2 py-0.5 rounded min-w-[45px] text-right border",
                            (properties ? properties.bioactivity.ion_channel : 12) > 60
                              ? "text-emerald-700 dark:text-emerald-455 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30"
                              : (properties ? properties.bioactivity.ion_channel : 12) >= 40
                                ? "text-amber-700 dark:text-amber-455 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30"
                                : "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800"
                          )}>
                            {properties ? `${properties.bioactivity.ion_channel}%` : "12.0%"}
                          </span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors duration-150 px-1">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Nuclear Receptor</span>
                        <div className="flex items-center gap-3 w-40 justify-end">
                          <div className="relative w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "absolute top-0 left-0 h-full rounded-full transition-all duration-300",
                                (properties ? properties.bioactivity.nuclear_receptor : 78) > 60
                                  ? "bg-emerald-500"
                                  : (properties ? properties.bioactivity.nuclear_receptor : 78) >= 40
                                    ? "bg-amber-500"
                                    : "bg-slate-400 dark:bg-slate-500"
                              )}
                              style={{ width: `${properties ? properties.bioactivity.nuclear_receptor : 78}%` }}
                            />
                          </div>
                          <span className={cn(
                            "font-bold text-xs px-2 py-0.5 rounded min-w-[45px] text-right border",
                            (properties ? properties.bioactivity.nuclear_receptor : 78) > 60
                              ? "text-emerald-700 dark:text-emerald-455 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30"
                              : (properties ? properties.bioactivity.nuclear_receptor : 78) >= 40
                                ? "text-amber-700 dark:text-amber-455 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30"
                                : "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800"
                          )}>
                            {properties ? `${properties.bioactivity.nuclear_receptor}%` : "78.0%"}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Toxicity Assessment */}
                <Card className="p-4 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-2 border-indigo-200 dark:border-indigo-850 bg-white dark:bg-slate-900/50 backdrop-blur-sm">
                  <CardHeader className="p-0 pb-3 bg-transparent border-b border-slate-100 dark:border-slate-800">
                    <CardTitle className="text-lg font-semibold text-slate-850 dark:text-slate-100">Toxicity & ADMET Risk Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-4">
                    <ul className="space-y-2">
                      <li className="flex justify-between border-b border-slate-100 dark:border-slate-850 pb-2 mb-1 text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold px-1">
                        <span>Toxicology Category</span>
                        <span className="text-right">Risk Classification</span>
                      </li>
                      <li className="flex justify-between items-center text-sm p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors duration-150 px-1">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Hepatotoxicity Risk</span>
                        <span className={cn(
                          "font-bold px-2.5 py-0.5 rounded-full text-xs uppercase tracking-wider text-white select-none",
                          (properties ? properties.toxicity.hepatotoxicity : "Low Risk") === "High Risk"
                            ? "bg-rose-500"
                            : (properties ? properties.toxicity.hepatotoxicity : "Low Risk") === "Medium Risk"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                        )}>
                          {properties ? properties.toxicity.hepatotoxicity : "Low Risk"}
                        </span>
                      </li>
                      <li className="flex justify-between items-center text-sm p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors duration-150 px-1">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Cardiotoxicity Risk</span>
                        <span className={cn(
                          "font-bold px-2.5 py-0.5 rounded-full text-xs uppercase tracking-wider text-white select-none",
                          (properties ? properties.toxicity.cardiotoxicity : "Medium Risk") === "High Risk"
                            ? "bg-rose-500"
                            : (properties ? properties.toxicity.cardiotoxicity : "Medium Risk") === "Medium Risk"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                        )}>
                          {properties ? properties.toxicity.cardiotoxicity : "Medium Risk"}
                        </span>
                      </li>
                      <li className="flex justify-between items-center text-sm p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors duration-150 px-1">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Mutagenicity Risk</span>
                        <span className={cn(
                          "font-bold px-2.5 py-0.5 rounded-full text-xs uppercase tracking-wider text-white select-none",
                          (properties ? properties.toxicity.mutagenicity : "Low Risk") === "High Risk"
                            ? "bg-rose-500"
                            : (properties ? properties.toxicity.mutagenicity : "Low Risk") === "Medium Risk"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                        )}>
                          {properties ? properties.toxicity.mutagenicity : "Low Risk"}
                        </span>
                      </li>
                      <li className="flex justify-between items-center text-sm p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded transition-colors duration-150 px-1">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Skin Sensitization</span>
                        <span className={cn(
                          "font-bold px-2.5 py-0.5 rounded-full text-xs uppercase tracking-wider text-white select-none",
                          (properties ? properties.toxicity.skin_sensitization : "Low Risk") === "High Risk"
                            ? "bg-rose-500"
                            : (properties ? properties.toxicity.skin_sensitization : "Low Risk") === "Medium Risk"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                        )}>
                          {properties ? properties.toxicity.skin_sensitization : "Low Risk"}
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
