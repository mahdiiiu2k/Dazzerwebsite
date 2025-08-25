import { useEffect, useRef, useState } from "react";
import { MessageSquare, Phone, Instagram, Search } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import outfitImage from "@assets/téléchargement (1)_1756058964050.jpg";

interface AboutProps {
  dynamicButtons?: Array<{number: string, imageUrl: string, link: string}>;
}

export default function About({ dynamicButtons = [] }: AboutProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isIPhoneSE, setIsIPhoneSE] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      setIsIPhoneSE(window.innerWidth <= 375);
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
        className={`${isIPhoneSE ? '-mt-32 pt-24' : isSmallScreen ? '-mt-72 pt-32' : '-mt-20 pt-8'} pb-20 px-6`}
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
                left: '56px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                fontSize: '24px',
                zIndex: 1,
                pointerEvents: 'none'
              }}>#</span>
              <input
                type="text"
                placeholder="Type to search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 72px',
                  fontSize: '18px',
                  borderRadius: '8px',
                  border: '2px solid #4c1d95',
                  background: '#1a1a1a',
                  color: 'white',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#4c1d95';
                }}
              />
            </div>
          </div>




          {/* Dynamic Buttons */}
          {dynamicButtons
            .sort((a, b) => parseInt(a.number) - parseInt(b.number))
            .map((button, index) => (
            (!searchTerm || button.number.includes(searchTerm)) && (
            <div key={index} style={{
              textAlign: 'center',
              marginBottom: isSmallScreen ? '24px' : '32px',
              position: 'relative',
              zIndex: 10
            }}>
              <button 
                data-testid={`button-outfit-${button.number}`}
                onClick={() => {
                  window.open(button.link, '_blank');
                }}
                style={{
                  background: '#1A1821',
                  color: 'white',
                  border: '2px solid #4c1d95',
                  padding: isSmallScreen ? '16px 12px' : '12px 8px',
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
                  width: '100%',
                  minHeight: isSmallScreen ? '130px' : '120px',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'rgba(0,0,0,0)'
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
                <img src={button.imageUrl} alt={`outfit ${button.number}`} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px', border: '2px solid #1A1821' }} />
                #{button.number}
              </button>
            </div>
            )
          ))}

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
                    window.open('https://www.instagram.com/dazzeriii2k', '_blank');
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
                  dazzeriii2k
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
