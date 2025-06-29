import React from 'react';
import { Headphones, Mic, AudioWaveform as Waveform, Volume2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-800/50 bg-black/40 backdrop-blur-xl mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-lg blur-md opacity-30"></div>
              </div>
              <h3 className="text-xl font-bold font-orbitron bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                audX
              </h3>
            </div>
            <p className="text-gray-400 max-w-md">
              Transform your audio into intelligent insights with cutting-edge AI technology. 
              Real-time transcription, analysis, and audio intelligence at your fingertips.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Mic className="w-4 h-4" />
              <span>Features</span>
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>AI Transcription</li>
              <li>Audio Analysis</li>
              <li>Real-time Processing</li>
              <li>Multi-format Support</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Waveform className="w-4 h-4" />
              <span>Technology</span>
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>OpenAI Whisper</li>
              <li>GPT Integration</li>
              <li>Socket.io</li>
              <li>Audio Processing</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800/50 mt-8 pt-8 text-center text-gray-400">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Volume2 className="w-4 h-4" />
            <p>&copy; 2024 audX. Powered by cutting-edge AI audio technology.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};