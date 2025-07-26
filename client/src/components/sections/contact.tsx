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
    icon: "📱",
    title: "WhatsApp",
    description: "Quick response, usually within minutes"
  },
  {
    icon: "📷",
    title: "Instagram",
    description: "See our latest work and message us (@dsdesign_official)"
  },
  {
    icon: "✉️",
    title: "Email",
    description: "For detailed project discussions (hello@dsdesign.com)"
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Let's Work Together</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Ready to get your website built in 24 hours? Reach out to us through your preferred method
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <GlassCard>
            <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                <p className="text-gray-200">We'll get back to you within 24 hours!</p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium">Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            placeholder="Your name"
                            className="bg-white/10 border-white/20 text-white placeholder-gray-300 focus:ring-purple-500"
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
                        <FormLabel className="text-white font-medium">Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            type="email"
                            placeholder="your@email.com"
                            className="bg-white/10 border-white/20 text-white placeholder-gray-300 focus:ring-purple-500"
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
                        <FormLabel className="text-white font-medium">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            rows={5}
                            placeholder="Tell us about your project..."
                            className="bg-white/10 border-white/20 text-white placeholder-gray-300 focus:ring-purple-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={submitContact.isPending}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-xl hover-glow transition-all"
                  >
                    {submitContact.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            )}
          </GlassCard>
          
          {/* Contact Methods */}
          <div className="space-y-8">
            {/* Direct Contact Options */}
            {contactMethods.map((method, index) => (
              <GlassCard key={index} hover>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{method.icon}</div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{method.title}</h4>
                    <p className="text-gray-200 text-sm">{method.description}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="text-center">
                <div className="text-2xl font-bold gradient-text">24h</div>
                <div className="text-sm text-gray-300">Average Response</div>
              </GlassCard>
              <GlassCard className="text-center">
                <div className="text-2xl font-bold gradient-text">100%</div>
                <div className="text-sm text-gray-300">Satisfaction Rate</div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
