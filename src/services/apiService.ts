import axios from 'axios';

export class ApiService {
  private openaiApiKey: string;
  private youtubeApiKey: string;

  constructor(openaiKey: string, youtubeKey: string) {
    this.openaiApiKey = openaiKey;
    this.youtubeApiKey = youtubeKey;
  }

  async transcribeAudio(audioFile: File): Promise<string> {
    if (!this.openaiApiKey || this.openaiApiKey.trim() === '') {
      throw new Error('OpenAI API key is required for transcription');
    }

    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('model', 'whisper-1');

    try {
      console.log('Starting transcription with OpenAI Whisper...');
      const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 second timeout
      });
      
      console.log('Transcription completed successfully');
      return response.data.text;
    } catch (error: any) {
      console.error('Transcription error:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your API key.');
      } else if (error.response?.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. The file might be too large.');
      } else {
        throw new Error(`Transcription failed: ${error.response?.data?.error?.message || error.message}`);
      }
    }
  }

  async analyzeText(text: string): Promise<{
    summary: string;
    keyInsights: string[];
    sentiment: string;
    topics: string[];
    actionItems: string[];
  }> {
    if (!this.openaiApiKey || this.openaiApiKey.trim() === '') {
      throw new Error('OpenAI API key is required for analysis');
    }

    try {
      console.log('Starting AI analysis with GPT-4...');
      console.log('Using API key:', this.openaiApiKey.substring(0, 10) + '...');
      
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o-mini', // Using gpt-4o-mini as it's more reliable and faster
        messages: [
          {
            role: 'system',
            content: `You are an expert AI analyst that provides comprehensive analysis of transcribed content. 
            Always respond in valid JSON format with the following structure:
            {
              "summary": "A clear, concise summary of the main content",
              "keyInsights": ["insight1", "insight2", "insight3"],
              "sentiment": "Positive|Negative|Neutral",
              "topics": ["topic1", "topic2", "topic3"],
              "actionItems": ["action1", "action2"]
            }`
          },
          {
            role: 'user',
            content: `Please analyze this transcribed content and provide detailed insights:\n\n${text}`
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }, {
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      });

      const content = response.data.choices[0].message.content;
      console.log('AI analysis completed successfully');
      console.log('GPT Response:', content);
      
      try {
        const analysis = JSON.parse(content);
        return {
          summary: analysis.summary || 'Analysis summary not available',
          keyInsights: analysis.keyInsights || ['No key insights available'],
          sentiment: analysis.sentiment || 'Neutral',
          topics: analysis.topics || ['General'],
          actionItems: analysis.actionItems || ['No action items identified']
        };
      } catch (parseError) {
        console.warn('Failed to parse AI response, using fallback');
        return {
          summary: content.substring(0, 500) + '...',
          keyInsights: ['Analysis completed but formatting needs improvement'],
          sentiment: 'Neutral',
          topics: ['General Content'],
          actionItems: ['Review the full analysis']
        };
      }
    } catch (error: any) {
      console.error('Analysis error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      
      if (error.response?.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your API key and ensure it has GPT-4 access.');
      } else if (error.response?.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.');
      } else if (error.response?.status === 400) {
        throw new Error(`Bad request: ${error.response?.data?.error?.message || 'Invalid request format'}`);
      } else if (error.response?.status === 403) {
        throw new Error('Access denied. Your API key may not have access to GPT-4 models.');
      } else {
        throw new Error(`Analysis failed: ${error.response?.data?.error?.message || error.message}`);
      }
    }
  }

  async getYouTubeVideoInfo(videoId: string) {
    if (!this.youtubeApiKey || this.youtubeApiKey.trim() === '') {
      throw new Error('YouTube API key is required');
    }

    try {
      console.log('Fetching YouTube video info...');
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${this.youtubeApiKey}&part=snippet,contentDetails,statistics`
      );
      
      if (!response.data.items || response.data.items.length === 0) {
        throw new Error('Video not found or is private');
      }
      
      console.log('YouTube video info fetched successfully');
      return response.data.items[0];
    } catch (error: any) {
      console.error('YouTube API error:', error.response?.data || error.message);
      
      if (error.response?.status === 403) {
        throw new Error('YouTube API key is invalid or quota exceeded');
      } else if (error.response?.status === 404) {
        throw new Error('Video not found');
      } else {
        throw new Error(`YouTube API error: ${error.response?.data?.error?.message || error.message}`);
      }
    }
  }

  extractVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return null;
  }
}
