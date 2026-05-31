
import React, { useEffect, useState, useRef, useCallback } from 'react';
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

// Returns a readable text color that contrasts with the atom background
const getAtomTextColor = (element: string): string => {
  const darkBg: Record<string, boolean> = {
    C: true,
    O: true,
    N: true,
    Br: true,
    I: true,
  };
  return darkBg[element] ? '#ffffff' : '#1e293b';
};

const getAtomSize = (element: string, size: string): number => {
  const baseSize = size === 'sm' ? 12 : size === 'md' ? 16 : size === 'lg' ? 22 : 26;
  const multiplier: Record<string, number> = {
    C: 1.2,
    H: 0.85,
    O: 1.3,
    N: 1.3,
    S: 1.5,
    P: 1.5,
    F: 1.15,
    Cl: 1.4,
    Br: 1.5,
    I: 1.6,
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
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [userInteracting, setUserInteracting] = useState(false);
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);
  const interactionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDims, setContainerDims] = useState({ width: 0, height: 0 });

  // Mark that the user is interacting; auto-rotation resumes after 2s idle
  const markUserInteraction = useCallback(() => {
    setUserInteracting(true);
    if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
    interactionTimeout.current = setTimeout(() => {
      setUserInteracting(false);
    }, 2000);
  }, []);

  // Clean up interaction timeout on unmount
  useEffect(() => {
    return () => {
      if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
    };
  }, []);

  // --- Mouse drag handlers ---
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    markUserInteraction();
  }, [markUserInteraction]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !lastMousePos.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    // Horizontal drag → rotate around Y-axis; vertical drag → rotate around X-axis
    setRotation(prev => ({
      x: prev.x + dy * 0.5,
      y: prev.y + dx * 0.5,
      z: prev.z,
    }));
    markUserInteraction();
  }, [isDragging, markUserInteraction]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    lastMousePos.current = null;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    lastMousePos.current = null;
  }, []);

  // --- Touch drag handlers (mobile support) ---
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      markUserInteraction();
    }
  }, [markUserInteraction]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !lastMousePos.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMousePos.current.x;
    const dy = e.touches[0].clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    setRotation(prev => ({
      x: prev.x + dy * 0.5,
      y: prev.y + dx * 0.5,
      z: prev.z,
    }));
    markUserInteraction();
  }, [isDragging, markUserInteraction]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    lastMousePos.current = null;
  }, []);

  // --- Scroll-to-zoom handler ---
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(prev => {
      const next = prev - e.deltaY * 0.001;
      return Math.max(0.4, Math.min(2.5, next));
    });
    markUserInteraction();
  }, [markUserInteraction]);

  // Measure actual container size so the molecule fits its parent
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerDims({ width: rect.width, height: rect.height });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Use the smaller of width/height so the molecule is never cut off
  const renderSize = Math.min(containerDims.width, containerDims.height) || 300;

  // Auto-rotation: only runs when animate is true AND user is NOT interacting
  useEffect(() => {
    if (!animate || userInteracting) return;
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x + 0.5,
        y: prev.y + 0.3,
        z: prev.z + 0.1
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, [animate, userInteracting]);

  // Padding from container edges so atoms don't touch the border
  const edgePadding = size === 'sm' ? 20 : size === 'md' ? 28 : size === 'lg' ? 36 : 40;
  const usableSize = renderSize - edgePadding * 2;
  
  // Normalize positions to fit the usable area
  const normalizePositions = useCallback(() => {
    if (!data.atoms.length) return { atoms: [] as any[], center: { x: 0, y: 0, z: 0 } };
    
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
    
    const center = {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2,
      z: (minZ + maxZ) / 2
    };
    
    const range = Math.max(maxX - minX, maxY - minY, maxZ - minZ) || 1;
    const scale = usableSize * 0.7 / range;
    
    const half = renderSize / 2;
    const normalizedAtoms = data.atoms.map(atom => ({
      ...atom,
      normX: ((atom.x - center.x) * scale) + half,
      normY: ((atom.y - center.y) * scale) + half,
      normZ: (atom.z - center.z) * scale
    }));
    
    return { atoms: normalizedAtoms, center };
  }, [data.atoms, usableSize, renderSize]);
  
  const { atoms } = normalizePositions();

  const half = renderSize / 2;

  // Apply the rotation transformation to each atom (with zoom)
  const transformedAtoms = atoms.map(atom => {
    const radX = rotation.x * Math.PI / 180;
    const radY = rotation.y * Math.PI / 180;
    const radZ = rotation.z * Math.PI / 180;
    
    let x1 = atom.normX - half;
    let y1 = atom.normY - half;
    let z1 = atom.normZ;

    // Apply zoom scaling before rotation
    x1 *= zoom;
    y1 *= zoom;
    z1 *= zoom;
    
    // Rotation around X-axis
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

    // Clamp to stay well within container bounds
    const atomSize = getAtomSize(atom.element, size);
    const clampMin = edgePadding + atomSize / 2;
    const clampMax = renderSize - edgePadding - atomSize / 2;
    const displayX = Math.max(clampMin, Math.min(clampMax, x4 + half));
    const displayY = Math.max(clampMin, Math.min(clampMax, y4 + half));
    
    return {
      ...atom,
      displayX,
      displayY,
      displayZ: z4
    };
  });
  
  // Sort atoms by their z-coordinate for proper depth ordering
  const sortedAtoms = [...transformedAtoms].sort((a, b) => a.displayZ - b.displayZ);

  // Find z-range for proper opacity normalization
  const zValues = transformedAtoms.map(a => a.displayZ);
  const zMin = Math.min(...zValues, -1);
  const zMax = Math.max(...zValues, 1);
  const zRange = zMax - zMin || 1;
  
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
      
      const sourceSize = getAtomSize(sourceAtom.element, size);
      const targetSize = getAtomSize(targetAtom.element, size);
      
      const startOffset = sourceSize / 2;
      const adjustedLength = length - sourceSize / 2 - targetSize / 2;
      
      if (adjustedLength <= 0) return null;
      
      const thickness = size === 'sm' ? 2 : size === 'md' ? 3 : size === 'lg' ? 3 : 4;

      // Normalize bond opacity based on average z-depth
      const avgZ = (sourceAtom.displayZ + targetAtom.displayZ) / 2;
      const bondOpacity = 0.35 + 0.65 * ((avgZ - zMin) / zRange);
      
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
            opacity: Math.min(1, Math.max(0.3, bondOpacity)),
          }}
        />
      );
    });
  };

  // Font size for element labels inside atoms
  const labelFontSize = size === 'sm' ? 7 : size === 'md' ? 8 : size === 'lg' ? 9 : 10;

  return (
    <div 
      ref={containerRef}
      className={cn(
        "molecule-container relative bg-white/80 overflow-hidden", 
        className
      )} 
      style={{ 
        width: '100%', 
        height: '100%',
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {renderSize > 0 && (
        <>
          {renderBonds()}
          
          {sortedAtoms.map(atom => {
            const atomSize = getAtomSize(atom.element, size);
            // Normalize opacity: back atoms are dimmer, front atoms are brighter
            const depthOpacity = 0.4 + 0.6 * ((atom.displayZ - zMin) / zRange);
            const clampedOpacity = Math.min(1, Math.max(0.4, depthOpacity));

            return (
              <div
                key={atom.id}
                className={cn(
                  "atom flex items-center justify-center", 
                  getAtomColor(atom.element),
                  animate && "hover:scale-125"
                )}
                style={{
                  width: atomSize,
                  height: atomSize,
                  left: atom.displayX - atomSize / 2,
                  top: atom.displayY - atomSize / 2,
                  opacity: clampedOpacity,
                  zIndex: Math.round(atom.displayZ + 1000),
                  // Subtle depth-based scale for 3D perspective effect
                  transform: `scale(${0.85 + 0.3 * ((atom.displayZ - zMin) / zRange)})`,
                }}
                title={`${atom.element} (${atom.id})`}
              >
                <span
                  style={{
                    fontSize: labelFontSize,
                    fontWeight: 700,
                    color: getAtomTextColor(atom.element),
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  {atom.element}
                </span>
              </div>
            );
          })}
        </>
      )}
      
      {data.name && (
        <div className="absolute bottom-2 right-2 molecule-badge animate-pulse-subtle">
          {data.name}
        </div>
      )}

      {/* Interaction hint — fades out after first drag */}
      {!userInteracting && animate && (
        <div 
          className="absolute top-2 left-2 text-[10px] text-gray-400 pointer-events-none select-none transition-opacity duration-500"
          style={{ opacity: 0.7 }}
        >
          🖱️ Drag to rotate · Scroll to zoom
        </div>
      )}
    </div>
  );
};

export default Molecule;

