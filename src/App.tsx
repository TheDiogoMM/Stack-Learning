import { useState, lazy, Suspense, useCallback, useEffect } from 'react';
import './styles/globals.css';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import { QuizProvider } from '@/providers/QuizProvider';
import OfflineBanner from '@/components/OfflineBanner';
import { supabase } from '@/lib/supabase';

const Home        = lazy(() => import('@/pages/Home'));
const Login       = lazy(() => import('@/pages/Login'));
const Register    = lazy(() => import('@/pages/Register'));
const Profile     = lazy(() => import('@/pages/Profile'));
const TechPath    = lazy(() => import('@/pages/TechPath'));
const LessonDetail = lazy(() => import('@/pages/LessonDetail'));
const AITrackPage      = lazy(() => import('@/pages/AITrackPage'));
const DiagnosticScreen = lazy(() => import('@/pages/DiagnosticScreen'));
const DiagnosticResult = lazy(() => import('@/pages/DiagnosticResult'));
const SetPassword      = lazy(() => import('@/pages/SetPassword'));

type Page =
  | 'home' | 'login' | 'register' | 'profile' | 'lesson' | 'tech-path'
  | 'ai-track' | 'ai-lesson' | 'diagnostic' | 'diagnostic-result' | 'set-password';

function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)',
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
      background: 'var(--bg-app)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)',
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

  // Detecta link de recuperação de senha enviado pelo Supabase
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setPage('set-password');
        setPageParams({});
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <AppLoader />;

  if (!user || page === 'set-password') {
    return (
      <Suspense fallback={<AppLoader />}>
        {page === 'set-password'
          ? <SetPassword onNavigate={navigate} />
          : page === 'register'
          ? <Register onNavigate={navigate} />
          : <Login onNavigate={navigate} />
        }
      </Suspense>
    );
  }

  function renderPage() {
    switch (page) {
      case 'profile':            return <Profile onNavigate={navigate} />;
      case 'tech-path':          return <TechPath techId={pageParams.id ?? ''} onNavigate={navigate} />;
      case 'lesson':             return <LessonDetail lessonId={pageParams.id ?? ''} onNavigate={navigate} />;
      case 'ai-track':           return <AITrackPage initialPillar={pageParams.pillar} onNavigate={navigate} />;
      case 'ai-lesson':          return <LessonDetail lessonId={pageParams.id ?? ''} onNavigate={navigate} />;
      case 'diagnostic':         return <DiagnosticScreen onNavigate={navigate} />;
      case 'diagnostic-result':  return <DiagnosticResult onNavigate={navigate} />;
      default:                   return <Home onNavigate={navigate} />;
    }
  }

  return (
    <QuizProvider>
      <OfflineBanner />
      <Header onNavigate={navigate} />
      <main style={{ background: 'var(--bg-app)', minHeight: '100vh', color: 'var(--text-primary)' }}>
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </main>
    </QuizProvider>
  );
}
