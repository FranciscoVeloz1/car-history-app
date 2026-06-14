import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

const NAV_ITEMS = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard' },
  { to: ROUTES.HISTORY, label: 'Historial' },
  { to: ROUTES.COMPONENTS_HEALTH, label: 'Componentes' },
  { to: ROUTES.MAINTENANCE, label: 'Mantenimiento' },
] as const;

function navLinkClass(isActive: boolean) {
  return `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
  }`;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-cream)]/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <NavLink to={ROUTES.DASHBOARD} className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-extrabold tracking-tight">Car.</span>
            <span className="text-xs text-gray-500 hidden sm:inline">History Tracker</span>
          </NavLink>

          <div className="hidden md:flex items-center gap-1 bg-white rounded-full p-1 shadow-sm">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => navLinkClass(isActive)}
                end={item.to === ROUTES.DASHBOARD}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-gray-700 hover:bg-white/80"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => navLinkClass(isActive)}
                end={item.to === ROUTES.DASHBOARD}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
