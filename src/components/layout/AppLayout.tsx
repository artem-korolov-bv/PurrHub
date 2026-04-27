import { Outlet } from 'react-router-dom';
import AppNav from './AppNav';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <AppNav />
      <Outlet />
    </div>
  );
}
