'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Zap, Droplet, FileText, Trash2, RotateCcw, Edit } from 'lucide-react';
import { ResourceData } from '@/types';
import { INPUT_RANGES, DEFAULT_RESOURCES } from '@/lib/constants';

interface InputPanelProps {
  data: ResourceData;
  onChange: (data: ResourceData) => void;
}

export function InputPanel({ data, onChange }: InputPanelProps) {
  const handleReset = () => {
    onChange(DEFAULT_RESOURCES);
  };

  const updateResource = (key: keyof ResourceData, value: number) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const resources = [
    {
      key: 'electricity' as keyof ResourceData,
      label: 'Electricity (kWh)',
      icon: Zap,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      sliderColor: '[&_[role=slider]]:bg-amber-500',
      unit: 'kWh',
      info: '10-15 kWh',
    },
    {
      key: 'water' as keyof ResourceData,
      label: 'Water (Gallons)',
      icon: Droplet,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      sliderColor: '[&_[role=slider]]:bg-blue-500',
      unit: 'L',
      info: '150-200 L',
    },
    {
      key: 'paper' as keyof ResourceData,
      label: 'Paper (Sheets)',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      sliderColor: '[&_[role=slider]]:bg-purple-500',
      unit: 'sheets',
      info: '40-50 sheets',
    },
    {
      key: 'waste' as keyof ResourceData,
      label: 'Waste (lbs)',
      icon: Trash2,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      sliderColor: '[&_[role=slider]]:bg-red-500',
      unit: 'kg',
      info: '1-2 kg',
    },
  ];

  return (
    <Card className="bg-white border-0 shadow-sm rounded-3xl">
      <CardHeader className="border-b border-slate-100 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
            <Edit className="w-4 h-4 text-emerald-600" />
          </div>
          <CardTitle className="text-xl">Daily Entry</CardTitle>
        </div>
        <CardDescription className="text-sm text-gray-600">
          Update your consumption for today.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {resources.map((resource) => {
          const Icon = resource.icon;
          const value = data[resource.key];
          const range = INPUT_RANGES[resource.key];

          return (
            <div key={resource.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl ${resource.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${resource.color}`} />
                  </div>
                  <label className="text-sm font-medium text-gray-700">
                    {resource.label}
                  </label>
                </div>
                <span className={`text-xl font-bold ${resource.color}`}>
                  {value.toFixed(resource.key === 'water' ? 0 : 1)}
                </span>
              </div>

              <Slider
                value={[value]}
                onValueChange={([newValue]) => updateResource(resource.key, newValue)}
                min={range.min}
                max={range.max}
                step={range.step}
                className={`w-full ${resource.sliderColor}`}
              />

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">{range.min}</span>
                <span className="text-gray-500 italic">Average: {resource.info}</span>
                <span className="text-gray-400">{range.max}+</span>
              </div>
            </div>
          );
        })}

        {/* Buttons */}
        <div className="pt-4 space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            Log Daily Impact →
          </Button>

          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full border-slate-200 hover:bg-slate-50 rounded-2xl py-3"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
