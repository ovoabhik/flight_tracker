'use client';

import { useState } from 'react';
import { searchFlight, Flight } from '@/app/actions';

function generateCalendarUrl(flight: Flight): string {
    const formatDateTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const start = formatDateTime(flight.startTime);
    const end = formatDateTime(flight.endTime);
    const text = encodeURIComponent(`Flight ${flight.flightNumber}`);
    const details = encodeURIComponent(`Flight from ${flight.startLocation} to ${flight.endLocation}`);
    const location = encodeURIComponent(flight.startLocation);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
}

export default function FlightSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Flight[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [mockFlights, setMockFlights] = useState<string[]>([]);
    const [showMockFlights, setShowMockFlights] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setResults(null);
        setHasSearched(true);

        try {
            const data = await searchFlight(query);
            setResults(data);
        } catch (error) {
            console.error('Failed to fetch flights', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const toggleMockFlights = async () => {
        if (!showMockFlights && mockFlights.length === 0) {
            // Load them
            const { getMockFlightNumbers } = await import('@/app/actions');
            const numbers = await getMockFlightNumbers();
            setMockFlights(numbers);
        }
        setShowMockFlights(!showMockFlights);
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <form onSubmit={handleSearch} className="flex flex-col gap-4 mb-8">
                <label htmlFor="flight-number" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enter Flight Number
                </label>
                <div className="flex gap-2">
                    <input
                        id="flight-number"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g. AA101"
                        className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? '...' : 'Search'}
                    </button>
                </div>
            </form>

            <div className="results-container space-y-4">
                {loading && (
                    <div className="text-center text-gray-500 animate-pulse">Searching flights...</div>
                )}

                {!loading && hasSearched && results?.length === 0 && (
                    <div className="text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                        <p className="text-gray-500">No flights found matching "{query}"</p>
                    </div>
                )}

                {!loading && results && results.length > 0 && (
                    <div className="grid gap-4">
                        {results.map((flight) => {
                            const calendarUrl = generateCalendarUrl(flight);
                            return (
                                <a
                                    key={flight.flightNumber}
                                    href={calendarUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group"
                                >
                                    <div
                                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden group-hover:shadow-md transition-shadow cursor-pointer"
                                    >
                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                            <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                                                {flight.flightNumber}
                                            </h3>
                                            <span className="text-sm px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-md font-medium">
                                                Scheduled
                                            </span>
                                        </div>

                                        <div className="p-5 grid grid-cols-2 gap-8 relative">
                                            {/* Connector Line */}
                                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-12 bg-gray-200 dark:bg-gray-600 hidden sm:block"></div>

                                            <div className="text-center sm:text-left">
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Departure</p>
                                                <div className="font-bold text-2xl mb-1">
                                                    {new Date(flight.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{flight.startLocation}</p>
                                                <p className="text-xs text-gray-400 mt-1">{flight.timeZoneStart}</p>
                                            </div>

                                            <div className="text-center sm:text-right">
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Arrival</p>
                                                <div className="font-bold text-2xl mb-1">
                                                    {new Date(flight.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{flight.endLocation}</p>
                                                <p className="text-xs text-gray-400 mt-1">{flight.timeZoneEnd}</p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-6">
                <button
                    onClick={toggleMockFlights}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center gap-2"
                >
                    {showMockFlights ? 'Hide Available Mock Flights' : 'Show Available Mock Flights'}
                </button>

                {showMockFlights && (
                    <div className="mt-4 flex flex-wrap gap-2 animate-fadeIn">
                        {mockFlights.length > 0 ? (
                            mockFlights.map(num => (
                                <button
                                    key={num}
                                    onClick={() => setQuery(num)}
                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 text-xs rounded-full transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                                >
                                    {num}
                                </button>
                            ))
                        ) : (
                            <span className="text-gray-400 text-sm">Loading...</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
