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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">About Me</h2>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            I'm a passionate digital designer specializing in creating modern, user-focused web experiences. With expertise in UI/UX design, frontend development, and creative problem-solving, I bring ideas to life through clean code and beautiful interfaces.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <GlassCard className="text-center" hover>
            <div id="counter-24" className="text-6xl font-bold gradient-text mb-4">0</div>
            <div className="text-2xl font-semibold text-white">Projects</div>
            <div className="text-gray-300">Completed</div>
          </GlassCard>
          <GlassCard className="text-center" hover>
            <div id="counter-100" className="text-6xl font-bold gradient-text mb-4">0</div>
            <div className="text-2xl font-semibold text-white">Happy Clients</div>
            <div className="text-gray-300">Worldwide</div>
          </GlassCard>
        </div>
        
        {/* Skills Section */}
        <GlassCard className="text-center">
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600" 
            alt="Modern workspace with computer" 
            className="rounded-xl mb-6 w-full h-64 object-cover" 
          />
          <h3 className="text-2xl font-bold text-white mb-4">My Workspace</h3>
          <p className="text-gray-200">Where creativity meets technology to build exceptional digital experiences</p>
        </GlassCard>
      </div>
    </section>
  );
}
