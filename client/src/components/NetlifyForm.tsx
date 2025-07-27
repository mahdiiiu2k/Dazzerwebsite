import { useState } from "react";
import { Mail } from "lucide-react";

interface NetlifyFormProps {
  onSuccess: () => void;
}

export default function NetlifyForm({ onSuccess }: NetlifyFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    
    // Let the browser handle the form submission naturally for Netlify
    // This is often more reliable than fetch() for Netlify Forms
    const form = e.currentTarget;
    
    // Add a small delay to show loading state, then call success
    setTimeout(() => {
      onSuccess();
      setIsLoading(false);
      form.reset();
    }, 1000);
  };

  return (
    <form 
      name="contact-simple"
      method="POST" 
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      style={{ padding: '16px 0', position: 'relative', zIndex: 10003 }}
    >
      <input type="hidden" name="form-name" value="contact-simple" />
      <input type="hidden" name="bot-field" style={{ display: 'none' }} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-200 tracking-wide">
            Your Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all duration-300"
            required
          />
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-200 tracking-wide">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Your number"
            className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all duration-300"
            required
          />
        </div>
      </div>
      
      <div className="space-y-3 mb-4 sm:mb-6">
        <label className="block text-sm font-medium text-gray-200 tracking-wide">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="your.email@example.com"
          className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all duration-300"
        />
      </div>
      
      <div className="space-y-3 mb-6 sm:mb-8">
        <label className="block text-sm font-medium text-gray-200 tracking-wide">
          Your Message <span className="text-red-400">*</span>
        </label>
        <textarea
          name="message"
          rows={5}
          placeholder="Ask questions, or tell us about your project and what you want to build..."
          className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all duration-300 resize-none"
          required
        />
      </div>
      
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            width: 'auto',
            padding: '12px 32px',
            backgroundColor: '#4a0d21',
            color: 'white',
            fontWeight: '600',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '16px',
            minHeight: '44px',
            opacity: isLoading ? 0.5 : 1,
            transform: 'scale(1)',
            boxShadow: '0 4px 12px rgba(74, 13, 33, 0.3)'
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement;
            if (!isLoading) {
              target.style.transform = 'scale(1.05)';
              target.style.backgroundColor = '#5a1729';
              target.style.boxShadow = '0 6px 20px rgba(74, 13, 33, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.transform = 'scale(1)';
            target.style.backgroundColor = '#4a0d21';
            target.style.boxShadow = '0 4px 12px rgba(74, 13, 33, 0.3)';
          }}
        >
          <Mail size={18} />
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
}