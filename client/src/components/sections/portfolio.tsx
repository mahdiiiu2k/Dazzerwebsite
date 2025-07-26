import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

const projects = [
  {
    title: "Urban Café",
    description: "Clean, mobile-ready site with menu integration and location details",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    tags: ["Menu Display", "Mobile-Ready", "Location"]
  },
  {
    title: "FadePro Barbershop",
    description: "Modern layout with booking form and portfolio gallery showcase",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    tags: ["Booking Form", "Gallery", "Service List"]
  },
  {
    title: "KitchenPro Remodel",
    description: "Professional design with quote forms and project showcase gallery",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    tags: ["Quote Forms", "Project Gallery", "Services"]
  },
  {
    title: "Arizona Landscaping",
    description: "Beautiful layout with scrollable services and Instagram feed integration",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    tags: ["Instagram Feed", "Service Packages", "Gallery"]
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
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text font-serif tracking-wide">Our Work</h2>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Real websites we've built for <span className="text-yellow-400 font-medium">local businesses</span> — delivered fast and <span className="gradient-text">ready to drive results</span>
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-10 mb-16">
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
