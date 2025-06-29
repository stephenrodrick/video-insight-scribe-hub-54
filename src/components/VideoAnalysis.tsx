import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Headphones, Mic, AudioWaveform as Waveform, Volume2, BarChart3, Brain } from 'lucide-react';

interface VideoAnalysisProps {
  video: any;
  results: any;
}

export const VideoAnalysis: React.FC<VideoAnalysisProps> = ({ video, results }) => {
  if (!results) {
    return (
      <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="relative">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              <div className="absolute inset-0 blur-sm bg-purple-400/30 rounded"></div>
            </div>
            <span className="font-orbitron">AI Analysis Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
              <Headphones className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-gray-400">Upload and process audio to see detailed AI analysis</p>
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
      {/* Audio Info Card */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-purple-500/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Volume2 className="w-5 h-5 text-purple-400" />
            <span className="font-orbitron">Audio Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-black/20 rounded-lg border border-purple-500/20">
              <p className="text-sm text-gray-400">Duration</p>
              <p className="font-bold text-lg text-purple-400">{results.duration}</p>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg border border-pink-500/20">
              <p className="text-sm text-gray-400">Words</p>
              <p className="font-bold text-lg text-pink-400">{results.wordCount?.toLocaleString()}</p>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg border border-orange-500/20">
              <p className="text-sm text-gray-400">Sentiment</p>
              <Badge className={`${getSentimentColor(results.sentiment)} font-semibold`}>
                {results.sentiment}
              </Badge>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg border border-purple-500/20">
              <p className="text-sm text-gray-400">Source</p>
              <p className="font-bold text-lg text-purple-400 capitalize">{video?.type || 'Upload'}</p>
            </div>
          </div>
          
          {results.fileName && (
            <div className="mt-4 p-3 bg-black/20 rounded-lg border border-purple-500/20">
              <p className="text-sm text-gray-400">File Details</p>
              <p className="font-semibold text-purple-400">{results.fileName}</p>
              {results.fileSize && <p className="text-sm text-gray-400">{results.fileSize}</p>}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Transcription */}
      <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Mic className="w-5 h-5 text-purple-400" />
            <span className="font-orbitron">AI Speech-to-Text</span>
            <Badge variant="outline" className="border-green-400 text-green-400">
              OpenAI Whisper
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48 w-full">
            <div className="p-4 bg-black/30 rounded-lg border border-purple-500/20">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {results.transcription}
              </p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Smart Analysis Summary */}
      <Card className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 backdrop-blur-xl border-pink-500/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Brain className="w-5 h-5 text-pink-400" />
            <span className="font-orbitron">Smart Analysis Summary</span>
            <Badge variant="outline" className="border-pink-400 text-pink-400">
              GPT-4
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-black/20 rounded-lg border border-pink-500/20">
            <p className="text-gray-300 leading-relaxed">{results.summary}</p>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Waveform className="w-5 h-5 text-purple-400" />
            <span className="font-orbitron">Key Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.keyInsights?.map((insight: string, index: number) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-black/20 rounded-lg hover:bg-black/30 transition-colors border border-purple-500/20">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5 flex-shrink-0">
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
          <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <span className="text-xl">🏷️</span>
                <span className="font-orbitron">Topics Detected</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {results.topics.map((topic: string, index: number) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="border-purple-400 text-purple-400 bg-purple-400/10"
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
          <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <span className="text-xl">✅</span>
                <span className="font-orbitron">Action Items</span>
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