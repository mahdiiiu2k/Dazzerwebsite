import { useEffect, useRef, useState } from "react";
import { MessageSquare, Phone, Instagram } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import outfitImage from "@assets/téléchargement (1)_1756058964050.jpg";
import buttonImage from "@assets/téléchargement (1)_1756071195719.jpg";

export default function About() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 375);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
    <>
      <section 
        id="about" 
        ref={sectionRef} 
        className={`${isSmallScreen ? 'mt-20' : 'mt-32'} pb-20 px-6`}
      >
      <div className="container mx-auto">

        {/* Enhanced Services Section */}
        <div className="luxury-border glass-card p-6 md:p-12 max-w-6xl mx-auto">

          {/* Instagram Button - Now positioned inside rectangle, above the line */}
          <div style={{
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <button 
              onClick={() => {
                console.log('Test button clicked!');
                window.open('https://www.instagram.com/ds.desiiiign?igsh=MTZnMTFpMjB0aHZpZA==', '_blank');
              }}
              style={{
                background: '#1f2937',
                color: 'white',
                border: '1px solid #6b7280',
                padding: '28px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
                transform: 'scale(1)',
                boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'scale(1.02)';
                target.style.background = '#252f3f';
                target.style.boxShadow = '0 6px 20px rgba(107, 114, 128, 0.5)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'scale(1)';
                target.style.background = '#1f2937';
                target.style.boxShadow = '0 4px 12px rgba(107, 114, 128, 0.3)';
              }}
            >
              <img src={buttonImage} alt="outfit" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
              #1
            </button>
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
                  onClick={() => {
                    console.log('Instagram Button clicked!');
                    window.open('https://www.instagram.com/ds.desiiiign?igsh=MTZnMTFpMjB0aHZpZA==', '_blank');
                  }}
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
    </>
  );
}
