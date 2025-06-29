import { ApiService } from '../services/apiService';
import SocketService from '../services/socketService';

export class VideoProcessor {
  private apiService: ApiService;
  private socketService: SocketService;

  constructor(openaiKey: string, youtubeKey: string) {
    this.apiService = new ApiService(openaiKey, youtubeKey);
    this.socketService = new SocketService();
  }

  async processVideoFile(file: File, onProgress: (progress: number, status: string) => void) {
    try {
      onProgress(5, 'Validating file...');
      
      // Validate file type and size
      if (!file.type.includes('video') && !file.type.includes('audio')) {
        throw new Error('Please select a valid video or audio file');
      }
      
      if (file.size > 25 * 1024 * 1024) { // 25MB limit for OpenAI
        throw new Error('File size must be less than 25MB for transcription');
      }

      console.log('Starting video processing for file:', file.name);
      onProgress(10, 'Preparing for transcription...');
      this.socketService.emitProcessingUpdate('preparing', 10);

      onProgress(30, 'Transcribing with OpenAI Whisper...');
      this.socketService.emitProcessingUpdate('transcribing', 30);

      let transcription: string;
      try {
        transcription = await this.apiService.transcribeAudio(file);
        
        if (!transcription || transcription.trim().length === 0) {
          throw new Error('No speech detected in the file');
        }
        
        console.log('Transcription completed:', transcription.substring(0, 100) + '...');
      } catch (error: any) {
        console.error('Transcription failed:', error.message);
        throw new Error(`Speech-to-text failed: ${error.message}`);
      }

      onProgress(60, 'Analyzing content with GPT-4...');
      this.socketService.emitProcessingUpdate('analyzing', 60);

      let analysis;
      try {
        console.log('Starting GPT-4 analysis...');
        analysis = await this.apiService.analyzeText(transcription);
        console.log('GPT-4 analysis completed successfully:', analysis);
      } catch (error: any) {
        console.error('GPT-4 analysis failed:', error.message);
        throw new Error(`Smart analysis failed: ${error.message}`);
      }

      onProgress(90, 'Finalizing results...');
      this.socketService.emitProcessingUpdate('finalizing', 90);

      const results = {
        transcription,
        summary: analysis.summary,
        keyInsights: analysis.keyInsights,
        sentiment: analysis.sentiment,
        topics: analysis.topics || [],
        actionItems: analysis.actionItems || [],
        duration: await this.getVideoDuration(file),
        wordCount: transcription.split(' ').length,
        fileName: file.name,
        fileSize: this.formatFileSize(file.size),
        processedAt: new Date().toISOString()
      };

      onProgress(100, 'Analysis complete!');
      this.socketService.emitAnalysisComplete(results);

      return results;
    } catch (error: any) {
      console.error('Video processing error:', error.message);
      this.socketService.emitEvent('processing_error', { error: error.message });
      throw error;
    }
  }

  async processYouTubeVideo(url: string, onProgress: (progress: number, status: string) => void) {
    try {
      onProgress(10, 'Extracting video ID...');
      
      const videoId = this.apiService.extractVideoId(url);
      if (!videoId) {
        throw new Error('Invalid YouTube URL format');
      }

      onProgress(20, 'Fetching video information...');
      
      let videoInfo;
      try {
        videoInfo = await this.apiService.getYouTubeVideoInfo(videoId);
      } catch (error: any) {
        throw new Error(`YouTube error: ${error.message}`);
      }
      
      onProgress(40, 'Generating transcription...');
      
      // Note: YouTube API doesn't provide direct transcription
      // In a real implementation, you'd need to download the audio and transcribe it
      const mockTranscription = `Transcription for YouTube video: "${videoInfo.snippet.title}". 
      This video discusses topics related to ${videoInfo.snippet.tags?.slice(0, 3).join(', ') || 'general content'}. 
      Description: ${videoInfo.snippet.description.substring(0, 200)}...
      
      Note: This is a simulated transcription. For real YouTube transcription, you would need to:
      1. Download the video audio using youtube-dl or similar
      2. Process it through OpenAI Whisper
      3. Analyze the actual content`;
      
      onProgress(70, 'Analyzing video content...');
      
      let analysis;
      try {
        analysis = await this.apiService.analyzeText(mockTranscription);
      } catch (error: any) {
        throw new Error(`Analysis failed: ${error.message}`);
      }
      
      onProgress(90, 'Finalizing results...');
      
      const results = {
        transcription: mockTranscription,
        summary: analysis.summary,
        keyInsights: analysis.keyInsights,
        sentiment: analysis.sentiment,
        topics: analysis.topics || [],
        actionItems: analysis.actionItems || [],
        duration: this.parseYouTubeDuration(videoInfo.contentDetails.duration),
        wordCount: mockTranscription.split(' ').length,
        title: videoInfo.snippet.title,
        channelTitle: videoInfo.snippet.channelTitle,
        viewCount: videoInfo.statistics?.viewCount || '0',
        publishedAt: videoInfo.snippet.publishedAt,
        processedAt: new Date().toISOString()
      };

      onProgress(100, 'YouTube video analysis complete!');
      this.socketService.emitAnalysisComplete(results);

      return results;
    } catch (error: any) {
      console.error('YouTube processing error:', error.message);
      this.socketService.emitEvent('processing_error', { error: error.message });
      throw error;
    }
  }

  private async getVideoDuration(file: File): Promise<string> {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        const duration = video.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        resolve(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      };
      
      video.onerror = () => {
        resolve('Unknown');
      };
      
      video.src = URL.createObjectURL(file);
      
      // Cleanup after 5 seconds
      setTimeout(() => {
        URL.revokeObjectURL(video.src);
        resolve('Unknown');
      }, 5000);
    });
  }

  private parseYouTubeDuration(duration: string): string {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';

    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
