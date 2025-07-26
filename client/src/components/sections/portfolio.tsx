import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

const projects = [
  {
    title: "Urban Café",
    description: "Sleek, dark mode design with online menu and location info",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    tags: ["Menu Integration", "Location Map"]
  },
  {
    title: "FadePro Barbers",
    description: "Online booking system with service showcase and pricing",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    tags: ["Online Booking", "Service Pricing"]
  },
  {
    title: "Arizona Remodel",
    description: "Quote form integration with services gallery and testimonials",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    tags: ["Quote Forms", "Project Gallery"]
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Work</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            See how we've helped local businesses establish their online presence with beautiful, functional websites
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <GlassCard key={index} className="overflow-hidden p-0 group" hover>
              <img 
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-200 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="bg-purple-500 bg-opacity-20 text-purple-300 px-2 py-1 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
        
        <div className="text-center">
          <Button
            onClick={scrollToContact}
            className="bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-xl hover-glow transition-all transform hover:scale-105"
            size="lg"
          >
            View All Our Work
          </Button>
        </div>
      </div>
    </section>
  );
}
