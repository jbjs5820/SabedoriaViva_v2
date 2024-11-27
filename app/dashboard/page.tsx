import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, BookOpen } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#1D3557]">Bem-vindo de volta!</h2>
        <p className="text-[#457B9D] mt-2">Veja o que há de novo na comunidade.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Membros Ativos</CardTitle>
            <Users className="h-4 w-4 text-[#457B9D]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Eventos Esta Semana</CardTitle>
            <Calendar className="h-4 w-4 text-[#457B9D]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 eventos próximos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Cursos Disponíveis</CardTitle>
            <BookOpen className="h-4 w-4 text-[#457B9D]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">5 novos cursos este mês</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Eventos Próximos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-[#F1FAEE] p-3 rounded-lg">
                  <Calendar className="h-5 w-5 text-[#457B9D]" />
                </div>
                <div>
                  <p className="font-medium">Workshop de Fotografia Digital</p>
                  <p className="text-sm text-muted-foreground">Quinta-feira, 14:00</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-[#F1FAEE] p-3 rounded-lg">
                  <Calendar className="h-5 w-5 text-[#457B9D]" />
                </div>
                <div>
                  <p className="font-medium">Encontro de Jardinagem</p>
                  <p className="text-sm text-muted-foreground">Sábado, 10:00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cursos Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-[#F1FAEE] p-3 rounded-lg">
                  <BookOpen className="h-5 w-5 text-[#457B9D]" />
                </div>
                <div>
                  <p className="font-medium">Introdução ao Smartphone</p>
                  <p className="text-sm text-muted-foreground">125 participantes</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-[#F1FAEE] p-3 rounded-lg">
                  <BookOpen className="h-5 w-5 text-[#457B9D]" />
                </div>
                <div>
                  <p className="font-medium">Redes Sociais para Iniciantes</p>
                  <p className="text-sm text-muted-foreground">98 participantes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}