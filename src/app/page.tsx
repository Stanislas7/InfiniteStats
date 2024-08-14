import UsernameForm from '@/components/UsernameForm';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
          Infinite Flight User Stats
        </h1>
        <UsernameForm />
      </div>
    </main>
  );
}