'use client';

import dynamic from 'next/dynamic';

const FlightMap = dynamic(() => import('./FlightMap'), {
    ssr: false,
    loading: () => (
        <div className="h-[600px] w-full rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center animate-pulse">
            <div className="text-gray-400">Loading Map...</div>
        </div>
    ),
});

export default FlightMap;
