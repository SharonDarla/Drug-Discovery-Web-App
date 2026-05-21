
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface Atom {
  id: string;
  element: string;
  x: number;
  y: number;
  z: number;
}

export interface Bond {
  id: string;
  source: string;
  target: string;
  type: 'single' | 'double' | 'triple';
}

export interface MoleculeData {
  id: string;
  name: string;
  atoms: Atom[];
  bonds: Bond[];
}

interface MoleculeProps {
  data: MoleculeData;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

const getAtomColor = (element: string): string => {
  const colors: Record<string, string> = {
    C: 'bg-molecule-carbon',
    H: 'bg-molecule-hydrogen border border-gray-300',
    O: 'bg-molecule-oxygen',
    N: 'bg-molecule-nitrogen',
    S: 'bg-molecule-sulfur',
    P: 'bg-molecule-phosphorus',
    F: 'bg-molecule-fluorine',
    Cl: 'bg-molecule-chlorine',
    Br: 'bg-molecule-bromine',
    I: 'bg-molecule-iodine',
  };
  
  return colors[element] || 'bg-gray-400';
};

const getAtomSize = (element: string, size: string): number => {
  const baseSize = size === 'sm' ? 8 : size === 'md' ? 12 : size === 'lg' ? 16 : 20;
  const multiplier: Record<string, number> = {
    C: 1.2,
    H: 0.8,
    O: 1.3,
    N: 1.3,
    S: 1.5,
    P: 1.5,
    F: 1.1,
    Cl: 1.4,
    Br: 1.6,
    I: 1.8,
  };
  
  return baseSize * (multiplier[element] || 1);
};

const Molecule: React.FC<MoleculeProps> = ({ 
  data, 
  className,
  size = 'md',
  animate = true
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const containerSize = size === 'sm' ? 200 : size === 'md' ? 300 : size === 'lg' ? 400 : 500;
  
  useEffect(() => {
    if (!animate) return;
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x + 0.5,
        y: prev.y + 0.3,
        z: prev.z + 0.1
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, [animate]);
  
  // Normalize positions to fit the container
  const normalizePositions = () => {
    if (!data.atoms.length) return { atoms: [], center: { x: 0, y: 0, z: 0 } };
    
    // Find min and max coordinates
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    
    data.atoms.forEach(atom => {
      minX = Math.min(minX, atom.x);
      minY = Math.min(minY, atom.y);
      minZ = Math.min(minZ, atom.z);
      maxX = Math.max(maxX, atom.x);
      maxY = Math.max(maxY, atom.y);
      maxZ = Math.max(maxZ, atom.z);
    });
    
    // Calculate center and range
    const center = {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2,
      z: (minZ + maxZ) / 2
    };
    
    const range = Math.max(maxX - minX, maxY - minY, maxZ - minZ) || 1;
    const scale = containerSize * 0.8 / range;
    
    // Normalize positions
    const normalizedAtoms = data.atoms.map(atom => ({
      ...atom,
      normX: ((atom.x - center.x) * scale) + containerSize / 2,
      normY: ((atom.y - center.y) * scale) + containerSize / 2,
      normZ: (atom.z - center.z) * scale
    }));
    
    return { atoms: normalizedAtoms, center };
  };
  
  const { atoms, center } = normalizePositions();
  
  // Apply the rotation transformation to each atom
  const transformedAtoms = atoms.map(atom => {
    const radX = rotation.x * Math.PI / 180;
    const radY = rotation.y * Math.PI / 180;
    const radZ = rotation.z * Math.PI / 180;
    
    // Rotation around X-axis
    let x1 = atom.normX - containerSize / 2;
    let y1 = atom.normY - containerSize / 2;
    let z1 = atom.normZ;
    
    let x2 = x1;
    let y2 = y1 * Math.cos(radX) - z1 * Math.sin(radX);
    let z2 = y1 * Math.sin(radX) + z1 * Math.cos(radX);
    
    // Rotation around Y-axis
    let x3 = x2 * Math.cos(radY) + z2 * Math.sin(radY);
    let y3 = y2;
    let z3 = -x2 * Math.sin(radY) + z2 * Math.cos(radY);
    
    // Rotation around Z-axis
    let x4 = x3 * Math.cos(radZ) - y3 * Math.sin(radZ);
    let y4 = x3 * Math.sin(radZ) + y3 * Math.cos(radZ);
    let z4 = z3;
    
    return {
      ...atom,
      displayX: x4 + containerSize / 2,
      displayY: y4 + containerSize / 2,
      displayZ: z4
    };
  });
  
  // Sort atoms by their z-coordinate for proper 3D rendering
  const sortedAtoms = [...transformedAtoms].sort((a, b) => a.displayZ - b.displayZ);
  
  // Calculate bonds
  const renderBonds = () => {
    return data.bonds.map(bond => {
      const sourceAtom = transformedAtoms.find(a => a.id === bond.source);
      const targetAtom = transformedAtoms.find(a => a.id === bond.target);
      
      if (!sourceAtom || !targetAtom) return null;
      
      const dx = targetAtom.displayX - sourceAtom.displayX;
      const dy = targetAtom.displayY - sourceAtom.displayY;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      
      // Adjust start and end positions to connect to atom edges
      const sourceSize = getAtomSize(sourceAtom.element, size);
      const targetSize = getAtomSize(targetAtom.element, size);
      
      const startOffset = sourceSize / 2;
      const endOffset = length - targetSize / 2;
      
      const adjustedLength = endOffset - startOffset;
      
      const thickness = size === 'sm' ? 2 : size === 'md' ? 3 : size === 'lg' ? 4 : 5;
      
      return (
        <div 
          key={bond.id} 
          className="bond"
          style={{
            left: sourceAtom.displayX + startOffset * Math.cos(angle * Math.PI / 180),
            top: sourceAtom.displayY + startOffset * Math.sin(angle * Math.PI / 180),
            width: adjustedLength,
            height: thickness,
            transform: `rotate(${angle}deg)`,
            opacity: 0.8 + (sourceAtom.displayZ + targetAtom.displayZ) / 200
          }}
        />
      );
    });
  };

  return (
    <div 
      className={cn(
        "molecule-container relative bg-white/80", 
        animate && "overflow-hidden", 
        className
      )} 
      style={{ 
        width: containerSize, 
        height: containerSize,
      }}
    >
      {renderBonds()}
      
      {sortedAtoms.map(atom => (
        <div
          key={atom.id}
          className={cn(
            "atom", 
            getAtomColor(atom.element),
            animate && "hover:scale-110"
          )}
          style={{
            width: getAtomSize(atom.element, size),
            height: getAtomSize(atom.element, size),
            left: atom.displayX - getAtomSize(atom.element, size) / 2,
            top: atom.displayY - getAtomSize(atom.element, size) / 2,
            opacity: 0.8 + atom.displayZ / 100,
            zIndex: Math.round(atom.displayZ + 1000),
          }}
          title={`${atom.element} (${atom.id})`}
        />
      ))}
      
      {data.name && (
        <div className="absolute bottom-2 right-2 molecule-badge animate-pulse-subtle">
          {data.name}
        </div>
      )}
    </div>
  );
};

export default Molecule;
