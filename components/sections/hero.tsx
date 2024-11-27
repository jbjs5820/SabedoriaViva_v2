import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-5xl font-bold text-[#1D3557] mb-6">
        Bem-vindo à Sabedoria Viva
      </h2>
      <p className="text-[#457B9D] text-xl mb-12 max-w-2xl mx-auto">
        Conectando gerações, compartilhando experiências e construindo uma comunidade mais sábia.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/register">
          <Button size="lg" className="bg-[#E63946] hover:bg-[#E63946]/90 text-xl py-6">
            Comece Agora
          </Button>
        </Link>
        <Link href="/sobre">
          <Button size="lg" variant="outline" className="border-[#E63946] text-[#E63946] hover:bg-[#E63946]/10 text-xl py-6">
            Saiba Mais
          </Button>
        </Link>
      </div>
    </section>
  );
}