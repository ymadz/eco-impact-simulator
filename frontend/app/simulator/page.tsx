'use client';

import { useState } from 'react';
import { RefreshCw, Zap, Droplets, Trash2, TrendingUp, Calculator, Leaf } from 'lucide-react';
import LimitGraph from '@/components/LimitGraph';
import { calculateEcoScore, calculateProjection } from '@/lib/calculations';

type TabType = 'energy' | 'water' | 'waste';

export default function SimulatorPage() {
  const [activeTab, setActiveTab] = useState<TabType>('energy');
  const [electricity, setElectricity] = useState(5);
  const [water, setWater] = useState(20);
  const [waste, setWaste] = useState(2);
  const [dailyIncrease, setDailyIncrease] = useState(0.5);
  const [showResults, setShowResults] = useState(false);
  const [showLimitGraph, setShowLimitGraph] = useState(false);

  const ecoResult = calculateEcoScore(electricity, water, waste);
  const projectionData = calculateProjection(dailyIncrease);

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setElectricity(5);
    setWater(20);
    setWaste(2);
    setShowResults(false);
    setShowLimitGraph(false);
  };

  const tabs = [
    { id: 'energy' as TabType, label: 'Energy Use', icon: Zap },
    { id: 'water' as TabType, label: 'Water Usage', icon: Droplets },
    { id: 'waste' as TabType, label: 'Waste Production', icon: Trash2 },
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-orange-600 bg-orange-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Header - Chemistry style */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <Leaf className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          <span role="img" aria-label="calculator">🧮</span> Eco-Impact Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your environmental footprint by entering your daily resource consumption
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          {activeTab === 'energy' && (
            <div className="space-y-6">
              <h2 className="font-semibold text-gray-900 mb-4">Energy Consumption</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Electricity Usage
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      value={electricity}
                      onChange={(e) => setElectricity(Number(e.target.value))}
                      min="0"
                      max="50"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                    <span className="inline-flex items-center px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg bg-gray-100 text-gray-600 text-sm">
                      kWh
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Average: 5 kWh per day</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appliance Type
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white">
                    <option>Lights & Fans</option>
                    <option>Air Conditioning</option>
                    <option>Computers & Devices</option>
                    <option>Kitchen Appliances</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'water' && (
            <div className="space-y-6">
              <h2 className="font-semibold text-gray-900 mb-4">Water Consumption</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Water Usage
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      value={water}
                      onChange={(e) => setWater(Number(e.target.value))}
                      min="0"
                      max="200"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                    <span className="inline-flex items-center px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg bg-gray-100 text-gray-600 text-sm">
                      Liters
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Average: 20 liters per day</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Usage
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white">
                    <option>Drinking & Cooking</option>
                    <option>Cleaning</option>
                    <option>Bathroom</option>
                    <option>Garden/Plants</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'waste' && (
            <div className="space-y-6">
              <h2 className="font-semibold text-gray-900 mb-4">Waste Production</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Waste Generated
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      value={waste}
                      onChange={(e) => setWaste(Number(e.target.value))}
                      min="0"
                      max="20"
                      step="0.1"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                    <span className="inline-flex items-center px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg bg-gray-100 text-gray-600 text-sm">
                      kg
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Average: 2 kg per day</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Waste Type
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white">
                    <option>Mixed Waste</option>
                    <option>Recyclables</option>
                    <option>Food Waste</option>
                    <option>Paper & Cardboard</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary & Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Current Input Summary</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Zap className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{electricity}</div>
              <div className="text-xs text-gray-500">kWh/day</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{water}</div>
              <div className="text-xs text-gray-500">Liters/day</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Trash2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{waste}</div>
              <div className="text-xs text-gray-500">kg/day</div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleCalculate}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Calculate Impact
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>

        {/* Results */}
        {showResults && (
          <div className="space-y-6">
            {/* Eco Score Result */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your Eco-Impact Score</h3>
              
              <div className="flex items-center gap-6 mb-6">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center ${getGradeColor(ecoResult.grade)}`}>
                  <span className="text-4xl font-bold">{ecoResult.grade}</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{ecoResult.score} points</div>
                  <p className="text-gray-600">{ecoResult.message}</p>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700">Impact Breakdown</h4>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Electricity</span>
                    <span className="font-medium">{electricity * 5} points</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((electricity / 20) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Water</span>
                    <span className="font-medium">{water * 2} points</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((water / 100) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Waste</span>
                    <span className="font-medium">{waste * 10} points</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((waste / 10) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-semibold text-green-800 mb-3">Recommendations</h3>
              <ul className="space-y-2 text-sm text-green-700">
                {electricity > 10 && (
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Turn off lights and unplug devices when not in use to reduce electricity consumption.
                  </li>
                )}
                {water > 50 && (
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Fix leaky faucets and take shorter showers to conserve water.
                  </li>
                )}
                {waste > 5 && (
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Separate recyclables and compost food waste to reduce landfill contribution.
                  </li>
                )}
                {ecoResult.grade === 'A' && (
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Excellent work! Share your eco-friendly habits with others.
                  </li>
                )}
                {(electricity <= 10 && water <= 50 && waste <= 5) && ecoResult.grade !== 'A' && (
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Good progress! Small improvements can help you reach an A grade.
                  </li>
                )}
              </ul>
            </div>

            {/* Limit Graph Toggle */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Long-term Projection</h3>
                  <p className="text-sm text-gray-600">Calculus-based limit analysis of environmental impact</p>
                </div>
                <button
                  onClick={() => setShowLimitGraph(!showLimitGraph)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  {showLimitGraph ? 'Hide' : 'Show'} Projection
                </button>
              </div>

              {showLimitGraph && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Waste Increase Rate
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0.1"
                        max="5"
                        step="0.1"
                        value={dailyIncrease}
                        onChange={(e) => setDailyIncrease(Number(e.target.value))}
                        className="flex-1 h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                      <span className="text-lg font-bold text-purple-600 w-20 text-right">
                        {dailyIncrease} kg
                      </span>
                    </div>
                  </div>
                  <LimitGraph data={projectionData} dailyIncrease={dailyIncrease} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
