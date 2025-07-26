import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="container mx-auto text-center">
        <div className="animate-float">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">DS Design</span><br />
            <span className="text-white">Creative Portfolio</span>
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
          Crafting beautiful digital experiences through modern web design, UI/UX, and creative development.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Button
            onClick={() => scrollToSection('portfolio')}
            className="bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-xl hover-glow transition-all transform hover:scale-105"
            size="lg"
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollToSection('contact')}
            className="glass-morphism px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-xl hover-glow transition-all transform hover:scale-105 border-white/20"
            size="lg"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
}
