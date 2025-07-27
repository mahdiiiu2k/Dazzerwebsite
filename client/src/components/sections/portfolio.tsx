import { Button } from "@/components/ui/button";

export default function Portfolio() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text font-serif tracking-wide">Our Work</h2>
        </div>
        
        {/* Website Showcase */}
        <div className="luxury-border glass-card p-8 max-w-6xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">AG Construction & Renovation</h3>
            <p className="text-xl text-white font-light">Robust construction website delivered in 24 hours</p>
            <p className="text-sm text-gray-400 mt-2">Strong, professional design that builds trust with construction clients</p>
          </div>
          
          {/* Construction Website Preview */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 p-8">
            {/* Mock Construction Website */}
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center font-bold text-lg">
                    AG
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">AG Construction</h4>
                    <p className="text-sm text-gray-300">& Renovation</p>
                  </div>
                </div>
                <div className="text-sm text-gray-300">Call: 0561 54 99 62</div>
              </div>
              
              {/* Hero Section */}
              <div className="relative bg-gradient-to-r from-slate-700 to-slate-800 text-white p-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Professional Construction & Renovation</h1>
                <p className="text-lg mb-6">25+ Years Experience • Licensed & Insured • Saoula, Alger</p>
                <div className="inline-flex space-x-4">
                  <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded font-semibold transition-colors">
                    Get Free Quote
                  </button>
                  <button className="border-2 border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-slate-800 transition-colors">
                    View Projects
                  </button>
                </div>
              </div>
              
              {/* Services Grid */}
              <div className="p-8 bg-gray-50">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Our Construction Services</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      🏗️
                    </div>
                    <h3 className="font-semibold text-slate-800">Construction</h3>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      🔨
                    </div>
                    <h3 className="font-semibold text-slate-800">Renovation</h3>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      🏠
                    </div>
                    <h3 className="font-semibold text-slate-800">Maçonnerie</h3>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      ⚡
                    </div>
                    <h3 className="font-semibold text-slate-800">Électricité</h3>
                  </div>
                </div>
              </div>
              
              {/* Portfolio Preview */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Recent Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-200 h-40 rounded-lg flex items-center justify-center">
                    <span className="text-slate-600 font-semibold">Restaurant Project</span>
                  </div>
                  <div className="bg-slate-200 h-40 rounded-lg flex items-center justify-center">
                    <span className="text-slate-600 font-semibold">Kitchen Renovation</span>
                  </div>
                  <div className="bg-slate-200 h-40 rounded-lg flex items-center justify-center">
                    <span className="text-slate-600 font-semibold">Office Space</span>
                  </div>
                </div>
              </div>
              
              {/* Contact Footer */}
              <div className="bg-slate-900 text-white p-6 text-center">
                <h3 className="text-lg font-bold mb-2">Ready to Start Your Project?</h3>
                <p className="mb-4">Contact us for a free consultation and quote</p>
                <div className="flex justify-center space-x-6 text-sm">
                  <div>📍 Saoula, Alger</div>
                  <div>📞 0561 54 99 62</div>
                  <div>✉️ contact@agconstruction.dz</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-300 text-sm">
              <strong>Design Focus:</strong> Bold, trustworthy design with construction industry colors (orange, slate, white)
              <br />
              Professional layout that conveys strength, reliability, and 25+ years of experience
            </p>
          </div>
        </div>
        

      </div>
    </section>
  );
}
