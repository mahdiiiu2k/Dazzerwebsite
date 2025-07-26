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
        
        {/* Services List */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              "Roofing Contractors", "Landscaping Services", "Plumbing Companies", "Exterior Cleaning Services", 
              "Kitchen Remodeling", "Bathroom Renovation", "Snow Removal Services", 
              "Window Cleaning Companies", "Gutter Cleaning & Repair", "Pressure Washing Services", 
              "Roof Repair & Renovation", "Local Retail Shops", "E-commerce Stores"
            ].map((service, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex-shrink-0"></div>
                <div className="text-xl text-white font-medium">{service}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 mb-16">
            <p className="text-2xl text-white font-light">
              ...or any type of business that you have
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
