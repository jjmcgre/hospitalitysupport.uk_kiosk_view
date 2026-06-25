import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface UserProfile {
  id: string;
  display_name: string;
  role: string;
  is_founder: boolean;
  introduced_by_user_id: string | null;
  phone: string | null;
}

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  profile: UserProfile | null;
  profileLoading: boolean;
  founderIds: Set<string>;
  refetchProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [founderIds, setFounderIds] = useState<Set<string>>(new Set());

  const fetchFounderIds = useCallback(async () => {
    const { data } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('is_founder', true);
    setFounderIds(new Set((data ?? []).map((p: { id: string }) => p.id)));
  }, []);

  const fetchProfile = useCallback(async (userId: string) => {
    setProfileLoading(true);
    const { data } = await supabase
      .from('user_profiles')
      .select('id, display_name, role, is_founder, introduced_by_user_id, phone')
      .eq('id', userId)
      .maybeSingle();
    setProfile(data as UserProfile | null);
    setProfileLoading(false);
  }, []);

  const refetchProfile = useCallback(async () => {
    const userId = session?.user?.id;
    if (userId) await fetchProfile(userId);
  }, [session, fetchProfile]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
      if (data.session?.user?.id) {
        fetchProfile(data.session.user.id);
        fetchFounderIds();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user?.id) {
        fetchProfile(newSession.user.id);
        fetchFounderIds();
      } else {
        setProfile(null);
        setFounderIds(new Set());
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile, fetchFounderIds]);

  return (
    <AuthContext.Provider value={{
      session,
      user: session?.user ?? null,
      loading,
      profile,
      profileLoading,
      founderIds,
      refetchProfile,
      signOut: async () => { await supabase.auth.signOut(); },
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
