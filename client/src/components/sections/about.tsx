import { useEffect, useRef, useState } from "react";
import { MessageSquare, Phone, Instagram } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export default function About() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounter('counter-24', 24);
          animateCounter('counter-100', 100);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounter = (id: string, target: number) => {
    const element = document.getElementById(id);
    if (!element) return;

    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toString();
    }, 20);
  };

  return (
    <section id="about" ref={sectionRef} className="-mt-80 md:-mt-16 pb-20 px-6">
      <div className="container mx-auto">
        
        {/* Enhanced Services Section */}
        <div className="luxury-border glass-card p-12 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { name: "Roofing Contractors", icon: "✦" },
              { name: "Landscaping Services", icon: "✦" },
              { name: "Plumbing Companies", icon: "✦" },
              { name: "Exterior Cleaning Services", icon: "✦" },
              { name: "Kitchen Remodeling", icon: "✦" },
              { name: "Bathroom Renovation", icon: "✦" },
              { name: "Snow Removal Services", icon: "✦" },
              { name: "Window Cleaning Companies", icon: "✦" },
              { name: "Gutter Cleaning & Repair", icon: "✦" },
              { name: "Pressure Washing Services", icon: "✦" },
              { name: "Roof Repair & Renovation", icon: "✦" },
              { name: "Local Retail Shops", icon: "✦" },
              { name: "E-commerce Stores", icon: "✦" }
            ].map((service, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group hover:scale-105">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-yellow-500 text-lg font-bold">{service.icon}</span>
                </div>
                <div className="text-lg text-white font-medium group-hover:text-yellow-400 transition-colors duration-300">
                  {service.name}
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="text-center border-t border-white/10 pt-8">
            {/* Direct Contact Section */}
            <div className="border border-yellow-500/30 rounded-xl p-4 sm:p-6 backdrop-blur-sm max-w-md mx-auto" style={{ backgroundColor: '#21252a' }}>
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight text-left">
                Need a Collab? Contact us:
              </h4>
              <div className="flex justify-start">
                <button 
                  type="button"
                  onClick={() => window.open('https://www.instagram.com/ds.desiiiign?igsh=MTZnMTFpMjB0aHZpZA==', '_blank')}
                  style={{
                    width: 'auto',
                    padding: '12px 32px',
                    background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                    color: 'white',
                    fontWeight: '600',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '16px',
                    minHeight: '44px',
                    transform: 'scale(1)',
                    boxShadow: '0 4px 12px rgba(240, 148, 51, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.transform = 'scale(1.05)';
                    target.style.background = 'linear-gradient(45deg, #e6683c 0%,#dc2743 25%,#cc2366 50%,#bc1888 75%,#8a3ab9 100%)';
                    target.style.boxShadow = '0 6px 20px rgba(240, 148, 51, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.transform = 'scale(1)';
                    target.style.background = 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)';
                    target.style.boxShadow = '0 4px 12px rgba(240, 148, 51, 0.3)';
                  }}
                >
                  <Instagram size={18} />
                  ds.desiiiign
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
