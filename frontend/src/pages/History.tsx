import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Card } from '@/components/shared/Card';
import { Modal } from '@/components/shared/Modal';
import { EmptyState } from '@/components/shared/EmptyState';
import { PageHeader } from '@/components/shared/PageHeader';
import { useToast } from '@/components/ui/use-toast';
import Molecule, { MoleculeData, Atom, Bond } from '@/components/Molecule';
import {
  FlaskConical, Beaker, History as HistoryIcon, Search, Trash2, 
  ChevronDown, ChevronUp, AlertCircle, Loader2, Eye, Download
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Shape of one history record from the API
interface HistoryRecord {
  id: string;
  input_smiles: string;
  generated_smiles: string;
  prediction_score: number;
  similarity: number;
  input_properties: { mw: number; logp: number; qed: number; hbd: number; hba: number; rot_bonds: number };
  gen_properties: { mw: number; logp: number; qed: number; hbd: number; hba: number; rot_bonds: number };
  bioactivity: { kinase_inhibition: number; gpcr_binding: number; ion_channel: number; nuclear_receptor: number };
  toxicity: { hepatotoxicity: string; cardiotoxicity: string; mutagenicity: string; skin_sensitization: string };
  created_at: string | null;
}

// Color helpers
function scoreColor(score: number) {
  if (score >= 70) return 'bg-emerald-500';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-rose-500';
}

function scoreTextColor(score: number) {
  if (score >= 70) return 'text-emerald-700 dark:text-emerald-400';
  if (score >= 40) return 'text-amber-700 dark:text-amber-400';
  return 'text-rose-700 dark:text-rose-400';
}

function riskBadge(risk: string) {
  const base = 'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white';
  if (risk === 'High Risk') return cn(base, 'bg-rose-500');
  if (risk === 'Medium Risk') return cn(base, 'bg-amber-500');
  return cn(base, 'bg-emerald-500');
}

function formatDate(raw: string | null) {
  if (!raw) return '—';
  try {
    const d = new Date(raw);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      + ' · '
      + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return raw;
  }
}

// Client-side parser to translate SMILES strings to approximate 3D atoms for the visualizer
function smilesToMoleculeData(smiles: string, name: string): MoleculeData {
  const atoms: Atom[] = [];
  const bonds: Bond[] = [];
  
  // Regex to match organic atoms
  const atomRegex = /Cl|Br|[C,O,N,F,S,P,I,H]/g;
  let match;
  let index = 0;
  
  while ((match = atomRegex.exec(smiles)) !== null) {
    const symbol = match[0];
    // Wave configuration path to render nice 3D chain layout
    const x = index * 1.5 - 4;
    const y = Math.sin(index * 1.0) * 1.2;
    const z = Math.cos(index * 1.0) * 0.6;
    
    atoms.push({
      id: `${symbol}${index + 1}`,
      element: symbol,
      x,
      y,
      z
    });
    
    if (index > 0) {
      bonds.push({
        id: `b${index}`,
        source: atoms[index - 1].id,
        target: atoms[index].id,
        type: 'single'
      });
    }
    index++;
  }
  
  if (atoms.length === 0) {
    atoms.push({ id: 'C1', element: 'C', x: 0, y: 0, z: 0 });
  }
  
  return {
    id: `parsed-${Math.random().toString(36).substr(2, 9)}`,
    name,
    atoms,
    bonds
  };
}

const History = () => {
  const { toast } = useToast();
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Modal State for Visualizer
  const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Fetch history from Flask backend
  const fetchHistory = (search = '') => {
    setLoading(true);
    setError(null);

    const baseURL=(import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/,'');
    const url = search
    ? `${baseURL}/api/history?search=${encodeURIComponent(search)}`
    : `${baseURL}/api/history`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch history');
        return res.json();
      })
      .then(data => {
        setRecords(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Could not connect to backend');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchHistory(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Delete a record
  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this prediction record? This cannot be undone.')) return;

    setDeletingId(id);
    fetch(`${(import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')}/api/history/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Delete failed');
        return res.json();
      })
      .then(() => {
        setRecords(prev => prev.filter(r => r.id !== id));
        if (expandedId === id) setExpandedId(null);
        toast({ title: 'Deleted', description: 'Record removed from history.' });
      })
      .catch(err => {
        toast({ title: 'Error', description: err.message, variant: 'destructive' });
      })
      .finally(() => setDeletingId(null));
  };

  // Open interactive 3D modal
  const handleOpenViewModal = (record: HistoryRecord) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  // Download molecular JSON report
  const handleDownloadReport = (record: HistoryRecord) => {
    const dataStr = JSON.stringify(record, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `molecule_profile_record_${record.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({
      title: 'Report Downloaded',
      description: `Saved molecule profile report as JSON file.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/50 to-indigo-50/50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <Navbar />

      <main className="flex-grow container px-4 py-12 mx-auto max-w-7xl">
        <PageHeader 
          title="Prediction"
          gradientTitle="History Log"
          subtitle="Browse all previously generated molecules. View 3D structures, download property logs, or remove entries from database history."
        />

        {/* Search Input */}
        <div className="relative max-w-md mx-auto mb-10 animate-fadeIn">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by SMILES..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl"
            isMono={true}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-10 text-slate-450 dark:text-slate-500 animate-fadeIn">
            <Loader2 className="w-4 h-4 animate-spin mb-2 text-blue-600" />
            <span className="text-xs font-semibold">Loading history...</span>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-450 dark:text-slate-550 animate-fadeIn max-w-md mx-auto text-center">
            <AlertCircle className="w-10 h-10 mb-3 text-rose-500" />
            <span className="text-sm font-bold text-rose-600">{error}</span>
            <p className="text-xs mt-2 text-slate-500">Make sure the Flask backend is active.</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && records.length === 0 && (
          <EmptyState
            icon={HistoryIcon}
            title={searchQuery ? "No records match search" : "No predictions yet"}
            description={searchQuery ? "Try searching for a different SMILES string or chemical query." : "Optimize your first molecule structure in the Molecule Studio to see history here."}
            actionLabel={searchQuery ? "Clear Search" : "Start Exploring"}
            onAction={searchQuery ? () => setSearchQuery('') : () => window.location.href = '/'}
          />
        )}

        {/* Records List */}
        {!loading && !error && records.length > 0 && (
          <div className="space-y-4 animate-fadeIn max-w-5xl mx-auto">
            <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Showing {records.length} record{records.length !== 1 ? 's' : ''}
            </div>

            {records.map((record, index) => {
              const isExpanded = expandedId === record.id;
              return (
                <Card
                  key={record.id}
                  hoverEffect={!isExpanded}
                  className={cn(
                    "p-0 overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/60 backdrop-blur-sm transition-all duration-300",
                    isExpanded && "ring-2 ring-blue-500/50 dark:ring-blue-500/30 shadow-lg"
                  )}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  {/* Summary Row */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 cursor-pointer select-none group"
                    onClick={() => setExpandedId(isExpanded ? null : record.id)}
                  >
                    {/* Score badge */}
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0", scoreColor(record.prediction_score))}>
                      {record.prediction_score.toFixed(0)}
                    </div>

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Input</span>
                        <code className="text-xs font-mono text-slate-700 dark:text-slate-350 truncate max-w-[200px] sm:max-w-[320px] block" title={record.input_smiles}>
                          {record.input_smiles}
                        </code>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Gen</span>
                        <code className="text-xs font-mono text-teal-600 dark:text-teal-400 truncate max-w-[200px] sm:max-w-[320px] block" title={record.generated_smiles}>
                          {record.generated_smiles}
                        </code>
                      </div>
                    </div>

                    {/* Quick stats */}
                    <div className="hidden md:flex items-center gap-6 text-xs">
                      <div className="text-center">
                        <div className="text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[9px] font-bold mb-0.5">QED</div>
                        <div className="font-mono font-bold text-slate-700 dark:text-slate-300">{record.gen_properties.qed.toFixed(3)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[9px] font-bold mb-0.5">Similarity</div>
                        <div className="font-mono font-bold text-slate-700 dark:text-slate-300">{(record.similarity * 100).toFixed(1)}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[9px] font-bold mb-0.5">MW</div>
                        <div className="font-mono font-bold text-slate-700 dark:text-slate-300">{record.gen_properties.mw.toFixed(1)}</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        onClick={e => { e.stopPropagation(); handleOpenViewModal(record); }}
                        title="View Molecule 3D"
                      >
                        <Eye className="w-4 h-4 text-slate-450 hover:text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        onClick={e => { e.stopPropagation(); handleDownloadReport(record); }}
                        title="Download JSON Report"
                      >
                        <Download className="w-4 h-4 text-slate-450 hover:text-indigo-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-rose-500"
                        onClick={e => { e.stopPropagation(); handleDelete(record.id); }}
                        disabled={deletingId === record.id}
                        title="Delete Record"
                      >
                        {deletingId === record.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4 text-slate-450" />}
                      </Button>
                      {isExpanded ? (
                        <ChevronUp className="w-4.5 h-4.5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4.5 h-4.5 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 dark:border-slate-800 p-5 animate-fadeIn">
                      {/* Score Banner */}
                      <div className="mb-6 p-4.5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 text-white flex items-center justify-between shadow-inner animate-fadeIn">
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-indigo-150 font-bold">AI Drug-Likeness Index</div>
                          <div className="text-xl font-extrabold font-mono mt-0.5">{record.prediction_score.toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-indigo-150 font-bold text-right">Tanimoto Similarity</div>
                          <div className="text-xl font-extrabold font-mono mt-0.5 text-right">{(record.similarity * 100).toFixed(1)}%</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Pharmacokinetics */}
                        <div className="p-4 border border-slate-100 dark:border-slate-800/80 rounded-2xl bg-slate-50/20 dark:bg-slate-950/20">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Pharmacokinetics</h4>
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[9px] font-bold">
                                <td className="pb-1.5">Metric</td>
                                <td className="pb-1.5 text-right">Input</td>
                                <td className="pb-1.5 text-right">Gen</td>
                              </tr>
                            </thead>
                            <tbody className="text-slate-650 dark:text-slate-400 font-medium">
                              {[
                                ['MW', record.input_properties.mw.toFixed(1), record.gen_properties.mw.toFixed(1)],
                                ['LogP', record.input_properties.logp.toFixed(2), record.gen_properties.logp.toFixed(2)],
                                ['QED', record.input_properties.qed.toFixed(3), record.gen_properties.qed.toFixed(3)],
                                ['HBD', record.input_properties.hbd, record.gen_properties.hbd],
                                ['HBA', record.input_properties.hba, record.gen_properties.hba],
                                ['Rot. Bonds', record.input_properties.rot_bonds, record.gen_properties.rot_bonds],
                              ].map(([label, inp, gen]) => (
                                <tr key={String(label)} className="border-t border-slate-100 dark:border-slate-800/80">
                                  <td className="py-2">{label}</td>
                                  <td className="py-2 text-right font-mono text-slate-400">{inp}</td>
                                  <td className="py-2 text-right font-mono font-bold text-teal-650 dark:text-teal-400">{gen}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Bioactivity */}
                        <div className="p-4 border border-slate-100 dark:border-slate-800/80 rounded-2xl bg-slate-50/20 dark:bg-slate-950/20 space-y-3.5">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Bioactivity Profile</h4>
                          {[
                            ['Kinase Inhibition', record.bioactivity.kinase_inhibition],
                            ['GPCR Binding', record.bioactivity.gpcr_binding],
                            ['Ion Channel', record.bioactivity.ion_channel],
                            ['Nuclear Receptor', record.bioactivity.nuclear_receptor],
                          ].map(([label, val]) => (
                            <div key={String(label)} className="space-y-1 text-xs">
                              <div className="flex justify-between font-medium">
                                <span className="text-slate-650 dark:text-slate-400">{label}</span>
                                <span className={cn("font-bold", scoreTextColor(Number(val)))}>{Number(val).toFixed(1)}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className={cn("h-full rounded-full transition-all duration-300", scoreColor(Number(val)))}
                                  style={{ width: `${val}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Toxicity */}
                        <div className="p-4 border border-slate-100 dark:border-slate-800/80 rounded-2xl bg-slate-50/20 dark:bg-slate-950/20 space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Toxicity Assessment</h4>
                          {[
                            ['Hepatotoxicity', record.toxicity.hepatotoxicity],
                            ['Cardiotoxicity', record.toxicity.cardiotoxicity],
                            ['Mutagenicity', record.toxicity.mutagenicity],
                            ['Skin Sensitization', record.toxicity.skin_sensitization],
                          ].map(([label, risk]) => (
                            <div key={String(label)} className="flex justify-between items-center text-xs py-2 border-b border-slate-100 dark:border-slate-800/80 last:border-none">
                              <span className="text-slate-650 dark:text-slate-400 font-medium">{label}</span>
                              <span className={riskBadge(String(risk))}>{risk}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </main>

      <Footer />

      {/* 3D Molecule View Modal */}
      {selectedRecord && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={`Molecular Structure Conformation (Record ID: ${selectedRecord.id})`}
          className="max-w-4xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
            {/* Input Compound Visualizer */}
            <div className="flex flex-col items-center p-4 border border-slate-100 dark:border-slate-800/80 rounded-2xl bg-white dark:bg-slate-950 shadow-inner relative overflow-hidden">
              <div className="absolute top-3 left-3 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold px-2 py-0.5 rounded-lg text-[9px] uppercase tracking-wider z-10">
                Input Compound
              </div>
              <div className="w-full h-80 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl overflow-hidden mt-4 border border-slate-100/50">
                <Molecule 
                  data={smilesToMoleculeData(selectedRecord.input_smiles, 'Input Structure')} 
                  size="lg" 
                  animate={true} 
                />
              </div>
              <div className="mt-4 text-[10px] font-mono text-center max-w-full truncate text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                SMILES: {selectedRecord.input_smiles}
              </div>
            </div>

            {/* Generated Derivative Visualizer */}
            <div className="flex flex-col items-center p-4 border border-slate-100 dark:border-slate-800/80 rounded-2xl bg-white dark:bg-slate-950 shadow-inner relative overflow-hidden">
              <div className="absolute top-3 left-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-lg text-[9px] uppercase tracking-wider z-10">
                Optimized Derivative
              </div>
              <div className="w-full h-80 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl overflow-hidden mt-4 border border-slate-100/50">
                <Molecule 
                  data={smilesToMoleculeData(selectedRecord.generated_smiles, 'AI Derivative')} 
                  size="lg" 
                  animate={true} 
                />
              </div>
              <div className="mt-4 text-[10px] font-mono text-center max-w-full truncate text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                SMILES: {selectedRecord.generated_smiles}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800/85 pt-4">
            <Button
              variant="outline"
              onClick={() => handleDownloadReport(selectedRecord)}
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" /> Download Report
            </Button>
            <Button
              onClick={() => setIsViewModalOpen(false)}
              size="sm"
            >
              Close
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default History;
