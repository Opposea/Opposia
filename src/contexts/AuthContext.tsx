import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { isAllowedCountry } from '@/lib/validation';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, name: string, dateOfBirth: string, country: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithProvider: (provider: 'facebook' | 'twitter') => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const ensureProfileExists = async (u: User) => {
    try {
      const nameFromMeta = (u.user_metadata as any)?.name as string | undefined;
      const fallbackName = u.email?.split('@')[0] || 'User';

      await supabase
        .from('profiles')
        .upsert(
          {
            user_id: u.id,
            name: (nameFromMeta || fallbackName).trim().slice(0, 100),
            country: (u.user_metadata as any)?.country ?? null,
            date_of_birth: (u.user_metadata as any)?.date_of_birth ?? null,
          } as any,
          { onConflict: 'user_id' }
        );
    } catch {
      // Silent fail: profile creation should never block login UX
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (session?.user) {
          void ensureProfileExists(session.user);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        void ensureProfileExists(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string, dateOfBirth: string, country: string) => {
    // Validate country before attempting signup
    if (!isAllowedCountry(country)) {
      return { 
        error: { 
          message: 'Registration is only available in the United Kingdom.' 
        } 
      };
    }

    const redirectUrl = `${window.location.origin}/profile`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: name,
          date_of_birth: dateOfBirth,
          country: country
        }
      }
    });
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    return { error };
  };

  const signInWithProvider = async (provider: 'facebook' | 'twitter') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/profile`
      }
    });
    
    return { error };
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut({ scope: 'local' });
    } catch (error) {
      // Ignore errors and clear local state anyway
    }
    // Clear local state regardless of API result
    setSession(null);
    setUser(null);
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signInWithProvider,
    signOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
