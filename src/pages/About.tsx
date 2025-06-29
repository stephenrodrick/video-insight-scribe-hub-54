import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Users, Award, Lightbulb, Heart, Globe, Rocket, Shield } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Technology Officer",
      bio: "Former OpenAI researcher with 10+ years in AI and machine learning",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      expertise: ["AI Research", "Machine Learning", "Speech Recognition"]
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Product",
      bio: "Product leader with experience at Google and Microsoft, passionate about user experience",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      expertise: ["Product Strategy", "UX Design", "Market Research"]
    },
    {
      name: "Emily Johnson",
      role: "Lead Engineer",
      bio: "Full-stack engineer specializing in scalable systems and real-time applications",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
      expertise: ["System Architecture", "Real-time Systems", "Cloud Infrastructure"]
    },
    {
      name: "David Kim",
      role: "AI Research Scientist",
      bio: "PhD in Computer Science, specializing in natural language processing and audio analysis",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      expertise: ["NLP", "Audio Processing", "Deep Learning"]
    }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Innovation First",
      description: "We push the boundaries of what's possible with AI technology",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "User-Centric",
      description: "Every feature is designed with our users' needs and feedback in mind",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy & Security",
      description: "Your data is protected with enterprise-grade security measures",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Accessibility",
      description: "Making AI technology accessible to everyone, regardless of technical expertise",
      gradient: "from-red-500 to-orange-500"
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Company Founded",
      description: "Started with a vision to democratize AI-powered video analysis"
    },
    {
      year: "2023",
      title: "First Product Launch",
      description: "Released our initial transcription service with basic AI features"
    },
    {
      year: "2024",
      title: "OpenAI Partnership",
      description: "Integrated cutting-edge Whisper and GPT-4 technologies"
    },
    {
      year: "2024",
      title: "Real-time Processing",
      description: "Launched live processing capabilities with Socket.io integration"
    },
    {
      year: "2024",
      title: "Enterprise Features",
      description: "Added advanced analytics, batch processing, and team collaboration"
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Supporting 99+ languages with worldwide availability"
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
                  <Lightbulb className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold font-poppins bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                About Our Mission
              </h1>
              
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                We're on a mission to democratize AI-powered video analysis, making advanced transcription 
                and content insights accessible to creators, businesses, and organizations worldwide.
              </p>
            </div>

            {/* Mission Statement */}
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-white/20 text-white mb-20">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                  To transform how the world interacts with video content by providing intelligent, 
                  accurate, and accessible AI-powered transcription and analysis tools that unlock 
                  the hidden value in every video, making information more searchable, actionable, 
                  and meaningful for everyone.
                </p>
              </CardContent>
            </Card>

            {/* Core Values */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center text-white mb-12">Our Core Values</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-gray-300">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Team Section */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center text-white mb-12">Meet Our Team</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden group-hover:scale-110 transition-transform">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-blue-400 mb-3">{member.role}</p>
                      <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {member.expertise.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="border-white/30 text-white text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Company Timeline */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center text-white mb-12">Our Journey</h2>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                          <CardContent className="p-6">
                            <div className="text-2xl font-bold text-blue-400 mb-2">{milestone.year}</div>
                            <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                            <p className="text-gray-300">{milestone.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative z-10"></div>
                      <div className="w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technology Stack */}
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20 text-white mb-20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Technology Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">AI & Machine Learning</h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p>OpenAI Whisper & GPT-4</p>
                      <p>TensorFlow & PyTorch</p>
                      <p>Custom Neural Networks</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Cloud Infrastructure</h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p>AWS & Google Cloud</p>
                      <p>Kubernetes & Docker</p>
                      <p>Microservices Architecture</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Frontend & UX</h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p>React & TypeScript</p>
                      <p>Real-time Socket.io</p>
                      <p>Responsive Design</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Join Our Mission</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Be part of the AI revolution in video content analysis. 
                Whether you're a creator, business, or developer, we're here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none px-8 py-3"
                >
                  Get Started Today
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/20 px-8 py-3"
                >
                  Contact Our Team
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

export default About;