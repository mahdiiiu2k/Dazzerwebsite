import { useEffect, useRef, useState } from "react";
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
              { name: "Roofing Contractors", icon: "▲" },
              { name: "Landscaping Services", icon: "♦" },
              { name: "Plumbing Companies", icon: "◊" },
              { name: "Exterior Cleaning Services", icon: "✦" },
              { name: "Kitchen Remodeling", icon: "■" },
              { name: "Bathroom Renovation", icon: "●" },
              { name: "Snow Removal Services", icon: "◆" },
              { name: "Window Cleaning Companies", icon: "◇" },
              { name: "Gutter Cleaning & Repair", icon: "▼" },
              { name: "Pressure Washing Services", icon: "◈" },
              { name: "Roof Repair & Renovation", icon: "▲" },
              { name: "Local Retail Shops", icon: "◉" },
              { name: "E-commerce Stores", icon: "◎" }
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
            <p className="text-xl text-gray-300">
              We work with any type of business that needs a professional website
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
