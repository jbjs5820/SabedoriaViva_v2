"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProfileAvatar } from "./avatar";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/client";

const AGE_GROUPS = [
  "18-24 anos",
  "25-34 anos",
  "35-44 anos",
  "45-54 anos",
  "55+ anos",
];

const INTERESTS = [
  "Viagens & Aventura",
  "Arte & Cultura",
  "Esportes & Fitness",
  "Gastronomia & Culinária",
  "Música & Shows",
  "Cinema & Séries",
  "Literatura & Leitura",
  "Tecnologia & Games",
  "Natureza & Meio Ambiente",
  "Fotografia & Design",
  "Negócios & Empreendedorismo",
  "Bem-estar & Saúde",
  "Moda & Estilo",
  "Pets & Animais",
  "Dança & Teatro",
];

interface ProfileFormData {
  name: string;
  location: string;
  bio: string;
  avatar_url: string;
  age_group: string;
  interests: string[];
}

interface ProfileFormProps {
  initialData: Partial<ProfileFormData>;
  userId: string;
  onSave: () => void;
}

export function ProfileForm({ initialData, userId, onSave }: ProfileFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: initialData.name || "",
    location: initialData.location || "",
    bio: initialData.bio || "",
    avatar_url: initialData.avatar_url || "",
    age_group: initialData.age_group || "",
    interests: initialData.interests || [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest].slice(0, 5);
      return { ...prev, interests };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: userId,
          name: formData.name,
          location: formData.location,
          bio: formData.bio,
          avatar_url: formData.avatar_url,
          age_group: formData.age_group,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id'
        });

      if (profileError) throw profileError;

      // Delete existing interests
      const { error: deleteError } = await supabase
        .from("user_interests")
        .delete()
        .eq("user_id", userId);

      if (deleteError) throw deleteError;

      // Insert new interests
      if (formData.interests.length > 0) {
        const { error: interestsError } = await supabase
          .from("user_interests")
          .insert(
            formData.interests.map((interest) => ({
              user_id: userId,
              interest,
            }))
          );

        if (interestsError) throw interestsError;
      }

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
      });
      onSave();
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Erro ao atualizar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center mb-6">
        <ProfileAvatar
          url={formData.avatar_url}
          onUpload={(url) => setFormData((prev) => ({ ...prev, avatar_url: url }))}
          editable
        />
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nome Completo</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="text-lg"
            required
          />
        </div>

        <div>
          <Label htmlFor="age_group">Faixa Etária</Label>
          <Select
            value={formData.age_group}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, age_group: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione sua faixa etária" />
            </SelectTrigger>
            <SelectContent>
              {AGE_GROUPS.map((age) => (
                <SelectItem key={age} value={age}>
                  {age}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="location">Localização</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="text-lg"
          />
        </div>

        <div>
          <Label htmlFor="bio">Sobre Mim</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="text-lg resize-none"
            rows={4}
          />
        </div>

        <div>
          <Label>Interesses (máximo 5)</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {INTERESTS.map((interest) => (
              <Button
                key={interest}
                type="button"
                variant={formData.interests.includes(interest) ? "default" : "outline"}
                className="justify-start"
                onClick={() => handleInterestToggle(interest)}
                disabled={
                  !formData.interests.includes(interest) &&
                  formData.interests.length >= 5
                }
              >
                {interest}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Salvando..." : "Salvar Alterações"}
      </Button>
    </form>
  );
}