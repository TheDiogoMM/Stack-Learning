import { useState, lazy, Suspense, useCallback } from 'react';
import './styles/globals.css';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';

const Home        = lazy(() => import('@/pages/Home'));
const Login       = lazy(() => import('@/pages/Login'));
const Register    = lazy(() => import('@/pages/Register'));
const Profile     = lazy(() => import('@/pages/Profile'));
const TechPath    = lazy(() => import('@/pages/TechPath'));
const LessonDetail = lazy(() => import('@/pages/LessonDetail'));

type Page = 'home' | 'login' | 'register' | 'profile' | 'lesson' | 'tech-path';

function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--netflix-gray)',
      fontSize: '0.9rem',
    }}>
      <span className="pulse">Carregando...</span>
    </div>
  );
}

function AppLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--netflix-black)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--netflix-gray)',
    }}>
      <span className="pulse">Carregando...</span>
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState<Page>('home');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  const navigate = useCallback((p: string, params?: Record<string, string>) => {
    setPage(p as Page);
    setPageParams(params ?? {});
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <AppLoader />;

  if (!user) {
    return (
      <Suspense fallback={<AppLoader />}>
        {page === 'register'
          ? <Register onNavigate={navigate} />
          : <Login onNavigate={navigate} />
        }
      </Suspense>
    );
  }

  function renderPage() {
    switch (page) {
      case 'profile':   return <Profile onNavigate={navigate} />;
      case 'tech-path': return <TechPath techId={pageParams.id ?? ''} onNavigate={navigate} />;
      case 'lesson':    return <LessonDetail lessonId={pageParams.id ?? ''} onNavigate={navigate} />;
      default:          return <Home onNavigate={navigate} />;
    }
  }

  return (
    <>
      <Header onNavigate={navigate} />
      <main style={{ background: 'var(--netflix-black)', minHeight: '100vh', color: 'var(--netflix-light-gray)' }}>
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </main>
    </>
  );
}
