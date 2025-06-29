import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Brain, Globe, Shield, Clock, Users, BarChart3 } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "OpenAI Whisper Integration",
      description: "State-of-the-art speech recognition with 99%+ accuracy across 99 languages",
      benefits: ["Multi-language support", "Noise reduction", "Speaker identification", "Timestamp precision"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "GPT-4 Smart Analysis",
      description: "Advanced AI-powered content analysis with deep insights and actionable recommendations",
      benefits: ["Sentiment analysis", "Key topic extraction", "Action item identification", "Content summarization"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Real-time Processing",
      description: "Live progress updates and instant results with Socket.io integration",
      benefits: ["Live progress tracking", "Instant notifications", "Real-time collaboration", "Status monitoring"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and privacy protection",
      benefits: ["Data encryption", "Privacy compliance", "Secure API handling", "No data retention"],
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Batch Processing",
      description: "Process multiple videos simultaneously with queue management",
      benefits: ["Bulk upload support", "Queue management", "Priority processing", "Scheduled analysis"],
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Comprehensive analytics dashboard with detailed insights and reporting",
      benefits: ["Usage analytics", "Performance metrics", "Export capabilities", "Custom reports"],
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const useCases = [
    {
      title: "Content Creation",
      description: "Transform video content into blog posts, articles, and social media content",
      icon: "🎬"
    },
    {
      title: "Meeting Analysis",
      description: "Extract action items, decisions, and key points from recorded meetings",
      icon: "💼"
    },
    {
      title: "Educational Content",
      description: "Create transcripts and study materials from lectures and educational videos",
      icon: "🎓"
    },
    {
      title: "Podcast Production",
      description: "Generate show notes, timestamps, and searchable transcripts for podcasts",
      icon: "🎙️"
    },
    {
      title: "Legal Documentation",
      description: "Transcribe depositions, hearings, and legal proceedings with high accuracy",
      icon: "⚖️"
    },
    {
      title: "Market Research",
      description: "Analyze customer interviews, focus groups, and market research videos",
      icon: "📊"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-tech-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center animate-pulse-glow">
                  <Zap className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold font-poppins bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                Powerful Features
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover the cutting-edge capabilities that make our AI Video Transcriber the most advanced 
                solution for video analysis and transcription in the market.
              </p>
            </div>

            {/* Core Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300 group">
                  <CardHeader>
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
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
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-white/20 text-white mb-20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Supported Formats</h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p>MP4, MOV, AVI, MKV</p>
                      <p>MP3, WAV, FLAC, AAC</p>
                      <p>YouTube URLs</p>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">File Size Limits</h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p>Up to 25MB per file</p>
                      <p>Unlimited duration</p>
                      <p>Batch processing</p>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Languages</h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p>99+ languages</p>
                      <p>Auto-detection</p>
                      <p>Multi-language support</p>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Processing Speed</h3>
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
              <h2 className="text-3xl font-bold text-center text-white mb-12">Use Cases & Applications</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {useCases.map((useCase, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4">{useCase.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                      <p className="text-gray-300">{useCase.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* API Integration */}
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20 text-white mb-20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">API Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">RESTful API</h3>
                    <p className="text-gray-300">Easy integration with comprehensive documentation and SDKs</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Webhooks</h3>
                    <p className="text-gray-300">Real-time notifications for processing status and results</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Team Collaboration</h3>
                    <p className="text-gray-300">Multi-user access with role-based permissions and sharing</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Experience the power of AI-driven video transcription and analysis. 
                Start transforming your content today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none px-8 py-3"
                >
                  Start Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/20 px-8 py-3"
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