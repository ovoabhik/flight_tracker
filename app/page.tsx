import Image from 'next/image';
import FlightSearch from '@/components/FlightSearch';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-2xl flex flex-col gap-8 items-center text-center sm:text-left">
        <div className="text-center w-full mb-8 flex flex-col items-center">
          <div className="w-24 h-24 relative mb-6">
            <Image
              src="/logo.svg"
              alt="Flight Tracker Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            Flight Lookup
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Check status, times, and locations instantly.
          </p>
        </div>

        <FlightSearch />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-8">
          <a
            href="/live-map"
            className="group block p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Live Air Traffic ✈️
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              View real-time flight positions and traffic density on an interactive map.
            </p>
          </a>

          <a
            href="/network"
            className="group block p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
              Network Graph 🌐
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Explore global airport connectivity and routes visualization.
            </p>
          </a>
        </div>
      </main>

      <footer className="mt-16 text-sm text-gray-500 text-center">
        Demo Application &bull; Mock Data
      </footer>
    </div>
  );
}
