'use client';

import { useState } from 'react';
import { FlaskConical, Droplets, AlertTriangle, Info, Calculator } from 'lucide-react';
import PollutionTank from '@/components/PollutionTank';
import { calculateConcentration, WATER_BODIES, POLLUTANTS } from '@/lib/calculations';

export default function ChemistryPage() {
  const [pollutantType, setPollutantType] = useState('detergent');
  const [pollutantAmount, setPollutantAmount] = useState(50);
  const [pollutantUnit, setPollutantUnit] = useState<'g' | 'kg' | 'mg'>('g');
  const [waterBody1, setWaterBody1] = useState('canal');
  const [waterBody2, setWaterBody2] = useState('river');
  
  // %wt Calculator State
  const [massSolute, setMassSolute] = useState(0);
  const [massSolution, setMassSolution] = useState(0);

  // Convert pollutant amount to grams for calculations
  const getAmountInGrams = () => {
    switch (pollutantUnit) {
      case 'kg': return pollutantAmount * 1000;
      case 'mg': return pollutantAmount / 1000;
      default: return pollutantAmount;
    }
  };

  const amountInGrams = getAmountInGrams();
  const result1 = calculateConcentration(amountInGrams, waterBody1, pollutantType);
  const result2 = calculateConcentration(amountInGrams, waterBody2, pollutantType);

  // Calculate %wt
  const calculatePercentWeight = () => {
    if (massSolution === 0) return 0;
    return ((massSolute / massSolution) * 100).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <FlaskConical className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            🧪 Chemistry Pollution Lab
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore how the same amount of pollutant creates different concentrations 
            in different water bodies. Learn about dilution and its effects on toxicity!
          </p>
          {/* Subject Integration Badge */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
              <Info className="w-4 h-4" />
              <span>Chemistry Integration: Concentration & Dilution Formulas</span>
            </div>
          </div>
        </div>

        {/* Formula Explanation */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 max-w-3xl mx-auto">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            The Science Behind It
          </h2>
          <div className="bg-blue-50 p-4 rounded-xl mb-4">
            <p className="text-center text-2xl font-mono font-bold text-blue-800 mb-2">
              %wt = (mass solute ÷ mass solution) × 100
            </p>
            <p className="text-center text-sm text-blue-600">
              Percent by Weight (Weight/Weight Percentage)
            </p>
          </div>
          <p className="text-gray-600 text-sm">
            This formula calculates the <strong>percent by weight (%wt)</strong> of a pollutant in a solution. 
            It shows what fraction of the total solution mass is made up by the solute (pollutant). 
            The same amount of detergent in a small canal creates a higher %wt concentration than in a large river!
          </p>
        </div>

        {/* %wt Calculator */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-500" />
              %wt Calculator
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mass of Solute (pollutant)</label>
                <div className="flex">
                  <input
                    type="number"
                    value={massSolute}
                    onChange={(e) => setMassSolute(Number(e.target.value))}
                    min="0"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 bg-white"
                    placeholder="Enter mass"
                  />
                  <span className="inline-flex items-center px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg bg-gray-100 text-gray-600 text-sm">
                    grams
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mass of Solution (total)</label>
                <div className="flex">
                  <input
                    type="number"
                    value={massSolution}
                    onChange={(e) => setMassSolution(Number(e.target.value))}
                    min="0"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 bg-white"
                    placeholder="Enter mass"
                  />
                  <span className="inline-flex items-center px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg bg-gray-100 text-gray-600 text-sm">
                    grams
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-800">Percent by Weight (%wt):</span>
                <span className="text-2xl font-bold text-blue-900">{calculatePercentWeight()}%</span>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                This represents what percentage of the total solution is made up of the pollutant.
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="font-bold text-gray-800 mb-6">Experiment Controls</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pollutant Selection */}
            <div>
              <label className="block font-semibold text-gray-700 mb-3">
                Select Pollutant Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(POLLUTANTS).map(([key, pollutant]) => (
                  <button
                    key={key}
                    onClick={() => setPollutantType(key)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      pollutantType === key
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className={`font-semibold ${pollutantType === key ? 'text-blue-900' : 'text-gray-900'}`}>
                      {pollutant.name}
                    </div>
                    <div className={`text-xs ${pollutantType === key ? 'text-blue-700' : 'text-gray-700'}`}>
                      Toxicity Factor: {pollutant.toxicityFactor}x
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Calculator Input */}
            <div>
              <label className="block font-semibold text-gray-700 mb-3">
                Pollutant Amount
              </label>
              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  value={pollutantAmount}
                  onChange={(e) => setPollutantAmount(Number(e.target.value))}
                  min="1"
                  max="10000"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 bg-white"
                />
                <select
                  value={pollutantUnit}
                  onChange={(e) => setPollutantUnit(e.target.value as 'g' | 'kg' | 'mg')}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900"
                >
                  <option value="mg">mg</option>
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                </select>
              </div>
              <div className="text-sm text-gray-500">
                Equivalent: <strong>{amountInGrams.toLocaleString()} grams</strong>
              </div>
              <div className="mt-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                💡 <strong>Quick Reference:</strong> A typical soap bar = ~100g, Detergent cap = ~30mL
              </div>
            </div>
          </div>

          {/* Water Body Selection */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-3">
                Water Body 1 (Compare)
              </label>
              <select
                value={waterBody1}
                onChange={(e) => setWaterBody1(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none bg-white text-gray-900"
              >
                {Object.entries(WATER_BODIES).map(([key, body]) => (
                  <option key={key} value={key}>
                    {body.name} ({body.volume}L)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-3">
                Water Body 2 (Compare)
              </label>
              <select
                value={waterBody2}
                onChange={(e) => setWaterBody2(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none bg-white text-gray-900"
              >
                {Object.entries(WATER_BODIES).map(([key, body]) => (
                  <option key={key} value={key}>
                    {body.name} ({body.volume}L)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Comparison Tanks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <PollutionTank
            result={result1}
            waterBodyName={WATER_BODIES[waterBody1].name}
            pollutantName={POLLUTANTS[pollutantType].name}
            amount={amountInGrams}
          />
          <PollutionTank
            result={result2}
            waterBodyName={WATER_BODIES[waterBody2].name}
            pollutantName={POLLUTANTS[pollutantType].name}
            amount={amountInGrams}
          />
        </div>

        {/* Key Lesson */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 rounded-2xl">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-xl mb-3">Key Lesson</h3>
              <p className="text-blue-100 mb-4">
                The same {amountInGrams}g of {POLLUTANTS[pollutantType].name.toLowerCase()} creates:
              </p>
              <ul className="space-y-2">
                <li>
                  • In {WATER_BODIES[waterBody1].name}: <strong>{result1.concentration.toFixed(4)} g/L</strong> concentration 
                  ({result1.severity.toUpperCase()})
                </li>
                <li>
                  • In {WATER_BODIES[waterBody2].name}: <strong>{result2.concentration.toFixed(4)} g/L</strong> concentration 
                  ({result2.severity.toUpperCase()})
                </li>
              </ul>
              <p className="mt-4 text-blue-100">
                <strong>Environmental damage depends on concentration, not just quantity.</strong> Always 
                dispose of chemicals properly - small drains lead to big problems!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
