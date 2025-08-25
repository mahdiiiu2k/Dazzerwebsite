import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wrench } from "lucide-react";
import { useState } from "react";
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
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const CORRECT_PASSWORD = 'Qw9!tP3@zL7';

  const handleRepairClick = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = () => {
    if (password === CORRECT_PASSWORD) {
      setShowPasswordModal(false);
      setShowWelcomeModal(true);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const closeWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPassword('');
    setPasswordError('');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        
        {/* Repair button */}
        <button
          onClick={handleRepairClick}
          className="absolute bottom-6 left-6 w-12 h-12 bg-[#1A1821] hover:bg-[#2A252D] border border-gray-600 rounded-lg flex items-center justify-center transition-colors duration-200 shadow-lg z-50"
          data-testid="button-repair"
        >
          <Wrench className="w-5 h-5 text-white/40" />
        </button>

        {/* Password Modal */}
        <Dialog open={showPasswordModal} onOpenChange={closePasswordModal}>
          <DialogContent className="max-w-[90vw] sm:max-w-md border-gray-600 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <DialogHeader>
              <DialogTitle>Enter Password</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handlePasswordSubmit();
                    }
                  }}
                  data-testid="input-password"
                />
                {passwordError && (
                  <p className="text-sm text-red-500" data-testid="text-password-error">
                    {passwordError}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={closePasswordModal} data-testid="button-cancel">
                  Cancel
                </Button>
                <Button onClick={handlePasswordSubmit} data-testid="button-submit-password">
                  Submit
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Welcome Modal */}
        <Dialog open={showWelcomeModal} onOpenChange={closeWelcomeModal}>
          <DialogContent className="max-w-[90vw] sm:max-w-md border-gray-600 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <DialogHeader>
              <DialogTitle>Welcome</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-center text-lg" data-testid="text-welcome">Welcome</p>
            </div>
            <div className="flex justify-center">
              <Button onClick={closeWelcomeModal} data-testid="button-close-welcome">
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
