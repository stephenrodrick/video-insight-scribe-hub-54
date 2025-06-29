import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            {/* Logo */}
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center animate-pulse-glow">
              <span className="text-2xl font-bold text-white">🎬</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-poppins text-white">AI VideoTranscriber</h1>
              <p className="text-sm text-gray-400">Powered by OpenAI</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/features" 
              className={`transition-colors ${
                isActive('/features') 
                  ? 'text-blue-400 font-medium' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Features
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors ${
                isActive('/about') 
                  ? 'text-blue-400 font-medium' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`transition-colors ${
                isActive('/contact') 
                  ? 'text-blue-400 font-medium' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};