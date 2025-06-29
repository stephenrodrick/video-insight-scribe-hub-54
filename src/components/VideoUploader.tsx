
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
import { ArrowUp, Youtube } from 'lucide-react';

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
  const { socket } = useSocket();
  const { apiKeys } = useApiKeys();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('video/')) {
        setFile(selectedFile);
        onVideoSelect({ file: selectedFile, type: 'upload' });
        toast({
          title: "Video Selected",
          description: `Selected: ${selectedFile.name}`,
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select a video file.",
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
        description: "Please enter your OpenAI API key to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(10);
    setCurrentStep('Preparing video for processing...');

    try {
      // Simulate processing steps with socket events
      setTimeout(() => {
        setProgress(30);
        setCurrentStep('Extracting audio from video...');
      }, 1000);

      setTimeout(() => {
        setProgress(60);
        setCurrentStep('Transcribing audio with Whisper AI...');
      }, 2000);

      setTimeout(() => {
        setProgress(80);
        setCurrentStep('Generating summary and insights...');
      }, 3000);

      setTimeout(() => {
        setProgress(100);
        setCurrentStep('Analysis complete!');
        
        // Mock results
        const mockResults = {
          transcription: "This is a sample transcription of the video content. The AI has successfully converted speech to text with high accuracy.",
          summary: "The video discusses key topics related to technology and innovation, covering important aspects of AI development and future trends.",
          keyInsights: [
            "Key insight about AI technology advancement",
            "Important point about market trends",
            "Notable observation about user behavior"
          ],
          sentiment: "Positive",
          duration: file ? "3:45" : "5:12",
          wordCount: 156
        };

        onAnalysisComplete(mockResults);
        setIsProcessing(false);
        setProgress(0);
        setCurrentStep('');
      }, 4000);

    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Processing Error",
        description: "An error occurred while processing your video. Please try again.",
        variant: "destructive",
      });
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
        <CardTitle className="flex items-center space-x-2">
          <ArrowUp className="w-5 h-5" />
          <span>Upload & Process Video</span>
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
              <Label htmlFor="video-upload">Select Video File</Label>
              <div 
                className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-white/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="space-y-2">
                  <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                    <ArrowUp className="w-8 h-8" />
                  </div>
                  <p className="text-lg">Click to select video file</p>
                  <p className="text-sm text-gray-400">Supports MP4, MOV, AVI, and more</p>
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
                <span>Processing...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="bg-white/20" />
            </div>
            <p className="text-sm text-gray-300">{currentStep}</p>
          </div>
        )}

        <Button 
          onClick={processVideo}
          disabled={(!file && !youtubeUrl) || isProcessing}
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none"
        >
          {isProcessing ? 'Processing...' : 'Start AI Analysis'}
        </Button>
      </CardContent>
    </Card>
  );
};
