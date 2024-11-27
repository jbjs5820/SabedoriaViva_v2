"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ProfileAvatarProps {
  editable?: boolean;
  url?: string;
  onUpload?: (url: string) => void;
}

export function ProfileAvatar({ editable = false, url, onUpload }: ProfileAvatarProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Você precisa selecionar uma imagem para fazer upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${Math.random()}.${fileExt}`;

      // Create avatars bucket if it doesn't exist
      const { data: bucketData, error: bucketError } = await supabase
        .storage
        .getBucket('avatars');

      if (bucketError && bucketError.message.includes('not found')) {
        await supabase
          .storage
          .createBucket('avatars', { public: true });
      }

      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      if (publicUrl && onUpload) {
        onUpload(publicUrl);
      }

      toast({
        title: "Avatar atualizado",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao fazer upload",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <Avatar className="h-32 w-32">
        <AvatarImage src={url || undefined} />
        <AvatarFallback>
          {url ? "..." : "SV"}
        </AvatarFallback>
      </Avatar>
      {editable && (
        <div className="absolute bottom-0 right-0">
          <Button
            size="icon"
            className="rounded-full bg-[#E63946] hover:bg-[#E63946]/90"
            disabled={uploading}
            onClick={() => document.getElementById("avatar-upload")?.click()}
          >
            <Camera className="h-4 w-4" />
          </Button>
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={uploadAvatar}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}