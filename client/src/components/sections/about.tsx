import { useEffect, useRef, useState } from "react";
import { MessageSquare, Phone, Instagram, Search } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import outfitImage from "@assets/téléchargement (1)_1756058964050.jpg";
import buttonImage from "@assets/téléchargement (1)_1756071195719.jpg";
import buttonImage2 from "@assets/téléchargement (2)_1756072409526.jpg";
import buttonImage3 from "@assets/téléchargement (3)_1756072647997.jpg";

export default function About() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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

          {/* Search Bar */}
          <div style={{
            textAlign: 'left',
            marginBottom: '32px'
          }}>
            <div style={{
              position: 'relative',
              display: 'inline-block',
              width: '100%',
              maxWidth: '400px'
            }}>
              <Search 
                size={20} 
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  zIndex: 1
                }}
              />
              <div style={{
                position: 'absolute',
                left: '44px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1px',
                height: '24px',
                backgroundColor: 'rgba(156, 163, 175, 0.6)',
                zIndex: 1
              }} />
              <span style={{
                position: 'absolute',
                left: '72px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                fontSize: '16px',
                zIndex: 1,
                pointerEvents: 'none'
              }}>#</span>
              <input
                type="text"
                placeholder="1, 2, 3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 72px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '2px solid #9ca3af',
                  background: '#1a1a1a',
                  color: 'white',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#9ca3af';
                }}
              />
            </div>
          </div>

          {/* Button #1 */}
          {(!searchTerm || searchTerm.includes('1')) && (
          <div style={{
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <button 
              onClick={() => {
                window.open('https://fr.pinterest.com/pin/15551561209611818/', '_blank');
              }}
              style={{
                background: '#1A1821',
                color: 'white',
                border: '2px solid #9ca3af',
                padding: '12px 8px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '32px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '12px',
                transition: 'all 0.3s ease',
                transform: 'scale(1)',
                boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'scale(1.02)';
                target.style.background = '#2A2731';
                target.style.boxShadow = '0 6px 20px rgba(107, 114, 128, 0.5)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'scale(1)';
                target.style.background = '#1A1821';
                target.style.boxShadow = '0 4px 12px rgba(107, 114, 128, 0.3)';
              }}
            >
              <img src={buttonImage} alt="outfit" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px', border: '2px solid #1A1821' }} />
              #1
            </button>
          </div>
          )}

          {/* Button #2 */}
          {(!searchTerm || searchTerm.includes('2')) && (
          <div style={{
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <button 
              onClick={() => {
                window.open('https://fr.pinterest.com/pin/15551561209611818/', '_blank');
              }}
              style={{
                background: '#1A1821',
                color: 'white',
                border: '2px solid #9ca3af',
                padding: '12px 8px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '32px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '12px',
                transition: 'all 0.3s ease',
                transform: 'scale(1)',
                boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'scale(1.02)';
                target.style.background = '#2A2731';
                target.style.boxShadow = '0 6px 20px rgba(107, 114, 128, 0.5)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'scale(1)';
                target.style.background = '#1A1821';
                target.style.boxShadow = '0 4px 12px rgba(107, 114, 128, 0.3)';
              }}
            >
              <img src={buttonImage2} alt="outfit 2" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px', border: '2px solid #1A1821' }} />
              #2
            </button>
          </div>
          )}

          {/* Button #3 */}
          {(!searchTerm || searchTerm.includes('3')) && (
          <div style={{
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <button 
              onClick={() => {
                window.open('https://fr.pinterest.com/pin/15551561209611818/', '_blank');
              }}
              style={{
                background: '#1A1821',
                color: 'white',
                border: '2px solid #9ca3af',
                padding: '12px 8px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '32px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '12px',
                transition: 'all 0.3s ease',
                transform: 'scale(1)',
                boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'scale(1.02)';
                target.style.background = '#2A2731';
                target.style.boxShadow = '0 6px 20px rgba(107, 114, 128, 0.5)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'scale(1)';
                target.style.background = '#1A1821';
                target.style.boxShadow = '0 4px 12px rgba(107, 114, 128, 0.3)';
              }}
            >
              <img src={buttonImage3} alt="outfit 3" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px', border: '2px solid #1A1821' }} />
              #3
            </button>
          </div>
          )}

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
