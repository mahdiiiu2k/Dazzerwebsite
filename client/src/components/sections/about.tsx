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
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text font-serif tracking-wide">Who We Are</h2>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
            We're a <span className="text-yellow-400 font-medium">small, creative team</span> building powerful websites for <span className="gradient-text">local businesses in record time</span>. Using modern tools and design, we deliver high-quality websites — <span className="text-yellow-400 font-medium">fast, affordable, and ready to use within 24 hours</span>.
          </p>
        </div>
        
        {/* Luxury Stats Cards */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <div className="luxury-border glass-card text-center p-8 group hover:scale-105 transition-all duration-500">
            <div id="counter-24" className="text-8xl font-bold gradient-text mb-6 group-hover:scale-110 transition-transform duration-300">0</div>
            <div className="text-3xl font-bold text-white mb-2">Hours</div>
            <div className="text-xl text-yellow-400 font-medium tracking-wide">Maximum Delivery Time</div>
            <div className="mt-4 h-1 w-20 mx-auto bg-gradient-to-r from-yellow-600 to-red-900 rounded-full"></div>
          </div>
          <div className="luxury-border glass-card text-center p-8 group hover:scale-105 transition-all duration-500">
            <div id="counter-100" className="text-8xl font-bold gradient-text mb-6 group-hover:scale-110 transition-transform duration-300">0</div>
            <div className="text-3xl font-bold text-white mb-2">Websites</div>
            <div className="text-xl text-yellow-400 font-medium tracking-wide">Successfully Delivered</div>
            <div className="mt-4 h-1 w-20 mx-auto bg-gradient-to-r from-red-900 to-yellow-600 rounded-full"></div>
          </div>
        </div>
        
        {/* Luxury Team Section */}
        <div className="luxury-border glass-card p-10 group hover:scale-102 transition-all duration-700">
          <div className="relative overflow-hidden rounded-2xl mb-8">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600" 
              alt="Elite professional team collaboration" 
              className="rounded-xl w-full h-80 object-cover filter brightness-110 contrast-110 group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute top-4 right-4 w-12 h-12 border-2 border-yellow-600 rotate-45 opacity-60 group-hover:rotate-90 transition-transform duration-700"></div>
          </div>
          <h3 className="text-4xl font-bold gradient-text mb-6 font-serif">Our Elite Team</h3>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            A <span className="text-yellow-400 font-medium">handpicked team</span> of industry-leading designers and developers committed to delivering <span className="gradient-text">exceptional websites</span> with unprecedented speed and sophistication. Each project benefits from our collective expertise in premium digital craftsmanship.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <div className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-red-900 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
