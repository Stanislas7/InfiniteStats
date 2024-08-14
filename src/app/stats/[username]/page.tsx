import { fetchUserStats } from '@/lib/api';
import Link from 'next/link';
import DarkModeToggle from '@/components/DarkModeToggle';

export default async function StatsPage({
  params,
}: {
  params: { username: string };
}) {
  const stats = await fetchUserStats(params.username);

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">User not found</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Go back to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
          Stats for {params.username}
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <StatItem label="XP" value={stats.xp} />
          <StatItem label="Online Flights" value={stats.onlineFlights} />
          <StatItem label="Landing Count" value={stats.landingCount} />
          <StatItem label="Flight Time" value={`${Math.floor(stats.flightTime / 60)} hours`} />
          <StatItem label="Violations" value={stats.violations} />
          <StatItem label="Grade" value={stats.grade} />
        </div>
        <div className="text-center mt-8">
          <Link href="/" className="text-blue-500 hover:underline">
            Search another user
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h2>
      <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
    </div>
  );
}