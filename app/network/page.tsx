import AirportGraphWrapper from '@/components/NetworkGraph';

export default function NetworkPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 font-[family-name:var(--font-geist-sans)]">
            <header className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Global Airport Network</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Visualizing major hubs and route connectivity.
                    </p>
                </div>
                <a
                    href="/"
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                    Back to Search
                </a>
            </header>

            <main className="max-w-7xl mx-auto">
                <section className="mb-12 relative">
                    <AirportGraphWrapper />
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                        <h3 className="font-semibold text-lg mb-2">Connectivity Graph</h3>
                        <p className="text-gray-500 text-sm">
                            This force-directed graph visualizes the relationships between major international airports.
                            Nodes represent airports, and links represent direct flight routes.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                        <h3 className="font-semibold text-lg mb-2">Interactive Elements</h3>
                        <p className="text-gray-500 text-sm">
                            - <strong>Drag</strong> to move the graph.<br />
                            - <strong>Scroll</strong> to zoom in/out.<br />
                            - <strong>Click</strong> on an airport to focus on it.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
