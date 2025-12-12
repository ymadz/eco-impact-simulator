'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { InputPanel } from '@/components/InputPanel';
import { EcoScore } from '@/components/EcoScore';
import { PieChartComponent } from '@/components/Charts/PieChartComponent';
import { QuickStats } from '@/components/QuickStats';
import { WhatIfSimulator } from '@/components/WhatIfSimulator';
import { ResourceData } from '@/types';
import { DEFAULT_RESOURCES } from '@/lib/constants';
import { calculateEcoScore, calculateResourcePercentages } from '@/lib/calculations';

export default function Home() {
  const [resourceData, setResourceData] = useState<ResourceData>(DEFAULT_RESOURCES);
  const ecoScore = calculateEcoScore(resourceData);
  const percentages = calculateResourcePercentages(resourceData);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Eco-Impact Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Track your daily resource consumption and visualize your environmental impact towards a greener future.
          </p>
        </div>

        {/* Quick Stats Cards */}
        <QuickStats carbonFootprint={ecoScore.carbonFootprint} score={ecoScore.score} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Input Panel */}
          <div className="lg:col-span-1">
            <InputPanel data={resourceData} onChange={setResourceData} />
          </div>

          {/* Right Column - Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Eco-Score */}
            <EcoScore score={ecoScore} />

            {/* Resource Distribution */}
            <PieChartComponent percentages={percentages} />
          </div>
        </div>

        {/* What-If Simulator - Full Width */}
        <div className="mb-6">
          <WhatIfSimulator currentData={resourceData} onApply={setResourceData} />
        </div>

        {/* Footer */}
        <div className="mt-12 py-8 border-t border-slate-200">
          <p className="text-center text-sm text-gray-500">
            © 2024 Eco-Impact Tracker. Built for a greener future.
          </p>
        </div>
      </main>
    </div>
  );
}
