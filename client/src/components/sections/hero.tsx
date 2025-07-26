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
      {/* Small Logo in Top Left */}
      <div className="absolute top-8 left-8 z-10">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text">DS</span>
          <span className="text-sm font-medium text-white">DS Design</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl w-full">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="animate-float">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">Hi, I'm </span>
                <span className="gradient-text">Mahdi</span><br />
                <span className="text-white">We build </span>
                <span className="gradient-text">professional websites</span>
                <span className="text-white"> for your business in under </span>
                <span className="gradient-text">24 hours</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              From concept to launch, our expert team delivers modern, mobile-friendly websites that drive results. Fast turnaround, premium quality, guaranteed satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => scrollToSection('portfolio')}
                className="bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-xl hover-glow transition-all transform hover:scale-105"
                size="lg"
              >
                View Our Work
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="glass-morphism px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-xl hover-glow transition-all transform hover:scale-105 border-white/20"
                size="lg"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="glass-card rounded-3xl p-2 hover-glow">
                <img 
                  src={mahdiPhoto}
                  alt="Mahdi - Founder of DS Design"
                  className="rounded-2xl w-80 h-80 object-cover"
                />
              </div>
              {/* Floating gradient background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
