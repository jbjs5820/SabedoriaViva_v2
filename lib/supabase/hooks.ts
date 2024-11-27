import { useEffect, useState } from 'react';
import { supabase } from './client';
import { User } from '@supabase/supabase-js';
import { Profiles } from './client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profiles | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error loading profile:', error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<Profiles>) => {
    if (!user) throw new Error('No user logged in');

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  return { profile, loading, updateProfile };
}

export function useInterests(userId?: string) {
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setInterests([]);
      setLoading(false);
      return;
    }

    loadInterests();
  }, [userId]);

  async function loadInterests() {
    try {
      const { data, error } = await supabase
        .from('user_interests')
        .select('interest')
        .eq('user_id', userId);

      if (error) throw error;
      setInterests(data.map(item => item.interest));
    } catch (error) {
      console.error('Error loading interests:', error);
      setInterests([]);
    } finally {
      setLoading(false);
    }
  }

  const addInterest = async (interest: string) => {
    if (!userId) throw new Error('No user ID provided');

    try {
      const { error } = await supabase
        .from('user_interests')
        .insert({ user_id: userId, interest });

      if (error) throw error;
      
      await loadInterests(); // Reload interests after adding
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const removeInterest = async (interest: string) => {
    if (!userId) throw new Error('No user ID provided');

    try {
      const { error } = await supabase
        .from('user_interests')
        .delete()
        .eq('user_id', userId)
        .eq('interest', interest);

      if (error) throw error;
      
      await loadInterests(); // Reload interests after removing
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  return { interests, loading, addInterest, removeInterest };
}