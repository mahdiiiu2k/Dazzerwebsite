import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Features from "@/components/sections/features";
import Portfolio from "@/components/sections/portfolio";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Features />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}
