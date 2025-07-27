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
        <div className="luxury-border glass-card p-8 max-w-[90vw] mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">AG Construction & Renovation</h3>
            <p className="text-xl text-white font-light">Professional website delivered in 24 hours</p>
          </div>
          <div className="relative w-full h-[700px] rounded-2xl overflow-hidden bg-white">
            <iframe
              src="https://guileless-begonia-56229e.netlify.app/"
              className="w-full h-full border-0 rounded-2xl transform scale-110 origin-top-left"
              style={{ 
                width: '120%', 
                height: '120%', 
                transform: 'scale(0.83)',
                transformOrigin: 'top left'
              }}
              title="Portfolio Website Showcase"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
        

      </div>
    </section>
  );
}
