
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
          <CardTitle>Analysis Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">Upload and process a video to see analysis results.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Video Info */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle>Video Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Duration</p>
              <p className="font-semibold">{results.duration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Word Count</p>
              <p className="font-semibold">{results.wordCount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Sentiment</p>
              <Badge 
                variant="outline" 
                className={`${
                  results.sentiment === 'Positive' 
                    ? 'border-green-400 text-green-400' 
                    : results.sentiment === 'Negative' 
                    ? 'border-red-400 text-red-400'
                    : 'border-yellow-400 text-yellow-400'
                }`}
              >
                {results.sentiment}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-400">Source</p>
              <p className="font-semibold capitalize">{video?.type || 'Upload'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transcription */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle>AI Transcription</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-40">
            <p className="text-gray-300 leading-relaxed">{results.transcription}</p>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 leading-relaxed">{results.summary}</p>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.keyInsights.map((insight: string, index: number) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-300 flex-1">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
