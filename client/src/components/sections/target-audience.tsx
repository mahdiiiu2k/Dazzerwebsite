import { GlassCard } from "@/components/ui/glass-card";

const businessTypes = [
  {
    emoji: "🥐",
    title: "Cafés & Restaurants",
    description: "Menu displays, location info, online ordering systems"
  },
  {
    emoji: "✂️",
    title: "Barbershops & Salons",
    description: "Service listings, booking forms, portfolio galleries"
  },
  {
    emoji: "🛠",
    title: "Renovation & Handyman",
    description: "Service descriptions, quote forms, project showcases"
  },
  {
    emoji: "🌿",
    title: "Landscaping & Gardening",
    description: "Service packages, before/after galleries, estimates"
  },
  {
    emoji: "🏬",
    title: "Small Local Stores", 
    description: "Product catalogs, store info, contact details"
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
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text font-serif tracking-wide">Who We Work With</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            We specialize in creating websites for local businesses that need to establish their online presence quickly
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
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
