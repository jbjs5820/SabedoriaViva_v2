"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/profile/profile-form";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export default function ProfilePage() {
  const { toast } = useToast();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          throw new Error("No user logged in");
        }

        // First, get the profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileError) {
          // If profile doesn't exist, create it
          if (profileError.code === "PGRST116") {
            const { data: newProfile, error: createError } = await supabase
              .from("profiles")
              .insert([
                {
                  id: session.user.id,
                  name: session.user.user_metadata?.name || "",
                  email: session.user.email,
                }
              ])
              .select()
              .single();

            if (createError) throw createError;
            setProfile(newProfile);
          } else {
            throw profileError;
          }
        } else {
          setProfile(profileData);
        }

        // Get interests
        const { data: interestsData } = await supabase
          .from("user_interests")
          .select("interest")
          .eq("user_id", session.user.id);

        if (profileData) {
          setProfile({
            ...profileData,
            interests: interestsData?.map(i => i.interest) || []
          });
        }

      } catch (error) {
        console.error("Error loading profile:", error);
        toast({
          title: "Erro ao carregar perfil",
          description: "Não foi possível carregar suas informações. Por favor, tente novamente.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-[#457B9D]">Carregando perfil...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-[#457B9D]">Perfil não encontrado</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#1D3557]">Meu Perfil</h2>
        <p className="text-[#457B9D] mt-2">Gerencie suas informações pessoais</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Editar Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm
            initialData={profile}
            userId={profile.id}
            onSave={() => window.location.reload()}
          />
        </CardContent>
      </Card>
    </div>
  );
}