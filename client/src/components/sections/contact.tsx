import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GlassCard } from "@/components/ui/glass-card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";

const contactMethods = [
  {
    icon: "📩",
    title: "WhatsApp",
    description: "Quick response",
    link: "https://wa.me/1234567890"
  },
  {
    icon: "📷",
    title: "Instagram",
    description: "View our work",
    link: "https://instagram.com/dsdesign"
  },
  {
    icon: "✉️",
    title: "Email",
    description: "For project discussions",
    link: "mailto:hello@dsdesign.com"
  }
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const submitContact = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you within 24 hours!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: any) => {
    submitContact.mutate(data);
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text font-serif tracking-wide">Let's Build Something Awesome</h2>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Ready to elevate your digital presence? Let's discuss your vision and <span className="text-yellow-400 font-medium">craft something extraordinary</span> together in <span className="gradient-text">under 24 hours</span>.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Luxury Contact Form */}
          <div className="luxury-border glass-card p-10">
            <h3 className="text-4xl font-bold gradient-text mb-8 font-serif">Send us a message</h3>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="text-8xl mb-6 animate-pulse">✨</div>
                <h4 className="text-4xl font-bold gradient-text mb-4 font-serif">Message Sent!</h4>
                <p className="text-xl text-gray-300">We'll craft your response within <span className="text-yellow-400 font-medium">24 hours</span>!</p>
                <div className="mt-6 flex justify-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-red-900 rounded-full animate-pulse delay-100"></div>
                  <div className="w-3 h-3 bg-yellow-600 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-yellow-400 font-semibold text-lg">Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            placeholder="Your name"
                            className="bg-black/30 border-yellow-600/30 text-white placeholder-gray-400 focus:ring-yellow-600 focus:border-yellow-600 text-lg p-4 rounded-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-yellow-400 font-semibold text-lg">Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            type="email"
                            placeholder="your@email.com"
                            className="bg-black/30 border-yellow-600/30 text-white placeholder-gray-400 focus:ring-yellow-600 focus:border-yellow-600 text-lg p-4 rounded-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-yellow-400 font-semibold text-lg">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            rows={6}
                            placeholder="Tell us about your project..."
                            className="bg-black/30 border-yellow-600/30 text-white placeholder-gray-400 focus:ring-yellow-600 focus:border-yellow-600 text-lg p-4 rounded-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={submitContact.isPending}
                    className="w-full crimson-gradient hover:scale-105 px-8 py-5 rounded-full text-white font-bold text-xl shadow-2xl crimson-glow transition-all duration-300 transform"
                  >
                    {submitContact.isPending ? "Crafting..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            )}
          </div>
          
          {/* Luxury Contact Methods */}
          <div className="space-y-10">
            {/* Direct Contact Options */}
            {contactMethods.map((method, index) => (
              <div key={index} className="luxury-border glass-card p-8 group hover:scale-105 transition-all duration-500">
                <div className="flex items-center space-x-6">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{method.icon}</div>
                  <div>
                    <h4 className="text-2xl font-bold gradient-text mb-2 font-serif">{method.title}</h4>
                    <p className="text-lg text-gray-300">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Luxury Trust Indicators */}
            <div className="grid grid-cols-2 gap-6">
              <div className="luxury-border glass-card p-6 text-center group hover:scale-105 transition-all duration-500">
                <div className="text-4xl font-bold gradient-text mb-3 group-hover:scale-110 transition-transform duration-300">24h</div>
                <div className="text-lg text-yellow-400 font-medium">Response Time</div>
              </div>
              <div className="luxury-border glass-card p-6 text-center group hover:scale-105 transition-all duration-500">
                <div className="text-4xl font-bold gradient-text mb-3 group-hover:scale-110 transition-transform duration-300">100+</div>
                <div className="text-lg text-yellow-400 font-medium">Projects Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
