'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Zap, Droplet, FileText, Trash2, RotateCcw } from 'lucide-react';
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Resource Consumption</CardTitle>
        <CardDescription>
          Adjust the sliders to reflect your daily usage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Electricity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <label className="text-sm font-medium">Electricity</label>
            </div>
            <span className="text-2xl font-bold text-yellow-600">
              {data.electricity.toFixed(1)} <span className="text-sm font-normal text-gray-500">kWh</span>
            </span>
          </div>
          <Slider
            value={[data.electricity]}
            onValueChange={([value]) => updateResource('electricity', value)}
            min={INPUT_RANGES.electricity.min}
            max={INPUT_RANGES.electricity.max}
            step={INPUT_RANGES.electricity.step}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Average household: 10-15 kWh/day
          </p>
        </div>

        {/* Water */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-blue-500" />
              <label className="text-sm font-medium">Water</label>
            </div>
            <span className="text-2xl font-bold text-blue-600">
              {data.water.toFixed(0)} <span className="text-sm font-normal text-gray-500">L</span>
            </span>
          </div>
          <Slider
            value={[data.water]}
            onValueChange={([value]) => updateResource('water', value)}
            min={INPUT_RANGES.water.min}
            max={INPUT_RANGES.water.max}
            step={INPUT_RANGES.water.step}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Average household: 150-200 L/day per person
          </p>
        </div>

        {/* Paper */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" />
              <label className="text-sm font-medium">Paper</label>
            </div>
            <span className="text-2xl font-bold text-orange-600">
              {data.paper.toFixed(0)} <span className="text-sm font-normal text-gray-500">sheets</span>
            </span>
          </div>
          <Slider
            value={[data.paper]}
            onValueChange={([value]) => updateResource('paper', value)}
            min={INPUT_RANGES.paper.min}
            max={INPUT_RANGES.paper.max}
            step={INPUT_RANGES.paper.step}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Average office worker: 40-50 sheets/day
          </p>
        </div>

        {/* Waste */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-500" />
              <label className="text-sm font-medium">Waste</label>
            </div>
            <span className="text-2xl font-bold text-red-600">
              {data.waste.toFixed(1)} <span className="text-sm font-normal text-gray-500">kg</span>
            </span>
          </div>
          <Slider
            value={[data.waste]}
            onValueChange={([value]) => updateResource('waste', value)}
            min={INPUT_RANGES.waste.min}
            max={INPUT_RANGES.waste.max}
            step={INPUT_RANGES.waste.step}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Average household: 1-2 kg/day per person
          </p>
        </div>

        {/* Reset Button */}
        <div className="pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
