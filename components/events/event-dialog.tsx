"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  spots: number;
  image: string;
}

interface EventDialogProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDialog({ event, open, onOpenChange }: EventDialogProps) {
  const { toast } = useToast();

  if (!event) return null;

  const handleRegister = () => {
    toast({
      title: "Inscrição realizada!",
      description: "Você foi inscrito no evento com sucesso.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1D3557]">
            {event.title}
          </DialogTitle>
          <DialogDescription className="text-[#457B9D]">
            {event.description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-3" />
              <div>
                <p className="font-medium">Data e Hora</p>
                <p>{event.date} • {event.time}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-3" />
              <div>
                <p className="font-medium">Local</p>
                <p>{event.location}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-3" />
              <div>
                <p className="font-medium">Vagas Disponíveis</p>
                <p>{event.spots} vagas</p>
              </div>
            </div>
          </div>
          <Button
            className="w-full bg-[#E63946] hover:bg-[#E63946]/90 text-lg py-6"
            onClick={handleRegister}
          >
            Confirmar Inscrição
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}