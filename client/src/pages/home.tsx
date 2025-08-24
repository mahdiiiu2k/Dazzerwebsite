import Hero from "@/components/sections/hero";
import CTA from "@/components/sections/cta";
import About from "@/components/sections/about";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <CTA />
      <About />
      <Footer />
    </div>
  );
}
