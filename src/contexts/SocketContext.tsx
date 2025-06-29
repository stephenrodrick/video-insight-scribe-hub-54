
import React, { createContext, useContext, useEffect, useState } from 'react';

interface SocketContextType {
  socket: any;
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
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate socket connection
    console.log('Initializing Socket.io connection...');
    
    // Mock socket object for demonstration
    const mockSocket = {
      on: (event: string, callback: Function) => {
        console.log(`Socket listening for event: ${event}`);
      },
      emit: (event: string, data: any) => {
        console.log(`Socket emitting event: ${event}`, data);
      },
      disconnect: () => {
        console.log('Socket disconnected');
        setIsConnected(false);
      }
    };

    setSocket(mockSocket);
    
    // Simulate connection
    setTimeout(() => {
      setIsConnected(true);
      console.log('Socket connected');
    }, 1000);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
