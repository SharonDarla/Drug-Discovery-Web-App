import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import {
  FlaskConical, Beaker, History as HistoryIcon, Sun, Moon,
  Search, Trash2, ChevronDown, ChevronUp, AlertCircle, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Shape of one history record from the API
interface HistoryRecord {
  id: number;
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


const History = () => {
  const { toast } = useToast();

  // Theme (same logic as Index.tsx)
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
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Data state
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Fetch history from Flask backend
  const fetchHistory = (search = '') => {
    setLoading(true);
    setError(null);

    const url = search
      ? `http://localhost:5000/api/history?search=${encodeURIComponent(search)}`
      : 'http://localhost:5000/api/history';

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
  const handleDelete = (id: number) => {
    if (!window.confirm('Delete this prediction record? This cannot be undone.')) return;

    setDeletingId(id);
    fetch(`http://localhost:5000/api/history/${id}`, { method: 'DELETE' })
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">

      {/* Navigation Bar — same as Index.tsx */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/50 dark:border-slate-800/50 mb-6">
        <div className="container px-4 mx-auto max-w-7xl flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg text-slate-800 dark:text-slate-100 hover:opacity-80 transition-opacity">
              <FlaskConical className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              DrugGen 
            </Link>
            <div className="flex items-center gap-1">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                  <Beaker className="w-4 h-4 mr-1.5" /> Generator
                </Button>
              </Link>
              <Link to="/history">
                <Button variant="ghost" size="sm" className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  <HistoryIcon className="w-4 h-4 mr-1.5" /> History
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

      <div className="container px-4 pb-12 mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="flex flex-col items-center mb-8 text-center animate-fadeIn">
          <div className="flex items-center gap-2 mb-3">
            <HistoryIcon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Prediction History</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg">
            Browse all previously generated molecules. Click any record to expand full property analysis.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8 animate-fadeIn">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by SMILES..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:border-indigo-500 dark:focus:border-indigo-400 font-mono text-sm"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500 animate-fadeIn">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <span className="text-sm">Loading history...</span>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500 animate-fadeIn">
            <AlertCircle className="w-10 h-10 mb-3 text-rose-400" />
            <span className="text-sm font-medium text-rose-500">{error}</span>
            <p className="text-xs mt-1">Make sure the Flask backend is running on port 5000.</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && records.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500 animate-fadeIn">
            <FlaskConical className="w-12 h-12 mb-3 opacity-30" />
            <span className="text-base font-medium">No predictions yet</span>
            <p className="text-sm mt-1">Generate your first molecule on the <Link to="/" className="text-blue-500 hover:underline">Generator page</Link>.</p>
          </div>
        )}

        {/* Records List */}
        {!loading && !error && records.length > 0 && (
          <div className="space-y-4 animate-fadeIn">
            {/* Results count */}
            <div className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
              Showing {records.length} record{records.length !== 1 ? 's' : ''}
            </div>

            {records.map((record, index) => {
              const isExpanded = expandedId === record.id;
              return (
                <Card
                  key={record.id}
                  className={cn(
                    "border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/60 backdrop-blur-sm transition-all duration-300 hover:shadow-md",
                    isExpanded && "ring-2 ring-indigo-200 dark:ring-indigo-800 shadow-lg"
                  )}
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  {/* Summary Row */}
                  <div
                    className="flex items-center gap-4 p-4 cursor-pointer select-none group"
                    onClick={() => setExpandedId(isExpanded ? null : record.id)}
                  >
                    {/* Score badge */}
                    <div className={cn("flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm", scoreColor(record.prediction_score))}>
                      {record.prediction_score.toFixed(0)}
                    </div>

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Input</span>
                        <code className="text-sm font-mono text-slate-700 dark:text-slate-300 truncate max-w-[220px]" title={record.input_smiles}>
                          {record.input_smiles}
                        </code>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Gen</span>
                        <code className="text-sm font-mono text-teal-600 dark:text-teal-400 truncate max-w-[220px]" title={record.generated_smiles}>
                          {record.generated_smiles}
                        </code>
                      </div>
                    </div>

                    {/* Quick stats */}
                    <div className="hidden md:flex items-center gap-6 text-xs">
                      <div className="text-center">
                        <div className="text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold mb-0.5">QED</div>
                        <div className="font-mono font-bold text-slate-700 dark:text-slate-300">{record.gen_properties.qed.toFixed(3)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold mb-0.5">Similarity</div>
                        <div className="font-mono font-bold text-slate-700 dark:text-slate-300">{(record.similarity * 100).toFixed(1)}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold mb-0.5">MW</div>
                        <div className="font-mono font-bold text-slate-700 dark:text-slate-300">{record.gen_properties.mw.toFixed(1)}</div>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="hidden lg:block text-xs text-slate-400 dark:text-slate-500 min-w-[140px] text-right">
                      {formatDate(record.created_at)}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                        onClick={e => { e.stopPropagation(); handleDelete(record.id); }}
                        disabled={deletingId === record.id}
                        title="Delete record"
                      >
                        {deletingId === record.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </Button>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 dark:border-slate-800 p-5 animate-fadeIn">

                      {/* Score Banner */}
                      <div className="mb-5 p-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-between">
                        <div>
                          <div className="text-xs uppercase tracking-widest text-white/70 font-bold">AI Drug-Likeness Index</div>
                          <div className="text-2xl font-black font-mono">{record.prediction_score.toFixed(1)}%</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs uppercase tracking-widest text-white/70 font-bold">Similarity</div>
                          <div className="text-2xl font-black font-mono">{(record.similarity * 100).toFixed(1)}%</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* Pharmacokinetic Comparison */}
                        <Card className="p-3 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                          <CardHeader className="p-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">Pharmacokinetics</CardTitle>
                          </CardHeader>
                          <CardContent className="p-0">
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">
                                  <td className="pb-1">Metric</td>
                                  <td className="pb-1 text-right">Input</td>
                                  <td className="pb-1 text-right">Gen</td>
                                </tr>
                              </thead>
                              <tbody className="text-slate-600 dark:text-slate-400">
                                {[
                                  ['MW', record.input_properties.mw.toFixed(1), record.gen_properties.mw.toFixed(1)],
                                  ['LogP', record.input_properties.logp.toFixed(2), record.gen_properties.logp.toFixed(2)],
                                  ['QED', record.input_properties.qed.toFixed(3), record.gen_properties.qed.toFixed(3)],
                                  ['HBD', record.input_properties.hbd, record.gen_properties.hbd],
                                  ['HBA', record.input_properties.hba, record.gen_properties.hba],
                                  ['Rot. Bonds', record.input_properties.rot_bonds, record.gen_properties.rot_bonds],
                                ].map(([label, inp, gen]) => (
                                  <tr key={String(label)} className="border-t border-slate-100 dark:border-slate-800">
                                    <td className="py-1.5 font-medium">{label}</td>
                                    <td className="py-1.5 text-right font-mono text-slate-400">{inp}</td>
                                    <td className="py-1.5 text-right font-mono font-bold text-teal-600 dark:text-teal-400">{gen}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </CardContent>
                        </Card>

                        {/* Bioactivity */}
                        <Card className="p-3 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                          <CardHeader className="p-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">Bioactivity</CardTitle>
                          </CardHeader>
                          <CardContent className="p-0 space-y-2.5">
                            {[
                              ['Kinase Inhibition', record.bioactivity.kinase_inhibition],
                              ['GPCR Binding', record.bioactivity.gpcr_binding],
                              ['Ion Channel', record.bioactivity.ion_channel],
                              ['Nuclear Receptor', record.bioactivity.nuclear_receptor],
                            ].map(([label, value]) => (
                              <div key={String(label)}>
                                <div className="flex justify-between text-xs mb-0.5">
                                  <span className="text-slate-600 dark:text-slate-400 font-medium">{label}</span>
                                  <span className={cn("font-bold", scoreTextColor(Number(value)))}>{Number(value).toFixed(1)}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className={cn("h-full rounded-full transition-all duration-500", scoreColor(Number(value)))}
                                    style={{ width: `${value}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>

                        {/* Toxicity */}
                        <Card className="p-3 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                          <CardHeader className="p-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">Toxicity Profile</CardTitle>
                          </CardHeader>
                          <CardContent className="p-0 space-y-2">
                            {[
                              ['Hepatotoxicity', record.toxicity.hepatotoxicity],
                              ['Cardiotoxicity', record.toxicity.cardiotoxicity],
                              ['Mutagenicity', record.toxicity.mutagenicity],
                              ['Skin Sensitization', record.toxicity.skin_sensitization],
                            ].map(([label, risk]) => (
                              <div key={String(label)} className="flex justify-between items-center text-xs py-1 border-b border-slate-100 dark:border-slate-800 last:border-0">
                                <span className="text-slate-600 dark:text-slate-400 font-medium">{label}</span>
                                <span className={riskBadge(String(risk))}>{risk}</span>
                              </div>
                            ))}
                          </CardContent>
                        </Card>

                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
