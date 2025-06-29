
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSocket } from '@/contexts/SocketContext';

export const RealtimeStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');
  const [activeUsers, setActiveUsers] = useState(1);
  const { socket } = useSocket();

  useEffect(() => {
    // Simulate connection status
    const timer = setTimeout(() => {
      setConnectionStatus('connected');
      setActiveUsers(Math.floor(Math.random() * 10) + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'bg-green-500';
      case 'connecting':
        return 'bg-yellow-500 animate-pulse';
      case 'disconnected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white">
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
              <span className="text-sm font-medium">{getStatusText()}</span>
            </div>
            <Badge variant="outline" className="border-white/30 text-white">
              {activeUsers} active users
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>Real-time Processing</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
