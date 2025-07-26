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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">My Skills</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Combining creativity with technical expertise to deliver exceptional digital solutions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <GlassCard key={index} hover>
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{skill.title}</h3>
              <p className="text-gray-200">{skill.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
