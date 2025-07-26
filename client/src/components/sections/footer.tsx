import { Facebook, Instagram, Mail } from "lucide-react";

const services = [
  "24-hour delivery",
  "Mobile-responsive design",
  "Contact forms included",
  "SEO optimized",
  "Social media integration"
];

const quickLinks = [
  { title: "Who We Are", href: "#about" },
  { title: "Why Choose Us", href: "#services" },
  { title: "Our Work", href: "#portfolio" },
  { title: "Referral Program", href: "#referral" },
  { title: "Contact", href: "#contact" }
];

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-16 px-6 border-t border-white border-opacity-10">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Tagline */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl font-bold gradient-text">DS</span>
              <span className="text-lg font-medium text-white">DS Design</span>
            </div>
            <p className="text-gray-200 mb-6">Building powerful websites for local businesses in record time — fast, affordable, and ready to use within 24 hours.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl text-gray-300 hover:text-purple-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-2xl text-gray-300 hover:text-purple-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-2xl text-gray-300 hover:text-purple-400 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Skills */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-purple-400 transition-colors">{service}</a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-purple-400 transition-colors text-left"
                  >
                    {link.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-10 pt-8 text-center">
          <p className="text-gray-300">© 2025 DS Design. Built with ❤️ for small businesses.</p>
        </div>
      </div>
    </footer>
  );
}
