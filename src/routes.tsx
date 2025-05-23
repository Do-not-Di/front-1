import { createBrowserRouter } from 'react-router';
import HomePage from './routes/home';
import MobileLayout from './components/layout/mobile-layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MobileLayout headerTitle='Chat' showBack={true}>
        <HomePage />
      </MobileLayout>
    ),
  },
]);

export default router;
