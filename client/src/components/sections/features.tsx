import { GlassCard } from "@/components/ui/glass-card";

const features = [
  {
    icon: "⚡",
    title: "24-Hour Delivery",
    description: "Your website will be ready within 24 hours, guaranteed. No long waiting periods."
  },
  {
    icon: "🎨",
    title: "Modern Design",
    description: "Clean, contemporary designs that make your business stand out from the competition."
  },
  {
    icon: "📱",
    title: "Mobile & SEO Ready",
    description: "Fully responsive designs optimized for search engines and mobile devices."
  },
  {
    icon: "🔄",
    title: "Free Revisions",
    description: "We'll refine your website until it's perfect. Revisions are included at no extra cost."
  },
  {
    icon: "💰",
    title: "Affordable Pricing",
    description: "Professional websites at prices small businesses can afford. No hidden fees."
  },
  {
    icon: "🛠️",
    title: "Ongoing Support",
    description: "We're here to help even after launch. Get support when you need it most."
  }
];

export default function Features() {
  return (
    <section id="services" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Why Choose DS Design?</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlassCard key={index} hover>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-200">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
