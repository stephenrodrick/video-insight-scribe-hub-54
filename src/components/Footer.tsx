
import React from 'react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">🎬</span>
              </div>
              <h3 className="text-xl font-bold text-white">AI Video Transcriber</h3>
            </div>
            <p className="text-gray-400 max-w-md">
              Transform your videos into intelligent insights with cutting-edge AI technology. 
              Real-time transcription, analysis, and summarization at your fingertips.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>AI Transcription</li>
              <li>Video Analysis</li>
              <li>Real-time Updates</li>
              <li>YouTube Integration</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Technology</h4>
            <ul className="space-y-2 text-gray-400">
              <li>OpenAI Whisper</li>
              <li>GPT Integration</li>
              <li>Socket.io</li>
              <li>YouTube API</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 AI Video Transcriber. Powered by cutting-edge AI technology.</p>
        </div>
      </div>
    </footer>
  );
};
