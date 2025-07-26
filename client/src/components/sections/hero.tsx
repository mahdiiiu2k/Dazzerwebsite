import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="container mx-auto text-center">
        <div className="animate-float">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            🚀 <span className="gradient-text">DS Design</span> –<br />
            <span className="text-white">Websites Delivered in 24 Hours</span>
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
          We build beautiful, fast, and mobile-friendly websites for cafés, salons, contractors, and more — in just one day.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Button
            onClick={() => scrollToSection('contact')}
            className="bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-xl hover-glow transition-all transform hover:scale-105"
            size="lg"
          >
            Get Your Website
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollToSection('referral')}
            className="glass-morphism px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-xl hover-glow transition-all transform hover:scale-105 border-white/20"
            size="lg"
          >
            Refer & Earn 40%
          </Button>
        </div>
      </div>
    </section>
  );
}
