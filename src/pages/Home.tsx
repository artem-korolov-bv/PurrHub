import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 min-h-[calc(100vh-3.5rem)] gap-4">
      <h1 className="text-4xl font-bold tracking-tight">Cat Generator 🐱</h1>
      <p className="text-gray-500 dark:text-gray-400">Your random cat image generator.</p>
      <Link
        to="/showcase/button"
        className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 underline underline-offset-4 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
      >
        → Component Showcase
      </Link>
    </div>
  );
}

