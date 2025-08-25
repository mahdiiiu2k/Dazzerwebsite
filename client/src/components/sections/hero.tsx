import { Button } from "@/components/ui/button";
import mahdiPhoto from "@assets/1756131622403_1756131729274.jpg";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen max-[374px]:min-h-[80vh] relative px-4 sm:px-6 pt-32 sm:pt-40">
      {/* Main Content */}
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="flex flex-col items-center max-w-4xl w-full">
          {/* Luxury Profile Picture */}
          <div className="flex flex-col items-center mb-8 sm:mb-12">
            <div className="relative group">
              <div className="luxury-border glass-card rounded-3xl p-3 hover-glow transform hover:scale-105 transition-all duration-500">
                <img 
                  src={mahdiPhoto}
                  alt="Dazzer - Profile Picture"
                  className="rounded-2xl w-48 h-48 sm:w-64 sm:h-64 object-cover filter brightness-110 contrast-110"
                />
              </div>
              {/* Luxury gradient background with animation */}
              <div className="absolute -inset-6 bg-gradient-to-r from-yellow-600/20 via-red-900/20 to-yellow-600/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Floating geometric accents */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-yellow-600 rotate-45 opacity-60 group-hover:rotate-90 transition-transform duration-700"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-900 rounded-full opacity-60 group-hover:scale-125 transition-transform duration-500"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
              <span className="text-white block">Dazzer 🌟 </span>
              <span className="gradient-text block relative drop-shadow-2xl" style={{textShadow: '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)'}}>
                Clean. Iconic. Timeless
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 sm:mb-6 leading-relaxed max-w-2xl mx-auto">
              Find what inspires you, all below.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
