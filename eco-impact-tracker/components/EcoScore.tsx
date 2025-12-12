'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EcoScore as EcoScoreType } from '@/types';
import { getGradeLabel } from '@/lib/calculations';
import { Leaf, TrendingDown, Sparkles } from 'lucide-react';

interface EcoScoreProps {
  score: EcoScoreType;
}

export function EcoScore({ score }: EcoScoreProps) {
  const gradeLabel = getGradeLabel(score.score);
  const percentage = score.score;

  return (
    <Card className="bg-gradient-to-br from-emerald-50/50 via-teal-50/50 to-cyan-50/50 border-0 shadow-sm rounded-3xl overflow-hidden">
      <CardContent className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Today&apos;s Eco-Score
              </h3>
            </div>
          </div>
        </div>

        {/* Main Score Display */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Circular Score */}
          <div className="relative">
            <svg className="w-48 h-48 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="#e5e7eb"
                strokeWidth="14"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke={score.color}
                strokeWidth="14"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 80}`}
                strokeDashoffset={`${2 * Math.PI * 80 * (1 - percentage / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Score in Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                className="text-6xl font-black mb-1"
                style={{ color: score.color }}
              >
                {score.grade}
                <span className="text-3xl">-</span>
              </div>
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {gradeLabel}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 space-y-4 w-full">
            {/* Score Value */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-emerald-100/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">
                      Your Score
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      {score.score}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carbon Footprint */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-blue-100/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">
                      kg CO₂/day
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      {score.carbonFootprint}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="mt-6 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-200/50">
          <p className="text-sm text-gray-700 text-center font-medium">
            {score.score >= 80
              ? '🎉 Excellent! You\'re making a real difference!'
              : score.score >= 70
              ? '👍 Good job! Small improvements can make a big impact.'
              : score.score >= 60
              ? '💡 Room for improvement. Check the recommendations below.'
              : '⚠️ High environmental impact. Let\'s work on reducing it together!'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
