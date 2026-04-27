import { NavLink, Outlet } from 'react-router-dom';

const components = [
  { label: 'Button', to: '/showcase/button' },
  { label: 'Input', to: '/showcase/input' },
  { label: 'Autocomplete', to: '/showcase/autocomplete' },
  // Add more components here as they are created
];

export default function ShowcaseLayout() {
  return (
    <div className="flex flex-1 min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Components
        </p>
        {components.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100',
              ].join(' ')
            }
          >
            {label}
          </NavLink>
        ))}
      </aside>

      {/* Content */}
      <main className="flex-1 p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

