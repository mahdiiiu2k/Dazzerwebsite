import { useState } from "react";
import { Mail, Phone, MessageSquare, Instagram } from "lucide-react";

export default function CTA() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    
    try {
      // Send to both Netlify Forms (for backup) and your existing email API
      
      // 1. Submit to Netlify Forms for backup
      const netlifyParams = new URLSearchParams();
      netlifyParams.append('form-name', 'contact');
      netlifyParams.append('name', formData.name);
      netlifyParams.append('phone', formData.phone);
      netlifyParams.append('email', formData.email || '');
      netlifyParams.append('message', formData.message);

      fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: netlifyParams.toString()
      }).catch(err => console.log('Netlify form backup failed:', err));

      // 2. Send email via serverless function (works for both Replit and Netlify)
      let emailEndpoint = '/.netlify/functions/contact-fixed';
      
      // Fallback to local API if on Replit
      if (window.location.hostname === 'localhost' || window.location.port === '5000') {
        emailEndpoint = '/api/contact';
      }
      
      console.log('Sending email to endpoint:', emailEndpoint);
      console.log('Form data:', { name: formData.name, phone: formData.phone, email: formData.email, message: formData.message });
      
      const emailResponse = await fetch(emailEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || '',
          message: formData.message
        })
      });

      console.log('Email response status:', emailResponse.status);
      console.log('Email response headers:', Object.fromEntries(emailResponse.headers.entries()));
      
      let emailResult;
      try {
        emailResult = await emailResponse.json();
        console.log('Email response body:', emailResult);
      } catch (parseError) {
        console.error('Failed to parse email response:', parseError);
        const responseText = await emailResponse.text();
        console.error('Raw response:', responseText);
        
        alert("There was an issue processing your message. Please try again or contact us directly via WhatsApp.");
        return;
      }
      
      // Check if email was actually sent successfully
      if (emailResponse.ok && emailResult.success && emailResult.emailSent) {
        // Email sent successfully - show success popup
        console.log('Email sent successfully!');
        setFormData({ name: "", phone: "", email: "", message: "" });
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 3000);
      } else {
        // Email failed - show detailed error
        console.error('Email sending failed:', emailResult);
        const errorMessage = emailResult.message || emailResult.error || 'Unknown error';
        alert(`Message received but email notification failed: ${errorMessage}. We'll still get back to you!`);
        setFormData({ name: "", phone: "", email: "", message: "" });
      }
      
    } catch (error) {
      console.error('Contact form error:', error);
      alert("There was an issue sending your message. Please try again or contact us directly via WhatsApp.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6" style={{ position: 'relative', zIndex: 10000 }}>
      <div className="container mx-auto relative" style={{ zIndex: 10001 }}>
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-2 sm:px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 gradient-text">
            Need a Website?
          </h2>
          <div className="w-12 sm:w-16 lg:w-24 h-1 bg-yellow-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get your professional website delivered in 24 hours
          </p>
          <p className="text-sm sm:text-base text-gray-400 mt-3 sm:mt-4">
            Free quote with no commitment required
          </p>
        </div>

        <div className="luxury-border glass-card p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 10002 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-4 sm:mb-6">
                <Mail className="text-yellow-600 mr-3 sm:mr-4" size={24} />
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white">Direct Message</h3>
                </div>
              </div>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-300">We'll get back to you within 24 hours!</p>
                </div>
              ) : (
                <form 
                  name="contact" 
                  method="POST" 
                  data-netlify="true" 
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  action="/"
                  style={{ padding: '16px 0', position: 'relative', zIndex: 10003 }}
                >
                  {/* Netlify form detection */}
                  <input type="hidden" name="form-name" value="contact" />
                  {/* Honeypot field for spam protection */}
                  <input type="hidden" name="bot-field" style={{ display: 'none' }} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-200 tracking-wide">
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all duration-300"
                        required
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-200 tracking-wide">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Your number"
                        className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4 sm:mb-6">
                    <label className="block text-sm font-medium text-gray-200 tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-3 mb-6 sm:mb-8">
                    <label className="block text-sm font-medium text-gray-200 tracking-wide">
                      Your Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Ask questions, or tell us about your project and what you want to build..."
                      className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all duration-300 resize-none"
                      required
                    />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      style={{
                        width: 'auto',
                        padding: '12px 32px',
                        backgroundColor: '#4a0d21',
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
                        opacity: isLoading ? 0.5 : 1,
                        transform: 'scale(1)',
                        boxShadow: '0 4px 12px rgba(74, 13, 33, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.transform = 'scale(1.05)';
                        target.style.backgroundColor = '#5a1729';
                        target.style.boxShadow = '0 6px 20px rgba(74, 13, 33, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.transform = 'scale(1)';
                        target.style.backgroundColor = '#4a0d21';
                        target.style.boxShadow = '0 4px 12px rgba(74, 13, 33, 0.3)';
                      }}
                    >
                      <Mail size={18} />
                      {isLoading ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6 order-1 lg:order-2">
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
      </div>
      
      {/* Success Popup */}
      {showSuccessPopup && (
        <div 
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            color: '#333',
            padding: '16px 24px',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
            fontSize: '16px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            animation: 'slideInFromBottom 0.5s ease-out',
            maxWidth: 'calc(100vw - 40px)',
            width: 'auto',
            textAlign: 'center'
          }}
        >
          <span>Message sent successfully!</span>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideInFromBottom {
            from {
              transform: translateX(-50%) translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateX(-50%) translateY(0);
              opacity: 1;
            }
          }
        `
      }} />
    </section>
  );
}