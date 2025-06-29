
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { VideoUploader } from '@/components/VideoUploader';
import { VideoAnalysis } from '@/components/VideoAnalysis';
import { RealtimeStatus } from '@/components/RealtimeStatus';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocketProvider } from '@/contexts/SocketContext';
import { ApiKeyProvider } from '@/contexts/ApiKeyContext';

const Index = () => {
  const { toast } = useToast();
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  useEffect(() => {
    // Show welcome message
    toast({
      title: "Welcome to AI Video Transcriber!",
      description: "Upload a video or enter a YouTube URL to get started with AI-powered transcription and analysis.",
    });
  }, [toast]);

  const handleVideoProcessed = (results: any) => {
    setAnalysisResults(results);
    toast({
      title: "Video Analysis Complete!",
      description: "Your video has been successfully transcribed and analyzed.",
    });
  };

  return (
    <ApiKeyProvider>
      <SocketProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-tech-pattern opacity-10"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Background image overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1920&h=1080&fit=crop')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>

          <div className="relative z-10">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
              <div className="max-w-6xl mx-auto space-y-8">
                {/* Hero Section */}
                <div className="text-center space-y-6 mb-12">
                  <h1 className="text-5xl md:text-7xl font-bold font-poppins bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
                    AI Video Transcriber
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 font-inter max-w-3xl mx-auto animate-slide-up">
                    Transform your videos into intelligent insights with real-time AI transcription, 
                    summarization, and analysis powered by OpenAI Whisper and GPT.
                  </p>
                </div>

                {/* Real-time Status */}
                <RealtimeStatus />

                {/* Video Upload Section */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <VideoUploader 
                      onVideoSelect={setCurrentVideo}
                      onAnalysisComplete={handleVideoProcessed}
                    />
                  </div>
                  
                  <div className="space-y-6">
                    {(currentVideo || analysisResults) && (
                      <VideoAnalysis 
                        video={currentVideo}
                        results={analysisResults}
                      />
                    )}
                  </div>
                </div>

                {/* Features Section */}
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 animate-fade-in">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">🎵</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">AI Transcription</h3>
                    <p className="text-gray-300">Advanced speech-to-text powered by OpenAI Whisper</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 animate-fade-in delay-200">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">🧠</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Smart Analysis</h3>
                    <p className="text-gray-300">Intelligent summarization and key insights extraction</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 animate-fade-in delay-400">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">⚡</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Real-time Updates</h3>
                    <p className="text-gray-300">Live processing status with Socket.io integration</p>
                  </div>
                </div>
              </div>
            </main>

            <Footer />
          </div>
        </div>
      </SocketProvider>
    </ApiKeyProvider>
  );
};

export default Index;
