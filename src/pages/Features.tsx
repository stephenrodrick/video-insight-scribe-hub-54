import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Headphones, Mic, AudioWaveform as Waveform, Volume2, Shield, Clock, Users, BarChart3, Brain, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "OpenAI Whisper Integration",
      description: "State-of-the-art speech recognition with 99%+ accuracy across 99 languages",
      benefits: ["Multi-language support", "Noise reduction", "Speaker identification", "Timestamp precision"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "GPT-4 Smart Analysis",
      description: "Advanced AI-powered content analysis with deep insights and actionable recommendations",
      benefits: ["Sentiment analysis", "Key topic extraction", "Action item identification", "Content summarization"],
      gradient: "from-pink-500 to-orange-500"
    },
    {
      icon: <Waveform className="w-8 h-8" />,
      title: "Real-time Processing",
      description: "Live progress updates and instant results with Socket.io integration",
      benefits: ["Live progress tracking", "Instant notifications", "Real-time collaboration", "Status monitoring"],
      gradient: "from-orange-500 to-purple-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and privacy protection",
      benefits: ["Data encryption", "Privacy compliance", "Secure API handling", "No data retention"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Batch Processing",
      description: "Process multiple audio files simultaneously with queue management",
      benefits: ["Bulk upload support", "Queue management", "Priority processing", "Scheduled analysis"],
      gradient: "from-pink-500 to-orange-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Comprehensive analytics dashboard with detailed insights and reporting",
      benefits: ["Usage analytics", "Performance metrics", "Export capabilities", "Custom reports"],
      gradient: "from-orange-500 to-purple-500"
    }
  ];

  const useCases = [
    {
      title: "Podcast Production",
      description: "Generate show notes, timestamps, and searchable transcripts for podcasts",
      icon: "🎙️"
    },
    {
      title: "Meeting Analysis",
      description: "Extract action items, decisions, and key points from recorded meetings",
      icon: "💼"
    },
    {
      title: "Educational Content",
      description: "Create transcripts and study materials from lectures and educational audio",
      icon: "🎓"
    },
    {
      title: "Content Creation",
      description: "Transform audio content into blog posts, articles, and social media content",
      icon: "🎬"
    },
    {
      title: "Legal Documentation",
      description: "Transcribe depositions, hearings, and legal proceedings with high accuracy",
      icon: "⚖️"
    },
    {
      title: "Market Research",
      description: "Analyze customer interviews, focus groups, and market research audio",
      icon: "📊"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 relative overflow-hidden">
      {/* Audio Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5">
          <div 
            className="h-full w-full"
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
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Audio equipment silhouettes */}
        <div className="absolute top-1/4 right-1/4 opacity-5">
          <Headphones className="w-64 h-64 text-purple-500 animate-pulse" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 opacity-5">
          <Mic className="w-48 h-48 text-pink-500 animate-pulse delay-1000" />
        </div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold font-orbitron bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-6">
                Powerful Features
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover the cutting-edge capabilities that make audX the most advanced 
                solution for audio analysis and transcription in the market.
              </p>
            </div>

            {/* Core Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {features.map((feature, index) => (
                <Card key={index} className="bg-black/40 backdrop-blur-xl border-purple-500/20 text-white hover:bg-black/60 transition-all duration-300 group">
                  <CardHeader>
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold font-orbitron">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Technical Specifications */}
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-purple-500/20 text-white mb-20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center font-orbitron">Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-black/20 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-lg mb-2 font-orbitron">Supported Formats</h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p>MP4, MOV, AVI, MKV</p>
                      <p>MP3, WAV, FLAC, AAC</p>
                      <p>YouTube URLs</p>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-black/20 rounded-lg border border-pink-500/20">
                    <h3 className="font-semibold text-lg mb-2 font-orbitron">File Size Limits</h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p>Up to 25MB per file</p>
                      <p>Unlimited duration</p>
                      <p>Batch processing</p>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-black/20 rounded-lg border border-orange-500/20">
                    <h3 className="font-semibold text-lg mb-2 font-orbitron">Languages</h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p>99+ languages</p>
                      <p>Auto-detection</p>
                      <p>Multi-language support</p>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-black/20 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-lg mb-2 font-orbitron">Processing Speed</h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p>Real-time processing</p>
                      <p>Sub-second latency</p>
                      <p>Parallel processing</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center text-white mb-12 font-orbitron">Use Cases & Applications</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {useCases.map((useCase, index) => (
                  <Card key={index} className="bg-black/40 backdrop-blur-xl border-purple-500/20 text-white hover:bg-black/60 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4">{useCase.icon}</div>
                      <h3 className="text-xl font-semibold mb-2 font-orbitron">{useCase.title}</h3>
                      <p className="text-gray-300">{useCase.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* API Integration */}
            <Card className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 backdrop-blur-xl border-pink-500/20 text-white mb-20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center font-orbitron">API Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Waveform className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 font-orbitron">RESTful API</h3>
                    <p className="text-gray-300">Easy integration with comprehensive documentation and SDKs</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 font-orbitron">Webhooks</h3>
                    <p className="text-gray-300">Real-time notifications for processing status and results</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 font-orbitron">Team Collaboration</h3>
                    <p className="text-gray-300">Multi-user access with role-based permissions and sharing</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6 font-orbitron">Ready to Get Started?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Experience the power of AI-driven audio transcription and analysis. 
                Start transforming your content today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white border-none px-8 py-3 font-orbitron"
                >
                  <Headphones className="w-4 h-4 mr-2" />
                  Start Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20 px-8 py-3 font-orbitron"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Features;