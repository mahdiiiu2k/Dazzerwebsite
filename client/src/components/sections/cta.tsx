import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";
import { Mail, Phone, MessageSquare, X } from "lucide-react";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters"),
  phone: z.string().min(10, "Invalid phone number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  message: z.string().min(10, "Message must contain at least 10 characters")
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function CTA() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      // Convert form data to match backend schema (remove phone field for now)
      const backendData = {
        name: data.name,
        email: data.email || "",
        message: `${data.message}\n\nPhone: ${data.phone}`
      };
      return await apiRequest('POST', '/api/contact', backendData);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Message sent!",
        description: "Thank you for your message! We'll contact you soon.",
      });
    },
    onError: (error) => {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto relative">
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 gradient-text">
            Need a Website?
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-yellow-600 mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get your professional website delivered in 24 hours
          </p>
          <p className="text-base text-gray-400 mt-4">
            Free quote with no commitment required
          </p>
        </div>

        <div className="luxury-border glass-card p-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mr-4">
                  <MessageSquare className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-semibold text-white">Quote Request</h3>
                  <p className="text-gray-300 text-sm">Free and no commitment</p>
                </div>
              </div>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-300">We'll get back to you within 24 hours!</p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300 font-medium">Full Name *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Your name..."
                                className="bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300 font-medium">Phone *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="tel"
                                placeholder="+213 XXX XXX XXX"
                                className="bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 font-medium">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="your.email@example.com"
                              className="bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 font-medium">Project Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={4}
                              placeholder="Type of business, features needed, budget range, timeline..."
                              className="bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors resize-none"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        type="submit" 
                        disabled={contactMutation.isPending}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold transition-all hover:scale-105"
                      >
                        <Mail className="mr-2 h-5 w-5" />
                        {contactMutation.isPending ? 'Sending...' : 'Send Quote'}
                      </Button>
                      <Button 
                        type="button"
                        onClick={() => window.open('https://wa.me/213797496469', '_blank')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold transition-all hover:scale-105"
                      >
                        <Phone className="mr-2 h-5 w-5" />
                        WhatsApp Us
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Direct Contact */}
              <div className="border-l-4 border-yellow-500 pl-6">
                <h4 className="text-xl font-serif font-semibold text-white mb-4 flex items-center">
                  <Phone className="text-yellow-500 mr-3" />
                  Direct Contact
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mr-4">
                      <Phone className="text-yellow-500 text-sm" />
                    </div>
                    <div>
                      <a href="tel:+213797496469" className="text-white font-medium hover:text-yellow-500 transition-colors cursor-pointer">
                        +213 797 496 469
                      </a>
                      <p className="text-gray-300 text-sm">Call / WhatsApp</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Our Channels */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="text-xl font-serif font-semibold text-white mb-4">
                  Our Channels
                </h4>
                <div className="space-y-4">
                  {/* DS Design */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-red-900 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-sm">DS</span>
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">DS DESIGN</h5>
                        <p className="text-gray-300 text-sm">Professional web design services</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com/ds.desiiiign?igsh=MTZnMTFpMjB0aHZpZA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-white text-sm">📷</span>
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">ds.desiiiign</h5>
                        <p className="text-gray-300 text-sm">Photos and stories from our projects</p>
                      </div>
                    </div>
                  </a>
                  
                  {/* WhatsApp */}
                  <a 
                    href="https://wa.me/213797496469"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-white text-sm">💬</span>
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">@dsdesign</h5>
                        <p className="text-gray-300 text-sm">Quick responses and project updates</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}