'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Droplet, FileText, Trash2, TrendingUp, Sparkles } from 'lucide-react';
import { ResourceData, EcoScore } from '@/types';
import { calculateEcoScore } from '@/lib/calculations';

interface WhatIfSimulatorProps {
  currentData: ResourceData;
  onApply: (data: ResourceData) => void;
}

export function WhatIfSimulator({ currentData, onApply }: WhatIfSimulatorProps) {
  const [reductions, setReductions] = useState({
    electricity: 20,
    water: 15,
    paper: 0,
    waste: 35,
  });

  // Calculate improved values
  const improvedData: ResourceData = {
    electricity: currentData.electricity * (1 - reductions.electricity / 100),
    water: currentData.water * (1 - reductions.water / 100),
    paper: currentData.paper * (1 - reductions.paper / 100),
    waste: currentData.waste * (1 - reductions.waste / 100),
  };

  const currentScore = calculateEcoScore(currentData);
  const improvedScore = calculateEcoScore(improvedData);
  const pointsGained = (improvedScore.score - currentScore.score) * 10;

  const resources = [
    {
      key: 'electricity' as keyof typeof reductions,
      label: 'Electricity',
      icon: Zap,
      color: 'text-amber-600',
    },
    {
      key: 'water' as keyof typeof reductions,
      label: 'Water Usage',
      icon: Droplet,
      color: 'text-blue-600',
    },
    {
      key: 'paper' as keyof typeof reductions,
      label: 'Paper Waste',
      icon: FileText,
      color: 'text-purple-600',
    },
    {
      key: 'waste' as keyof typeof reductions,
      label: 'General Waste',
      icon: Trash2,
      color: 'text-red-600',
    },
  ];

  return (
    <Card className="bg-white border-0 shadow-xl rounded-3xl overflow-hidden">
      <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <CardTitle className="text-xl">Simulate Your Impact</CardTitle>
            </div>
            <CardDescription>
              Adjust your consumption habits below to compare your current reality against a greener future. See how small changes affect your Eco-Score and savings.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        {/* Adjust Reductions Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Adjust Reductions
          </h3>

          <div className="space-y-6">
            {resources.map((resource) => {
              const Icon = resource.icon;
              const value = reductions[resource.key];

              return (
                <div key={resource.key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${resource.color}`} />
                      <label className="text-sm font-medium text-gray-700">
                        {resource.label}
                      </label>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 font-semibold">
                      {value}%
                    </Badge>
                  </div>

                  <Slider
                    value={[value]}
                    onValueChange={([newValue]) =>
                      setReductions({ ...reductions, [resource.key]: newValue })
                    }
                    min={0}
                    max={50}
                    step={5}
                    className="w-full [&_[role=slider]]:bg-emerald-500"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Current Reality */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
            <div className="text-xs font-semibold text-slate-600 mb-3 uppercase tracking-wide">
              Current Reality
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold text-slate-900 mb-1">
                  {currentScore.score}
                  <span className="text-sm text-slate-500 ml-1">/100</span>
                </div>
                <div className="text-xs text-slate-600">
                  Your current consumption is average for your household size
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">CO₂</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {currentScore.carbonFootprint} <span className="text-xs text-slate-500">kg/day</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Monthly Footprint</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {(currentScore.carbonFootprint * 30).toFixed(1)} <span className="text-xs text-slate-500">kg/month</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Projected Future */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 relative overflow-hidden">
            <Badge className="absolute top-3 right-3 bg-emerald-500 text-white text-xs">
              IMPROVED
            </Badge>
            <div className="text-xs font-semibold text-emerald-700 mb-3 uppercase tracking-wide">
              Projected Future
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold text-emerald-900 mb-1">
                  {improvedScore.score}
                  <span className="text-sm text-emerald-600 ml-1">/100</span>
                </div>
                <div className="text-xs text-emerald-700">
                  Great! You&apos;ve improved your eco footprint**
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-emerald-700">CO₂</span>
                  <span className="text-sm font-semibold text-emerald-900">
                    {improvedScore.carbonFootprint} <span className="text-xs text-emerald-600">kg/day</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-emerald-700">Monthly Savings</span>
                  <span className="text-sm font-semibold text-emerald-900">
                    ${((currentScore.carbonFootprint - improvedScore.carbonFootprint) * 30 * 0.5).toFixed(0)}{' '}
                    <span className="text-xs text-emerald-600">/month</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 text-center border border-emerald-100">
            <div className="text-2xl font-bold text-emerald-700 mb-1">
              +{pointsGained > 0 ? pointsGained.toFixed(0) : 0}
            </div>
            <div className="text-xs text-emerald-600">Points</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 text-center border border-blue-100">
            <div className="text-2xl font-bold text-blue-700 mb-1">
              {((currentScore.carbonFootprint - improvedScore.carbonFootprint) * 30).toFixed(1)}
            </div>
            <div className="text-xs text-blue-600">Monthly Footprint</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center border border-purple-100">
            <div className="text-2xl font-bold text-purple-700 mb-1">
              {(((improvedScore.carbonFootprint - currentScore.carbonFootprint) / currentScore.carbonFootprint) * 100 * -1).toFixed(0)}%
            </div>
            <div className="text-xs text-purple-600">Impact Reduction</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            onClick={() => onApply(improvedData)}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Apply as Goal
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              setReductions({
                electricity: 20,
                water: 15,
                paper: 0,
                waste: 35,
              })
            }
            className="px-6 py-6 rounded-2xl border-slate-200"
          >
            Reset
          </Button>
        </div>

        {/* Bottom Tip */}
        <div className="mt-6 p-4 bg-teal-50 rounded-2xl border border-teal-200 flex items-start gap-3">
          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">💡</span>
          </div>
          <p className="text-sm text-teal-900">
            <strong>Ready to commit to these changes?</strong> Start with your smallest goal. See how small changes affect your Eco-Score and savings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
