import { Button } from "@/components/ui/button";
import mahdiPhoto from "@assets/PicMa_2402454_1753546746971_1753546907613.jpg";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen relative px-6">


      {/* Main Content */}
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl w-full">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
              <span className="gradient-text text-4xl md:text-6xl block">take your digital apparence to another level</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              From concept to launch, our expert team delivers <span className="text-yellow-400">modern, mobile-friendly websites</span> that drive results. Fast turnaround, premium quality, guaranteed satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Button
                onClick={() => scrollToSection('portfolio')}
                className="crimson-gradient hover:scale-105 px-10 py-5 rounded-full text-white font-bold text-xl shadow-2xl crimson-glow transition-all duration-300 transform"
                size="lg"
              >
                View Our Work
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="glass-morphism px-10 py-5 rounded-full text-white font-bold text-xl hover:shadow-xl hover-glow transition-all duration-300 transform hover:scale-105 border-2"
                size="lg"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Luxury Profile Picture */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="luxury-border glass-card rounded-3xl p-3 hover-glow transform hover:scale-105 transition-all duration-500">
                <img 
                  src={mahdiPhoto}
                  alt="Mahdi - Founder of DSDS Design"
                  className="rounded-2xl w-80 h-80 object-cover filter brightness-110 contrast-110"
                />
              </div>
              {/* Luxury gradient background with animation */}
              <div className="absolute -inset-6 bg-gradient-to-r from-yellow-600/20 via-red-900/20 to-yellow-600/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Floating geometric accents */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-yellow-600 rotate-45 opacity-60 group-hover:rotate-90 transition-transform duration-700"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-900 rounded-full opacity-60 group-hover:scale-125 transition-transform duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
