import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Portfolio from "@/components/sections/portfolio";
import Referral from "@/components/sections/referral";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Portfolio />
      <Referral />
      <Contact />
      <Footer />
    </div>
  );
}
