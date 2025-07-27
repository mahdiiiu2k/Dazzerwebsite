import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Portfolio() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openWebsite = () => {
    window.open('https://guileless-begonia-56229e.netlify.app/', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="container mx-auto">
        {/* Desktop: Show main heading */}
        <div className="text-center mb-20 hidden md:block">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text font-serif tracking-wide">Our Work</h2>
        </div>
        
        {/* Mobile: Show small heading above the card */}
        <div className="md:hidden mb-4">
          <p className="text-white text-sm text-left">some of our work:</p>
        </div>
        
        {/* Website Showcase */}
        <div className="luxury-border glass-card p-8 max-w-6xl mx-auto mb-16">
          {/* Desktop: Show title and iframe */}
          <div className="hidden md:block">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">AG Construction & Renovation</h3>
              <p className="text-xl text-white font-light">Professional website delivered in 24 hours</p>
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

          {/* Mobile: Show only button */}
          <div className="md:hidden flex justify-center items-center py-8">
            <Button 
              onClick={openWebsite}
              className="backdrop-blur-md bg-white/10 hover:bg-black/30 text-white font-medium py-12 px-12 rounded-lg transition-all duration-300 text-lg border border-white/20"
            >
              <span className="block text-left">
                AG Construction &<br />
                Renovation Website <ArrowRight className="w-5 h-5 inline ml-1" />
              </span>
            </Button>
          </div>
        </div>
        

      </div>
    </section>
  );
}
