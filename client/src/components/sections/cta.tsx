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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-200 tracking-wide">
                        Full Name <span className="text-red-400">*</span>
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
                        placeholder="+213 XXX XXX XXX"
                        className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
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
                  
                  <div className="space-y-3 mb-8">
                    <label className="block text-sm font-medium text-gray-200 tracking-wide">
                      Project Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Describe your business, required features, budget range, and timeline..."
                      className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all duration-300 resize-none"
                      required
                    />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '15px' }}>
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
                      {isLoading ? 'Envoi en cours...' : 'Envoyer'}
                    </button>
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
                      <MessageSquare size={18} />
                      WhatsApp Us
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Direct Contact */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-sm">
                <h4 className="text-2xl font-serif font-bold text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                    <Phone className="text-white" size={20} />
                  </div>
                  Direct Contact
                </h4>
                <div className="space-y-6">
                  {/* Phone Number */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                          <Phone className="text-white" size={18} />
                        </div>
                        <div>
                          <a href="tel:+213797496469" className="text-white font-semibold text-lg hover:text-yellow-400 transition-colors cursor-pointer">
                            +213 797 496 469
                          </a>
                          <p className="text-gray-300 text-sm">Available 24/7 for urgent projects</p>
                        </div>
                      </div>
                      <div className="text-green-400 text-xs font-medium bg-green-400/20 px-3 py-1 rounded-full">
                        ACTIVE
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ backgroundColor: '#124925' }}>
                          <MessageSquare className="text-white" size={18} />
                        </div>
                        <div>
                          <a href="https://wa.me/213797496469" target="_blank" rel="noopener noreferrer" className="text-white font-semibold text-lg hover:text-green-400 transition-colors cursor-pointer">
                            WhatsApp Chat
                          </a>
                          <p className="text-gray-300 text-sm">Quick responses & file sharing</p>
                        </div>
                      </div>
                      <div className="text-green-400 text-xs font-medium bg-green-400/20 px-3 py-1 rounded-full">
                        FAST
                      </div>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="border-t border-white/10 pt-4 mt-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Average response time:</span>
                      <span className="text-yellow-400 font-semibold">&lt; 2 hours</span>
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
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ backgroundColor: '#124925' }}>
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