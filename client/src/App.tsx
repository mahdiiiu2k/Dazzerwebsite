import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wrench, Trash2 } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import TestPage from "@/components/test-page";

function Router({ dynamicButtons }: { dynamicButtons: Array<{number: string, imageUrl: string, link: string}> }) {
  return (
    <Switch>
      <Route path="/" component={() => <Home dynamicButtons={dynamicButtons} />} />
      <Route path="/test" component={TestPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newButtonNumber, setNewButtonNumber] = useState('');
  const [newButtonImage, setNewButtonImage] = useState<File | null>(null);
  const [newButtonLink, setNewButtonLink] = useState('');
  const [deleteNumber, setDeleteNumber] = useState('');
  const queryClient = useQueryClient();

  // Fetch dynamic buttons from database
  const { data: buttonsData } = useQuery({
    queryKey: ['/api/buttons'],
    queryFn: async () => {
      const response = await fetch('/api/buttons');
      if (!response.ok) throw new Error('Failed to fetch buttons');
      const data = await response.json();
      return data.buttons || [];
    }
  });

  const dynamicButtons = buttonsData || [];

  // Mutation for creating buttons
  const createButtonMutation = useMutation({
    mutationFn: async (buttonData: { number: string; imageData: string; link: string }) => {
      const response = await fetch('/api/buttons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buttonData)
      });
      if (!response.ok) throw new Error('Failed to create button');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/buttons'] });
    }
  });

  // Mutation for deleting buttons
  const deleteButtonMutation = useMutation({
    mutationFn: async (number: string) => {
      const response = await fetch(`/api/buttons/${number}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete button');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/buttons'] });
    }
  });

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
    setNewButtonLink('');
    setDeleteNumber('');
  };

  const handleAddButton = async () => {
    if (newButtonNumber && newButtonImage && newButtonLink) {
      try {
        // Convert image to base64
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          
          const buttonData = {
            number: newButtonNumber,
            imageData: base64String,
            link: newButtonLink
          };
          
          console.log('Adding button:', { number: newButtonNumber, image: newButtonImage.name, link: newButtonLink });
          
          // Save to database
          createButtonMutation.mutate(buttonData);
          
          // Clear inputs after adding
          setNewButtonNumber('');
          setNewButtonImage(null);
          setNewButtonLink('');
        };
        reader.readAsDataURL(newButtonImage);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewButtonImage(file);
  };

  const handleDeleteButton = () => {
    if (deleteNumber) {
      deleteButtonMutation.mutate(deleteNumber);
      console.log('Deleting button with number:', deleteNumber);
      setDeleteNumber('');
    }
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPassword('');
    setPasswordError('');
  };

  return (
    <>
      <Toaster />
      <Router dynamicButtons={dynamicButtons} />
      
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
              <Label htmlFor="button-number">Add Number</Label>
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
              <Label htmlFor="button-link">Add Link</Label>
              <Input
                id="button-link"
                type="text"
                placeholder="Enter URL (e.g., https://example.com)"
                value={newButtonLink}
                onChange={(e) => setNewButtonLink(e.target.value)}
                data-testid="input-button-link"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="button-image">Add Picture</Label>
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
                disabled={!newButtonNumber || !newButtonImage || !newButtonLink}
                className="bg-green-800 hover:bg-green-900 text-white"
                data-testid="button-add-new"
              >
                + Add
              </Button>
            </div>
            
            {/* Horizontal separator */}
            <div className="border-t border-white/20 my-6"></div>
            
            {/* Delete Item Section */}
            <div className="space-y-2">
              <Label htmlFor="delete-number">Delete Item</Label>
              <div className="flex gap-2">
                <Input
                  id="delete-number"
                  type="text"
                  placeholder="Enter number to delete (e.g., 4, 5, 6...)"
                  value={deleteNumber}
                  onChange={(e) => setDeleteNumber(e.target.value)}
                  data-testid="input-delete-number"
                  className="flex-1"
                />
                <Button 
                  onClick={handleDeleteButton} 
                  disabled={!deleteNumber}
                  className="bg-red-700 hover:bg-red-800 text-white px-3"
                  data-testid="button-delete"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;