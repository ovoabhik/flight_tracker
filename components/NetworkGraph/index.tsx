'use client';

import dynamic from 'next/dynamic';

const AirportGraph = dynamic(() => import('./AirportGraph'), {
    ssr: false,
    loading: () => (
        <div className="h-[600px] w-full rounded-xl bg-gray-900 flex items-center justify-center">
            <div className="text-gray-400 animate-pulse">Loading Network Graph...</div>
        </div>
    ),
});

export default AirportGraph;
