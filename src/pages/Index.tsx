
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
      title: "🎬 Welcome to AI Video Transcriber Pro!",
      description: "Transform your videos into intelligent insights with cutting-edge AI technology.",
    });
  }, [toast]);

  const handleVideoProcessed = (results: any) => {
    setAnalysisResults(results);
    toast({
      title: "🎉 Analysis Complete!",
      description: "Your video has been successfully processed with AI-powered transcription and analysis.",
    });
  };

  return (
    <ApiKeyProvider>
      <SocketProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          {/* Professional animated background */}
          <div className="absolute inset-0 bg-tech-pattern opacity-5"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Professional tech grid overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          ></div>

          <div className="relative z-10">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
              <div className="max-w-7xl mx-auto space-y-8">
                {/* Professional Hero Section */}
                <div className="text-center space-y-6 mb-16">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center animate-pulse-glow">
                      <span className="text-3xl font-bold text-white">🎬</span>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
                    AI Video Transcriber Pro
                  </h1>
                  
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-inter max-w-4xl mx-auto animate-slide-up leading-relaxed">
                    Professional-grade video transcription and analysis powered by 
                    <span className="text-blue-400 font-semibold"> OpenAI Whisper</span> and 
                    <span className="text-purple-400 font-semibold"> GPT-4</span>. 
                    Transform your content into actionable insights with real-time processing.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-300">Speech-to-Text</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-300">Smart Analysis</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
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

                {/* Professional Features Section */}
                <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 animate-fade-in group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl font-bold text-white">🎤</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">OpenAI Whisper</h3>
                    <p className="text-gray-300">State-of-the-art speech recognition with 99%+ accuracy</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 animate-fade-in delay-200 group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl font-bold text-white">🧠</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">GPT-4 Analysis</h3>
                    <p className="text-gray-300">Advanced content analysis with key insights and summaries</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 animate-fade-in delay-400 group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl font-bold text-white">⚡</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Real-time Processing</h3>
                    <p className="text-gray-300">Live progress updates with Socket.io integration</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 animate-fade-in delay-600 group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl font-bold text-white">🎬</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Multi-format Support</h3>
                    <p className="text-gray-300">Video uploads and YouTube URL processing</p>
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
