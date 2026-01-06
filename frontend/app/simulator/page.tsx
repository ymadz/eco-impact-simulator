'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Zap, Droplets, Trash2, Calculator, Leaf, Info, Lightbulb, ClipboardList, Plus } from 'lucide-react';
import { calculateEcoScore } from '@/lib/calculations';
import { FUN_FACTS } from '@/lib/constants';

type InputMode = 'activities' | 'manual';

// Activity types with conversion rates
const ACTIVITIES = {
  energy: [
    { id: 'led', name: 'LED Lights', icon: '💡', unit: 'hours', rate: 0.01 }, // 10W per hour
    { id: 'laptop', name: 'Laptop Use', icon: '💻', unit: 'hours', rate: 0.05 }, // 50W per hour
    { id: 'phone', name: 'Phone Charging', icon: '📱', unit: 'charges', rate: 0.015 }, // 15Wh per charge
    { id: 'fan', name: 'Electric Fan', icon: '🌀', unit: 'hours', rate: 0.075 }, // 75W per hour
  ],
  water: [
    { id: 'toilet', name: 'Toilet Flush', icon: '🚽', unit: 'flushes', rate: 6 }, // 6L per flush
    { id: 'teeth', name: 'Brushing Teeth', icon: '🪥', unit: 'times', rate: 2 }, // 2L per session
    { id: 'hands', name: 'Washing Hands', icon: '🧼', unit: 'times', rate: 1.5 }, // 1.5L per wash
    { id: 'shower', name: 'Shower', icon: '🚿', unit: 'minutes', rate: 9 }, // 9L per minute
  ],
  waste: [
    { id: 'paper', name: 'Paper Sheets', icon: '📄', unit: 'sheets', rate: 0.005 }, // 5g per sheet
    { id: 'bottle', name: 'Plastic Bottles', icon: '🧴', unit: 'bottles', rate: 0.025 }, // 25g per bottle
    { id: 'food', name: 'Food Waste', icon: '🍎', unit: 'portions', rate: 0.15 }, // 150g per portion
    { id: 'bag', name: 'Plastic Bags', icon: '🛍️', unit: 'bags', rate: 0.008 }, // 8g per bag
  ],
};

const PRESETS = [
  { id: 'school', name: 'Typical School Day', icon: '🏫', electricity: 5, water: 20, waste: 2 },
  { id: 'home', name: 'Day at Home', icon: '🏠', electricity: 10, water: 50, waste: 3 },
  { id: 'eco', name: 'Eco-Friendly Day', icon: '🌱', electricity: 3, water: 15, waste: 1 },
  { id: 'busy', name: 'Busy Day', icon: '⚡', electricity: 15, water: 70, waste: 4 },
];

export default function SimulatorPage() {
  const [inputMode, setInputMode] = useState<InputMode>('activities');
  
  // Activity tracking state
  const [energyActivities, setEnergyActivities] = useState<Record<string, number>>({
    led: 0, laptop: 0, phone: 0, fan: 0,
  });
  const [waterActivities, setWaterActivities] = useState<Record<string, number>>({
    toilet: 0, teeth: 0, hands: 0, shower: 0,
  });
  const [wasteActivities, setWasteActivities] = useState<Record<string, number>>({
    paper: 0, bottle: 0, food: 0, bag: 0,
  });

  // Custom activities
  const [customActivities, setCustomActivities] = useState<{
    energy: Array<{ name: string; value: number }>;
    water: Array<{ name: string; value: number }>;
    waste: Array<{ name: string; value: number }>;
  }>({
    energy: [],
    water: [],
    waste: [],
  });

  // Manual input state
  const [electricity, setElectricity] = useState(5);
  const [water, setWater] = useState(20);
  const [waste, setWaste] = useState(2);
  
  const [showResults, setShowResults] = useState(false);
  const [currentFunFact, setCurrentFunFact] = useState(FUN_FACTS[0]);

  // Calculate totals from activities
  const calculateFromActivities = () => {
    let totalElectricity = 0;
    let totalWater = 0;
    let totalWaste = 0;

    // Energy activities
    ACTIVITIES.energy.forEach(activity => {
      totalElectricity += energyActivities[activity.id] * activity.rate;
    });
    customActivities.energy.forEach(custom => {
      totalElectricity += custom.value;
    });

    // Water activities
    ACTIVITIES.water.forEach(activity => {
      totalWater += waterActivities[activity.id] * activity.rate;
    });
    customActivities.water.forEach(custom => {
      totalWater += custom.value;
    });

    // Waste activities
    ACTIVITIES.waste.forEach(activity => {
      totalWaste += wasteActivities[activity.id] * activity.rate;
    });
    customActivities.waste.forEach(custom => {
      totalWaste += custom.value;
    });

    return {
      electricity: parseFloat(totalElectricity.toFixed(2)),
      water: parseFloat(totalWater.toFixed(1)),
      waste: parseFloat(totalWaste.toFixed(2)),
    };
  };

  // Get current values based on input mode
  const getCurrentValues = () => {
    if (inputMode === 'activities') {
      return calculateFromActivities();
    }
    return { electricity, water, waste };
  };

  const currentValues = getCurrentValues();
  const ecoResult = calculateEcoScore(currentValues.electricity, currentValues.water, currentValues.waste);

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
    setEnergyActivities({ led: 0, laptop: 0, phone: 0, fan: 0 });
    setWaterActivities({ toilet: 0, teeth: 0, hands: 0, shower: 0 });
    setWasteActivities({ paper: 0, bottle: 0, food: 0, bag: 0 });
    setCustomActivities({ energy: [], water: [], waste: [] });
    setElectricity(5);
    setWater(20);
    setWaste(2);
    setShowResults(false);
  };

  const handlePresetSelect = (preset: typeof PRESETS[0]) => {
    setElectricity(preset.electricity);
    setWater(preset.water);
    setWaste(preset.waste);
  };

  const addCustomActivity = (type: 'energy' | 'water' | 'waste') => {
    const name = prompt(`Enter custom ${type} activity name:`);
    if (!name) return;

    const valueStr = prompt(`Enter ${type === 'energy' ? 'kWh' : type === 'water' ? 'liters' : 'kg'} value:`);
    const value = parseFloat(valueStr || '0');
    
    if (value > 0) {
      setCustomActivities(prev => ({
        ...prev,
        [type]: [...prev[type], { name, value }],
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <Calculator className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <span role="img" aria-label="calculator">🧮</span> Eco-Impact Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your daily activities and see their environmental impact in real-time
          </p>
          {/* Subject Integration Badge */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="group relative inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium cursor-help">
              <Info className="w-4 h-4" />
              <span>E-Tech: Data Interpretation & Surveys</span>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-80 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg z-10">
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                E-tech was integrated into this project through the use of technological tools that provide eco-impact score results based on user input on water usage, energy use, and waste production, promoting proper resource consumption daily.
              </div>
            </div>
          </div>
        </div>

        {/* Input Mode Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-green-600" />
            Choose Your Input Method
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setInputMode('activities')}
              className={`p-4 rounded-xl border-2 transition-all ${
                inputMode === 'activities'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="text-3xl mb-2">📋</div>
              <div className="font-bold text-gray-800">Track Activities</div>
              <div className="text-sm text-gray-600 mt-1">Most accurate - select what you did</div>
            </button>

            <button
              onClick={() => setInputMode('manual')}
              className={`p-4 rounded-xl border-2 transition-all ${
                inputMode === 'manual'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="text-3xl mb-2">✏️</div>
              <div className="font-bold text-gray-800">Manual Input</div>
              <div className="text-sm text-gray-600 mt-1">Quick presets or custom values</div>
            </button>
          </div>
        </div>

        {/* Track Activities Mode */}
        {inputMode === 'activities' && (
          <div className="space-y-6">
            {/* Energy Activities */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="h-7 w-7 text-yellow-600" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Energy Activities</h3>
                  <p className="text-sm text-gray-600">
                    Total: <span className="font-bold text-yellow-600">{currentValues.electricity.toFixed(2)} kWh</span>
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {ACTIVITIES.energy.map((activity) => (
                  <div key={activity.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{activity.icon}</span>
                        <span className="font-semibold text-gray-800">{activity.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        ≈ {(energyActivities[activity.id] * activity.rate).toFixed(3)} kWh
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="24"
                        value={energyActivities[activity.id]}
                        onChange={(e) =>
                          setEnergyActivities({ ...energyActivities, [activity.id]: parseFloat(e.target.value) })
                        }
                        className="flex-1"
                      />
                      <div className="w-24 text-right">
                        <span className="font-bold text-gray-800">{energyActivities[activity.id]}</span>
                        <span className="text-sm text-gray-600 ml-1">{activity.unit}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Custom Energy Activities */}
                {customActivities.energy.map((custom, idx) => (
                  <div key={idx} className="border border-green-300 bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">⭐</span>
                        <span className="font-semibold text-gray-800">{custom.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{custom.value} kWh</span>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => addCustomActivity('energy')}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-600 hover:border-green-400 hover:text-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Add Custom Energy Activity
                </button>
              </div>
            </div>

            {/* Water Activities */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Droplets className="h-7 w-7 text-blue-600" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Water Activities</h3>
                  <p className="text-sm text-gray-600">
                    Total: <span className="font-bold text-blue-600">{currentValues.water.toFixed(1)} L</span>
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {ACTIVITIES.water.map((activity) => (
                  <div key={activity.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{activity.icon}</span>
                        <span className="font-semibold text-gray-800">{activity.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        ≈ {(waterActivities[activity.id] * activity.rate).toFixed(1)} L
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max={activity.unit === 'minutes' ? 30 : 20}
                        value={waterActivities[activity.id]}
                        onChange={(e) =>
                          setWaterActivities({ ...waterActivities, [activity.id]: parseFloat(e.target.value) })
                        }
                        className="flex-1"
                      />
                      <div className="w-24 text-right">
                        <span className="font-bold text-gray-800">{waterActivities[activity.id]}</span>
                        <span className="text-sm text-gray-600 ml-1">{activity.unit}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Custom Water Activities */}
                {customActivities.water.map((custom, idx) => (
                  <div key={idx} className="border border-blue-300 bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">⭐</span>
                        <span className="font-semibold text-gray-800">{custom.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{custom.value} L</span>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => addCustomActivity('water')}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Add Custom Water Activity
                </button>
              </div>
            </div>

            {/* Waste Activities */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Trash2 className="h-7 w-7 text-orange-600" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Waste Activities</h3>
                  <p className="text-sm text-gray-600">
                    Total: <span className="font-bold text-orange-600">{currentValues.waste.toFixed(2)} kg</span>
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {ACTIVITIES.waste.map((activity) => (
                  <div key={activity.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{activity.icon}</span>
                        <span className="font-semibold text-gray-800">{activity.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        ≈ {(wasteActivities[activity.id] * activity.rate).toFixed(3)} kg
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max={activity.unit === 'sheets' ? 50 : 20}
                        value={wasteActivities[activity.id]}
                        onChange={(e) =>
                          setWasteActivities({ ...wasteActivities, [activity.id]: parseFloat(e.target.value) })
                        }
                        className="flex-1"
                      />
                      <div className="w-24 text-right">
                        <span className="font-bold text-gray-800">{wasteActivities[activity.id]}</span>
                        <span className="text-sm text-gray-600 ml-1">{activity.unit}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Custom Waste Activities */}
                {customActivities.waste.map((custom, idx) => (
                  <div key={idx} className="border border-orange-300 bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">⭐</span>
                        <span className="font-semibold text-gray-800">{custom.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{custom.value} kg</span>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => addCustomActivity('waste')}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-600 hover:border-orange-400 hover:text-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Add Custom Waste Activity
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Manual Input Mode */}
        {inputMode === 'manual' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Enter Values</h3>
            
            {/* Quick Presets */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Presets:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset)}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all text-left"
                  >
                    <div className="text-3xl mb-2">{preset.icon}</div>
                    <div className="font-bold text-gray-800 text-sm mb-2">{preset.name}</div>
                    <div className="space-y-0.5 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-yellow-600" />
                        <span>{preset.electricity} kWh</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplets className="h-3 w-3 text-blue-600" />
                        <span>{preset.water} L</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trash2 className="h-3 w-3 text-orange-600" />
                        <span>{preset.waste} kg</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Input Fields */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Or Enter Custom Values:</h4>
              <div className="grid gap-6">
              {/* Electricity Input */}
              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Electricity (kWh)
                </label>
                <input
                  type="number"
                  value={electricity}
                  onChange={(e) => setElectricity(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Water Input */}
              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                  <Droplets className="h-5 w-5 text-blue-600" />
                  Water (Liters)
                </label>
                <input
                  type="number"
                  value={water}
                  onChange={(e) => setWater(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Waste Input */}
              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                  <Trash2 className="h-5 w-5 text-orange-600" />
                  Waste (kg)
                </label>
                <input
                  type="number"
                  value={waste}
                  onChange={(e) => setWaste(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            </div>
          </div>
        )}

        {/* Current Summary */}
        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl shadow-lg p-8 text-white mt-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Your Current Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/20 backdrop-blur rounded-xl p-6 text-center">
              <Zap className="h-10 w-10 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-1">{currentValues.electricity}</div>
              <div className="text-sm opacity-90">kWh Electricity</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-6 text-center">
              <Droplets className="h-10 w-10 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-1">{currentValues.water}</div>
              <div className="text-sm opacity-90">Liters Water</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-6 text-center">
              <Trash2 className="h-10 w-10 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-1">{currentValues.waste}</div>
              <div className="text-sm opacity-90">kg Waste</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={handleCalculate}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
          >
            <Calculator className="h-5 w-5" />
            Calculate Impact
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all"
          >
            <RefreshCw className="h-5 w-5" />
            Reset
          </button>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="mt-12 space-y-6 animate-fade-in">
            {/* Eco Score Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-green-500">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
                  <Leaf className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">Your Eco-Score</h3>
                <div className={`text-7xl font-bold ${
                  ecoResult.grade === 'A' ? 'text-green-600' :
                  ecoResult.grade === 'B' ? 'text-blue-600' :
                  ecoResult.grade === 'C' ? 'text-yellow-600' :
                  ecoResult.grade === 'D' ? 'text-orange-600' :
                  'text-red-600'
                } mb-2`}>
                  {ecoResult.score}
                </div>
                <div className={`inline-block text-2xl font-bold px-6 py-2 rounded-full ${
                  ecoResult.grade === 'A' ? 'bg-green-100 text-green-700' :
                  ecoResult.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                  ecoResult.grade === 'C' ? 'bg-yellow-100 text-yellow-700' :
                  ecoResult.grade === 'D' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  Grade: {ecoResult.grade}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <p className="text-gray-700 text-center text-lg">{ecoResult.message}</p>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <span className="font-semibold text-gray-800">Energy</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-700">{currentValues.electricity} kWh</div>
                  <div className="text-sm text-gray-600 mt-1">{ecoResult.breakdown.energy}</div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-gray-800">Water</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-700">{currentValues.water} L</div>
                  <div className="text-sm text-gray-600 mt-1">{ecoResult.breakdown.water}</div>
                </div>

                <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Trash2 className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold text-gray-800">Waste</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-700">{currentValues.waste} kg</div>
                  <div className="text-sm text-gray-600 mt-1">{ecoResult.breakdown.waste}</div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-green-600" />
                  Recommendations for Improvement
                </h4>
                <ul className="space-y-2">
                  {ecoResult.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Fun Fact */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 backdrop-blur rounded-full p-3">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2">Did You Know?</h4>
                  <p className="text-white/90">{typeof currentFunFact === 'string' ? currentFunFact : currentFunFact.fact}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
