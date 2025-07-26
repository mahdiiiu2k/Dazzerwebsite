import { GlassCard } from "@/components/ui/glass-card";

const businessTypes = [
  {
    emoji: "🥐",
    title: "Cafés & Restaurants",
    description: "Menus, locations, online ordering"
  },
  {
    emoji: "✂️",
    title: "Salons & Barbershops",
    description: "Services, booking, portfolios"
  },
  {
    emoji: "🛠️",
    title: "Contractors & Renovation",
    description: "Services, quotes, project galleries"
  },
  {
    emoji: "🌿",
    title: "Landscaping",
    description: "Services, before/after, estimates"
  }
];

const additionalServices = [
  "Law Firms",
  "Medical Practices", 
  "Real Estate",
  "Fitness Studios",
  "Personal Trainers"
];

export default function TargetAudience() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Who We Build For</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            We specialize in creating websites for local businesses that need to establish their online presence quickly
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {businessTypes.map((business, index) => (
            <GlassCard key={index} className="text-center" hover>
              <div className="text-5xl mb-4">{business.emoji}</div>
              <h3 className="text-xl font-bold text-white mb-2">{business.title}</h3>
              <p className="text-gray-300 text-sm">{business.description}</p>
            </GlassCard>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-gray-200 mb-4">We also serve:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {additionalServices.map((service, index) => (
              <span 
                key={index}
                className="glass-morphism px-4 py-2 rounded-full text-sm"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
