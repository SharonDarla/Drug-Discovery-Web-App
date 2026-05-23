
// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Separator } from '@/components/ui/separator';
// import { useToast } from '@/components/ui/use-toast';
// import { ArrowRight, Beaker, Microscope, FlaskConical, ArrowDownToLine, RotateCcw } from 'lucide-react';
// import Molecule, { MoleculeData } from '@/components/Molecule';
// import TrendCard from '@/components/TrendCard';
// 
// // Sample molecule data for demonstration
// const sampleInputMolecule: MoleculeData = {
//   id: 'aspirin',
//   name: 'Aspirin',
//   atoms: [
//     { id: 'C1', element: 'C', x: 0, y: 0, z: 0 },
//     { id: 'C2', element: 'C', x: 1.5, y: 0, z: 0 },
//     { id: 'C3', element: 'C', x: 2.25, y: 1.3, z: 0 },
//     { id: 'C4', element: 'C', x: 1.5, y: 2.6, z: 0 },
//     { id: 'C5', element: 'C', x: 0, y: 2.6, z: 0 },
//     { id: 'C6', element: 'C', x: -0.75, y: 1.3, z: 0 },
//     { id: 'C7', element: 'C', x: 3.75, y: 1.3, z: 0 },
//     { id: 'O1', element: 'O', x: 4.5, y: 0.3, z: 0 },
//     { id: 'O2', element: 'O', x: 4.25, y: 2.6, z: 0 },
//     { id: 'C8', element: 'C', x: 5.75, y: 2.6, z: 0 },
//     { id: 'C9', element: 'C', x: 6.25, y: 4, z: 0 },
//     { id: 'O3', element: 'O', x: 7.75, y: 4, z: 0 },
//     { id: 'O4', element: 'O', x: 5.5, y: 5, z: 0 },
//   ],
//   bonds: [
//     { id: 'b1', source: 'C1', target: 'C2', type: 'single' },
//     { id: 'b2', source: 'C2', target: 'C3', type: 'single' },
//     { id: 'b3', source: 'C3', target: 'C4', type: 'single' },
//     { id: 'b4', source: 'C4', target: 'C5', type: 'single' },
//     { id: 'b5', source: 'C5', target: 'C6', type: 'single' },
//     { id: 'b6', source: 'C6', target: 'C1', type: 'single' },
//     { id: 'b7', source: 'C3', target: 'C7', type: 'single' },
//     { id: 'b8', source: 'C7', target: 'O1', type: 'double' },
//     { id: 'b9', source: 'C7', target: 'O2', type: 'single' },
//     { id: 'b10', source: 'O2', target: 'C8', type: 'single' },
//     { id: 'b11', source: 'C8', target: 'C9', type: 'single' },
//     { id: 'b12', source: 'C9', target: 'O3', type: 'single' },
//     { id: 'b13', source: 'C9', target: 'O4', type: 'double' },
//   ]
// };
// 
// const sampleGeneratedMolecule: MoleculeData = {
//   id: 'derivative',
//   name: 'Modified Aspirin',
//   atoms: [
//     { id: 'C1', element: 'C', x: 0, y: 0, z: 0 },
//     { id: 'C2', element: 'C', x: 1.5, y: 0, z: 0 },
//     { id: 'C3', element: 'C', x: 2.25, y: 1.3, z: 0 },
//     { id: 'C4', element: 'C', x: 1.5, y: 2.6, z: 0 },
//     { id: 'C5', element: 'C', x: 0, y: 2.6, z: 0 },
//     { id: 'C6', element: 'C', x: -0.75, y: 1.3, z: 0 },
//     { id: 'C7', element: 'C', x: 3.75, y: 1.3, z: 0 },
//     { id: 'O1', element: 'O', x: 4.5, y: 0.3, z: 0 },
//     { id: 'O2', element: 'O', x: 4.25, y: 2.6, z: 0 },
//     { id: 'C8', element: 'C', x: 5.75, y: 2.6, z: 0 },
//     { id: 'C9', element: 'C', x: 6.25, y: 4, z: 0 },
//     { id: 'O3', element: 'O', x: 7.75, y: 4, z: 0 },
//     { id: 'O4', element: 'O', x: 5.5, y: 5, z: 0 },
//     { id: 'F1', element: 'F', x: -2.25, y: 1.3, z: 0 },
//     { id: 'N1', element: 'N', x: 2.25, y: 4, z: 0 },
//   ],
//   bonds: [
//     { id: 'b1', source: 'C1', target: 'C2', type: 'single' },
//     { id: 'b2', source: 'C2', target: 'C3', type: 'single' },
//     { id: 'b3', source: 'C3', target: 'C4', type: 'single' },
//     { id: 'b4', source: 'C4', target: 'C5', type: 'single' },
//     { id: 'b5', source: 'C5', target: 'C6', type: 'single' },
//     { id: 'b6', source: 'C6', target: 'C1', type: 'single' },
//     { id: 'b7', source: 'C3', target: 'C7', type: 'single' },
//     { id: 'b8', source: 'C7', target: 'O1', type: 'double' },
//     { id: 'b9', source: 'C7', target: 'O2', type: 'single' },
//     { id: 'b10', source: 'O2', target: 'C8', type: 'single' },
//     { id: 'b11', source: 'C8', target: 'C9', type: 'single' },
//     { id: 'b12', source: 'C9', target: 'O3', type: 'single' },
//     { id: 'b13', source: 'C9', target: 'O4', type: 'double' },
//     { id: 'b14', source: 'C6', target: 'F1', type: 'single' },
//     { id: 'b15', source: 'C4', target: 'N1', type: 'single' },
//   ]
// };
// 
// // Sample trend data
// const trendData = [
//   {
//     id: 1,
//     title: 'Kinase Inhibitors',
//     description: 'Rising interest in selective kinase inhibitors for cancer therapy with reduced side effects.',
//     timestamp: 'Updated 3 hours ago',
//     tags: ['Cancer', 'Kinase', 'Selective Targeting'],
//     metric: {
//       label: 'Publications this month',
//       value: 287,
//       trend: 'up' as const,
//     }
//   },
//   {
//     id: 2,
//     title: 'Antibody-Drug Conjugates',
//     description: 'ADCs showing increased effectiveness in clinical trials for targeted cancer treatment.',
//     timestamp: 'Updated yesterday',
//     tags: ['Antibody', 'Conjugates', 'Targeted Therapy'],
//     metric: {
//       label: 'Active clinical trials',
//       value: 42,
//       trend: 'up' as const,
//     }
//   },
//   {
//     id: 3,
//     title: 'RNA Therapeutics',
//     description: 'mRNA and siRNA technologies gaining traction beyond vaccines for treating genetic disorders.',
//     timestamp: 'Updated 2 days ago',
//     tags: ['RNA', 'Genetic', 'Novel Modality'],
//     metric: {
//       label: 'Market growth rate',
//       value: '24%',
//       trend: 'up' as const,
//     }
//   },
//   {
//     id: 4,
//     title: 'Proteolysis Targeting Chimeras',
//     description: 'PROTAC technology enabling degradation of previously "undruggable" protein targets.',
//     timestamp: 'Updated 1 week ago',
//     tags: ['PROTAC', 'Protein Degradation', 'Novel Mechanism'],
//     metric: {
//       label: 'Industry partnerships',
//       value: 18,
//       trend: 'up' as const,
//     }
//   }
// ];
// 
// const Index = () => {
//   const { toast } = useToast();
//   const [smiles, setSmiles] = useState('');
//   const [inputMolecule, setInputMolecule] = useState<MoleculeData | null>(sampleInputMolecule);
//   const [generatedMolecule, setGeneratedMolecule] = useState<MoleculeData | null>(sampleGeneratedMolecule);
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('generation');
// 
//   const handleGenerate = () => {
//     if (!smiles.trim()) {
//       toast({
//         title: 'Please enter a SMILES string',
//         description: 'A valid molecular structure is required for generation',
//         variant: 'destructive',
//       });
//       return;
//     }
// 
//     setIsLoading(true);
//     
//     // Simulating API call
//     setTimeout(() => {
//       setIsLoading(false);
//       setGeneratedMolecule(sampleGeneratedMolecule);
//       toast({
//         title: 'Molecule Generated',
//         description: 'New molecular structure has been successfully generated',
//       });
//     }, 2000);
//   };
// 
//   const handleReset = () => {
//     setSmiles('');
//     setGeneratedMolecule(null);
//   };
// 
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
//       <div className="container px-4 py-12 mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="flex flex-col items-center mb-12 text-center animate-fadeIn">
//           <div className="flex items-center gap-2 mb-4">
//             <FlaskConical className="w-8 h-8 text-primary" />
//             <h1 className="text-4xl font-bold text-slate-800">Drug Molecule Generator</h1>
//           </div>
//           <p className="max-w-2xl text-lg text-slate-600">
//             Transform chemical structures using advanced AI to discover new drug candidates with enhanced properties and therapeutic potential.
//           </p>
//         </div>
// 
//         {/* Main Content */}
//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
//           {/* Left Column - Controls */}
//           <div className="lg:col-span-4">
//             <Card className="overflow-hidden h-full animate-fadeIn">
//               <CardHeader>
//                 <CardTitle className="text-2xl font-semibold flex items-center gap-2">
//                   <Beaker className="w-5 h-5 text-primary" />
//                   Molecule Generator
//                 </CardTitle>
//                 <CardDescription>
//                   Enter a SMILES string to generate novel molecular structures
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <label htmlFor="smiles" className="text-sm font-medium">
//                     SMILES String
//                   </label>
//                   <Input
//                     id="smiles"
//                     placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
//                     value={smiles}
//                     onChange={(e) => setSmiles(e.target.value)}
//                     className="font-mono"
//                   />
//                   <p className="text-xs text-muted-foreground">
//                     Example: Aspirin = CC(=O)OC1=CC=CC=C1C(=O)O
//                   </p>
//                 </div>
// 
//                 <div className="pt-2">
//                   <Button 
//                     onClick={handleGenerate} 
//                     className="w-full"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       <>Generating<span className="loading">...</span></>
//                     ) : (
//                       <>Generate Molecule <ArrowRight className="w-4 h-4 ml-2" /></>
//                     )}
//                   </Button>
//                 </div>
// 
//                 <div className="pt-2">
//                   <Button 
//                     variant="outline" 
//                     onClick={handleReset} 
//                     className="w-full"
//                   >
//                     <RotateCcw className="w-4 h-4 mr-2" /> Reset
//                   </Button>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex-col items-start bg-slate-50 border-t">
//                 <div className="text-sm font-medium mb-2">Property Optimization:</div>
//                 <ul className="text-sm text-slate-700 space-y-1">
//                   <li className="flex items-center gap-1">
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     Improved solubility
//                   </li>
//                   <li className="flex items-center gap-1">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     Enhanced bioavailability
//                   </li>
//                   <li className="flex items-center gap-1">
//                     <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                     Reduced toxicity
//                   </li>
//                   <li className="flex items-center gap-1">
//                     <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
//                     Targeted binding affinity
//                   </li>
//                 </ul>
//               </CardFooter>
//             </Card>
//           </div>
// 
//           {/* Right Column - Visualization */}
//           <div className="lg:col-span-8">
//             <Card className="h-full animate-fadeIn">
//               <CardHeader>
//                 <CardTitle className="text-2xl font-semibold flex items-center gap-2">
//                   <Microscope className="w-5 h-5 text-primary" />
//                   Molecule Visualization
//                 </CardTitle>
//                 <CardDescription>
//                   Explore and compare molecular structures in 3D space
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   {/* Input Molecule */}
//                   <div className="space-y-2">
//                     <h3 className="text-sm font-medium text-slate-700">Input Structure</h3>
//                     <div className="flex items-center justify-center p-2 border rounded-lg bg-white/50">
//                       {inputMolecule ? (
//                         <Molecule data={inputMolecule} size="lg" animate={true} />
//                       ) : (
//                         <div className="flex flex-col items-center justify-center p-10 text-slate-400">
//                           <ArrowDownToLine className="w-10 h-10 mb-2" />
//                           <span>Enter a SMILES string</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
// 
//                   {/* Generated Molecule */}
//                   <div className="space-y-2">
//                     <h3 className="text-sm font-medium text-slate-700">Generated Structure</h3>
//                     <div className="flex items-center justify-center p-2 border rounded-lg bg-white/50">
//                       {generatedMolecule ? (
//                         <Molecule data={generatedMolecule} size="lg" animate={true} />
//                       ) : (
//                         <div className="flex flex-col items-center justify-center p-10 text-slate-400">
//                           <ArrowDownToLine className="w-10 h-10 mb-2" />
//                           <span>Generated molecule will appear here</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
// 
//         {/* Trends Section */}
//         <div className="mt-12">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-slate-800">Current Research Trends</h2>
//           </div>
// 
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             <TabsList className="grid w-[400px] grid-cols-2">
//               <TabsTrigger value="generation">Discovery Trends</TabsTrigger>
//               <TabsTrigger value="properties">Property Analysis</TabsTrigger>
//             </TabsList>
//             
//             <TabsContent value="generation">
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                 {trendData.map(trend => (
//                   <TrendCard
//                     key={trend.id}
//                     title={trend.title}
//                     description={trend.description}
//                     timestamp={trend.timestamp}
//                     tags={trend.tags}
//                     metric={trend.metric}
//                     className="transition-all duration-300 hover:translate-y-[-5px]"
//                   />
//                 ))}
//               </div>
//             </TabsContent>
// 
//             <TabsContent value="properties">
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//                 <Card className="transition-all duration-300 hover:shadow-md">
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-lg">Pharmacokinetic Profile</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <ul className="space-y-2">
//                       <li className="flex justify-between">
//                         <span className="text-slate-600">LogP</span>
//                         <span className="font-medium">3.2</span>
//                       </li>
//                       <li className="flex justify-between">
//                         <span className="text-slate-600">Molecular Weight</span>
//                         <span className="font-medium">342.4 g/mol</span>
//                       </li>
//                       <li className="flex justify-between">
//                         <span className="text-slate-600">H-Bond Donors</span>
//                         <span className="font-medium">2</span>
//                       </li>
//                       <li className="flex justify-between">
//                         <span className="text-slate-600">H-Bond Acceptors</span>
//                         <span className="font-medium">5</span>
//                       </li>
//                       <li className="flex justify-between">
//                         <span className="text-slate-600">Rotatable Bonds</span>
//                         <span className="font-medium">4</span>
//                       </li>
//                     </ul>
//                   </CardContent>
//                 </Card>
// 
//                 <Card className="transition-all duration-300 hover:shadow-md">
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-lg">Bioactivity Predictions</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <ul className="space-y-2">
//                       <li className="flex justify-between">
//                         <span className="text-slate-600">Kinase Inhibition</span>
//                         <span className="font-medium text-green-600">High (87%)</span>
//                       </li>
//                       <li className="flex justify-between">
//                         <span className="text-slate-600">GPCR Binding</span>
//                         <span className="font-medium text-yellow-600">Medium (54%)</span>
//                       </li>
//                       <li className="flex justify-between">
//                         <span className="text-slate-600">Ion Channel Modulation</span>
//                         <span className="font-medium text-red-600">Low (12%)</span>
//                       </li>
//                       <li className="flex justify-between">
//                         <span className="text-slate-600">Nuclear Receptor</span>
//                         <span className="font-medium text-green-600">High (78%)</span>
//                       </li>
//                     </ul>
//                   </CardContent>
//                 </Card>
// 
//                 <Card className="transition-all duration-300 hover:shadow-md">
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-lg">Toxicity Assessment</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <ul className="space-y-2">
//                       <li className="flex justify-between">
//                         <span className="text-slate-600">Hepatotoxicity</span>
//                         <span className="font-medium text-green-600">Low Risk</span>
//                       </li>
//                       <li className="flex justify-between">
//                         <span className="text-slate-600">Cardiotoxicity</span>
//                         <span className="font-medium text-yellow-600">Medium Risk</span>
//                       </li>
//                       <li className="flex justify-between">
//                         <span className="text-slate-600">Mutagenicity</span>
//                         <span className="font-medium text-green-600">Low Risk</span>
//                       </li>
//                       <li className="flex justify-between">
//                         <span className="text-slate-600">Skin Sensitization</span>
//                         <span className="font-medium text-green-600">Low Risk</span>
//                       </li>
//                     </ul>
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight, Beaker, Microscope, FlaskConical, ArrowDownToLine, RotateCcw } from 'lucide-react';
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
          } catch (__) {}
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="container px-4 py-12 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center mb-12 text-center animate-fadeIn">
          <div className="flex items-center gap-2 mb-4">
            <FlaskConical className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-slate-800">Drug Molecule Generator</h1>
          </div>
          <p className="max-w-2xl text-lg text-slate-600">
            Transform chemical structures using advanced AI to discover new drug candidates with enhanced properties and therapeutic potential.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column - Controls */}
          <div className="lg:col-span-4">
            <Card className="overflow-hidden h-full animate-fadeIn">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-primary" />
                  Molecule Generator
                </CardTitle>
                <CardDescription>
                  Enter a SMILES string to generate novel molecular structures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="smiles" className="text-sm font-medium">
                    SMILES String
                  </label>
                  <Input
                    id="smiles"
                    placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
                    value={smiles}
                    onChange={(e) => setSmiles(e.target.value)}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Example: Aspirin = CC(=O)OC1=CC=CC=C1C(=O)O
                  </p>
                </div>

                <div className="pt-2">
                  <Button 
                    onClick={handleGenerate} 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>Generating<span className="loading">...</span></>
                    ) : (
                      <>Generate Molecule <ArrowRight className="w-4 h-4 ml-2" /></>
                    )}
                  </Button>
                </div>

                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    onClick={handleReset} 
                    className="w-full"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" /> Reset
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start bg-slate-50 border-t">
                <div className="text-sm font-medium mb-2">Property Optimization:</div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Improved solubility
                  </li>
                  <li className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Enhanced bioavailability
                  </li>
                  <li className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Reduced toxicity
                  </li>
                  <li className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    Targeted binding affinity
                  </li>
                </ul>
              </CardFooter>
            </Card>
          </div>

 
          {/* Right Column - Visualization */}
          <div className="lg:col-span-8">
            <Card className="h-full animate-fadeIn shadow-lg hover:shadow-xl transition-all duration-300 border-indigo-100 flex flex-col justify-between">
              <CardHeader className="bg-gradient-to-r from-indigo-50/30 to-blue-50/30 pb-4 border-b border-indigo-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-semibold flex items-center gap-2 text-indigo-900">
                    <Microscope className="w-5 h-5 text-indigo-600" />
                    Interactive Molecular Explorer
                  </CardTitle>
                  <CardDescription className="text-indigo-950/70">
                    Explore and compare 3D conformations and 2D chemical structure diagrams side-by-side
                  </CardDescription>
                </div>
                <div className="flex border border-indigo-100 rounded-lg overflow-hidden bg-white p-1 gap-1 shadow-sm">
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
              <CardContent className="pt-6 flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Left Column: Input Structure */}
                  <div className="flex flex-col items-center p-4 border border-slate-100 rounded-xl bg-white shadow-sm relative overflow-hidden group transition-all duration-300 hover:shadow-md">
                    <div className="absolute top-3 left-3 bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider z-10 shadow-sm">
                      Input Structure
                    </div>
                    <div className="flex items-center justify-center w-full h-80 bg-slate-50/40 rounded-lg overflow-hidden mt-4 border border-slate-50">
                      {activeVisualizerTab === '3d' ? (
                        inputMolecule ? (
                          <Molecule data={inputMolecule} size="lg" animate={true} />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-10 text-slate-400">
                            <ArrowDownToLine className="w-10 h-10 mb-2 animate-bounce" />
                            <span>No Conformer Available</span>
                          </div>
                        )
                      ) : (
                        inputImage ? (
                          <img src={inputImage} alt="Input Chemical Diagram" className="object-contain w-full h-full max-h-72 p-2 mix-blend-multiply transition-transform duration-300 hover:scale-105" />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-10 text-slate-400">
                            <Microscope className="w-10 h-10 mb-2" />
                            <span>Diagram loads on generation</span>
                          </div>
                        )
                      )}
                    </div>
                    {properties && (
                      <div className="mt-4 text-[11px] font-mono text-center max-w-full truncate text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        SMILES: {properties.input.smiles}
                      </div>
                    )}
                  </div>
 
                  {/* Right Column: AI Derivative */}
                  <div className="flex flex-col items-center p-4 border border-slate-100 rounded-xl bg-white shadow-sm relative overflow-hidden group transition-all duration-300 hover:shadow-md">
                    <div className="absolute top-3 left-3 bg-emerald-50 border border-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider z-10 shadow-sm">
                      AI Optimized Derivative
                    </div>
                    <div className="flex items-center justify-center w-full h-80 bg-slate-50/40 rounded-lg overflow-hidden mt-4 border border-slate-50">
                      {activeVisualizerTab === '3d' ? (
                        generatedMolecule ? (
                          <Molecule data={generatedMolecule} size="lg" animate={true} />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-10 text-slate-400">
                            <ArrowDownToLine className="w-10 h-10 mb-2 animate-bounce" />
                            <span>No Conformer Available</span>
                          </div>
                        )
                      ) : (
                        generatedImage ? (
                          <img src={generatedImage} alt="Generated Chemical Diagram" className="object-contain w-full h-full max-h-72 p-2 mix-blend-multiply transition-transform duration-300 hover:scale-105" />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-10 text-slate-400">
                            <Microscope className="w-10 h-10 mb-2" />
                            <span>Diagram loads on generation</span>
                          </div>
                        )
                      )}
                    </div>
                    {properties && (
                      <div className="mt-4 text-[11px] font-mono text-center max-w-full truncate text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        SMILES: {properties.generated.smiles}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              {properties && (
                <div className="px-6 py-3 bg-indigo-50/20 border-t border-indigo-50/30 text-xs font-semibold text-indigo-700 flex justify-between items-center rounded-b-xl">
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
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Chemical Profiling & Discovery Trends</h2>
          </div>
 
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full sm:w-[450px] grid-cols-2 mb-6 bg-slate-100 p-1 rounded-lg">
              <TabsTrigger value="generation" className="rounded-md py-2 font-semibold">Discovery Insights</TabsTrigger>
              <TabsTrigger value="properties" className="rounded-md py-2 font-semibold">Live Property Analysis</TabsTrigger>
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
                <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg animate-fadeIn flex flex-col md:flex-row justify-between items-center gap-6 border border-indigo-100/10">
                  <div className="space-y-2 text-left">
                    <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                      <Beaker className="w-5 h-5 text-indigo-200 animate-pulse" />
                      AI Drug-Likeness Index
                    </h3>
                    <p className="text-white/80 text-sm max-w-xl leading-relaxed">
                      This represents the overall suitability of the generated molecule as a therapeutic candidate, computed from the model's structural similarity score, Lipinski violations, and quantitative estimate of drug-likeness (QED).
                    </p>
                  </div>
                  <div className="flex items-center gap-4 bg-white/10 px-6 py-4 rounded-xl backdrop-blur-md border border-white/20 shadow-inner w-full md:w-auto justify-around">
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-indigo-100/70 font-bold">Predicted Index</div>
                      <div className="text-4xl font-black font-mono tracking-tight text-white drop-shadow">
                        {prediction}%
                      </div>
                    </div>
                    <div className="h-10 w-px bg-white/20" />
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-indigo-100/70 font-bold">Similarity Score</div>
                      <div className="text-4xl font-black font-mono tracking-tight text-white drop-shadow">
                        {(properties.similarity * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                
                {/* Pharmacokinetic Profile */}
                <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-indigo-50">
                  <CardHeader className="pb-2 bg-slate-50/50 border-b border-slate-100">
                    <CardTitle className="text-lg font-bold text-slate-800">Pharmacokinetic Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-3">
                      <li className="flex justify-between border-b border-slate-100 pb-2 font-semibold text-[10px] uppercase tracking-wider text-slate-400">
                        <span>Physical Metric</span>
                        <div className="flex gap-6">
                          <span className="w-16 text-right">Input</span>
                          <span className="w-16 text-right">Generated</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">LogP</span>
                        <div className="flex gap-6 font-mono font-bold">
                          <span className="w-16 text-right text-slate-500">{properties ? properties.input.properties.logp : "1.19"}</span>
                          <span className="w-16 text-right text-indigo-600">{properties ? properties.generated.properties.logp : "1.37"}</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Molecular Weight</span>
                        <div className="flex gap-6 font-mono font-bold">
                          <span className="w-16 text-right text-slate-500">{properties ? properties.input.properties.mw : "180.16"}</span>
                          <span className="w-16 text-right text-indigo-600">{properties ? properties.generated.properties.mw : "198.15"}</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">QED score</span>
                        <div className="flex gap-6 font-mono font-bold">
                          <span className="w-16 text-right text-slate-500">{properties ? properties.input.properties.qed : "0.48"}</span>
                          <span className="w-16 text-right text-indigo-600">{properties ? properties.generated.properties.qed : "0.52"}</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">H-Bond Donors</span>
                        <div className="flex gap-6 font-mono font-bold">
                          <span className="w-16 text-right text-slate-500">{properties ? properties.input.properties.hbd : "1"}</span>
                          <span className="w-16 text-right text-indigo-600">{properties ? properties.generated.properties.hbd : "1"}</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">H-Bond Acceptors</span>
                        <div className="flex gap-6 font-mono font-bold">
                          <span className="w-16 text-right text-slate-500">{properties ? properties.input.properties.hba : "3"}</span>
                          <span className="w-16 text-right text-indigo-600">{properties ? properties.generated.properties.hba : "3"}</span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Rotatable Bonds</span>
                        <div className="flex gap-6 font-mono font-bold">
                          <span className="w-16 text-right text-slate-500">{properties ? properties.input.properties.rot_bonds : "2"}</span>
                          <span className="w-16 text-right text-indigo-600">{properties ? properties.generated.properties.rot_bonds : "2"}</span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
 
                {/* Bioactivity Predictions */}
                <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-indigo-50">
                  <CardHeader className="pb-2 bg-slate-50/50 border-b border-slate-100">
                    <CardTitle className="text-lg font-bold text-slate-800">Bioactivity Profile (AI Model)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Kinase Inhibition</span>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "font-bold px-2 py-0.5 rounded text-xs",
                            properties 
                              ? (properties.bioactivity.kinase_inhibition > 70 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : properties.bioactivity.kinase_inhibition > 40 ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-rose-50 text-rose-700 border border-rose-100") 
                              : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          )}>
                            {properties ? `${properties.bioactivity.kinase_inhibition}%` : "87.0%"}
                          </span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">GPCR Binding</span>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "font-bold px-2 py-0.5 rounded text-xs",
                            properties 
                              ? (properties.bioactivity.gpcr_binding > 70 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : properties.bioactivity.gpcr_binding > 40 ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-rose-50 text-rose-700 border border-rose-100") 
                              : "bg-amber-50 text-amber-700 border border-amber-100"
                          )}>
                            {properties ? `${properties.bioactivity.gpcr_binding}%` : "54.0%"}
                          </span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Ion Channel Modulation</span>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "font-bold px-2 py-0.5 rounded text-xs",
                            properties 
                              ? (properties.bioactivity.ion_channel > 70 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : properties.bioactivity.ion_channel > 40 ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-rose-50 text-rose-700 border border-rose-100") 
                              : "bg-rose-50 text-rose-700 border border-rose-100"
                          )}>
                            {properties ? `${properties.bioactivity.ion_channel}%` : "12.0%"}
                          </span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Nuclear Receptor</span>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "font-bold px-2 py-0.5 rounded text-xs",
                            properties 
                              ? (properties.bioactivity.nuclear_receptor > 70 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : properties.bioactivity.nuclear_receptor > 40 ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-rose-50 text-rose-700 border border-rose-100") 
                              : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          )}>
                            {properties ? `${properties.bioactivity.nuclear_receptor}%` : "78.0%"}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
 
                {/* Toxicity Assessment */}
                <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-indigo-50">
                  <CardHeader className="pb-2 bg-slate-50/50 border-b border-slate-100">
                    <CardTitle className="text-lg font-bold text-slate-800">Toxicity & ADMET Risk Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Hepatotoxicity Risk</span>
                        <span className={cn(
                          "font-bold px-2 py-0.5 rounded text-xs uppercase tracking-wider",
                          properties 
                            ? (properties.toxicity.hepatotoxicity === "High Risk" ? "bg-rose-50 text-rose-700 border border-rose-100" : properties.toxicity.hepatotoxicity === "Medium Risk" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100") 
                            : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        )}>
                          {properties ? properties.toxicity.hepatotoxicity : "Low Risk"}
                        </span>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Cardiotoxicity Risk</span>
                        <span className={cn(
                          "font-bold px-2 py-0.5 rounded text-xs uppercase tracking-wider",
                          properties 
                            ? (properties.toxicity.cardiotoxicity === "High Risk" ? "bg-rose-50 text-rose-700 border border-rose-100" : properties.toxicity.cardiotoxicity === "Medium Risk" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100") 
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                        )}>
                          {properties ? properties.toxicity.cardiotoxicity : "Medium Risk"}
                        </span>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Mutagenicity Risk</span>
                        <span className={cn(
                          "font-bold px-2 py-0.5 rounded text-xs uppercase tracking-wider",
                          properties 
                            ? (properties.toxicity.mutagenicity === "High Risk" ? "bg-rose-50 text-rose-700 border border-rose-100" : properties.toxicity.mutagenicity === "Medium Risk" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100") 
                            : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        )}>
                          {properties ? properties.toxicity.mutagenicity : "Low Risk"}
                        </span>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Skin Sensitization</span>
                        <span className={cn(
                          "font-bold px-2 py-0.5 rounded text-xs uppercase tracking-wider",
                          properties 
                            ? (properties.toxicity.skin_sensitization === "High Risk" ? "bg-rose-50 text-rose-700 border border-rose-100" : properties.toxicity.skin_sensitization === "Medium Risk" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100") 
                            : "bg-emerald-50 text-emerald-700 border border-emerald-100"
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
