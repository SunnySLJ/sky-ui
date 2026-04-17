'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_USER, USER_KEY, type User, getCurrentUser, loginMock, logoutMock, registerMock } from '@/lib/utils/auth';

type AuthContextValue = {
  user: User | null;
  isReady: boolean;
  login: (payload: Partial<User> & { username?: string }) => User;
  register: (payload: { username: string }) => User;
  logout: () => void;
  refresh: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  function refresh() {
    setUser(getCurrentUser());
    setIsReady(true);
  }

  useEffect(() => {
    refresh();

    function onStorage(event: StorageEvent) {
      if (event.key === USER_KEY) refresh();
    }

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isReady,
    login(payload) {
      const nextUser = loginMock({ credits: DEFAULT_USER.credits, ...payload });
      setUser(nextUser);
      return nextUser;
    },
    register(payload) {
      const nextUser = registerMock(payload);
      setUser(nextUser);
      return nextUser;
    },
    logout() {
      logoutMock();
      setUser(null);
    },
    refresh,
  }), [isReady, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
