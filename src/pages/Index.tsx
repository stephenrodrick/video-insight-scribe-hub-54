import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { VideoUploader } from '@/components/VideoUploader';
import { VideoAnalysis } from '@/components/VideoAnalysis';
import { RealtimeStatus } from '@/components/RealtimeStatus';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocketProvider } from '@/contexts/SocketContext';
import { ApiKeyProvider } from '@/contexts/ApiKeyContext';
import { Headphones, Mic, Waveform, Volume2 } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  useEffect(() => {
    // Show welcome message
    toast({
      title: "🎧 Welcome to audX!",
      description: "Transform your audio into intelligent insights with cutting-edge AI technology.",
    });
  }, [toast]);

  const handleVideoProcessed = (results: any) => {
    setAnalysisResults(results);
    toast({
      title: "🎉 Analysis Complete!",
      description: "Your audio has been successfully processed with AI-powered transcription and analysis.",
    });
  };

  return (
    <ApiKeyProvider>
      <SocketProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 relative overflow-hidden">
          {/* Animated Audio Background */}
          <div className="absolute inset-0">
            {/* Audio waveform pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="h-full w-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20"></div>
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 10px,
                      rgba(147, 51, 234, 0.1) 10px,
                      rgba(147, 51, 234, 0.1) 12px
                    ),
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 20px,
                      rgba(236, 72, 153, 0.1) 20px,
                      rgba(236, 72, 153, 0.1) 22px
                    )
                  `,
                }}
              ></div>
            </div>
            
            {/* Floating audio elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            
            {/* Headphone silhouettes */}
            <div className="absolute top-1/4 right-1/4 opacity-5">
              <Headphones className="w-64 h-64 text-purple-500 animate-pulse" />
            </div>
            <div className="absolute bottom-1/3 left-1/3 opacity-5">
              <Mic className="w-48 h-48 text-pink-500 animate-pulse delay-1000" />
            </div>
          </div>

          <div className="relative z-10">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
              <div className="max-w-7xl mx-auto space-y-8">
                {/* Hero Section */}
                <div className="text-center space-y-6 mb-16">
                  <div className="flex justify-center mb-6">
                    <div className="relative group">
                      <div className="w-24 h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                        <Headphones className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                      {/* Audio waves around logo */}
                      <div className="absolute -inset-8 opacity-30">
                        <div className="w-full h-full border-2 border-purple-500/30 rounded-full animate-ping"></div>
                      </div>
                      <div className="absolute -inset-12 opacity-20">
                        <div className="w-full h-full border-2 border-pink-500/30 rounded-full animate-ping delay-300"></div>
                      </div>
                    </div>
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-orbitron bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-fade-in">
                    audX
                  </h1>
                  
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-inter max-w-4xl mx-auto animate-slide-up leading-relaxed">
                    Professional AI-powered audio transcription and analysis platform. 
                    Transform your <span className="text-purple-400 font-semibold">audio content</span> into 
                    <span className="text-pink-400 font-semibold"> intelligent insights</span> with 
                    real-time processing and advanced AI technology.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/30">
                      <Mic className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-300">Speech-to-Text</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-500/30">
                      <Waveform className="w-4 h-4 text-pink-400" />
                      <span className="text-sm text-gray-300">Audio Analysis</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-500/30">
                      <Volume2 className="w-4 h-4 text-orange-400" />
                      <span className="text-sm text-gray-300">Real-time Processing</span>
                    </div>
                  </div>
                </div>

                {/* Real-time Status */}
                <RealtimeStatus />

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <VideoUploader 
                      onVideoSelect={setCurrentVideo}
                      onAnalysisComplete={handleVideoProcessed}
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <VideoAnalysis 
                      video={currentVideo}
                      results={analysisResults}
                    />
                  </div>
                </div>

                {/* Features Section */}
                <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 text-center hover:bg-purple-500/20 transition-all duration-300 animate-fade-in group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mic className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">OpenAI Whisper</h3>
                    <p className="text-gray-300">State-of-the-art speech recognition with 99%+ accuracy</p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6 text-center hover:bg-pink-500/20 transition-all duration-300 animate-fade-in delay-200 group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Waveform className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">GPT-4 Analysis</h3>
                    <p className="text-gray-300">Advanced content analysis with key insights and summaries</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500/10 to-purple-500/10 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6 text-center hover:bg-orange-500/20 transition-all duration-300 animate-fade-in delay-400 group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Volume2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Real-time Processing</h3>
                    <p className="text-gray-300">Live progress updates with Socket.io integration</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 text-center hover:bg-purple-500/20 transition-all duration-300 animate-fade-in delay-600 group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Headphones className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Multi-format Support</h3>
                    <p className="text-gray-300">Audio uploads and YouTube URL processing</p>
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