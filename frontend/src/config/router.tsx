import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import Dashboard from '@/pages/Dashboard';
import History from '@/pages/History';
import VisitDetail from '@/pages/VisitDetail';
import ComponentsHealth from '@/pages/ComponentsHealth';
import Maintenance from '@/pages/Maintenance';
import { ROUTES } from './routes';

export const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: ROUTES.HISTORY, element: <History /> },
        { path: ROUTES.VISIT_DETAIL, element: <VisitDetail /> },
        { path: ROUTES.COMPONENTS_HEALTH, element: <ComponentsHealth /> },
        { path: ROUTES.MAINTENANCE, element: <Maintenance /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
