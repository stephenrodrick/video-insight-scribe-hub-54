
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface VideoAnalysisProps {
  video: any;
  results: any;
}

export const VideoAnalysis: React.FC<VideoAnalysisProps> = ({ video, results }) => {
  if (!results) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">🎬</span>
            <span>AI Analysis Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-gray-400">Upload and process a video to see detailed AI analysis</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'border-green-400 text-green-400 bg-green-400/10';
      case 'negative': return 'border-red-400 text-red-400 bg-red-400/10';
      default: return 'border-yellow-400 text-yellow-400 bg-yellow-400/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Video Info Card */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-xl">📹</span>
            <span>Video Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">Duration</p>
              <p className="font-bold text-lg">{results.duration}</p>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">Words</p>
              <p className="font-bold text-lg">{results.wordCount?.toLocaleString()}</p>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">Sentiment</p>
              <Badge className={`${getSentimentColor(results.sentiment)} font-semibold`}>
                {results.sentiment}
              </Badge>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">Source</p>
              <p className="font-bold text-lg capitalize">{video?.type || 'Upload'}</p>
            </div>
          </div>
          
          {results.fileName && (
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">File Details</p>
              <p className="font-semibold">{results.fileName}</p>
              {results.fileSize && <p className="text-sm text-gray-400">{results.fileSize}</p>}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Transcription */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-xl">🎤</span>
            <span>AI Speech-to-Text</span>
            <Badge variant="outline" className="border-green-400 text-green-400">
              OpenAI Whisper
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48 w-full">
            <div className="p-4 bg-black/20 rounded-lg">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {results.transcription}
              </p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Smart Analysis Summary */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-xl">🧠</span>
            <span>Smart Analysis Summary</span>
            <Badge variant="outline" className="border-purple-400 text-purple-400">
              GPT-4
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-gray-300 leading-relaxed">{results.summary}</p>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-xl">💡</span>
            <span>Key Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.keyInsights?.map((insight: string, index: number) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-300 flex-1">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Topics & Action Items */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Topics */}
        {results.topics && results.topics.length > 0 && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-xl">🏷️</span>
                <span>Topics Detected</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {results.topics.map((topic: string, index: number) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="border-blue-400 text-blue-400 bg-blue-400/10"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Items */}
        {results.actionItems && results.actionItems.length > 0 && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-xl">✅</span>
                <span>Action Items</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {results.actionItems.map((item: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <p className="text-gray-300 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
