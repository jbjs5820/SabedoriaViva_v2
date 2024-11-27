"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, User, BookOpen, Calendar, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { icon: Home, label: "Início", href: "/dashboard" },
  { icon: User, label: "Perfil", href: "/dashboard/perfil" },
  { icon: Calendar, label: "Eventos", href: "/dashboard/eventos" },
  { icon: BookOpen, label: "Formação", href: "/dashboard/formacao" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-[#1D3557] text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Sabedoria Viva</h2>
      </div>
      <ScrollArea className="flex-1 px-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="lg"
                  className={cn(
                    "w-full justify-start gap-4 text-lg font-normal",
                    isActive ? "bg-white/10" : "hover:bg-white/5",
                    "transition-colors"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t border-white/10">
        <Button
          variant="ghost"
          size="lg"
          className="w-full justify-start gap-4 text-lg font-normal hover:bg-white/5"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </Button>
      </div>
    </div>
  );
}