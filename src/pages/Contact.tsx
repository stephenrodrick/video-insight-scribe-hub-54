import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle,
  Headphones,
  Users,
  Mic,
  AudioWaveform as Waveform,
  Volume2,
  AlertCircle
} from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "🎧 Message Sent Successfully!",
        description: "Thank you for contacting audX. We'll get back to you within 24 hours.",
      });
      
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
      
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "support@audx.ai",
      description: "Get in touch for general inquiries",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Speak with our audio experts",
      gradient: "from-pink-500 to-orange-500"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: "123 Audio Innovation Drive, San Francisco, CA 94105",
      description: "Our headquarters location",
      gradient: "from-orange-500 to-purple-500"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: "Mon-Fri: 9AM-6PM PST",
      description: "We're here to help during business hours",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const supportOptions = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Live Chat",
      description: "Get instant help with our 24/7 audio support chat",
      action: "Start Chat",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Technical Support",
      description: "Expert help for audio processing and integration issues",
      action: "Get Support",
      gradient: "from-pink-500 to-orange-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Sales Team",
      description: "Discuss pricing, features, and enterprise audio solutions",
      action: "Contact Sales",
      gradient: "from-orange-500 to-purple-500"
    }
  ];

  const faqs = [
    {
      question: "How accurate is the audio transcription?",
      answer: "Our AI-powered transcription achieves 99%+ accuracy using OpenAI's Whisper technology, with support for 99+ languages and audio enhancement."
    },
    {
      question: "What audio formats do you support?",
      answer: "We support all major audio formats (MP3, WAV, FLAC, AAC) and video formats (MP4, MOV, AVI, MKV), plus YouTube URLs for audio extraction."
    },
    {
      question: "Is my audio data secure?",
      answer: "Yes, we use enterprise-grade encryption and follow strict privacy protocols. Your audio data is never stored permanently on our servers."
    },
    {
      question: "Do you offer API access?",
      answer: "Yes, we provide comprehensive REST APIs with webhooks, SDKs, and detailed documentation for seamless audio processing integration."
    },
    {
      question: "What's the audio file size limit?",
      answer: "Individual files can be up to 25MB. For larger files or batch audio processing, contact our enterprise team for custom solutions."
    },
    {
      question: "How fast is the audio processing?",
      answer: "Most audio files are processed in real-time or faster, with live progress updates. Processing speed depends on audio length and complexity."
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
                    <MessageSquare className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold font-orbitron bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-6">
                Get In Touch
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Have questions about our AI audio transcription service? Need technical support? 
                Want to discuss enterprise audio solutions? We're here to help!
              </p>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-black/40 backdrop-blur-xl border-purple-500/20 text-white hover:bg-black/60 transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${info.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      {info.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 font-orbitron">{info.title}</h3>
                    <p className="text-white font-medium mb-2">{info.details}</p>
                    <p className="text-gray-300 text-sm">{info.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              {/* Contact Form */}
              <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-orbitron">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-black/30 border-purple-500/30 text-white placeholder-gray-400"
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-black/30 border-purple-500/30 text-white placeholder-gray-400"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="bg-black/30 border-purple-500/30 text-white placeholder-gray-400"
                        placeholder="Your company name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 py-2 bg-black/30 border border-purple-500/30 rounded-md text-white"
                      >
                        <option value="general" className="bg-black">General Inquiry</option>
                        <option value="technical" className="bg-black">Technical Support</option>
                        <option value="sales" className="bg-black">Sales & Pricing</option>
                        <option value="partnership" className="bg-black">Partnership</option>
                        <option value="enterprise" className="bg-black">Enterprise Solutions</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="bg-black/30 border-purple-500/30 text-white placeholder-gray-400"
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="bg-black/30 border-purple-500/30 text-white placeholder-gray-400"
                        placeholder="Please provide details about your audio processing needs..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white border-none font-orbitron"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Support Options & FAQ */}
              <div className="space-y-8">
                {/* Quick Support Options */}
                <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-purple-500/20 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold font-orbitron">Quick Support Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {supportOptions.map((option, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors border border-purple-500/20">
                          <div className={`w-12 h-12 bg-gradient-to-r ${option.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            {option.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold font-orbitron">{option.title}</h3>
                            <p className="text-gray-300 text-sm">{option.description}</p>
                          </div>
                          <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20">
                            {option.action}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Section */}
                <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold font-orbitron">Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-purple-500/20 pb-4 last:border-b-0">
                          <h3 className="font-semibold mb-2 text-purple-400 font-orbitron">{faq.question}</h3>
                          <p className="text-gray-300 text-sm">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Enterprise Contact */}
            <Card className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 backdrop-blur-xl border-pink-500/20 text-white">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Volume2 className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4 font-orbitron">Enterprise Audio Solutions</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Need custom audio integrations, higher volume processing, or dedicated support? 
                  Our enterprise team is ready to help scale your audio processing needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white border-none px-8 py-3 font-orbitron"
                  >
                    <Headphones className="w-4 h-4 mr-2" />
                    Contact Enterprise Sales
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20 px-8 py-3 font-orbitron"
                  >
                    Schedule Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;