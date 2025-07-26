export default function CTA() {
  return (
    <section id="cta" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Side - Contact Form */}
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center space-x-2">
                <span className="text-red-500">📧</span>
                <span>Need a Website?</span>
              </h2>
              <p className="text-gray-400 text-sm">Fast and professional - delivered in 24 hours</p>
            </div>
            
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="Your name..."
                    className="w-full bg-gray-800/60 border border-gray-600/50 rounded-md px-4 py-3 text-white text-sm placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Phone *</label>
                  <input 
                    type="tel" 
                    placeholder="+213 XXX XXX XXX"
                    className="w-full bg-gray-800/60 border border-gray-600/50 rounded-md px-4 py-3 text-white text-sm placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Email (optional)</label>
                <input 
                  type="email" 
                  placeholder="your.email@example.com"
                  className="w-full bg-gray-800/60 border border-gray-600/50 rounded-md px-4 py-3 text-white text-sm placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Describe your project *</label>
                <textarea 
                  rows={4}
                  placeholder="Type of business, features needed, budget range, timeline..."
                  className="w-full bg-gray-800/60 border border-gray-600/50 rounded-md px-4 py-3 text-white text-sm placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button 
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-300 flex items-center justify-center space-x-2 text-sm"
                >
                  <span>📧</span>
                  <span>Send Quote</span>
                </button>
                <a 
                  href="https://wa.me/213797496469"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-300 flex items-center justify-center space-x-2 text-sm"
                >
                  <span>📞</span>
                  <span>WhatsApp us</span>
                </a>
              </div>
            </form>
          </div>
          
          {/* Right Side - Contact Information */}
          <div className="space-y-4">
            {/* Direct Contact */}
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="text-yellow-500">📞</span>
                <span>Direct Contact</span>
              </h3>
              <div className="space-y-1">
                <p className="text-yellow-400 text-lg font-semibold">0561 54 99 62</p>
                <p className="text-gray-400 text-sm">Call / WhatsApp</p>
              </div>
            </div>
            
            {/* Our Channels */}
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-5">Our Channels</h3>
              <div className="space-y-3">
                {/* DS Design */}
                <div className="bg-gray-800/60 border border-gray-600/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      DS
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">DS DESIGN</h4>
                      <p className="text-gray-400 text-xs">Professional web design services</p>
                    </div>
                  </div>
                </div>
                
                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/ds.desiiiign?igsh=MTZnMTFpMjB0aHZpZA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-800/60 border border-gray-600/30 rounded-lg p-4 hover:bg-gray-700/60 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">📷</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">ds.desiiiign</h4>
                      <p className="text-gray-400 text-xs">Photos and stories from our projects</p>
                    </div>
                  </div>
                </a>
                
                {/* TikTok Placeholder */}
                <a 
                  href="https://wa.me/213797496469"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-800/60 border border-gray-600/30 rounded-lg p-4 hover:bg-gray-700/60 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">💬</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">@dsdesignrenovation</h4>
                      <p className="text-gray-400 text-xs">Follow our projects in video</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}