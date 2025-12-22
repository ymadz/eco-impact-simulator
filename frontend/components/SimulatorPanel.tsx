'use client';

import { Zap, Droplets, Trash2 } from 'lucide-react';

interface SimulatorPanelProps {
  electricity: number;
  water: number;
  waste: number;
  onElectricityChange: (value: number) => void;
  onWaterChange: (value: number) => void;
  onWasteChange: (value: number) => void;
}

export default function SimulatorPanel({
  electricity,
  water,
  waste,
  onElectricityChange,
  onWaterChange,
  onWasteChange,
}: SimulatorPanelProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Resource Consumption</h2>

      {/* Electricity Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 font-semibold text-gray-700">
            <Zap className="h-5 w-5 text-yellow-500" />
            Electricity Usage
          </label>
          <span className="text-lg font-bold text-yellow-600">{electricity} kWh</span>
        </div>
        <input
          type="range"
          min="0"
          max="20"
          step="0.5"
          value={electricity}
          onChange={(e) => onElectricityChange(Number(e.target.value))}
          className="w-full h-3 bg-yellow-100 rounded-lg appearance-none cursor-pointer slider-yellow"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>0 kWh</span>
          <span>20 kWh</span>
        </div>
      </div>

      {/* Water Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 font-semibold text-gray-700">
            <Droplets className="h-5 w-5 text-blue-500" />
            Water Consumption
          </label>
          <span className="text-lg font-bold text-blue-600">{water} L</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={water}
          onChange={(e) => onWaterChange(Number(e.target.value))}
          className="w-full h-3 bg-blue-100 rounded-lg appearance-none cursor-pointer slider-blue"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>0 L</span>
          <span>100 L</span>
        </div>
      </div>

      {/* Waste Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 font-semibold text-gray-700">
            <Trash2 className="h-5 w-5 text-green-600" />
            Waste Production
          </label>
          <span className="text-lg font-bold text-green-700">{waste} kg</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={waste}
          onChange={(e) => onWasteChange(Number(e.target.value))}
          className="w-full h-3 bg-green-100 rounded-lg appearance-none cursor-pointer slider-green"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>0 kg</span>
          <span>10 kg</span>
        </div>
      </div>

      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.2s;
        }
        input[type='range']::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        .slider-yellow::-webkit-slider-thumb {
          background: #eab308;
        }
        .slider-blue::-webkit-slider-thumb {
          background: #3b82f6;
        }
        .slider-green::-webkit-slider-thumb {
          background: #16a34a;
        }
      `}</style>
    </div>
  );
}
