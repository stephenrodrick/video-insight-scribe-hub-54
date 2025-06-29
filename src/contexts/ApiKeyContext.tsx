import React, { createContext, useContext, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ApiKeys {
  openai: string;
  youtube: string;
}

interface ApiKeyContextType {
  apiKeys: ApiKeys;
  setApiKey: (key: keyof ApiKeys, value: string) => void;
  showApiKeyDialog: boolean;
  setShowApiKeyDialog: (show: boolean) => void;
}

const ApiKeyContext = createContext<ApiKeyContextType>({
  apiKeys: { openai: '', youtube: '' },
  setApiKey: () => {},
  showApiKeyDialog: false,
  setShowApiKeyDialog: () => {},
});

export const useApiKeys = () => {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error('useApiKeys must be used within an ApiKeyProvider');
  }
  return context;
};

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    openai: '',
    youtube: '',
  });
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [tempKeys, setTempKeys] = useState<ApiKeys>(apiKeys);

  useEffect(() => {
    // Load API keys from localStorage
    const savedKeys = localStorage.getItem('api-keys');
    if (savedKeys) {
      const parsed = JSON.parse(savedKeys);
      setApiKeys(parsed);
      setTempKeys(parsed);
    } else {
      // Show API key dialog if no keys are saved
      setShowApiKeyDialog(true);
    }
  }, []);

  const setApiKey = (key: keyof ApiKeys, value: string) => {
    const newKeys = { ...apiKeys, [key]: value };
    setApiKeys(newKeys);
    localStorage.setItem('api-keys', JSON.stringify(newKeys));
  };

  const handleSaveKeys = () => {
    setApiKeys(tempKeys);
    localStorage.setItem('api-keys', JSON.stringify(tempKeys));
    setShowApiKeyDialog(false);
  };

  return (
    <ApiKeyContext.Provider value={{ apiKeys, setApiKey, showApiKeyDialog, setShowApiKeyDialog }}>
      {children}
      
      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent className="bg-slate-900 border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>API Configuration Required</DialogTitle>
          </DialogHeader>
          
          <Alert className="bg-amber-500/10 border-amber-500/20 text-amber-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You need to provide your own API keys to use this application. Get your keys from:
              <br />• OpenAI: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">platform.openai.com</a>
              <br />• YouTube: <a href="https://console.developers.google.com" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a>
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="openai-key">OpenAI API Key *</Label>
              <Input
                id="openai-key"
                type="password"
                value={tempKeys.openai}
                onChange={(e) => setTempKeys({ ...tempKeys, openai: e.target.value })}
                placeholder="sk-proj-..."
                className="bg-white/10 border-white/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube-key">YouTube API Key *</Label>
              <Input
                id="youtube-key"
                type="password"
                value={tempKeys.youtube}
                onChange={(e) => setTempKeys({ ...tempKeys, youtube: e.target.value })}
                placeholder="AIza..."
                className="bg-white/10 border-white/30 text-white"
              />
            </div>
            <Button 
              onClick={handleSaveKeys} 
              className="w-full"
              disabled={!tempKeys.openai.trim() || !tempKeys.youtube.trim()}
            >
              Save API Keys
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ApiKeyContext.Provider>
  );
};