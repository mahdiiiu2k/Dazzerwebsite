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
  const [newButtonNumber, setNewButtonNumber] = useState('');
  const [newButtonImage, setNewButtonImage] = useState<File | null>(null);

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
    setNewButtonNumber('');
    setNewButtonImage(null);
  };

  const handleAddButton = () => {
    if (newButtonNumber && newButtonImage) {
      // Here you can add logic to actually add the button to your system
      console.log('Adding button:', { number: newButtonNumber, image: newButtonImage });
      
      // Clear inputs after adding
      setNewButtonNumber('');
      setNewButtonImage(null);
      
      // Optionally close modal after adding
      // setShowWelcomeModal(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewButtonImage(file);
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
              <div className="flex justify-end">
                <Button onClick={handlePasswordSubmit} data-testid="button-submit-password">
                  Enter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Welcome Modal */}
        <Dialog open={showWelcomeModal} onOpenChange={closeWelcomeModal}>
          <DialogContent className="max-w-[90vw] sm:max-w-md border-gray-600 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="button-number">Number</Label>
                <Input
                  id="button-number"
                  type="text"
                  placeholder="Enter number (e.g., 4, 5, 6...)"
                  value={newButtonNumber}
                  onChange={(e) => setNewButtonNumber(e.target.value)}
                  data-testid="input-button-number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="button-image">Picture</Label>
                <Input
                  id="button-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  data-testid="input-button-image"
                />
                {newButtonImage && (
                  <p className="text-sm text-green-500" data-testid="text-image-selected">
                    Image selected: {newButtonImage.name}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={handleAddButton} 
                  disabled={!newButtonNumber || !newButtonImage}
                  className="bg-green-700 hover:bg-green-800 text-white"
                  data-testid="button-add-new"
                >
                  + Add
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
