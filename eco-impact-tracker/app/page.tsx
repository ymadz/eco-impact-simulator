'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { InputPanel } from '@/components/InputPanel';
import { ResourceData } from '@/types';
import { DEFAULT_RESOURCES } from '@/lib/constants';
import { calculateEcoScore } from '@/lib/calculations';

export default function Home() {
  const [resourceData, setResourceData] = useState<ResourceData>(DEFAULT_RESOURCES);
  const ecoScore = calculateEcoScore(resourceData);

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
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border p-8">
              <h2 className="text-2xl font-bold mb-4">Your Eco-Score</h2>

              {/* Temporary score display - will be replaced with EcoScore component */}
              <div className="text-center py-12">
                <div
                  className="text-8xl font-bold mb-4"
                  style={{ color: ecoScore.color }}
                >
                  {ecoScore.score}
                </div>
                <div className="text-3xl font-semibold mb-2">
                  Grade: {ecoScore.grade}
                </div>
                <div className="text-lg text-gray-600">
                  Carbon Footprint: {ecoScore.carbonFootprint} kg CO₂/day
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Next steps:</strong> We&apos;ll add beautiful charts, detailed statistics, and personalized recommendations in the upcoming phases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
