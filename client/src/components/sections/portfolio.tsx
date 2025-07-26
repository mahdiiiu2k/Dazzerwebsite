import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

const projects = [
  {
    title: "E-Commerce Dashboard",
    description: "Modern analytics dashboard with real-time data visualization and user management",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    tags: ["React", "TypeScript", "Charts"]
  },
  {
    title: "Mobile Banking App",
    description: "Secure and intuitive mobile banking interface with dark mode support",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    tags: ["UI/UX", "Mobile Design", "Security"]
  },
  {
    title: "Portfolio Website",
    description: "Creative portfolio showcasing digital art and photography with smooth animations",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    tags: ["Creative Design", "Animations", "Photography"]
  }
];

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
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text font-serif tracking-wide">Portfolio</h2>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Witness how we've helped businesses <span className="text-yellow-400 font-medium">transform their digital presence</span> with <span className="gradient-text">stunning, high-performance websites</span>
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-10 mb-16">
          {projects.map((project, index) => (
            <div key={index} className="luxury-border glass-card group hover:scale-105 transition-all duration-500">
              <div className="relative overflow-hidden rounded-2xl m-4 mb-0">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-2 border-yellow-600 rotate-45 opacity-60 group-hover:rotate-90 transition-transform duration-700"></div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-red-900 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold gradient-text mb-4 font-serif">{project.title}</h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-yellow-600/20 to-red-900/20 text-yellow-400 rounded-full border border-yellow-600/30 hover:border-yellow-600/60 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button
            onClick={scrollToContact}
            className="crimson-gradient hover:scale-105 px-12 py-6 rounded-full text-white font-bold text-2xl shadow-2xl crimson-glow transition-all duration-300 transform"
            size="lg"
          >
            Let's Create Excellence Together
          </Button>
        </div>
      </div>
    </section>
  );
}
