import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Wrench } from "lucide-react";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const handleRepairClick = () => {
    // Placeholder function - user will specify functionality
    console.log('Repair button clicked');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        
        {/* Fixed repair button in bottom left */}
        <button
          onClick={handleRepairClick}
          className="fixed bottom-6 left-6 w-12 h-12 bg-[#1A1821] hover:bg-[#2A252D] border border-gray-600 rounded-lg flex items-center justify-center transition-colors duration-200 shadow-lg z-50"
          data-testid="button-repair"
        >
          <Wrench className="w-5 h-5 text-white/40" />
        </button>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
