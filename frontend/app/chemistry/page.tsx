'use client';

import { useState } from 'react';
import { FlaskConical, Droplets, AlertTriangle, Info, Calculator, ArrowRightLeft } from 'lucide-react';
import PollutionTank from '@/components/PollutionTank';
import { calculateConcentration, WATER_BODIES, POLLUTANTS } from '@/lib/calculations';

export default function ChemistryPage() {
  const [pollutantType, setPollutantType] = useState('detergent');
  const [pollutantAmount, setPollutantAmount] = useState(50);
  const [pollutantUnit, setPollutantUnit] = useState<'g' | 'kg' | 'mg'>('g');
  const [waterBody1, setWaterBody1] = useState('canal');
  const [waterBody2, setWaterBody2] = useState('river');
  
  // Unit Converter State
  const [showConverter, setShowConverter] = useState(false);
  const [converterValue, setConverterValue] = useState(1);
  const [converterFrom, setConverterFrom] = useState('mL');
  const [converterTo, setConverterTo] = useState('L');

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

  // Unit Conversion Logic
  const conversionFactors: Record<string, Record<string, number>> = {
    // Volume conversions (base: mL)
    'mL': { 'mL': 1, 'L': 0.001, 'gal': 0.000264172 },
    'L': { 'mL': 1000, 'L': 1, 'gal': 0.264172 },
    'gal': { 'mL': 3785.41, 'L': 3.78541, 'gal': 1 },
    // Mass conversions (base: g)
    'mg': { 'mg': 1, 'g': 0.001, 'kg': 0.000001 },
    'g': { 'mg': 1000, 'g': 1, 'kg': 0.001 },
    'kg': { 'mg': 1000000, 'g': 1000, 'kg': 1 },
    // Moles (assuming water, molar mass ~18 g/mol)
    'mol': { 'g': 18, 'mol': 1 },
  };

  const getConvertedValue = () => {
    // Handle volume conversions
    if (['mL', 'L', 'gal'].includes(converterFrom) && ['mL', 'L', 'gal'].includes(converterTo)) {
      return (converterValue * conversionFactors[converterFrom][converterTo]).toFixed(4);
    }
    // Handle mass conversions
    if (['mg', 'g', 'kg'].includes(converterFrom) && ['mg', 'g', 'kg'].includes(converterTo)) {
      return (converterValue * conversionFactors[converterFrom][converterTo]).toFixed(4);
    }
    // Handle g to mol and vice versa (assuming generic substance ~18 g/mol like water)
    if (converterFrom === 'g' && converterTo === 'mol') {
      return (converterValue / 18).toFixed(4);
    }
    if (converterFrom === 'mol' && converterTo === 'g') {
      return (converterValue * 18).toFixed(4);
    }
    return converterValue.toFixed(4);
  };

  const swapUnits = () => {
    const temp = converterFrom;
    setConverterFrom(converterTo);
    setConverterTo(temp);
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
          <p className="text-gray-600 text-sm mb-4">
            This formula calculates the <strong>percent by weight (%wt)</strong> of a pollutant in a solution. 
            It shows what fraction of the total solution mass is made up by the solute (pollutant).
          </p>
          <div className="bg-purple-50 p-4 rounded-xl">
            <p className="text-center text-xl font-mono font-bold text-purple-800 mb-2">
              Concentration (C) = Pollutant Amount (n) ÷ Water Volume (V)
            </p>
            <p className="text-center text-sm text-purple-600">
              Mass Concentration (g/L)
            </p>
          </div>
          <p className="text-gray-600 text-sm mt-4">
            The <strong>concentration</strong> of a pollutant depends on both the amount of pollutant AND 
            the volume of water it enters. The same amount of detergent in a small canal is much more 
            dangerous than in a large river!
          </p>
        </div>

        {/* Unit Converter Toggle */}
        <div className="max-w-3xl mx-auto mb-8">
          <button
            onClick={() => setShowConverter(!showConverter)}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Calculator className="h-5 w-5" />
            {showConverter ? 'Hide' : 'Show'} Unit Converter
          </button>

          {showConverter && (
            <div className="mt-4 bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-purple-500" />
                Unit Converter
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                  <input
                    type="number"
                    value={converterValue}
                    onChange={(e) => setConverterValue(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-900 bg-white"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                    <select
                      value={converterFrom}
                      onChange={(e) => setConverterFrom(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                    >
                      <optgroup label="Volume">
                        <option value="mL">milliliters (mL)</option>
                        <option value="L">liters (L)</option>
                        <option value="gal">gallons (gal)</option>
                      </optgroup>
                      <optgroup label="Mass">
                        <option value="mg">milligrams (mg)</option>
                        <option value="g">grams (g)</option>
                        <option value="kg">kilograms (kg)</option>
                      </optgroup>
                      <optgroup label="Amount">
                        <option value="mol">moles (mol)</option>
                      </optgroup>
                    </select>
                  </div>
                  
                  <button
                    onClick={swapUnits}
                    className="mt-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <ArrowRightLeft className="h-5 w-5 text-gray-600" />
                  </button>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                    <select
                      value={converterTo}
                      onChange={(e) => setConverterTo(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                    >
                      <optgroup label="Volume">
                        <option value="mL">milliliters (mL)</option>
                        <option value="L">liters (L)</option>
                        <option value="gal">gallons (gal)</option>
                      </optgroup>
                      <optgroup label="Mass">
                        <option value="mg">milligrams (mg)</option>
                        <option value="g">grams (g)</option>
                        <option value="kg">kilograms (kg)</option>
                      </optgroup>
                      <optgroup label="Amount">
                        <option value="mol">moles (mol)</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Result</label>
                  <div className="px-4 py-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 font-bold text-lg">
                    {getConvertedValue()} {converterTo}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                <strong>Note:</strong> Mole conversions assume water (H₂O) with molar mass ≈ 18 g/mol. 
                For other substances, multiply by their specific molar mass.
              </div>
            </div>
          )}
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
