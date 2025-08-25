import Hero from "@/components/sections/hero";
import CTA from "@/components/sections/cta";
import About from "@/components/sections/about";
import Footer from "@/components/sections/footer";

interface HomeProps {
  dynamicButtons?: Array<{number: string, imageUrl: string, link: string}>;
}

export default function Home({ dynamicButtons = [] }: HomeProps) {
  return (
    <div className="min-h-screen">
      <Hero />
      <CTA />
      <About dynamicButtons={dynamicButtons} />
      <Footer />
    </div>
  );
}
