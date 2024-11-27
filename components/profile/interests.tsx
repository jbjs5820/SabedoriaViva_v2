"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useInterests } from "@/lib/supabase/hooks";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ProfileInterestsProps {
  editable?: boolean;
  userId?: string;
}

export function ProfileInterests({ editable = false, userId }: ProfileInterestsProps) {
  const { toast } = useToast();
  const { interests, loading, addInterest, removeInterest } = useInterests(userId);
  const [newInterest, setNewInterest] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !newInterest.trim()) return;

    try {
      const { error } = await addInterest(newInterest.trim());
      if (error) throw error;

      setNewInterest("");
      setDialogOpen(false);
      toast({
        title: "Interesse adicionado",
        description: "Seu novo interesse foi adicionado com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao adicionar interesse",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRemove = async (interest: string) => {
    if (!userId) return;

    try {
      const { error } = await removeInterest(interest);
      if (error) throw error;

      toast({
        title: "Interesse removido",
        description: "O interesse foi removido com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao remover interesse",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Carregando interesses...</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <Badge
            key={interest}
            variant="secondary"
            className="text-lg py-2 px-4"
          >
            {interest}
            {editable && (
              <button
                onClick={() => handleRemove(interest)}
                className="ml-2 hover:text-[#E63946]"
              >
                ×
              </button>
            )}
          </Badge>
        ))}
        {editable && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Interesse</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4">
                <Input
                  placeholder="Digite um novo interesse"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                />
                <Button type="submit" className="w-full">
                  Adicionar Interesse
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}