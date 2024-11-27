"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, MapPin, Users, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EventCard } from "@/components/events/event-card";
import { EventDialog } from "@/components/events/event-dialog";

const categories = [
  "Todos",
  "Tecnologia",
  "Saúde",
  "Arte",
  "Cultura",
  "Esporte",
  "Educação",
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#1D3557]">Eventos</h2>
        <p className="text-[#457B9D] mt-2">
          Descubra e participe de eventos na sua região
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Pesquisar eventos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-lg"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#1D3557] opacity-0 group-hover:opacity-10 transition-opacity" />
          <CardHeader className="relative">
            <div className="absolute top-4 right-4">
              <Badge className="bg-[#E63946]">Destaque</Badge>
            </div>
            <img
              src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=400&fit=crop"
              alt="Workshop de Fotografia"
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-[#1D3557]">
                Workshop de Fotografia Digital
              </h3>
              <p className="text-[#457B9D] mt-1">
                Aprenda técnicas essenciais de fotografia digital com profissionais experientes.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                15 de Maio, 2024 • 14:00
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                Centro Cultural de Lisboa
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                12 vagas disponíveis
              </div>
            </div>
            <Button
              className="w-full bg-[#E63946] hover:bg-[#E63946]/90"
              onClick={() => setSelectedEvent({
                id: "1",
                title: "Workshop de Fotografia Digital",
                description: "Aprenda técnicas essenciais de fotografia digital com profissionais experientes.",
                date: "15 de Maio, 2024",
                time: "14:00",
                location: "Centro Cultural de Lisboa",
                spots: 12,
                image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=400&fit=crop"
              })}
            >
              Inscrever-se
            </Button>
          </CardContent>
        </Card>

        {/* More event cards would be dynamically rendered here */}
      </div>

      <EventDialog
        event={selectedEvent}
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      />
    </div>
  );
}

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