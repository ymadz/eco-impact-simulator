'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { EcoScore as EcoScoreType } from '@/types';
import { getGradeLabel } from '@/lib/calculations';
import { Leaf, TrendingDown } from 'lucide-react';

interface EcoScoreProps {
  score: EcoScoreType;
}

export function EcoScore({ score }: EcoScoreProps) {
  const gradeLabel = getGradeLabel(score.score);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="w-5 h-5" />
          Your Eco-Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Main Score Display */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            {/* Circular Progress Background */}
            <svg className="w-48 h-48 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke={score.color}
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - score.score / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            </svg>

            {/* Score Number in Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                className="text-6xl font-bold transition-colors duration-300"
                style={{ color: score.color }}
              >
                {score.score}
              </div>
              <div className="text-sm text-gray-500">out of 100</div>
            </div>
          </div>
        </div>

        {/* Grade Badge */}
        <div className="flex justify-center mb-6">
          <Badge
            className="text-lg px-4 py-2"
            style={{
              backgroundColor: score.color,
              color: 'white',
            }}
          >
            Grade {score.grade} - {gradeLabel}
          </Badge>
        </div>

        {/* Carbon Footprint */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Daily Carbon Footprint</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {score.carbonFootprint}
              </div>
              <div className="text-xs text-gray-500">kg CO₂/day</div>
            </div>
          </div>

          {/* Monthly Projection */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-900 mb-1">
              <strong>Monthly Impact:</strong>
            </div>
            <div className="text-lg font-semibold text-blue-700">
              ~{(score.carbonFootprint * 30).toFixed(1)} kg CO₂
            </div>
          </div>

          {/* Yearly Projection */}
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-sm text-orange-900 mb-1">
              <strong>Yearly Impact:</strong>
            </div>
            <div className="text-lg font-semibold text-orange-700">
              ~{(score.carbonFootprint * 365).toFixed(1)} kg CO₂
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Environmental Impact</span>
            <span className="font-medium">{gradeLabel}</span>
          </div>
          <Progress
            value={score.score}
            className="h-3"
            style={
              {
                '--progress-background': score.color,
              } as React.CSSProperties
            }
          />
        </div>

        {/* Comparison (Optional - can be dynamic later) */}
        <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-xs text-green-900 text-center">
            {score.score >= 80
              ? '🎉 Excellent! You\'re doing great for the environment!'
              : score.score >= 70
              ? '👍 Good job! Small improvements can make a big difference.'
              : score.score >= 60
              ? '💡 Room for improvement. Check the recommendations below.'
              : '⚠️ High environmental impact. Let\'s work on reducing it together!'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
