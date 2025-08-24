import { Phone, Instagram } from "lucide-react";

export default function CTA() {

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6" style={{ position: 'relative', zIndex: 10000 }}>
      <div className="container mx-auto relative" style={{ zIndex: 10001 }}>
        <div className="flex justify-center">
          {/* Contact Info */}
          <div className="w-full max-w-md">
              {/* Direct Contact */}
              <div className="border border-yellow-500/30 rounded-xl p-4 sm:p-6 backdrop-blur-sm" style={{ backgroundColor: '#21252a' }}>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4 sm:mb-6">
                  Direct Contact
                </h4>
                <div className="space-y-6">
                  {/* WhatsApp */}
                  <div className="flex items-center">
                    <div>
                      <button 
                        type="button"
                        onClick={() => window.open('https://wa.me/213797496469', '_blank')}
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
                          boxShadow: '0 4px 12px rgba(18, 73, 37, 0.3)'
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
                        <Phone size={18} />
                        WhatsApp Us
                      </button>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-center">
                    <div>
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
        </div>
      </div>
    </section>
  );
}