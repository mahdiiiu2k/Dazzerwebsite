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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Featured Projects</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            A showcase of my recent work in web development, UI/UX design, and digital experiences
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
            Let's Work Together
          </Button>
        </div>
      </div>
    </section>
  );
}
