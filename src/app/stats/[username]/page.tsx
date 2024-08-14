import { fetchUserStats } from '@/lib/api';

export default async function StatsPage({
  params,
}: {
  params: { username: string };
}) {
  const stats = await fetchUserStats(params.username);

  if (!stats) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stats for {params.username}</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p>XP: {stats.xp}</p>
        <p>Online Flights: {stats.onlineFlights}</p>
        <p>Landing Count: {stats.landingCount}</p>
        <p>Flight Time: {stats.flightTime}</p>
        <p>Violations: {stats.violations}</p>
      </div>
    </div>
  );
}