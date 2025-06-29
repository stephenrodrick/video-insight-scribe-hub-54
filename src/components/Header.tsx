
import React from 'react';

export const Header = () => {
  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center animate-pulse-glow">
              <span className="text-2xl font-bold text-white">🎬</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-poppins text-white">AI VideoTranscriber</h1>
              <p className="text-sm text-gray-400">Powered by OpenAI</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};
