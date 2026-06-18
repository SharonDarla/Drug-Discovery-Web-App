import type { MoleculeData, Atom, Bond } from '@/components/Molecule';

export function buildFilename(extension: string): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const stamp = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    '_',
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join('');
  return `molecule_${stamp}.${extension}`;
}

/** Trigger a browser download for the given blob. */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();

  // Clean up after a short delay so the browser can finish the download
  setTimeout(() => {
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, 200);
}

const ATOMIC_NUMBERS: Record<string, number> = {
  H: 1, He: 2, Li: 3, Be: 4, B: 5, C: 6, N: 7, O: 8, F: 9, Ne: 10,
  Na: 11, Mg: 12, Al: 13, Si: 14, P: 15, S: 16, Cl: 17, Ar: 18,
  K: 19, Ca: 20, Br: 35, I: 53,
};

export async function exportAsPNG(
  _molecule: MoleculeData,
  base64Image: string | null,
): Promise<Blob | null> {
  if (!base64Image) return null;

  // The base64Image includeS the data-url prefix — strip it if present
  const raw = base64Image.replace(/^data:image\/png;base64,/, '');

  // Decode base64 into a binary array
  const binaryStr = atob(raw);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }

  return new Blob([bytes], { type: 'image/png' });
}

export async function exportAsSMILES(
  molecule: MoleculeData,
  smilesString?: string,
): Promise<Blob> {
  const content = smilesString
    ? `${smilesString}\t${molecule.name}\n`
    : `${molecule.atoms.map((a) => a.element).join('')}\t${molecule.name}\n`;

  return new Blob([content], { type: 'text/plain' });
}


function buildMolBlock(molecule: MoleculeData): string {
  const lines: string[] = [];

  // Header block: molecule name, program/timestamp, comment
  lines.push(molecule.name || 'Molecule');
  lines.push('  DrugGen 3D');
  lines.push('  Exported from DrugGen platform');

  // Counts line
  const atomCount = molecule.atoms.length;
  const bondCount = molecule.bonds.length;
  // Format:  aaabbblllfffcccsssxxxrrrpppiiimmmvvvvvv
  const countsLine = [
    String(atomCount).padStart(3),
    String(bondCount).padStart(3),
    '  0  0  0  0  0  0  0  0999 V2000',
  ].join('');
  lines.push(countsLine);

  // Build an id → index map so we can reference atoms by 1-based index in bonds
  const idToIndex = new Map<string, number>();
  molecule.atoms.forEach((atom, i) => {
    idToIndex.set(atom.id, i + 1);
  });

  // Atom block
  molecule.atoms.forEach((atom) => {
    const x = atom.x.toFixed(4).padStart(10);
    const y = atom.y.toFixed(4).padStart(10);
    const z = atom.z.toFixed(4).padStart(10);
    const sym = atom.element.padEnd(3);
    // mass diff, charge, stereo parity, etc. — all zeroes for a simple export
    lines.push(`${x}${y}${z} ${sym} 0  0  0  0  0  0  0  0  0  0  0  0`);
  });

  // Bond block
  molecule.bonds.forEach((bond) => {
    const src = idToIndex.get(bond.source) ?? 0;
    const tgt = idToIndex.get(bond.target) ?? 0;
    const bondOrder = bond.type === 'triple' ? 3 : bond.type === 'double' ? 2 : 1;
    const srcStr = String(src).padStart(3);
    const tgtStr = String(tgt).padStart(3);
    const orderStr = String(bondOrder).padStart(3);
    lines.push(`${srcStr}${tgtStr}${orderStr}  0  0  0  0`);
  });

  // Terminator
  lines.push('M  END');

  return lines.join('\n');
}

export async function exportAsMOL(molecule: MoleculeData): Promise<Blob> {
  const molBlock = buildMolBlock(molecule);
  return new Blob([molBlock], { type: 'chemical/x-mdl-molfile' });
}

export async function exportAsSDF(molecule: MoleculeData): Promise<Blob> {
  const molBlock = buildMolBlock(molecule);
  // Append the SDF record terminator
  const sdfContent = `${molBlock}\n$$$$\n`;
  return new Blob([sdfContent], { type: 'chemical/x-mdl-sdfile' });
}
