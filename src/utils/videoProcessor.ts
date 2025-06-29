
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
      onProgress(10, 'Preparing video for processing...');
      this.socketService.emitProcessingUpdate('preparing', 10);

      // Extract audio from video (simplified - in real app you'd use FFmpeg)
      onProgress(30, 'Extracting audio from video...');
      this.socketService.emitProcessingUpdate('extracting_audio', 30);
      
      // For demo, we'll simulate audio extraction and use the video file directly
      // In production, you'd extract audio using FFmpeg or similar
      await this.delay(1000);

      onProgress(50, 'Transcribing audio with Whisper AI...');
      this.socketService.emitProcessingUpdate('transcribing', 50);

      // Since we can't directly extract audio in browser, we'll simulate with the file
      // In production, this would be the extracted audio file
      const transcription = await this.apiService.transcribeAudio(file);

      onProgress(70, 'Analyzing transcription...');
      this.socketService.emitProcessingUpdate('analyzing', 70);

      const analysis = await this.apiService.analyzeText(transcription);

      onProgress(90, 'Finalizing results...');
      this.socketService.emitProcessingUpdate('finalizing', 90);

      const results = {
        transcription,
        summary: analysis.summary,
        keyInsights: analysis.keyInsights,
        sentiment: analysis.sentiment,
        duration: this.getVideoDuration(file),
        wordCount: transcription.split(' ').length,
        processedAt: new Date().toISOString()
      };

      onProgress(100, 'Analysis complete!');
      this.socketService.emitAnalysisComplete(results);

      return results;
    } catch (error) {
      console.error('Video processing error:', error);
      this.socketService.emitEvent('processing_error', { error: error.message });
      throw error;
    }
  }

  async processYouTubeVideo(url: string, onProgress: (progress: number, status: string) => void) {
    try {
      onProgress(10, 'Fetching YouTube video info...');
      
      const videoId = this.apiService.extractVideoId(url);
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      const videoInfo = await this.apiService.getYouTubeVideoInfo(videoId);
      
      onProgress(30, 'Processing YouTube video...');
      
      // For demo purposes, we'll simulate transcription
      // In production, you'd download the audio and process it
      const mockTranscription = `This is a simulated transcription of the YouTube video: ${videoInfo.snippet.title}. The video discusses various topics related to ${videoInfo.snippet.tags?.join(', ') || 'general content'}.`;
      
      onProgress(70, 'Analyzing content...');
      
      const analysis = await this.apiService.analyzeText(mockTranscription);
      
      const results = {
        transcription: mockTranscription,
        summary: analysis.summary,
        keyInsights: analysis.keyInsights,
        sentiment: analysis.sentiment,
        duration: this.parseYouTubeDuration(videoInfo.contentDetails.duration),
        wordCount: mockTranscription.split(' ').length,
        title: videoInfo.snippet.title,
        processedAt: new Date().toISOString()
      };

      onProgress(100, 'YouTube video analysis complete!');
      this.socketService.emitAnalysisComplete(results);

      return results;
    } catch (error) {
      console.error('YouTube processing error:', error);
      throw error;
    }
  }

  private getVideoDuration(file: File): string {
    // In a real app, you'd extract this from the video metadata
    return '3:45'; // Placeholder
  }

  private parseYouTubeDuration(duration: string): string {
    // Parse ISO 8601 duration format (PT4M13S -> 4:13)
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

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
