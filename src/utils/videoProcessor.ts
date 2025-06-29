
export class VideoProcessor {
  static async extractAudioFromVideo(videoFile: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        // Create video element
        const video = document.createElement('video');
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        video.src = URL.createObjectURL(videoFile);
        video.crossOrigin = 'anonymous';
        
        video.addEventListener('loadedmetadata', () => {
          // For demo purposes, we'll create a mock audio blob
          // In a real implementation, you would use Web Audio API or a library like FFmpeg.wasm
          const mockAudioData = new ArrayBuffer(1024);
          const audioBlob = new Blob([mockAudioData], { type: 'audio/mp3' });
          resolve(audioBlob);
        });
        
        video.addEventListener('error', (error) => {
          reject(new Error('Failed to load video file'));
        });
        
        video.load();
      } catch (error) {
        reject(error);
      }
    });
  }

  static formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  static calculateFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  static validateVideoFile(file: File): { isValid: boolean; error?: string } {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm'];
    
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Unsupported file type. Please use MP4, MOV, AVI, or WebM files.'
      };
    }
    
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File size too large. Please use files smaller than 100MB.'
      };
    }
    
    return { isValid: true };
  }

  static async getVideoMetadata(file: File): Promise<{
    duration: number;
    width: number;
    height: number;
    size: number;
  }> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        resolve({
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
          size: file.size
        });
        URL.revokeObjectURL(video.src);
      };
      
      video.onerror = () => {
        reject(new Error('Failed to load video metadata'));
      };
      
      video.src = URL.createObjectURL(file);
    });
  }
}

export default VideoProcessor;
