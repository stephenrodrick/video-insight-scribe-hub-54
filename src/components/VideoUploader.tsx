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
import { Upload, Youtube, Settings, AlertCircle, Headphones, Mic, AudioWaveform as Waveform } from 'lucide-react';

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
  const [processingError, setProcessingError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { socket, isConnected } = useSocket();
  const { apiKeys, setShowApiKeyDialog } = useApiKeys();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('video/') || selectedFile.type.startsWith('audio/')) {
        setFile(selectedFile);
        setProcessingError('');
        onVideoSelect({ file: selectedFile, type: 'upload' });
        toast({
          title: "🎧 File Selected",
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
        title: "No Audio Selected",
        description: "Please select an audio/video file or enter a YouTube URL.",
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

    console.log('Starting audio processing with API key:', apiKeys.openai.substring(0, 10) + '...');
    setIsProcessing(true);
    setProcessingError('');
    
    try {
      const processor = new VideoProcessor(apiKeys.openai, apiKeys.youtube);
      
      const handleProgress = (progress: number, status: string) => {
        setProgress(progress);
        setCurrentStep(status);
        console.log(`Processing progress: ${progress}% - ${status}`);
      };

      let results;
      
      if (file) {
        toast({
          title: "🎵 Processing Started",
          description: "Your audio is being processed with AI...",
        });
        results = await processor.processVideoFile(file, handleProgress);
      } else if (youtubeUrl) {
        toast({
          title: "🎬 Processing YouTube Audio",
          description: "Fetching and analyzing YouTube content...",
        });
        results = await processor.processYouTubeVideo(youtubeUrl, handleProgress);
      }

      if (results) {
        onAnalysisComplete(results);
        toast({
          title: "🎉 Analysis Complete!",
          description: "Your audio has been successfully transcribed and analyzed.",
        });
      }

    } catch (error) {
      console.error('Processing error:', error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred while processing your audio.";
      setProcessingError(errorMessage);
      toast({
        title: "Processing Error",
        description: errorMessage,
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
      setProcessingError('');
      onVideoSelect({ url: youtubeUrl, type: 'youtube' });
      toast({
        title: "YouTube URL Added",
        description: "Ready to process YouTube audio.",
      });
    }
  };

  return (
    <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 text-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Upload className="w-6 h-6 text-purple-400" />
              <div className="absolute inset-0 blur-sm bg-purple-400/30 rounded"></div>
            </div>
            <span className="font-orbitron">Upload & Process Audio</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
            <span className="text-sm">{isConnected ? 'Connected' : 'Disconnected'}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowApiKeyDialog(true)}
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* API Key Status */}
        <div className="mb-4 p-3 bg-black/30 rounded-lg border border-purple-500/20">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${apiKeys.openai ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <span className="text-sm">
              OpenAI API Key: {apiKeys.openai ? 'Configured' : 'Not Set'}
            </span>
          </div>
          {apiKeys.youtube && (
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-sm">YouTube API Key: Configured</span>
            </div>
          )}
        </div>

        {/* Error Display */}
        {processingError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-400 font-medium">Processing Error</p>
                <p className="text-red-300 text-sm mt-1">{processingError}</p>
                {processingError.includes('API key') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiKeyDialog(true)}
                    className="mt-2 border-red-400 text-red-400 hover:bg-red-400/20"
                  >
                    Configure API Key
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/30">
            <TabsTrigger value="upload" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              <Mic className="w-4 h-4 mr-2" />
              Audio Upload
            </TabsTrigger>
            <TabsTrigger value="youtube" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              <Youtube className="w-4 h-4 mr-2" />
              YouTube URL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video-upload">Select Audio/Video File</Label>
              <div 
                className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center hover:border-purple-500/50 transition-colors cursor-pointer bg-black/20"
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
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                    <Headphones className="w-8 h-8 text-purple-400" />
                  </div>
                  <p className="text-lg">Click to select audio or video file</p>
                  <p className="text-sm text-gray-400">Supports MP4, MOV, AVI, MP3, WAV, and more (max 25MB)</p>
                </div>
              </div>
              {file && (
                <p className="text-sm text-green-400 flex items-center space-x-2">
                  <Waveform className="w-4 h-4" />
                  <span>Selected: {file.name}</span>
                </p>
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
                  className="bg-black/30 border-purple-500/30 text-white placeholder-gray-400"
                />
                <Button 
                  onClick={handleYoutubeSubmit}
                  variant="outline"
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20"
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
              <Progress value={progress} className="bg-black/30" />
            </div>
            <p className="text-sm text-gray-300 flex items-center space-x-2">
              <div className="audio-loading">
                <div className="h-4"></div>
                <div className="h-4"></div>
                <div className="h-4"></div>
                <div className="h-4"></div>
                <div className="h-4"></div>
              </div>
              <span>{currentStep}</span>
            </p>
            <div className="text-xs text-gray-400">
              Real-time updates via Socket.io • Status: {isConnected ? 'Connected' : 'Reconnecting...'}
            </div>
          </div>
        )}

        <Button 
          onClick={processVideo}
          disabled={(!file && !youtubeUrl) || isProcessing || !apiKeys.openai}
          className="w-full mt-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white border-none disabled:opacity-50 font-orbitron"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="audio-loading">
                <div className="h-3"></div>
                <div className="h-3"></div>
                <div className="h-3"></div>
              </div>
              <span>Processing with AI...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Headphones className="w-4 h-4" />
              <span>Start Real-time AI Analysis</span>
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};