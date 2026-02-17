import FlightMapWrapper from '@/components/Map';

export default function LiveMapPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 font-[family-name:var(--font-geist-sans)]">
            <header className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Live Global Flight Tracker</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Real-time air traffic visualization using OpenSky Network data.
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
                <section className="mb-12">
                    <FlightMapWrapper />
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                        <h3 className="font-semibold text-lg mb-2">Live Tracking</h3>
                        <p className="text-gray-500 text-sm">
                            Visualizing real-time positions of aircraft. Data is refreshed every 10 seconds.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                        <h3 className="font-semibold text-lg mb-2">Traffic Density</h3>
                        <p className="text-gray-500 text-sm">
                            Blue halos indicate air traffic density. Darker areas represent higher congestion.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                        <h3 className="font-semibold text-lg mb-2">Data Source</h3>
                        <p className="text-gray-500 text-sm">
                            Data provided by <a href="https://opensky-network.org" target="_blank" className="text-blue-500 hover:underline">OpenSky Network</a>.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
