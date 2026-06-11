import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

const NAV_ITEMS = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard' },
  { to: ROUTES.HISTORY, label: 'Historial' },
  { to: ROUTES.COMPONENTS_HEALTH, label: 'Componentes' },
  { to: ROUTES.MAINTENANCE, label: 'Mantenimiento' },
] as const;

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-cream)]/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to={ROUTES.DASHBOARD} className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight">Car.</span>
            <span className="text-xs text-gray-500 hidden sm:inline">History Tracker</span>
          </NavLink>

          <div className="flex items-center gap-1 bg-white rounded-full p-1 shadow-sm">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
                end={item.to === ROUTES.DASHBOARD}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
