
import axios from 'axios';

export class ApiService {
  private openaiApiKey: string;
  private youtubeApiKey: string;

  constructor(openaiKey: string, youtubeKey: string) {
    this.openaiApiKey = openaiKey;
    this.youtubeApiKey = youtubeKey;
  }

  // OpenAI Whisper API for transcription
  async transcribeAudio(audioBlob: Blob): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.mp3');
      formData.append('model', 'whisper-1');

      const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.text;
    } catch (error) {
      console.error('Transcription error:', error);
      throw new Error('Failed to transcribe audio');
    }
  }

  // OpenAI GPT API for summarization
  async generateSummary(text: string): Promise<{ summary: string; insights: string[]; sentiment: string }> {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that analyzes video transcriptions. Provide a concise summary, key insights as bullet points, and overall sentiment (Positive, Negative, or Neutral).'
          },
          {
            role: 'user',
            content: `Please analyze this video transcription and provide:\n1. A brief summary\n2. Key insights (3-5 points)\n3. Overall sentiment\n\nTranscription: ${text}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }, {
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
      });

      const result = response.data.choices[0].message.content;
      
      // Parse the response (this is a simplified parser)
      const sections = result.split('\n\n');
      const summary = sections[0]?.replace('Summary:', '').trim() || '';
      const insights = sections[1]?.split('\n').filter((line: string) => line.trim().startsWith('-')).map((line: string) => line.replace('-', '').trim()) || [];
      const sentiment = sections[2]?.replace('Sentiment:', '').trim() || 'Neutral';

      return { summary, insights, sentiment };
    } catch (error) {
      console.error('Summary generation error:', error);
      throw new Error('Failed to generate summary');
    }
  }

  // YouTube API for video metadata
  async getYouTubeVideoInfo(videoId: string): Promise<any> {
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          part: 'snippet,statistics,contentDetails',
          id: videoId,
          key: this.youtubeApiKey,
        },
      });

      return response.data.items[0];
    } catch (error) {
      console.error('YouTube API error:', error);
      throw new Error('Failed to fetch YouTube video information');
    }
  }

  // Extract YouTube video ID from URL
  extractYouTubeVideoId(url: string): string | null {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
}

export default ApiService;
