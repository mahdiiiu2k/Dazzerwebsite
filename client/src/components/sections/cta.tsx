export default function CTA() {
  return (
    <section id="cta" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Contact Form */}
          <div className="luxury-border glass-card p-8">
            <div className="mb-6">
              <h2 className="text-4xl font-bold gradient-text font-serif mb-2">Need a Website?</h2>
              <p className="text-gray-300">Fast and professional - delivered in 24 hours</p>
            </div>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="Your name..."
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Phone *</label>
                  <input 
                    type="tel" 
                    placeholder="+213 XXX XXX XXX"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Email (optional)</label>
                <input 
                  type="email" 
                  placeholder="your.email@example.com"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Describe your project *</label>
                <textarea 
                  rows={4}
                  placeholder="Type of business, features needed, budget range, timeline..."
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <button 
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <span>📧</span>
                  <span>Send Quote</span>
                </button>
                <a 
                  href="https://wa.me/213797496469"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <span>📞</span>
                  <span>Call us</span>
                </a>
              </div>
            </form>
          </div>
          
          {/* Right Side - Contact Information */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <div className="luxury-border glass-card p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <span>📞</span>
                <span>Direct Contact</span>
              </h3>
              <div className="space-y-2">
                <p className="text-yellow-400 text-xl font-bold">+213 797 496 469</p>
                <p className="text-gray-300">Call / WhatsApp</p>
              </div>
            </div>
            
            {/* Our Channels */}
            <div className="luxury-border glass-card p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Our Channels</h3>
              <div className="space-y-4">
                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/ds.desiiiign?igsh=MTZnMTFpMjB0aHZpZA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📷</div>
                    <div>
                      <h4 className="text-white font-semibold">ds.desiiiign</h4>
                      <p className="text-gray-300 text-sm">View our portfolio and designs</p>
                    </div>
                  </div>
                </a>
                
                {/* WhatsApp */}
                <a 
                  href="https://wa.me/213797496469"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">💬</div>
                    <div>
                      <h4 className="text-white font-semibold">WhatsApp Chat</h4>
                      <p className="text-gray-300 text-sm">Quick responses and project updates</p>
                    </div>
                  </div>
                </a>
                
                {/* Email */}
                <div className="block bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">✉️</div>
                    <div>
                      <h4 className="text-white font-semibold">Email</h4>
                      <p className="text-gray-300 text-sm">For detailed project discussions</p>
                    </div>
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