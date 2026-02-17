'use client';

import { useMemo, useRef, useEffect, useState } from 'react';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d';
import { AIRPORT_NODES, AIRPORT_LINKS } from '@/app/data/airport-network';

// Need to define types locally or import from library if available
interface Node {
    id: string;
    name: string;
    country: string;
    lat: number;
    lng: number;
    color: string;
    x?: number;
    y?: number;
}

interface Link {
    source: string | Node;
    target: string | Node;
    value: number;
}

export default function AirportGraph() {
    const fgRef = useRef<ForceGraphMethods | undefined>(undefined);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Resize observer to handle responsiveness
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height
                });
            }
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    const data = useMemo(() => ({
        nodes: AIRPORT_NODES.map(n => ({ ...n })), // Clone to avoid mutation issues
        links: AIRPORT_LINKS.map(l => ({ ...l }))
    }), []);

    return (
        <div ref={containerRef} className="w-full h-[600px] bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800">
            <ForceGraph2D
                ref={fgRef}
                width={dimensions.width}
                height={dimensions.height}
                graphData={data}
                nodeLabel="name"
                nodeColor={(node: any) => node.color}
                nodeRelSize={6}
                linkColor={() => 'rgba(255,255,255,0.2)'}
                linkWidth={(link: any) => Math.sqrt(link.value)}
                linkDirectionalParticles={2}
                linkDirectionalParticleSpeed={(d: any) => d.value * 0.001}
                backgroundColor="#111827" // gray-900
                onNodeClick={(node: any) => {
                    if (fgRef.current) {
                        fgRef.current.centerAt(node.x, node.y, 1000);
                        fgRef.current.zoom(8, 2000);
                    }
                }}
            />
            <div className="absolute bottom-4 left-4 text-white/50 text-xs pointer-events-none">
                Drag to pan • Scroll to zoom • Click node to focus
            </div>
        </div>
    );
}
