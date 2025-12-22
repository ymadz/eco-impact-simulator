'use client';

import { useState } from 'react';
import { RefreshCw, TrendingDown, TrendingUp, Calculator } from 'lucide-react';
import SimulatorPanel from '@/components/SimulatorPanel';
import EcoScore from '@/components/EcoScore';
import LimitGraph from '@/components/LimitGraph';
import { calculateEcoScore, calculateProjection } from '@/lib/calculations';

// Default values (school averages)
const DEFAULTS = {
  electricity: 5,
  water: 20,
  waste: 2,
};

export default function SimulatorPage() {
  const [electricity, setElectricity] = useState(DEFAULTS.electricity);
  const [water, setWater] = useState(DEFAULTS.water);
  const [waste, setWaste] = useState(DEFAULTS.waste);
  const [dailyIncrease, setDailyIncrease] = useState(0.5);
  const [showLimitGraph, setShowLimitGraph] = useState(false);

  const ecoResult = calculateEcoScore(electricity, water, waste);
  const projectionData = calculateProjection(dailyIncrease);

  const handleMitigation = () => {
    setElectricity((prev) => Math.round(prev * 0.7 * 10) / 10);
    setWater((prev) => Math.round(prev * 0.7));
    setWaste((prev) => Math.round(prev * 0.7 * 10) / 10);
  };

  const handleDoubleUsage = () => {
    setElectricity((prev) => Math.min(20, prev * 2));
    setWater((prev) => Math.min(100, prev * 2));
    setWaste((prev) => Math.min(10, prev * 2));
  };

  const handleReset = () => {
    setElectricity(DEFAULTS.electricity);
    setWater(DEFAULTS.water);
    setWaste(DEFAULTS.waste);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            🎮 Eco-Impact Simulator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Adjust the sliders below to simulate different resource consumption scenarios. 
            See how your choices affect your environmental impact in real-time!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <SimulatorPanel
              electricity={electricity}
              water={water}
              waste={waste}
              onElectricityChange={setElectricity}
              onWaterChange={setWater}
              onWasteChange={setWaste}
            />

            {/* Action Buttons */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-gray-800 mb-4">What-If Scenarios</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={handleMitigation}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  <TrendingDown className="h-5 w-5" />
                  Reduce 30%
                </button>
                <button
                  onClick={handleDoubleUsage}
                  className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                  <TrendingUp className="h-5 w-5" />
                  Double Usage
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                >
                  <RefreshCw className="h-5 w-5" />
                  Reset
                </button>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl">
              <h3 className="font-bold text-yellow-800 mb-3">💡 Tips Based on Your Input</h3>
              <ul className="space-y-2 text-sm text-yellow-700">
                {electricity > 10 && (
                  <li>• High electricity usage: Turn off lights and unplug devices when not in use</li>
                )}
                {water > 50 && (
                  <li>• High water consumption: Store water in covered containers to prevent contamination</li>
                )}
                {waste > 5 && (
                  <li>• High waste production: Separate recyclables from general waste</li>
                )}
                {ecoResult.grade === 'A' && (
                  <li>• Excellent habits! Keep up the great work and encourage others</li>
                )}
              </ul>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <EcoScore result={ecoResult} />

            {/* Score Breakdown */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-gray-800 mb-4">📊 Score Breakdown</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Electricity Impact</span>
                  <span className="font-bold text-yellow-600">{electricity * 5} points</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all"
                    style={{ width: `${(electricity / 20) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Water Impact</span>
                  <span className="font-bold text-blue-600">{water * 2} points</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${(water / 100) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Waste Impact</span>
                  <span className="font-bold text-green-600">{waste * 10} points</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${(waste / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Limit Graph Toggle */}
            <button
              onClick={() => setShowLimitGraph(!showLimitGraph)}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              <Calculator className="h-5 w-5" />
              {showLimitGraph ? 'Hide' : 'Show'} Calculus Limit Projector
            </button>
          </div>
        </div>

        {/* Limit Graph Section */}
        {showLimitGraph && (
          <div className="mt-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
              <h3 className="font-bold text-gray-800 mb-4">📈 Daily Waste Increase Rate</h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={dailyIncrease}
                  onChange={(e) => setDailyIncrease(Number(e.target.value))}
                  className="flex-1 h-3 bg-purple-100 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-lg font-bold text-purple-600 w-24 text-right">
                  {dailyIncrease} kg/day
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Adjust to simulate different rates of daily waste increase
              </p>
            </div>
            <LimitGraph data={projectionData} dailyIncrease={dailyIncrease} />
          </div>
        )}
      </div>
    </div>
  );
}
