'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Zap, Droplets, Trash2, Calculator, Leaf, Info, Lightbulb, MapPin } from 'lucide-react';
import { calculateEcoScore } from '@/lib/calculations';
import { FUN_FACTS, USAGE_ANALOGIES, WASTE_TYPES } from '@/lib/constants';

type LocationType = 'school' | 'house' | 'office' | 'community';

export default function SimulatorPage() {
  const [location, setLocation] = useState<LocationType>('school');
  const [electricity, setElectricity] = useState(5);
  const [water, setWater] = useState(20);
  const [waste, setWaste] = useState(2);
  const [showResults, setShowResults] = useState(false);
  const [currentFunFact, setCurrentFunFact] = useState(FUN_FACTS[0]);

  // Location-based max values
  const locationMaxValues = {
    school: { electricity: 50, water: 200, waste: 20 },
    house: { electricity: 30, water: 150, waste: 10 },
    office: { electricity: 40, water: 100, waste: 15 },
    community: { electricity: 100, water: 500, waste: 50 },
  };

  const locationLabels = {
    school: { name: 'School', icon: '🏫' },
    house: { name: 'House', icon: '🏠' },
    office: { name: 'Office', icon: '🏢' },
    community: { name: 'Community', icon: '🏘️' },
  };

  const ecoResult = calculateEcoScore(electricity, water, waste);

  // Rotate fun facts
  useEffect(() => {
    if (showResults) {
      const interval = setInterval(() => {
        const randomFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
        setCurrentFunFact(randomFact);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [showResults]);

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setElectricity(5);
    setWater(20);
    setWaste(2);
    setShowResults(false);
  };

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
      {/* Header */}
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
        {/* Subject Integration Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <Info className="w-4 h-4" />
            <span>E-Tech: Data Interpretation & Surveys</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Location Selector */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            Select Location to Calculate Impact
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.keys(locationLabels) as LocationType[]).map((loc) => (
              <button
                key={loc}
                onClick={() => setLocation(loc)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  location === loc
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{locationLabels[loc].icon}</div>
                <div className="font-medium text-gray-900">{locationLabels[loc].name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Max: {locationMaxValues[loc].electricity} kWh
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <div className="mb-8">
          <h2 className="font-semibold text-gray-900 mb-6 text-center">Resource Consumption for {locationLabels[location].name}</h2>
          
          {/* Three Column Grid for Inputs */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Energy Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Energy</h3>
              </div>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Electricity Usage
              </label>
              <div className="flex mb-2">
                <input
                  type="number"
                  value={electricity}
                  onChange={(e) => setElectricity(Number(e.target.value))}
                  min="0"
                  max={locationMaxValues[location].electricity}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900 bg-white text-sm"
                />
                <span className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-lg bg-gray-100 text-gray-600 text-sm">
                  kWh
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">Max: {locationMaxValues[location].electricity} kWh/day</p>
              
              {/* Compact Reference */}
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-xs font-medium text-yellow-800 mb-2 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" />
                  Quick Reference
                </p>
                <div className="space-y-1 text-xs text-yellow-700">
                  {USAGE_ANALOGIES.energy.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <span>{item.icon}</span>
                      <span className="truncate">{item.description}: {item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Water Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Water</h3>
              </div>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Water Usage
              </label>
              <div className="flex mb-2">
                <input
                  type="number"
                  value={water}
                  onChange={(e) => setWater(Number(e.target.value))}
                  min="0"
                  max={locationMaxValues[location].water}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900 bg-white text-sm"
                />
                <span className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-lg bg-gray-100 text-gray-600 text-sm">
                  Liters
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">Max: {locationMaxValues[location].water} L/day</p>
              
              {/* Compact Reference */}
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-800 mb-2 flex items-center gap-1">
                  <Droplets className="w-3 h-3" />
                  Quick Reference
                </p>
                <div className="space-y-1 text-xs text-blue-700">
                  {USAGE_ANALOGIES.water.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <span>{item.icon}</span>
                      <span className="truncate">{item.description}: {item.amount}L</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Waste Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Waste</h3>
              </div>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Waste Generated
              </label>
              <div className="flex mb-2">
                <input
                  type="number"
                  value={waste}
                  onChange={(e) => setWaste(Number(e.target.value))}
                  min="0"
                  max={locationMaxValues[location].waste}
                  step="0.1"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900 bg-white text-sm"
                />
                <span className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-lg bg-gray-100 text-gray-600 text-sm">
                  kg
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">Max: {locationMaxValues[location].waste} kg/day</p>
              
              {/* Compact Reference */}
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs font-medium text-green-800 mb-2 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Common Waste Types
                </p>
                <div className="space-y-1 text-xs text-green-700">
                  {WASTE_TYPES.slice(0, 3).map((type) => (
                    <div key={type.id} className="flex items-center gap-1">
                      <span>{type.icon}</span>
                      <span className="truncate">{type.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Waste Tips - Full Width Below */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <h4 className="text-sm font-semibold text-green-800 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Reference Tips: How to Reduce Waste
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {WASTE_TYPES.map((type) => (
                <div 
                  key={type.id} 
                  className="p-2 rounded-lg bg-white text-center"
                >
                  <span className="text-xl">{type.icon}</span>
                  <p className="text-xs font-medium text-gray-800 mt-1">{type.name}</p>
                  <p className="text-xs text-green-600 mt-1">{type.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary & Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Current Input Summary for {locationLabels[location].name}</h3>
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
              <h3 className="font-semibold text-gray-900 mb-4">Your Eco-Impact Score for {locationLabels[location].name}</h3>
              
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
                      style={{ width: `${Math.min((electricity / locationMaxValues[location].electricity) * 100, 100)}%` }}
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
                      style={{ width: `${Math.min((water / locationMaxValues[location].water) * 100, 100)}%` }}
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
                      style={{ width: `${Math.min((waste / locationMaxValues[location].waste) * 100, 100)}%` }}
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

            {/* Fun Fact Section - E-Tech Integration */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">Did You Know?</h3>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">E-Tech Fun Fact</span>
                  </div>
                  <p className="text-purple-100 text-lg mb-2">{currentFunFact.icon} {currentFunFact.fact}</p>
                  <p className="text-xs text-purple-200">Source: {currentFunFact.source}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-xs text-purple-200 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Fun facts rotate every 8 seconds to help you learn while you explore!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
