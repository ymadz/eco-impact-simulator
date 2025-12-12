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
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      sliderColor: '[&_[role=slider]]:bg-yellow-500',
      unit: 'kWh',
      info: 'Average: 10-15 kWh/day',
    },
    {
      key: 'water' as keyof ResourceData,
      label: 'Water (Gallons)',
      icon: Droplet,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      sliderColor: '[&_[role=slider]]:bg-blue-500',
      unit: 'L',
      info: 'Average: 150-200 L/day',
    },
    {
      key: 'paper' as keyof ResourceData,
      label: 'Paper (Sheets)',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      sliderColor: '[&_[role=slider]]:bg-purple-500',
      unit: 'sheets',
      info: 'Average: 40-50 sheets/day',
    },
    {
      key: 'waste' as keyof ResourceData,
      label: 'Waste (lbs)',
      icon: Trash2,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      sliderColor: '[&_[role=slider]]:bg-red-500',
      unit: 'kg',
      info: 'Average: 1-2 kg/day',
    },
  ];

  return (
    <Card className="bg-white border-0 shadow-xl">
      <CardHeader className="border-b border-slate-100 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Edit className="w-5 h-5 text-green-600" />
          <CardTitle className="text-xl">Daily Entry</CardTitle>
        </div>
        <CardDescription>
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
                  <div className={`w-10 h-10 rounded-xl ${resource.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${resource.color}`} />
                  </div>
                  <label className="text-sm font-semibold text-gray-700">
                    {resource.label}
                  </label>
                </div>
                <span className={`text-2xl font-bold ${resource.color}`}>
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

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{range.min} {resource.unit}</span>
                <span className="text-center flex-1 italic">{resource.info}</span>
                <span>{range.max} {resource.unit}</span>
              </div>
            </div>
          );
        })}

        {/* Log Button */}
        <div className="pt-4 space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Log Daily Impact →
          </Button>

          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full border-slate-200 hover:bg-slate-50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
