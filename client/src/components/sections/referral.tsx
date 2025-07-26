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
import { insertReferralSchema } from "@shared/schema";

const processSteps = [
  {
    icon: "👥",
    title: "1. Refer a Friend",
    description: "Tell someone about our services"
  },
  {
    icon: "🚀",
    title: "2. They Hire Us",
    description: "We deliver their amazing website"
  },
  {
    icon: "💰",
    title: "3. You Get Paid",
    description: "Receive 40% commission instantly"
  }
];

export default function Referral() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm({
    resolver: zodResolver(insertReferralSchema),
    defaultValues: {
      referrerName: "",
      referrerEmail: "",
      referralInfo: ""
    }
  });

  const submitReferral = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('POST', '/api/referral', data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Referral Submitted!",
        description: "Thank you for your referral. We'll be in touch soon!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit referral. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: any) => {
    submitReferral.mutate(data);
  };

  return (
    <section id="referral" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            💸 <span className="gradient-text">Refer & Earn 40%</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto">
            Know someone who needs a website? If you refer them to us and we close the deal, you earn 40% of the price. No effort, just a referral!
          </p>
        </div>
        
        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {processSteps.map((step, index) => (
            <GlassCard key={index} className="text-center" hover>
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-200">{step.description}</p>
            </GlassCard>
          ))}
        </div>
        
        {/* Referral Form */}
        <GlassCard className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Submit a Referral</h3>
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h4 className="text-2xl font-bold text-white mb-2">Referral Submitted!</h4>
              <p className="text-gray-200">Thank you for your referral. We'll review it and get in touch soon!</p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="referrerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">Your Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          placeholder="Enter your name"
                          className="bg-white/10 border-white/20 text-white placeholder-gray-300 focus:ring-purple-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="referrerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">Your Email</FormLabel>
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
                  name="referralInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">Referral Information</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          rows={4}
                          placeholder="Tell us about the person you're referring..."
                          className="bg-white/10 border-white/20 text-white placeholder-gray-300 focus:ring-purple-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={submitReferral.isPending}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-xl hover-glow transition-all"
                >
                  {submitReferral.isPending ? "Submitting..." : "Submit Referral"}
                </Button>
              </form>
            </Form>
          )}
        </GlassCard>
      </div>
    </section>
  );
}
