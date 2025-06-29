
import { io, Socket } from 'socket.io-client';

export class SocketService {
  private socket: Socket | null = null;
  private isConnected: boolean = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(serverUrl: string = 'wss://echo.websocket.org') {
    console.log('Initializing Socket.io connection to:', serverUrl);
    this.connect(serverUrl);
  }

  private connect(serverUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // For demo, we'll use a public WebSocket echo server
        // In production, this would be your own Socket.io server
        this.socket = io(serverUrl, {
          transports: ['websocket', 'polling'],
          timeout: 5000,
        });

        this.socket.on('connect', () => {
          this.isConnected = true;
          this.reconnectAttempts = 0;
          console.log('Socket.io connected successfully');
          this.emitEvent('user_connected', { 
            timestamp: new Date(),
            userId: Math.random().toString(36).substr(2, 9)
          });
          resolve();
        });

        this.socket.on('disconnect', (reason) => {
          this.isConnected = false;
          console.log('Socket.io disconnected:', reason);
          
          if (reason === 'io server disconnect') {
            // Server disconnected, try to reconnect
            this.handleReconnect();
          }
        });

        this.socket.on('connect_error', (error) => {
          console.error('Socket.io connection error:', error);
          this.handleReconnect();
        });

        // Set up real-time event listeners
        this.setupEventListeners();

      } catch (error) {
        console.error('Socket initialization error:', error);
        reject(error);
      }
    });
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        if (this.socket) {
          this.socket.connect();
        }
      }, 2000 * this.reconnectAttempts);
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('processing_update', (data) => {
      console.log('Processing update received:', data);
    });

    this.socket.on('analysis_complete', (data) => {
      console.log('Analysis complete:', data);
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.isConnected = false;
      console.log('Socket.io disconnected');
    }
  }

  emitEvent(event: string, data: any) {
    console.log(`Socket.io emit: ${event}`, data);
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    } else {
      console.warn('Socket not connected, queuing event:', event);
    }
  }

  onEvent(event: string, callback: (data: any) => void) {
    console.log(`Socket.io listening for: ${event}`);
    if (this.socket) {
      this.socket.on(event, callback);
    }
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
      const startTime = Date.now();
      if (this.socket && this.isConnected) {
        this.socket.emit('ping', startTime);
        this.socket.once('pong', () => {
          const latency = Date.now() - startTime;
          resolve(latency);
        });
      } else {
        resolve(-1);
      }
    });
  }
}

export default SocketService;
