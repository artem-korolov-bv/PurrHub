import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Random Cats', to: '/random-cats' },
  { label: 'Showcase', to: '/showcase' },
];

export default function AppNav() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-1">
        <span className="mr-4 font-semibold text-gray-900 dark:text-gray-100 tracking-tight select-none">
          🐱 Cat Generator
        </span>

        {navLinks.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100',
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
