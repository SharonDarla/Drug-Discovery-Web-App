import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { Download, Image, FileText, FileCode, Loader2 } from 'lucide-react';
import type { MoleculeData } from '@/components/Molecule';
import {
  buildFilename,
  downloadBlob,
  exportAsPNG,
  exportAsSMILES,
  exportAsMOL,
  exportAsSDF,
} from '@/lib/moleculeExport';


type ExportFormat = 'png' | 'smiles' | 'mol' | 'sdf';

interface MoleculeExportButtonProps {
  molecule: MoleculeData | null;
  moleculeImage?: string | null;
  smilesString?: string;
}

const MoleculeExportButton: React.FC<MoleculeExportButtonProps> = ({
  molecule,
  moleculeImage = null,
  smilesString,
}) => {
  const { toast } = useToast();

  // Track which format is currently being exported (shows a spinner)
  const [exporting, setExporting] = useState<ExportFormat | null>(null);

  /** Shared export handler — delegates to the right utility function. */
  const handleExport = useCallback(
    async (format: ExportFormat) => {
      if (!molecule) return;

      setExporting(format);

      try {
        let blob: Blob | null = null;
        let filename = '';

        switch (format) {
          case 'png': {
            blob = await exportAsPNG(molecule, moleculeImage ?? null);
            if (!blob) {
              toast({
                title: 'PNG not available',
                description:
                  'Generate a molecule first — the 2D diagram is needed for PNG export.',
                variant: 'destructive',
              });
              setExporting(null);
              return;
            }
            filename = buildFilename('png');
            break;
          }
          case 'smiles': {
            blob = await exportAsSMILES(molecule, smilesString);
            filename = buildFilename('txt');
            break;
          }
          case 'mol': {
            blob = await exportAsMOL(molecule);
            filename = buildFilename('mol');
            break;
          }
          case 'sdf': {
            blob = await exportAsSDF(molecule);
            filename = buildFilename('sdf');
            break;
          }
        }

        if (blob) {
          downloadBlob(blob, filename);
          toast({
            title: 'Export successful',
            description: `${filename} has been downloaded.`,
          });
        }
      } catch (err: any) {
        console.error(`[MoleculeExport] Failed to export as ${format}:`, err);
        toast({
          title: 'Export failed',
          description: err?.message || 'Something went wrong while exporting.',
          variant: 'destructive',
        });
      } finally {
        setExporting(null);
      }
    },
    [molecule, moleculeImage, smilesString, toast],
  );

  // If there's no molecule we disable the entire trigger button
  const isDisabled = !molecule || molecule.atoms.length === 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          id="molecule-export-button"
          variant="outline"
          size="sm"
          disabled={isDisabled}
          className="h-8 px-3 rounded-md text-xs font-semibold gap-1.5
                     border-slate-200 dark:border-slate-700
                     bg-white/80 dark:bg-slate-900/80
                     hover:bg-slate-50 dark:hover:bg-slate-800
                     text-slate-700 dark:text-slate-300
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-200"
        >
          {exporting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
          Export
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="w-52 rounded-xl border border-slate-200 dark:border-slate-700
                   bg-white dark:bg-slate-900 shadow-xl backdrop-blur-lg
                   p-1.5 animate-in fade-in-0 zoom-in-95"
      >
        <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold px-2 py-1">
          Export Molecule
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />

        {/* PNG */}
        <DropdownMenuItem
          id="export-png"
          disabled={exporting !== null}
          onClick={() => handleExport('png')}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer
                     text-sm font-medium text-slate-700 dark:text-slate-300
                     hover:bg-indigo-50 dark:hover:bg-indigo-950/40
                     focus:bg-indigo-50 dark:focus:bg-indigo-950/40
                     transition-colors duration-150"
        >
          {exporting === 'png' ? (
            <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
          ) : (
            <Image className="w-4 h-4 text-indigo-500" />
          )}
          <div className="flex flex-col">
            <span>PNG Image</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
              2D structure diagram
            </span>
          </div>
        </DropdownMenuItem>

        {/* SMILES */}
        <DropdownMenuItem
          id="export-smiles"
          disabled={exporting !== null}
          onClick={() => handleExport('smiles')}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer
                     text-sm font-medium text-slate-700 dark:text-slate-300
                     hover:bg-emerald-50 dark:hover:bg-emerald-950/40
                     focus:bg-emerald-50 dark:focus:bg-emerald-950/40
                     transition-colors duration-150"
        >
          {exporting === 'smiles' ? (
            <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
          ) : (
            <FileText className="w-4 h-4 text-emerald-500" />
          )}
          <div className="flex flex-col">
            <span>SMILES (.txt)</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
              Canonical line notation
            </span>
          </div>
        </DropdownMenuItem>

        {/* MOL */}
        <DropdownMenuItem
          id="export-mol"
          disabled={exporting !== null}
          onClick={() => handleExport('mol')}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer
                     text-sm font-medium text-slate-700 dark:text-slate-300
                     hover:bg-amber-50 dark:hover:bg-amber-950/40
                     focus:bg-amber-50 dark:focus:bg-amber-950/40
                     transition-colors duration-150"
        >
          {exporting === 'mol' ? (
            <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
          ) : (
            <FileCode className="w-4 h-4 text-amber-500" />
          )}
          <div className="flex flex-col">
            <span>MOL File</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
              V2000 connection table
            </span>
          </div>
        </DropdownMenuItem>

        {/* SDF */}
        <DropdownMenuItem
          id="export-sdf"
          disabled={exporting !== null}
          onClick={() => handleExport('sdf')}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer
                     text-sm font-medium text-slate-700 dark:text-slate-300
                     hover:bg-purple-50 dark:hover:bg-purple-950/40
                     focus:bg-purple-50 dark:focus:bg-purple-950/40
                     transition-colors duration-150"
        >
          {exporting === 'sdf' ? (
            <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
          ) : (
            <FileCode className="w-4 h-4 text-purple-500" />
          )}
          <div className="flex flex-col">
            <span>SDF File</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
              Structure-data format
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoleculeExportButton;
