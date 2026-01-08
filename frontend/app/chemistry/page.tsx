'use client';

import { useState } from 'react';
import { FlaskConical, AlertTriangle, Calculator, Beaker, Info } from 'lucide-react';
import PollutionTank from '@/components/PollutionTank';
import { calculateConcentration, WATER_BODIES, POLLUTANTS } from '@/lib/calculations';

export default function ChemistryPage() {
  // Tab State
  const [activeTab, setActiveTab] = useState<'wt' | 'comparison'>('wt');

  // %wt Calculator State
  const [massSolute, setMassSolute] = useState(0);
  const [massSolution, setMassSolution] = useState(0);
  const [massUnit, setMassUnit] = useState<'g' | 'kg' | 'mg'>('g');
  const [showWhyHow, setShowWhyHow] = useState(false);

  // Water Body Comparison State
  const [pollutantType, setPollutantType] = useState('detergent');
  const [pollutantAmount, setPollutantAmount] = useState(50);
  const [pollutantUnit, setPollutantUnit] = useState<'g' | 'kg' | 'mg'>('g');
  const [waterBody1, setWaterBody1] = useState('canal');
  const [waterBody2, setWaterBody2] = useState('river');

  // Calculate %wt
  const calculatePercentWeight = () => {
    if (massSolution === 0) return 0;
    return ((massSolute / massSolution) * 100).toFixed(2);
  };

  // Convert pollutant amount to grams
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
            Learn about concentration, dilution, and environmental impact through interactive experiments!
          </p>
          {/* Subject Integration Badge */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="group relative inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium cursor-help">
              <Info className="w-4 h-4" />
              <span>Chemistry: Environmental Impact Analysis</span>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-80 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg z-10">
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                Chemistry was integrated into this website through the addition of a percent-by-weight calculator and water body comparison feature that allows users to input specific values to determine the environmental impact of pollutants.
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-md p-1.5">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('wt')}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === 'wt'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <Calculator className="h-4 w-4" />
                  <span>%wt Calculator</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === 'comparison'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <Beaker className="h-4 w-4" />
                  <span>Water Body Comparison</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'wt' ? (
          <>
            {/* Formula Explanation */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 max-w-3xl mx-auto">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-blue-500" />
                The Science Behind It
              </h2>

              {/* Key Definitions */}
              <div className="bg-purple-50 p-4 rounded-xl mb-4 border border-purple-200">
                <p className="text-sm text-purple-900 mb-2">
                  <strong>Solute:</strong> The substance being dissolved (e.g., pollutant, detergent)
                </p>
                <p className="text-sm text-purple-900">
                  <strong>Solution:</strong> Solute + Solvent (the combined mixture)
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl mb-4">
                <p className="text-center text-2xl font-mono font-bold text-blue-800 mb-2">
                  %wt = (mass of solute ÷ mass of solution) × 100
                </p>
                <p className="text-center text-sm text-blue-600 mb-3">
                  Mass Percent (Percent by Weight)
                </p>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>☆ <strong>mass of solute</strong> = the pollutant mass you add</p>
                  <p>☆ <strong>mass of solution</strong> = solute + solvent combined!</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Mass percent (%wt) expresses how much of a solution&apos;s total mass comes from the solute. It shows what fraction of the total solution mass is made up by the pollutant.
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
                        step="any"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 bg-white"
                        placeholder="Enter mass"
                      />
                      <select
                        value={massUnit}
                        onChange={(e) => setMassUnit(e.target.value as 'g' | 'kg' | 'mg')}
                        className="px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="mg">mg</option>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mass of Solution (solute + solvent)</label>
                    <div className="flex">
                      <input
                        type="number"
                        value={massSolution}
                        onChange={(e) => setMassSolution(Number(e.target.value))}
                        min="0"
                        step="any"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 bg-white"
                        placeholder="Enter mass"
                      />
                      <span className="inline-flex items-center px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg bg-gray-100 text-gray-600 text-sm">
                        {massUnit}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {/* Result box - takes 2 columns */}
                  <div className="md:col-span-2 p-6 bg-blue-50 border border-blue-200 rounded-xl flex flex-col justify-center">
                    <div className="text-center">
                      <div className="text-sm font-medium text-blue-800 mb-3">Percent by Weight (%wt)</div>
                      <div className="text-5xl font-bold text-blue-900 mb-4">{calculatePercentWeight()}%</div>
                      <div className="inline-block px-4 py-2 bg-blue-100 rounded-lg">
                        <p className="text-sm text-blue-700 font-medium">
                          {massSolute > 0 && massSolution > 0
                            ? `${massSolute}${massUnit} ÷ ${massSolution}${massUnit} × 100`
                            : 'Enter values to calculate'}
                        </p>
                      </div>
                      <p className="text-xs text-blue-600 mt-4">
                        This represents what percentage of the total solution is made up of the pollutant.
                      </p>
                    </div>
                  </div>

                  {/* Visual Tank Simulation - takes 3 columns */}
                  <div className="md:col-span-3">
                    <div className={`p-6 rounded-2xl border-4 shadow-xl transition-all duration-500 ${Number(calculatePercentWeight()) === 0
                      ? 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100'
                      : Number(calculatePercentWeight()) <= 0.1
                        ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-100'
                        : Number(calculatePercentWeight()) <= 1
                          ? 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-100'
                          : Number(calculatePercentWeight()) <= 10
                            ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100'
                            : 'border-red-600 bg-gradient-to-br from-red-50 to-rose-100'
                      }`}>
                      <div className="text-center mb-4">
                        <div className={`inline-block px-6 py-2 rounded-full font-bold text-sm shadow-md ${Number(calculatePercentWeight()) === 0
                          ? 'bg-gray-200 text-gray-700'
                          : Number(calculatePercentWeight()) <= 0.1
                            ? 'bg-green-500 text-white'
                            : Number(calculatePercentWeight()) <= 1
                              ? 'bg-yellow-500 text-white'
                              : Number(calculatePercentWeight()) <= 10
                                ? 'bg-orange-500 text-white'
                                : 'bg-red-600 text-white'
                          }`}>
                          {Number(calculatePercentWeight()) === 0
                            ? '⚪ EMPTY'
                            : Number(calculatePercentWeight()) <= 0.1
                              ? '🟢 SAFE'
                              : Number(calculatePercentWeight()) <= 1
                                ? '🟡 MODERATE'
                                : Number(calculatePercentWeight()) <= 10
                                  ? '🟠 HAZARDOUS'
                                  : '🔴 EXTREMELY HAZARDOUS'}
                        </div>
                        <div className="mt-2 text-2xl font-bold text-gray-800">
                          {calculatePercentWeight()}%
                        </div>
                      </div>

                      {/* Tank Visual with measurement marks */}
                      <div className="relative px-8">
                        {/* Measurement marks - inside container */}
                        <div className="absolute left-0 top-0 h-40 flex flex-col justify-between text-xs text-gray-500 font-mono">
                          <span>100%</span>
                          <span>75%</span>
                          <span>50%</span>
                          <span>25%</span>
                          <span>0%</span>
                        </div>

                        <div className="relative h-40 bg-gradient-to-b from-gray-100 to-white border-4 border-gray-400 rounded-lg overflow-hidden shadow-inner ml-12">
                          {/* Grid lines for depth */}
                          <div className="absolute inset-0 opacity-10">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="absolute w-full border-t border-gray-400" style={{ top: `${(i + 1) * 20}%` }} />
                            ))}
                          </div>

                          {/* Liquid fill with gradient and wave effect */}
                          <div
                            className={`absolute bottom-0 w-full transition-all duration-700 ease-out ${Number(calculatePercentWeight()) === 0
                              ? 'bg-transparent'
                              : Number(calculatePercentWeight()) <= 0.1
                                ? 'bg-gradient-to-t from-green-500 via-green-400 to-green-300'
                                : Number(calculatePercentWeight()) <= 1
                                  ? 'bg-gradient-to-t from-yellow-500 via-yellow-400 to-yellow-300'
                                  : Number(calculatePercentWeight()) <= 10
                                    ? 'bg-gradient-to-t from-orange-500 via-orange-400 to-orange-300'
                                    : 'bg-gradient-to-t from-red-600 via-red-500 to-red-400'
                              }`}
                            style={{
                              height: `${Math.min(100, Number(calculatePercentWeight()))}%`,
                              boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.1)'
                            }}
                          >
                            {/* Wave effect at top of liquid */}
                            {massSolute > 0 && massSolution > 0 && (
                              <div className="absolute top-0 w-full h-2 bg-white opacity-20 animate-pulse" />
                            )}

                            {/* Enhanced floating particles */}
                            {massSolute > 0 && massSolution > 0 && Array.from({ length: Math.min(20, Math.floor(Number(calculatePercentWeight()) / 2) + 5) }).map((_, i) => (
                              <div
                                key={i}
                                className={`absolute rounded-full shadow-lg ${Number(calculatePercentWeight()) <= 0.1
                                  ? 'bg-green-700'
                                  : Number(calculatePercentWeight()) <= 1
                                    ? 'bg-yellow-700'
                                    : Number(calculatePercentWeight()) <= 10
                                      ? 'bg-orange-700'
                                      : 'bg-red-800'
                                  }`}
                                style={{
                                  width: `${4 + (i % 3) * 2}px`,
                                  height: `${4 + (i % 3) * 2}px`,
                                  left: `${(i * 17 + i * 3) % 85 + 5}%`,
                                  bottom: `${(i * 23) % 70 + 10}%`,
                                  opacity: 0.4 + (i % 3) * 0.2,
                                  animation: `float ${3 + (i % 4)}s ease-in-out infinite`,
                                  animationDelay: `${i * 0.15}s`
                                }}
                              />
                            ))}

                            {/* Bubbles rising */}
                            {massSolute > 0 && massSolution > 0 && Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={`bubble-${i}`}
                                className="absolute rounded-full bg-white opacity-30"
                                style={{
                                  width: `${3 + (i % 2) * 2}px`,
                                  height: `${3 + (i % 2) * 2}px`,
                                  left: `${20 + i * 15}%`,
                                  animation: `rise ${4 + i}s ease-in-out infinite`,
                                  animationDelay: `${i * 0.8}s`
                                }}
                              />
                            ))}
                          </div>

                          {/* Empty state message */}
                          {Number(calculatePercentWeight()) === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
                              Enter values to see simulation
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Boxes */}
            {massSolute > 0 && massSolution > 0 && (
              <div className="mb-8">
                <div className={`p-6 rounded-2xl border-4 ${Number(calculatePercentWeight()) <= 0.1
                  ? 'border-green-500 bg-green-50'
                  : Number(calculatePercentWeight()) <= 1
                    ? 'border-yellow-500 bg-yellow-50'
                    : Number(calculatePercentWeight()) <= 10
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-red-600 bg-red-50'
                  }`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${Number(calculatePercentWeight()) <= 0.1
                        ? 'text-green-800'
                        : Number(calculatePercentWeight()) <= 1
                          ? 'text-yellow-800'
                          : Number(calculatePercentWeight()) <= 10
                            ? 'text-orange-800'
                            : 'text-red-800'
                        }`}>Pollutant:</span>
                      <span className={`font-bold ${Number(calculatePercentWeight()) <= 0.1
                        ? 'text-green-900'
                        : Number(calculatePercentWeight()) <= 1
                          ? 'text-yellow-900'
                          : Number(calculatePercentWeight()) <= 10
                            ? 'text-orange-900'
                            : 'text-red-900'
                        }`}>{massSolute}{massUnit} in {massSolution}{massUnit} solution</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${Number(calculatePercentWeight()) <= 0.1
                        ? 'text-green-800'
                        : Number(calculatePercentWeight()) <= 1
                          ? 'text-yellow-800'
                          : Number(calculatePercentWeight()) <= 10
                            ? 'text-orange-800'
                            : 'text-red-800'
                        }`}>Concentration:</span>
                      <span className={`font-bold ${Number(calculatePercentWeight()) <= 0.1
                        ? 'text-green-900'
                        : Number(calculatePercentWeight()) <= 1
                          ? 'text-yellow-900'
                          : Number(calculatePercentWeight()) <= 10
                            ? 'text-orange-900'
                            : 'text-red-900'
                        }`}>{calculatePercentWeight()}% by weight</span>
                    </div>
                    <div className={`pt-3 border-t ${Number(calculatePercentWeight()) <= 0.1
                      ? 'border-green-200'
                      : Number(calculatePercentWeight()) <= 1
                        ? 'border-yellow-200'
                        : Number(calculatePercentWeight()) <= 10
                          ? 'border-orange-200'
                          : 'border-red-200'
                      }`}>
                      <p className={`text-sm ${Number(calculatePercentWeight()) <= 0.1
                        ? 'text-green-700'
                        : Number(calculatePercentWeight()) <= 1
                          ? 'text-yellow-700'
                          : Number(calculatePercentWeight()) <= 10
                            ? 'text-orange-700'
                            : 'text-red-700'
                        }`}>
                        {Number(calculatePercentWeight()) <= 0.1
                          ? 'Safe levels - Low concentration, generally safe in typical water systems'
                          : Number(calculatePercentWeight()) <= 1
                            ? 'Moderate - Pollutant is noticeable and may begin affecting aquatic life'
                            : Number(calculatePercentWeight()) <= 10
                              ? 'Hazardous - High concentration, potentially harmful to aquatic ecosystems'
                              : 'Extremely Hazardous - Extraordinarily high concentration, severe environmental damage likely'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pollution Level Indicator */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <h3 className="font-bold text-gray-800 mb-6 text-xl">Pollution Level Indicator (Based on %wt)</h3>

              <div className="space-y-4">
                <div className={`p-4 rounded-xl border-2 transition-all ${Number(calculatePercentWeight()) <= 0.1 && Number(calculatePercentWeight()) > 0
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
                  }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🟢</span>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Safe (≤ 0.1%wt)</h4>
                      <p className="text-sm text-gray-600">
                        The pollutant concentration is low and generally considered safe in typical water systems.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border-2 transition-all ${Number(calculatePercentWeight()) > 0.1 && Number(calculatePercentWeight()) <= 1
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50'
                  }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🟡</span>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Moderate (0.1% – 1%wt)</h4>
                      <p className="text-sm text-gray-600">
                        The pollutant is noticeable and may begin affecting aquatic life if exposure continues.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border-2 transition-all ${Number(calculatePercentWeight()) > 1 && Number(calculatePercentWeight()) <= 10
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 bg-gray-50'
                  }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🟠</span>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Hazardous (1% – 10%wt)</h4>
                      <p className="text-sm text-gray-600">
                        The pollutant concentration is high and potentially harmful to aquatic ecosystems.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border-2 transition-all ${Number(calculatePercentWeight()) > 10
                  ? 'border-red-600 bg-red-50'
                  : 'border-gray-200 bg-gray-50'
                  }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🔴</span>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Extremely Hazardous (&gt;10%wt)</h4>
                      <p className="text-sm text-gray-600">
                        The pollutant concentration is extraordinarily high — far above natural levels — and would likely cause severe environmental damage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-amber-50 border border-amber-200 p-4 rounded-xl">
                <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Important Notes / Disclaimer
                </h4>
                <p className="text-sm text-amber-800">
                  The level indicators are just a guide. The actual danger depends on the chemical and the ecosystem. This simulator only shows how concentrated the pollutant is, not whether it&apos;s actually toxic or regulated.
                </p>
              </div>
            </div>

            {/* Why & How Dropdown */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
              <button
                onClick={() => setShowWhyHow(!showWhyHow)}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="font-bold text-gray-800 text-xl flex items-center gap-2">
                  <Info className="h-5 w-5 text-purple-600" />
                  The Why &amp; How
                </h3>
                <span className="text-2xl text-gray-400">{showWhyHow ? '−' : '+'}</span>
              </button>

              {showWhyHow && (
                <div className="mt-6 space-y-6 animate-in fade-in duration-300">
                  {/* Why %wt is appropriate */}
                  <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-3">Why %wt is the appropriate concentration formula:</h4>
                    <p className="text-sm text-purple-800 leading-relaxed">
                      Mass percent is especially useful in chemistry contexts, such as its use in the simulation, because mass percent is independent of temperature or volume, making it robust for computational models where physical conditions may vary or be abstract, and where numeric consistency is key.
                    </p>
                    <a
                      href="https://chem.libretexts.org/Bookshelves/General_Chemistry/Book%3A_General_Chemistry_-An_Atoms_First_Approach(Halpern)/Unit_5%3A_States_of_Matter/Chapter_13%3A_Solutions/Chapter_13.3%3A_Units_for_Concentration"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-600 hover:underline mt-2 inline-block"
                    >
                      Source: Halpern, J. - General Chemistry (LibreTexts)
                    </a>
                  </div>

                  {/* Why not other formulas */}
                  <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-3">Why not the other concentration formulas?</h4>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      Molarity (mol/L), which shifts with temperature, volume, and density, can introduce inconsistent concentration values in a simulation that doesn&apos;t hold physical temperature constant. Units like ppm/ppb are used for very low concentrations, but the simulator deals with a broader range of pollutant loads that are meaningfully expressed as a percentage of total solution mass, which makes %wt both interpretable and scientifically valid.
                    </p>
                    <a
                      href="https://chem.libretexts.org/Bookshelves/General_Chemistry/Book%3A_General_Chemistry_-An_Atoms_First_Approach(Halpern)/Unit_5%3A_States_of_Matter/Chapter_13%3A_Solutions/Chapter_13.3%3A_Units_for_Concentration"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline mt-2 inline-block"
                    >
                      Source: Halpern, J. - General Chemistry (LibreTexts)
                    </a>
                  </div>

                  {/* Environmental relevance */}
                  <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                    <h4 className="font-bold text-green-900 mb-3">How is %wt useful/relevant to environmental chemistry?</h4>
                    <p className="text-sm text-green-800 leading-relaxed">
                      Mass percent is particularly appropriate for environmental chemistry because environmental systems often involve variable temperatures and changing volumes (for example, sunlight warming surface water or mixing with rainwater). By using mass percent rather than volume‑based units like molarity, the simulator ensures that the concentration metric remains consistent and physically meaningful under different environmental conditions.
                    </p>
                    <a
                      href="https://openstax.org/books/chemistry/pages/3-4-other-units-for-solution-concentrations"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-green-600 hover:underline mt-2 inline-block"
                    >
                      Source: OpenStax - Chemistry
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Key Lesson */}
            {massSolute > 0 && massSolution > 0 && (
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 rounded-2xl">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-xl mb-3">Key Lesson</h3>
                    <p className="text-blue-100 mb-4">
                      Understanding percent by weight (%wt) helps us measure how concentrated a pollutant is in a solution.
                    </p>
                    <p className="text-white font-semibold">
                      <strong>Environmental damage depends on concentration, not just quantity.</strong> Always
                      dispose of chemicals properly - small drains lead to big problems!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Water Body Explanation */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 max-w-3xl mx-auto">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Beaker className="h-5 w-5 text-cyan-500" />
                Why Volume Matters
              </h2>

              {/* Concentration Formula */}
              <div className="bg-cyan-50 p-4 rounded-xl mb-4">
                <p className="text-center text-2xl font-mono font-bold text-cyan-800 mb-3">
                  Concentration (g/L) = mass of solute (g) ÷ volume of solution (L)
                </p>
                <div className="text-sm text-cyan-700 space-y-2">
                  <p>
                    <strong>Solute:</strong> The substance being dissolved (e.g., pollutant, detergent, or chemical).
                  </p>
                  <p>
                    <strong>Solution:</strong> The mixture formed when a solute dissolves in a solvent (e.g., water body).
                  </p>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                The <strong>water body comparison feature</strong> demonstrates a critical environmental principle:
                the same amount of pollutant creates vastly different concentrations depending on the water volume.
                This helps students understand why dumping chemicals in small streams is more harmful than in large rivers.
              </p>
              <div className="bg-cyan-50 p-4 rounded-xl">
                <p className="text-cyan-700 text-sm">
                  <strong>Real-world application:</strong> A single bottle of detergent might be &quot;diluted enough&quot; in a river,
                  but catastrophic for a small canal—teaching students that environmental impact depends on both quantity
                  <em> and context</em>.
                </p>
              </div>
            </div>

            {/* Comparison Controls */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
              <h3 className="font-bold text-gray-800 mb-6">Experiment Controls</h3>

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
                        className={`p-3 rounded-lg border-2 text-left transition-all ${pollutantType === key
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                      >
                        <div className={`font-semibold ${pollutantType === key ? 'text-cyan-900' : 'text-gray-900'}`}>
                          {pollutant.name}
                        </div>
                        <div className={`text-xs ${pollutantType === key ? 'text-cyan-700' : 'text-gray-700'}`}>
                          Toxicity Factor: {pollutant.toxicityFactor}x
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Input */}
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
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 bg-white"
                    />
                    <select
                      value={pollutantUnit}
                      onChange={(e) => setPollutantUnit(e.target.value as 'g' | 'kg' | 'mg')}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none bg-white text-gray-900"
                    >
                      <option value="mg">mg</option>
                      <option value="g">g</option>
                      <option value="kg">kg</option>
                    </select>
                  </div>
                  <div className="text-sm text-gray-500">
                    Equivalent: <strong>{amountInGrams.toLocaleString()} grams</strong>
                  </div>
                  <div className="mt-2 p-3 bg-cyan-50 rounded-lg text-sm text-cyan-700">
                    💡 <strong>Quick Reference:</strong> Soap bar ≈ 100g, Detergent cap ≈ 30mL
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
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 outline-none bg-white text-gray-900"
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
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 outline-none bg-white text-gray-900"
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

            {/* Comparison Key Lesson */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-xl mb-3">Key Lesson</h3>
                  <p className="text-cyan-100 mb-4">
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
                  <p className="mt-4 text-cyan-100">
                    <strong>Volume matters!</strong> The larger the water body, the more diluted the pollutant becomes.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-8px) translateX(3px); }
            50% { transform: translateY(-15px) translateX(-3px); }
            75% { transform: translateY(-8px) translateX(2px); }
          }
          
          @keyframes rise {
            0% { transform: translateY(0px); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { transform: translateY(-120px); opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
}
