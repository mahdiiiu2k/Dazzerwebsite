import { useState } from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";

export default function CTA() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      const backendData = {
        name: formData.name,
        email: formData.email || "",
        message: `${formData.message}\n\nPhone: ${formData.phone}`
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", phone: "", email: "", message: "" });
        alert("Message sent successfully! We'll contact you soon.");
      } else {
        alert("Error sending message. Please try again.");
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert("Error sending message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6" style={{ position: 'relative', zIndex: 10000 }}>
      <div className="container mx-auto relative" style={{ zIndex: 10001 }}>
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 gradient-text">
            Need a Website?
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-yellow-600 mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get your professional website delivered in 24 hours
          </p>
          <p className="text-base text-gray-400 mt-4">
            Free quote with no commitment required
          </p>
        </div>

        <div className="luxury-border glass-card p-8 max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 10002 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mr-4">
                  <MessageSquare className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-semibold text-white">Quote Request</h3>
                  <p className="text-gray-300 text-sm">Free and no commitment</p>
                </div>
              </div>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-300">We'll get back to you within 24 hours!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ padding: '20px 0', position: 'relative', zIndex: 10003 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                    <div>
                      <label style={{ color: 'white', display: 'block', marginBottom: '8px', fontSize: '14px' }}>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name..."
                        style={{
                          width: '100%',
                          padding: '12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: '16px'
                        }}
                        required
                      />
                    </div>
                    
                    <div>
                      <label style={{ color: 'white', display: 'block', marginBottom: '8px', fontSize: '14px' }}>Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+213 XXX XXX XXX"
                        style={{
                          width: '100%',
                          padding: '12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: '16px'
                        }}
                        required
                      />
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ color: 'white', display: 'block', marginBottom: '8px', fontSize: '14px' }}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: 'white', display: 'block', marginBottom: '8px', fontSize: '14px' }}>Project Description *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Type of business, features needed, budget range, timeline..."
                      style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '16px',
                        resize: 'none'
                      }}
                      required
                    />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      style={{
                        flex: 1,
                        padding: '20px 40px',
                        backgroundColor: '#4a0d21',
                        color: 'white',
                        fontWeight: '700',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        fontSize: '18px',
                        minHeight: '60px',
                        opacity: isLoading ? 0.5 : 1,
                        transform: 'scale(1)',
                        boxShadow: '0 6px 20px rgba(74, 13, 33, 0.4)'
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
                      {isLoading ? 'Envoi en cours...' : 'Envoyer'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => window.open('https://wa.me/213797496469', '_blank')}
                      style={{
                        flex: 1,
                        padding: '15px 30px',
                        backgroundColor: '#16a34a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      💬 WhatsApp Us
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Direct Contact */}
              <div className="border-l-4 border-yellow-500 pl-6">
                <h4 className="text-xl font-serif font-semibold text-white mb-4 flex items-center">
                  <Phone className="text-yellow-500 mr-3" />
                  Direct Contact
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mr-4">
                      <Phone className="text-yellow-500 text-sm" />
                    </div>
                    <div>
                      <a href="tel:+213797496469" className="text-white font-medium hover:text-yellow-500 transition-colors cursor-pointer">
                        +213 797 496 469
                      </a>
                      <p className="text-gray-300 text-sm">Call / WhatsApp</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Our Channels */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="text-xl font-serif font-semibold text-white mb-4">
                  Our Channels
                </h4>
                <div className="space-y-4">
                  {/* DS Design */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-red-900 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-sm">DS</span>
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">DS DESIGN</h5>
                        <p className="text-gray-300 text-sm">Professional web design services</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com/ds.desiiiign?igsh=MTZnMTFpMjB0aHZpZA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-white text-sm">📷</span>
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">ds.desiiiign</h5>
                        <p className="text-gray-300 text-sm">Photos and stories from our projects</p>
                      </div>
                    </div>
                  </a>
                  
                  {/* WhatsApp */}
                  <a 
                    href="https://wa.me/213797496469"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-white text-sm">💬</span>
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">@dsdesign</h5>
                        <p className="text-gray-300 text-sm">Quick responses and project updates</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}