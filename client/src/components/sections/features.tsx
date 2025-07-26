import { GlassCard } from "@/components/ui/glass-card";

const skills = [
  {
    icon: "🎨",
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing user interfaces with modern design principles."
  },
  {
    icon: "💻",
    title: "Frontend Development",
    description: "Building responsive, interactive web applications using React, TypeScript, and modern frameworks."
  },
  {
    icon: "📱",
    title: "Mobile Design",
    description: "Designing mobile-first experiences that work seamlessly across all devices."
  },
  {
    icon: "⚡",
    title: "Performance Optimization",
    description: "Optimizing applications for speed, accessibility, and exceptional user experience."
  },
  {
    icon: "🔍",
    title: "User Research",
    description: "Understanding user needs through research, testing, and data-driven design decisions."
  },
  {
    icon: "🛠️",
    title: "Prototyping",
    description: "Rapid prototyping and iteration to validate ideas and refine user experiences."
  }
];

export default function Features() {
  return (
    <section id="services" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text font-serif tracking-wide">Our Expertise</h2>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Combining <span className="text-yellow-400 font-medium">creative vision</span> with technical mastery to deliver <span className="gradient-text">exceptional digital solutions</span>
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skills.map((skill, index) => (
            <div key={index} className="luxury-border glass-card p-8 group hover:scale-105 transition-all duration-500">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
              <h3 className="text-3xl font-bold gradient-text mb-6 font-serif">{skill.title}</h3>
              <p className="text-lg text-gray-300 leading-relaxed">{skill.description}</p>
              <div className="mt-6 h-1 w-16 bg-gradient-to-r from-yellow-600 to-red-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
