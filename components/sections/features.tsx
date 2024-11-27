import { BookOpen, Users, Calendar } from "lucide-react";

export function Features() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-[#1D3557] text-center mb-12">
          O que oferecemos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <Users className="w-16 h-16 text-[#457B9D] mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-[#1D3557] mb-2">Comunidade</h4>
            <p className="text-[#457B9D]">Conecte-se com pessoas que compartilham suas experiências e interesses.</p>
          </div>
          <div className="text-center p-6">
            <Calendar className="w-16 h-16 text-[#457B9D] mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-[#1D3557] mb-2">Eventos</h4>
            <p className="text-[#457B9D]">Participe de encontros e atividades especialmente organizados para você.</p>
          </div>
          <div className="text-center p-6">
            <BookOpen className="w-16 h-16 text-[#457B9D] mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-[#1D3557] mb-2">Aprendizado</h4>
            <p className="text-[#457B9D]">Descubra novos conhecimentos e compartilhe sua sabedoria com outros.</p>
          </div>
        </div>
      </div>
    </section>
  );
}