import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

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
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text font-serif tracking-wide">Our Work</h2>
        </div>
        
        {/* Website Showcase */}
        <div className="luxury-border glass-card p-8 max-w-6xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">AG Construction & Renovation</h3>
            <p className="text-xl text-white font-light">Professional website delivered in 24 hours</p>
          </div>
          
          {/* Desktop: Show iframe */}
          <div className="relative w-full h-[600px] rounded-2xl overflow-hidden hidden md:block">
            <iframe
              src="https://guileless-begonia-56229e.netlify.app/"
              className="w-full h-full border-0 rounded-2xl"
              title="Portfolio Website Showcase"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>

          {/* Mobile: Show button */}
          <div className="md:hidden text-center py-16">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-yellow-600 to-red-900 flex items-center justify-center">
                <ExternalLink className="w-16 h-16 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">View Live Website</h4>
              <p className="text-gray-300 mb-8 px-4">
                Experience the complete website on your mobile browser with full functionality
              </p>
            </div>
            <Button 
              onClick={openWebsite}
              className="bg-gradient-to-r from-yellow-600 to-red-900 hover:from-yellow-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Visit AG Construction Website
            </Button>
          </div>
        </div>
        

      </div>
    </section>
  );
}
