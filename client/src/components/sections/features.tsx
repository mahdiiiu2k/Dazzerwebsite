import { GlassCard } from "@/components/ui/glass-card";

const features = [
  {
    icon: "⚡",
    title: "Delivered in 24 hours",
    description: "Your website goes live within 24 hours of project start, guaranteed."
  },
  {
    icon: "📱",
    title: "Works on all devices",
    description: "Mobile-responsive design that looks perfect on phones, tablets, and desktops."
  },
  {
    icon: "📝",
    title: "Booking/contact forms included",
    description: "Ready-to-use contact forms and booking systems for your business needs."
  },
  {
    icon: "📷",
    title: "Instagram & social integration",
    description: "Connect your social media feeds and showcase your work effortlessly."
  },
  {
    icon: "🔍",
    title: "SEO & speed optimized",
    description: "Built for search engines and fast loading times to attract more customers."
  },
  {
    icon: "💰",
    title: "Affordable pricing",
    description: "High-quality websites at prices that work for small business budgets."
  }
];

export default function Features() {
  return (
    <section id="services" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text font-serif tracking-wide">Why Choose DS Design?</h2>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Everything you need for a <span className="text-yellow-400 font-medium">professional online presence</span>, delivered <span className="gradient-text">fast and affordable</span>
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="luxury-border glass-card p-8 group hover:scale-105 transition-all duration-500">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-3xl font-bold gradient-text mb-6 font-serif">{feature.title}</h3>
              <p className="text-lg text-gray-300 leading-relaxed">{feature.description}</p>
              <div className="mt-6 h-1 w-16 bg-gradient-to-r from-yellow-600 to-red-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
