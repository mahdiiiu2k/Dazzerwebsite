export default function CTA() {
  return (
    <section id="cta" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="luxury-border glass-card p-12 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text font-serif tracking-wide">
            Need a Website?
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Get your professional website delivered in <span className="text-yellow-400 font-medium">24 hours</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            {/* WhatsApp Link */}
            <a 
              href="https://wa.me/213797496469"
              target="_blank" 
              rel="noopener noreferrer"
              className="luxury-border glass-card p-8 group hover:scale-105 transition-all duration-500 flex items-center space-x-6 min-w-[320px] bg-green-500/10 border-green-500/30 hover:bg-green-500/20"
            >
              <div className="text-5xl group-hover:scale-110 transition-transform duration-300">💬</div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-gray-300 text-lg">Quick quotes & instant chat</p>
                <p className="text-green-400 font-medium mt-1">+213 797 496 469</p>
              </div>
            </a>
            
            {/* Instagram Link */}
            <a 
              href="https://www.instagram.com/ds.desiiiign?igsh=MTZnMTFpMjB0aHZpZA=="
              target="_blank" 
              rel="noopener noreferrer"
              className="luxury-border glass-card p-8 group hover:scale-105 transition-all duration-500 flex items-center space-x-6 min-w-[320px] bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20"
            >
              <div className="text-5xl group-hover:scale-110 transition-transform duration-300">📸</div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Instagram</h3>
                <p className="text-gray-300 text-lg">View our latest projects</p>
                <p className="text-purple-400 font-medium mt-1">@ds.desiiiign</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}