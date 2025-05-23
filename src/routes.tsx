import { createBrowserRouter } from 'react-router';
import HomePage from './routes/home';
import MobileLayout from './components/layout/mobile-layout';
import ChatPage from './routes/chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MobileLayout headerTitle='홈' showBack={false}>
        <HomePage />
      </MobileLayout>
    ),
  },
  {
    path: '/chat',
    element: (
      <MobileLayout headerTitle='문의' showBack={true}>
        <ChatPage />
      </MobileLayout>
    ),
  },
]);

export default router;
