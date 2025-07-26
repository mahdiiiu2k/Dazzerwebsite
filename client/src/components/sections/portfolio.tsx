import { Button } from "@/components/ui/button";

export default function Portfolio() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text font-serif tracking-wide">Our Work</h2>
        </div>
        
        {/* Website Showcase */}
        <div className="luxury-border glass-card p-8 max-w-6xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold gradient-text font-serif mb-4">AG Construction & Renovation Company</h3>
            <p className="text-xl text-gray-300 font-light">Professional website delivered in 24 hours</p>
          </div>
          <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
            <iframe
              src="https://guileless-begonia-56229e.netlify.app/"
              className="w-full h-full border-0 rounded-2xl"
              title="Portfolio Website Showcase"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
        
        <div className="text-center">
          <Button
            onClick={scrollToContact}
            className="crimson-gradient hover:scale-105 px-12 py-6 rounded-full text-white font-bold text-2xl shadow-2xl crimson-glow transition-all duration-300 transform"
            size="lg"
          >
            Start Your Project Today
          </Button>
        </div>
      </div>
    </section>
  );
}
