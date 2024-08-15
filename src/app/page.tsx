import UsernameForm from '@/components/UsernameForm';
import DarkModeToggle from '@/components/DarkModeToggle';
import { FaPlane, FaChartBar, FaUsers } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>
      <div className="w-full max-w-4xl p-4 sm:p-8 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <FaPlane className="text-3xl sm:text-4xl text-blue-500 mr-2 sm:mr-3" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">
              Infinite Flight User Stats
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
            Explore comprehensive statistics for Infinite Flight pilots. Get insights into flight hours, landings, ATC operations, and more!
          </p>
        </div>

        <UsernameForm />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
          <FeatureCard
            icon={<FaChartBar className="text-2xl sm:text-3xl text-blue-500" />}
            title="Detailed Stats"
            description="View in-depth statistics including flight time, landings, and violations."
          />
          <FeatureCard
            icon={<FaUsers className="text-2xl sm:text-3xl text-blue-500" />}
            title="ATC Information"
            description="Explore ATC ranks, operations, and violation details for each user."
          />
          <FeatureCard
            icon={<FaPlane className="text-2xl sm:text-3xl text-blue-500" />}
            title="Easy to Use"
            description="Simply enter a Infinite Flight username to access comprehensive flight data."
          />
        </div>
      </div>
      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Developed by <a href="https://community.infiniteflight.com/u/stan7/summary" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Stan7</a>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h2>
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}