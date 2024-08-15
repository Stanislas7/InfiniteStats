import { fetchUserStats } from '@/lib/api';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import DarkModeToggle from '@/components/DarkModeToggle';
import UsernameForm from '@/components/UsernameForm';
import { FaGraduationCap, FaHeadset, FaBuilding, FaPlane, FaLandmark, FaClock, FaExclamationTriangle, FaStar } from 'react-icons/fa';

export default async function StatsPage({
  params,
}: {
  params: { username: string };
}) {
  const trimmedUsername = params.username.trim();

  if (!trimmedUsername) {
    redirect('/');
  }

  try {
    const stats = await fetchUserStats(params.username);

    const rankDict: { [key: number]: string } = {
      0: 'Observer', 1: 'Trainee', 2: 'Apprentice', 3: 'Specialist',
      4: 'Officer', 5: 'Supervisor', 6: 'Recruiter', 7: 'Recruiter', 8: 'Jedi'
    };

    // Function to extract content within square brackets - Air France KLM [AFKLM] would only be AFKLM
    const extractBracketContent = (str: string | null): string => {
      if (!str) return 'None';
      const match = str.match(/\[(.*?)\]/);
      return match ? match[1] : str;
    };

    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="fixed top-4 right-4 z-10">
          <DarkModeToggle />
        </div>
        <div className="w-full max-w-4xl p-4 sm:p-8 space-y-8 mt-16 sm:mt-8">
          <div className="mb-8 sm:mb-12">
            <UsernameForm />
          </div>

          <div className="bg-gray-200 dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
              Stats for <span className="underline decoration-blue-500">{stats.discourseUsername}</span>
            </h1>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MainStatItem icon={<FaGraduationCap />} label="Grade" value={stats.grade} />
                <MainStatItem icon={<FaHeadset />} label="ATC Rank" value={rankDict[stats.atcRank ?? 0]} />
                <MainStatItem
                  icon={<FaBuilding />}
                  label="Virtual Organization"
                  value={extractBracketContent(stats.virtualOrganization)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatItem icon={<FaPlane />} label="Online Flights" value={stats.onlineFlights.toLocaleString()} />
              <StatItem icon={<FaLandmark />} label="Landing Count" value={stats.landingCount.toLocaleString()} />
              <StatItem icon={<FaClock />} label="Flight Time" value={`${Math.floor(stats.flightTime / 60).toLocaleString()} hours`} />
              <StatItem icon={<FaExclamationTriangle />} label="Violations" value={stats.violations.toLocaleString()} />
              <StatItem icon={<FaHeadset />} label="ATC Operations" value={stats.atcOperations.toLocaleString()} />
              <StatItem icon={<FaStar />} label="Experience" value={`${stats.xp.toLocaleString()} XP`} />
            </div>

            <div className="mt-6 bg-white dark:bg-gray-700 rounded-lg p-4">
              <h2 className="text-base sm:text-lg font-semibold text-center text-gray-800 dark:text-gray-200 mb-4">ATC Violations by Level</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MainStatItem icon={<FaExclamationTriangle />} label="Level 1" value={stats.violationCountByLevel.level1.toLocaleString()} />
                <MainStatItem icon={<FaExclamationTriangle />} label="Level 2" value={stats.violationCountByLevel.level2.toLocaleString()} />
                <MainStatItem icon={<FaExclamationTriangle />} label="Level 3" value={stats.violationCountByLevel.level3.toLocaleString()} />
              </div>
            </div>
          </div>
        </div>
        <footer className="mt-8 mb-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Developed by <a href="https://community.infiniteflight.com/u/stan7/summary" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Stan7</a>
        </footer>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400 mb-4">User not found</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Go back to search
          </Link>
        </div>
      </div>
    );
  }
}

function MainStatItem({ icon, label, value }: { icon: React.ReactNode, label: string; value: string | number }) {
  return (
    <div className="text-center">
      <h2 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</h2>
      <div className="flex items-center justify-center">
        <span className="text-xl sm:text-2xl mr-2 text-blue-500">{icon}</span>
        <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
      </div>
    </div>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode, label: string; value: string | number | React.ReactNode }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-600 p-3 sm:p-4 rounded-lg">
      <h2 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">{label}</h2>
      <div className="flex items-center">
        <span className="text-lg sm:text-2xl mr-2 text-blue-500">{icon}</span>
        <div className="text-sm sm:text-xl font-semibold text-gray-900 dark:text-gray-100">{value}</div>
      </div>
    </div>
  );
}