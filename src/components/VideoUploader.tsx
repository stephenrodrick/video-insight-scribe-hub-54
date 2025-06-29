
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useSocket } from '@/contexts/SocketContext';
import { useApiKeys } from '@/contexts/ApiKeyContext';
import { VideoProcessor } from '@/utils/videoProcessor';
import { ArrowUp, Youtube, Settings } from 'lucide-react';

interface VideoUploaderProps {
  onVideoSelect: (video: any) => void;
  onAnalysisComplete: (results: any) => void;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({ 
  onVideoSelect, 
  onAnalysisComplete 
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { socket, isConnected } = useSocket();
  const { apiKeys, setShowApiKeyDialog } = useApiKeys();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('video/') || selectedFile.type.startsWith('audio/')) {
        setFile(selectedFile);
        onVideoSelect({ file: selectedFile, type: 'upload' });
        toast({
          title: "File Selected",
          description: `Selected: ${selectedFile.name}`,
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select a video or audio file.",
          variant: "destructive",
        });
      }
    }
  };

  const processVideo = async () => {
    if (!file && !youtubeUrl) {
      toast({
        title: "No Video Selected",
        description: "Please select a video file or enter a YouTube URL.",
        variant: "destructive",
      });
      return;
    }

    if (!apiKeys.openai) {
      toast({
        title: "API Key Required",
        description: "Please configure your OpenAI API key to continue.",
        variant: "destructive",
      });
      setShowApiKeyDialog(true);
      return;
    }

    setIsProcessing(true);
    
    try {
      const processor = new VideoProcessor(apiKeys.openai, apiKeys.youtube);
      
      const handleProgress = (progress: number, status: string) => {
        setProgress(progress);
        setCurrentStep(status);
      };

      let results;
      
      if (file) {
        toast({
          title: "Processing Started",
          description: "Your video is being processed with AI...",
        });
        results = await processor.processVideoFile(file, handleProgress);
      } else if (youtubeUrl) {
        toast({
          title: "Processing YouTube Video",
          description: "Fetching and analyzing YouTube content...",
        });
        results = await processor.processYouTubeVideo(youtubeUrl, handleProgress);
      }

      if (results) {
        onAnalysisComplete(results);
        toast({
          title: "Analysis Complete!",
          description: "Your video has been successfully transcribed and analyzed.",
        });
      }

    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Processing Error",
        description: error instanceof Error ? error.message : "An error occurred while processing your video.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setCurrentStep('');
    }
  };

  const handleYoutubeSubmit = () => {
    if (youtubeUrl) {
      onVideoSelect({ url: youtubeUrl, type: 'youtube' });
      toast({
        title: "YouTube URL Added",
        description: "Ready to process YouTube video.",
      });
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ArrowUp className="w-5 h-5" />
            <span>Upload & Process Video</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm">{isConnected ? 'Connected' : 'Disconnected'}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowApiKeyDialog(true)}
              className="border-white/30 text-white hover:bg-white/20"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10">
            <TabsTrigger value="upload" className="data-[state=active]:bg-white/20">
              File Upload
            </TabsTrigger>
            <TabsTrigger value="youtube" className="data-[state=active]:bg-white/20">
              YouTube URL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video-upload">Select Video/Audio File</Label>
              <div 
                className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-white/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  id="video-upload"
                  type="file"
                  accept="video/*,audio/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="space-y-2">
                  <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                    <ArrowUp className="w-8 h-8" />
                  </div>
                  <p className="text-lg">Click to select video or audio file</p>
                  <p className="text-sm text-gray-400">Supports MP4, MOV, AVI, MP3, WAV, and more</p>
                </div>
              </div>
              {file && (
                <p className="text-sm text-green-400">Selected: {file.name}</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="youtube" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="youtube-url">YouTube URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="youtube-url"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                />
                <Button 
                  onClick={handleYoutubeSubmit}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/20"
                >
                  <Youtube className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {isProcessing && (
          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing with AI...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="bg-white/20" />
            </div>
            <p className="text-sm text-gray-300">{currentStep}</p>
            <div className="text-xs text-gray-400">
              Real-time updates via Socket.io • Status: {isConnected ? 'Connected' : 'Reconnecting...'}
            </div>
          </div>
        )}

        <Button 
          onClick={processVideo}
          disabled={(!file && !youtubeUrl) || isProcessing}
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none"
        >
          {isProcessing ? 'Processing with AI...' : 'Start Real-time AI Analysis'}
        </Button>
      </CardContent>
    </Card>
  );
};
