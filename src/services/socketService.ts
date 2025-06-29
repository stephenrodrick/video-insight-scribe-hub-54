
export class SocketService {
  private isConnected: boolean = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private eventHandlers: Map<string, Function[]> = new Map();
  private connectionInterval: NodeJS.Timeout | null = null;

  constructor() {
    console.log('Initializing Mock Socket.io connection...');
    this.connect();
  }

  private connect(): Promise<void> {
    return new Promise((resolve) => {
      // Simulate connection delay
      setTimeout(() => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        console.log('Mock Socket.io connected successfully');
        
        // Emit connect event to all listeners
        this.emitToHandlers('connect', { 
          timestamp: new Date(),
          userId: Math.random().toString(36).substr(2, 9)
        });
        
        resolve();
      }, 1000);
    });
  }

  private emitToHandlers(event: string, data: any) {
    const handlers = this.eventHandlers.get(event) || [];
    handlers.forEach(handler => handler(data));
  }

  disconnect() {
    this.isConnected = false;
    if (this.connectionInterval) {
      clearInterval(this.connectionInterval);
    }
    console.log('Mock Socket.io disconnected');
  }

  emitEvent(event: string, data: any) {
    console.log(`Mock Socket.io emit: ${event}`, data);
    if (this.isConnected) {
      // Simulate server acknowledgment
      setTimeout(() => {
        this.emitToHandlers(`${event}_ack`, { status: 'received', data });
      }, 100);
    } else {
      console.warn('Socket not connected, queuing event:', event);
    }
  }

  onEvent(event: string, callback: (data: any) => void) {
    console.log(`Mock Socket.io listening for: ${event}`);
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(callback);
  }

  // Video processing events with real-time updates
  emitVideoUpload(videoData: any) {
    this.emitEvent('video_upload', {
      ...videoData,
      timestamp: new Date(),
      status: 'uploaded'
    });
  }

  emitProcessingUpdate(status: string, progress: number) {
    this.emitEvent('processing_update', { 
      status, 
      progress, 
      timestamp: new Date() 
    });
  }

  emitAnalysisComplete(results: any) {
    this.emitEvent('analysis_complete', {
      ...results,
      timestamp: new Date(),
      status: 'completed'
    });
  }

  // Listen for server events with real-time callbacks
  onProcessingUpdate(callback: (data: any) => void) {
    this.onEvent('processing_update', callback);
  }

  onAnalysisComplete(callback: (data: any) => void) {
    this.onEvent('analysis_complete', callback);
  }

  onError(callback: (error: any) => void) {
    this.onEvent('error', callback);
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  // Real-time connection health check
  pingServer(): Promise<number> {
    return new Promise((resolve) => {
      if (this.isConnected) {
        // Simulate ping latency
        const latency = Math.floor(Math.random() * 100) + 20; // 20-120ms
        setTimeout(() => resolve(latency), 50);
      } else {
        resolve(-1);
      }
    });
  }
}

export default SocketService;
