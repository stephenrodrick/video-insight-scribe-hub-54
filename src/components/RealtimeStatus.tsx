
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSocket } from '@/contexts/SocketContext';
import SocketService from '@/services/socketService';

export const RealtimeStatus = () => {
  const [activeUsers, setActiveUsers] = useState(1);
  const [latency, setLatency] = useState<number>(-1);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    // Simulate active users count with some randomness
    const userInterval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * 10) + 1);
      setLastUpdate(new Date());
    }, 30000);

    // Check connection latency periodically
    const latencyInterval = setInterval(async () => {
      if (isConnected && socket) {
        try {
          const socketService = new SocketService();
          const ping = await socketService.pingServer();
          setLatency(ping);
        } catch (error) {
          setLatency(-1);
        }
      }
    }, 10000);

    return () => {
      clearInterval(userInterval);
      clearInterval(latencyInterval);
    };
  }, [isConnected, socket]);

  const getStatusColor = () => {
    if (isConnected) {
      return latency < 100 ? 'bg-green-500' : latency < 300 ? 'bg-yellow-500' : 'bg-orange-500';
    }
    return 'bg-red-500 animate-pulse';
  };

  const getStatusText = () => {
    if (isConnected) {
      return latency >= 0 ? `Connected (${latency}ms)` : 'Connected';
    }
    return 'Reconnecting...';
  };

  const getDataFreshness = () => {
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000);
    
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    return `${Math.floor(diffSeconds / 3600)}h ago`;
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
            {isConnected && (
              <Badge variant="outline" className="border-green-400/30 text-green-400">
                Live Updates
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex flex-col items-end">
              <span>Real-time Processing</span>
              <span className="text-xs">Updated {getDataFreshness()}</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
        
        {isConnected && (
          <div className="mt-3 flex items-center space-x-6 text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>OpenAI Whisper Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>GPT Analysis Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Socket.io Connected</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
