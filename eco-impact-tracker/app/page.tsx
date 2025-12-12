'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { InputPanel } from '@/components/InputPanel';
import { EcoScore } from '@/components/EcoScore';
import { PieChartComponent } from '@/components/Charts/PieChartComponent';
import { ResourceData } from '@/types';
import { DEFAULT_RESOURCES } from '@/lib/constants';
import { calculateEcoScore, calculateResourcePercentages } from '@/lib/calculations';

export default function Home() {
  const [resourceData, setResourceData] = useState<ResourceData>(DEFAULT_RESOURCES);
  const ecoScore = calculateEcoScore(resourceData);
  const percentages = calculateResourcePercentages(resourceData);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <InputPanel data={resourceData} onChange={setResourceData} />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Eco-Score Display */}
            <EcoScore score={ecoScore} />

            {/* Resource Distribution Pie Chart */}
            <PieChartComponent percentages={percentages} />

            {/* Coming Soon Section */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-3">Coming Soon</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>📊 Monthly projections bar chart</li>
                <li>📈 Historical trends line chart</li>
                <li>🔄 What-If scenario simulator</li>
                <li>📚 Subject-specific sections (Statistics, Chemistry, Calculus, DRRR)</li>
                <li>💡 Personalized recommendations</li>
                <li>💾 Progress tracking and history</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
