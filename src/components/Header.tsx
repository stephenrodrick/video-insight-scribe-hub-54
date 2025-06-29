import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Headphones } from 'lucide-react';

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b border-gray-800/50 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            {/* Logo */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Headphones className="w-7 h-7 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-orbitron bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                audX
              </h1>
              <p className="text-sm text-gray-400">AI Audio Intelligence</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/features" 
              className={`transition-all duration-300 ${
                isActive('/features') 
                  ? 'text-purple-400 font-medium' 
                  : 'text-gray-300 hover:text-white hover:scale-105'
              }`}
            >
              Features
            </Link>
            <Link 
              to="/about" 
              className={`transition-all duration-300 ${
                isActive('/about') 
                  ? 'text-purple-400 font-medium' 
                  : 'text-gray-300 hover:text-white hover:scale-105'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`transition-all duration-300 ${
                isActive('/contact') 
                  ? 'text-purple-400 font-medium' 
                  : 'text-gray-300 hover:text-white hover:scale-105'
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