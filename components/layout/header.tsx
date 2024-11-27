"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-[#1D3557] text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-[#E63946] transition-colors">
          Sabedoria Viva
        </Link>
        <nav className="space-x-4">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:text-[#E63946]">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-[#E63946] hover:bg-[#E63946]/90">
              Registrar
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}