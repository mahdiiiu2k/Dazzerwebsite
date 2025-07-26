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
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            "Roofing", "Landscaping", "Plumbing", "Exterior cleaning services", 
            "Kitchen remodeling", "Bathroom remodeling", "Snow removal", 
            "Window cleaning", "Gutter cleaning", "Pressure washing", 
            "Roof renovation", "Shop", "Ecommerce"
          ].map((service, index) => (
            <div key={index} className="luxury-border glass-card p-6 text-center group hover:scale-105 transition-all duration-500">
              <div className="text-lg text-white font-medium">{service}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
