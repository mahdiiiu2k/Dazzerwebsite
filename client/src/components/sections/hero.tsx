import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import mahdiPhoto from "@assets/PicMa_2402454_1753546746971_1753546907613.jpg";

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload the image with higher priority
  useEffect(() => {
    const img = new Image();
    img.src = mahdiPhoto;
    img.onload = () => setImageLoaded(true);
    
    // Add preload link to head for immediate loading
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = mahdiPhoto;
    document.head.appendChild(link);
    
    return () => {
      // Cleanup
      document.head.removeChild(link);
    };
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen relative px-4 sm:px-6 pt-32 sm:pt-40">
      {/* Main Content */}
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl w-full">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
              <span className="text-white block">Take Your Business Online – </span>
              <span className="gradient-text block relative drop-shadow-2xl" style={{textShadow: '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)'}}>
                In Just 24 Hours
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We build beautiful, fast, and mobile-friendly websites for <span className="text-yellow-400">cafés, salons, renovation companies, and more</span> — all ready in just 24 hours.
            </p>

          </div>

          {/* Luxury Profile Picture */}
          <div className="flex flex-col items-center lg:items-end order-1 lg:order-2">
            <div className="relative group">
              {/* Image loading skeleton */}
              <div className={`absolute inset-0 bg-gradient-to-br from-purple-900/50 to-purple-700/50 rounded-3xl animate-pulse transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} 
                   style={{zIndex: 1}}></div>
              <div className="luxury-border glass-card rounded-3xl p-3 hover-glow transform hover:scale-105 transition-all duration-500 relative" 
                   style={{zIndex: 2}}>
                <img 
                  src={mahdiPhoto}
                  alt="Mahdi - Founder of DS Design"
                  className={`rounded-2xl w-64 h-64 sm:w-80 sm:h-80 object-cover filter brightness-110 contrast-110 hero-image ${imageLoaded ? 'loaded' : ''}`}
                  loading="eager"
                  decoding="async"
                  style={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    imageRendering: 'crisp-edges'
                  }}
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.opacity = '1';
                    setImageLoaded(true);
                  }}
                  onError={(e) => {
                    console.log('Image failed to load');
                  }}
                />
              </div>
              {/* Luxury gradient background with animation */}
              <div className="absolute -inset-6 bg-gradient-to-r from-yellow-600/20 via-red-900/20 to-yellow-600/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Floating geometric accents */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-yellow-600 rotate-45 opacity-60 group-hover:rotate-90 transition-transform duration-700"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-900 rounded-full opacity-60 group-hover:scale-125 transition-transform duration-500"></div>
            </div>
            <p className="text-gray-300 text-base sm:text-lg mt-4 font-medium text-center lg:text-left">My name is Mahdi, founder of DS Design</p>
          </div>
        </div>
      </div>
    </section>
  );
}
