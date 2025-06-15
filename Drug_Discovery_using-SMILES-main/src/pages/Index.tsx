
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

// const Index = () => {
//   const { toast } = useToast();
//   const [smiles, setSmiles] = useState('');
//   const [inputMolecule, setInputMolecule] = useState<MoleculeData | null>(sampleInputMolecule);
//   const [generatedMolecule, setGeneratedMolecule] = useState<MoleculeData | null>(sampleGeneratedMolecule);
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('generation');

//   const handleGenerate = () => {
//     if (!smiles.trim()) {
//       toast({
//         title: 'Please enter a SMILES string',
//         description: 'A valid molecular structure is required for generation',
//         variant: 'destructive',
//       });
//       return;
//     }

//     setIsLoading(true);
    
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

//   const handleReset = () => {
//     setSmiles('');
//     setGeneratedMolecule(null);
//   };

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

//         {/* Trends Section */}
//         <div className="mt-12">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-slate-800">Current Research Trends</h2>
//           </div>

//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             <TabsList className="grid w-[400px] grid-cols-2">
//               <TabsTrigger value="generation">Discovery Trends</TabsTrigger>
//               <TabsTrigger value="properties">Property Analysis</TabsTrigger>
//             </TabsList>
            
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

// export default Index;


//from dd2

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
  const [showGeneratedImage, setShowGeneratedImage] = useState(false); //hola
  const [moleculeImage, setMoleculeImage] = useState<string | null>(null);
  const [moleculeLabel, setMoleculeLabel] = useState<string | null>(null);

  const moleculeImages: Record<string, string> = {
    sulfonamide: 'mol1.png.png',
    hydroxycyclohexylbenzimidazolethylphenylformamide: 'mol2.png',
  };

  const moleculeLabels: Record<string, string> = {
    sulfonamide: 'COC1C(OC(C)=O)CC(=O)OC(C)CC=CC=CC(=O)C(C)CC(CC=O)C1OC1OC(C)C(OC2CC(C)(O)C(OC(=O)CC(C)C)C(C)O2)C(N(C)C)C1O',
    hydroxycyclohexylbenzimidazolethylphenylformamide: ' CCC1(O)CC2CN(CCc3c([nH]c4ccccc34)C(C(=O)OC)(c3cc4c(cc3OC)N(C)C3C(O)(C(=O)OC)C(OC(=O)CN(C)C)C5(CC)C=CCN6CCC43C65)C2)C1',
  };
  
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
  
    setTimeout(() => {
      setIsLoading(false);
      setGeneratedMolecule(sampleGeneratedMolecule);
      setShowGeneratedImage(true);
  
      const lowerInput = smiles.toLowerCase();
      // if (moleculeImages[lowerInput]) {
      //   setMoleculeImage(moleculeImages[lowerInput]);
      // } else {
      //   setMoleculeImage(null); // No image match
      // }
      if (moleculeImages[lowerInput]) {
        setMoleculeImage(moleculeImages[lowerInput]);
        setMoleculeLabel(moleculeLabels[lowerInput] || null); // <-- this sets the label!
      } else {
        setMoleculeImage(null);
        setMoleculeLabel(null);
      }
      
  
      toast({
        title: 'Molecule Generated',
        description: 'New molecular structure has been successfully generated',
      });
    }, 2000);
  };
  
  // const handleGenerate = () => { this is waste
  //   if (!smiles.trim()) {
  //     toast({
  //       title: 'Please enter a SMILES string',
  //       description: 'A valid molecular structure is required for generation',
  //       variant: 'destructive',
  //     });
  //     return;
  //   }


  //IMPORTANT hola start
  // const handleGenerate = () => {
  //   if (!smiles.trim()) {
  //     toast({
  //       title: 'Please enter a SMILES string',
  //       description: 'A valid molecular structure is required for generation',
  //       variant: 'destructive',
  //     });
  //     return;
  //   }//hola
  //   setIsLoading(true);

  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setGeneratedMolecule(sampleGeneratedMolecule);
  //     setShowGeneratedImage(true);  // <-- Show image after generation
  //     toast({
  //       title: 'Molecule Generated',
  //       description: 'New molecular structure has been successfully generated',
  //     });
  //   }, 2000);
  // };
//IMPORTANT hola end


  //   setIsLoading(true);
    
  //   // Simulating API call
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setGeneratedMolecule(sampleGeneratedMolecule);
  //     toast({
  //       title: 'Molecule Generated',
  //       description: 'New molecular structure has been successfully generated',
  //     });
  //   }, 2000);
  // };

  const handleReset = () => {
    setSmiles('');
    setGeneratedMolecule(sampleGeneratedMolecule); // Reset it back to default instead of null
    setShowGeneratedImage(true); // Ensure the image area appears
    setMoleculeImage(null); // Or keep the previous one, if preferred
  };

  
  //hola
  // const handleReset = () => {
  //   setSmiles('');
  //   setGeneratedMolecule(null);
  // };

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
            <Card className="h-full animate-fadeIn">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                  <Microscope className="w-5 h-5 text-primary" />
                  Molecule Visualization
                </CardTitle>
                <CardDescription>
                  Explore and compare molecular structures in 3D space
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2 "> */}
                  {/* Input Molecule */}
                  

                  {/* Generated Molecule */}
                  <div className="space-y-2 h-88 w-full">
                    <h3 className="text-sm font-medium text-slate-700">Generated Structure</h3>
                    <div className="flex items-center justify-center p-2 border rounded-lg bg-white/50 h-94 w-full">

                    {moleculeImage && (
  <div className="flex flex-col items-center mt-4 ">
    <img src={`${moleculeImage}`} alt="Generated Molecule" className="w-full h-88" />
    {moleculeLabel && <p className="mt-2 text-center text-sm font-medium text-muted-foreground">{moleculeLabel}</p>}
  </div>
)}


                    {/* {showGeneratedImage ? (
    <img src="/mol1.png.png" alt="Generated Molecule" className="w-full max-w-md" />
  ) : (
    <div className="text-gray-500 italic">Generated image will appear here.</div>
  )}
                     */}
                    </div>
                  </div>
                {/* </div> */}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trends Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Current Research Trends</h2>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="generation">Discovery Trends</TabsTrigger>
              <TabsTrigger value="properties">Property Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generation">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {trendData.map(trend => (
                  <TrendCard
                    key={trend.id}
                    title={trend.title}
                    description={trend.description}
                    timestamp={trend.timestamp}
                    tags={trend.tags}
                    metric={trend.metric}
                    className="transition-all duration-300 hover:translate-y-[-5px]"
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="properties">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card className="transition-all duration-300 hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Pharmacokinetic Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-slate-600">LogP</span>
                        <span className="font-medium">3.2</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-slate-600">Molecular Weight</span>
                        <span className="font-medium">342.4 g/mol</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-slate-600">H-Bond Donors</span>
                        <span className="font-medium">2</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-slate-600">H-Bond Acceptors</span>
                        <span className="font-medium">5</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-slate-600">Rotatable Bonds</span>
                        <span className="font-medium">4</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="transition-all duration-300 hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Bioactivity Predictions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-slate-600">Kinase Inhibition</span>
                        <span className="font-medium text-green-600">High (87%)</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-slate-600">GPCR Binding</span>
                        <span className="font-medium text-yellow-600">Medium (54%)</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-slate-600">Ion Channel Modulation</span>
                        <span className="font-medium text-red-600">Low (12%)</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-slate-600">Nuclear Receptor</span>
                        <span className="font-medium text-green-600">High (78%)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="transition-all duration-300 hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Toxicity Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-slate-600">Hepatotoxicity</span>
                        <span className="font-medium text-green-600">Low Risk</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-slate-600">Cardiotoxicity</span>
                        <span className="font-medium text-yellow-600">Medium Risk</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-slate-600">Mutagenicity</span>
                        <span className="font-medium text-green-600">Low Risk</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-slate-600">Skin Sensitization</span>
                        <span className="font-medium text-green-600">Low Risk</span>
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
