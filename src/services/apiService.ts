
import axios from 'axios';

export class ApiService {
  private openaiApiKey: string;
  private youtubeApiKey: string;

  constructor(openaiKey: string, youtubeKey: string) {
    this.openaiApiKey = openaiKey;
    this.youtubeApiKey = youtubeKey;
  }

  async transcribeAudio(audioFile: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('model', 'whisper-1');

    try {
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

  async analyzeText(text: string): Promise<{
    summary: string;
    keyInsights: string[];
    sentiment: string;
  }> {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that analyzes transcribed text and provides summaries, key insights, and sentiment analysis.'
          },
          {
            role: 'user',
            content: `Please analyze this transcribed text and provide:
            1. A concise summary
            2. 3-5 key insights
            3. Overall sentiment (Positive, Negative, or Neutral)
            
            Text: ${text}`
          }
        ],
        temperature: 0.7,
      }, {
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
      });

      const content = response.data.choices[0].message.content;
      
      // Parse the response (this is a simplified parser)
      const lines = content.split('\n').filter((line: string) => line.trim());
      let summary = '';
      let keyInsights: string[] = [];
      let sentiment = 'Neutral';

      let currentSection = '';
      for (const line of lines) {
        if (line.toLowerCase().includes('summary')) {
          currentSection = 'summary';
        } else if (line.toLowerCase().includes('insight')) {
          currentSection = 'insights';
        } else if (line.toLowerCase().includes('sentiment')) {
          currentSection = 'sentiment';
        } else if (line.trim() && currentSection === 'summary') {
          summary += line + ' ';
        } else if (line.trim() && currentSection === 'insights') {
          keyInsights.push(line.replace(/^\d+\.?\s*/, '').trim());
        } else if (line.trim() && currentSection === 'sentiment') {
          if (line.toLowerCase().includes('positive')) sentiment = 'Positive';
          else if (line.toLowerCase().includes('negative')) sentiment = 'Negative';
          else sentiment = 'Neutral';
        }
      }

      return {
        summary: summary.trim() || 'Summary not available',
        keyInsights: keyInsights.length > 0 ? keyInsights : ['Analysis not available'],
        sentiment
      };
    } catch (error) {
      console.error('Analysis error:', error);
      throw new Error('Failed to analyze text');
    }
  }

  async getYouTubeVideoInfo(videoId: string) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${this.youtubeApiKey}&part=snippet,contentDetails`
      );
      return response.data.items[0];
    } catch (error) {
      console.error('YouTube API error:', error);
      throw new Error('Failed to fetch YouTube video info');
    }
  }

  extractVideoId(url: string): string | null {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
}
