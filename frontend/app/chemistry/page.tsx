'use client';

import { useState } from 'react';
import { FlaskConical, Droplets, AlertTriangle } from 'lucide-react';
import PollutionTank from '@/components/PollutionTank';
import { calculateConcentration, WATER_BODIES, POLLUTANTS } from '@/lib/calculations';

export default function ChemistryPage() {
  const [pollutantType, setPollutantType] = useState('detergent');
  const [pollutantAmount, setPollutantAmount] = useState(50);
  const [waterBody1, setWaterBody1] = useState('canal');
  const [waterBody2, setWaterBody2] = useState('river');

  const result1 = calculateConcentration(pollutantAmount, waterBody1, pollutantType);
  const result2 = calculateConcentration(pollutantAmount, waterBody2, pollutantType);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
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
        </div>

        {/* Formula Explanation */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 max-w-3xl mx-auto">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            The Science Behind It
          </h2>
          <div className="bg-blue-50 p-4 rounded-xl mb-4">
            <p className="text-center text-2xl font-mono font-bold text-blue-800">
              Concentration (C) = Pollutant Amount (n) ÷ Water Volume (V)
            </p>
          </div>
          <p className="text-gray-600 text-sm">
            This formula shows that the <strong>concentration</strong> of a pollutant depends 
            on both the amount of pollutant AND the volume of water it enters. The same amount 
            of detergent in a small canal is much more dangerous than in a large river!
          </p>
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
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold">{pollutant.name}</div>
                    <div className="text-xs text-gray-500">
                      Toxicity Factor: {pollutant.toxicityFactor}x
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Slider */}
            <div>
              <label className="block font-semibold text-gray-700 mb-3">
                Pollutant Amount: {pollutantAmount}g
              </label>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={pollutantAmount}
                onChange={(e) => setPollutantAmount(Number(e.target.value))}
                className="w-full h-3 bg-blue-100 rounded-lg appearance-none cursor-pointer mb-4"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>10g</span>
                <span>500g</span>
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
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
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
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
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
            amount={pollutantAmount}
          />
          <PollutionTank
            result={result2}
            waterBodyName={WATER_BODIES[waterBody2].name}
            pollutantName={POLLUTANTS[pollutantType].name}
            amount={pollutantAmount}
          />
        </div>

        {/* Key Lesson */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 rounded-2xl">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-xl mb-3">Key Lesson</h3>
              <p className="text-blue-100 mb-4">
                The same {pollutantAmount}g of {POLLUTANTS[pollutantType].name.toLowerCase()} creates:
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
