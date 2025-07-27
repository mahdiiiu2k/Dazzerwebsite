import { useEffect, useRef, useState } from "react";
import { MessageSquare } from "lucide-react";
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
    <section id="about" ref={sectionRef} className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text font-serif tracking-wide">We build websites for:</h2>
        </div>
        
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
            <p className="text-2xl text-yellow-400 font-medium mb-2">
              Don't see your business type?
            </p>
            <p className="text-xl text-gray-300 mb-6">
              We work with any type of business that needs a professional website
            </p>
            
            {/* Contact Us Button */}
            <button 
              type="button"
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              style={{
                width: 'auto',
                padding: '12px 32px',
                backgroundColor: '#124925',
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
                boxShadow: '0 4px 12px rgba(18, 73, 37, 0.3)',
                margin: '0 auto'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'scale(1.05)';
                target.style.backgroundColor = '#0f3a1f';
                target.style.boxShadow = '0 6px 20px rgba(18, 73, 37, 0.5)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'scale(1)';
                target.style.backgroundColor = '#124925';
                target.style.boxShadow = '0 4px 12px rgba(18, 73, 37, 0.3)';
              }}
            >
              <MessageSquare size={18} />
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
