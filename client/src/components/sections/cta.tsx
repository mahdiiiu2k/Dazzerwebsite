export default function CTA() {
  return (
    <section id="cta" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="luxury-border glass-card p-12 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text font-serif tracking-wide">
              Need a Website?
            </h2>
            <p className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Get your professional website delivered in <span className="text-yellow-400 font-medium">24 hours</span>
            </p>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">24h Delivery</h3>
              <p className="text-gray-300">Lightning fast turnaround</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">📱</div>
              <h3 className="text-xl font-bold text-white mb-2">Mobile Ready</h3>
              <p className="text-gray-300">Perfect on all devices</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">💼</div>
              <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
              <p className="text-gray-300">Business-focused design</p>
            </div>
          </div>
          
          {/* Contact Methods */}
          <div className="border-t border-white/10 pt-12">
            <h3 className="text-3xl font-bold text-white text-center mb-8 font-serif">Get Started Today</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* WhatsApp Link */}
              <a 
                href="https://wa.me/213797496469"
                target="_blank" 
                rel="noopener noreferrer"
                className="luxury-border glass-card p-8 group hover:scale-105 transition-all duration-500 flex items-center space-x-6 min-w-[300px] bg-green-500/10 border-green-500/30 hover:bg-green-500/20"
              >
                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">💬</div>
                <div className="text-left">
                  <h4 className="text-2xl font-bold text-white mb-2">WhatsApp</h4>
                  <p className="text-gray-300 text-lg">Instant messaging & quick quotes</p>
                  <p className="text-green-400 font-medium mt-1">Usually responds within 1 hour</p>
                </div>
              </a>
              
              {/* Instagram Link */}
              <a 
                href="https://www.instagram.com/ds.desiiiign?igsh=MTZnMTFpMjB0aHZpZA=="
                target="_blank" 
                rel="noopener noreferrer"
                className="luxury-border glass-card p-8 group hover:scale-105 transition-all duration-500 flex items-center space-x-6 min-w-[300px] bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20"
              >
                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">📸</div>
                <div className="text-left">
                  <h4 className="text-2xl font-bold text-white mb-2">Instagram</h4>
                  <p className="text-gray-300 text-lg">View our latest projects & designs</p>
                  <p className="text-purple-400 font-medium mt-1">@ds.desiiiign</p>
                </div>
              </a>
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-10">
              <p className="text-xl text-yellow-400 font-medium">
                Ready to grow your business online?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}