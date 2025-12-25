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
      </main>

      <footer className="mt-16 text-sm text-gray-500 text-center">
        Demo Application &bull; Mock Data
      </footer>
    </div>
  );
}
