import { useState, useEffect, createContext, useContext } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthContext extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ ok: boolean }>;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  resetPassword: async () => ({ ok: false }),
});

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthProvider(): AuthContext {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function login(email: string, password: string) {
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  }

  async function register(email: string, password: string) {
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
  }

  async function logout() {
    setError(null);
    await supabase.auth.signOut();
  }

  async function resetPassword(email: string): Promise<{ ok: boolean }> {
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/`,
    });
    if (error) { setError(error.message); return { ok: false }; }
    return { ok: true };
  }

  return { user, loading, error, login, register, logout, resetPassword };
}
