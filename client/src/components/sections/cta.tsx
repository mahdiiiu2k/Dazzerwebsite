export default function CTA() {
  return (
    <section id="cta" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="luxury-border glass-card p-12 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text font-serif tracking-wide">
            Need a Website?
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Get in touch with us to discuss your project and get your website delivered in 24 hours
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            {/* WhatsApp Link */}
            <a 
              href="https://wa.me/213797496469"
              target="_blank" 
              rel="noopener noreferrer"
              className="luxury-border glass-card p-6 group hover:scale-105 transition-all duration-500 flex items-center space-x-4 min-w-[250px]"
            >
              <div className="text-4xl group-hover:scale-110 transition-transform duration-300">📱</div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-1">WhatsApp</h3>
                <p className="text-gray-300">Quick response</p>
              </div>
            </a>
            
            {/* Instagram Link */}
            <a 
              href="https://www.instagram.com/ds.desiiiign?igsh=MTZnMTFpMjB0aHZpZA=="
              target="_blank" 
              rel="noopener noreferrer"
              className="luxury-border glass-card p-6 group hover:scale-105 transition-all duration-500 flex items-center space-x-4 min-w-[250px]"
            >
              <div className="text-4xl group-hover:scale-110 transition-transform duration-300">📷</div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-1">Instagram</h3>
                <p className="text-gray-300">View our work</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}