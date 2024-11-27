import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F1FAEE]">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}