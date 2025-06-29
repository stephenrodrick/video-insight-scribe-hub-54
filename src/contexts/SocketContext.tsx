
import React, { createContext, useContext, useEffect, useState } from 'react';
import SocketService from '@/services/socketService';

interface SocketContextType {
  socket: SocketService | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<SocketService | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log('Initializing Socket.io connection...');
    
    const socketService = new SocketService();
    setSocket(socketService);
    
    // Simulate connection after a short delay
    setTimeout(() => {
      setIsConnected(true);
      console.log('Socket connected');
    }, 1000);

    return () => {
      if (socketService) {
        socketService.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
