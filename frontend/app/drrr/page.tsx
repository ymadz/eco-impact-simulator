'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, BookOpen } from 'lucide-react';
import HazardForm from '@/components/HazardForm';
import { HAZARD_TYPES } from '@/lib/constants';

export default function DRRRPage() {
  const [activeTab, setActiveTab] = useState<'report' | 'tips' | 'checklist'>('report');

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-100 p-4 rounded-full">
              <Shield className="h-12 w-12 text-orange-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            🛡️ DRRR Safety Center
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Disaster Risk Reduction and Readiness. Practice identifying hazards, report 
            potential risks, and learn safety tips for emergency preparedness.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md inline-flex">
            <button
              onClick={() => setActiveTab('report')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'report'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <AlertTriangle className="h-4 w-4 inline mr-2" />
              Report Hazard
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'tips'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <BookOpen className="h-4 w-4 inline mr-2" />
              Safety Tips
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'checklist'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <CheckCircle className="h-4 w-4 inline mr-2" />
              Checklist
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'report' && (
          <div className="max-w-2xl mx-auto">
            <HazardForm />
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(HAZARD_TYPES).map(([key, hazard]) => (
              <div key={key} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-4xl mb-4">{hazard.icon}</div>
                <h3 className="font-bold text-xl text-gray-800 mb-4">{hazard.name}</h3>
                <ul className="space-y-3">
                  {hazard.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Pre-Disaster */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  Before
                </span>
                Pre-Disaster Preparation
              </h3>
              <div className="space-y-3">
                {[
                  'Know evacuation routes and assembly points',
                  'Keep emergency contacts accessible',
                  'Store important documents in waterproof containers',
                  'Prepare emergency kit (water, first aid, flashlight)',
                  'Secure loose items that could cause damage',
                  'Know how to turn off utilities (water, electricity, gas)',
                ].map((item, index) => (
                  <label key={index} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-700">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* During Disaster */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                  During
                </span>
                During Emergency Actions
              </h3>
              <div className="space-y-3">
                {[
                  'Stay calm and follow instructions',
                  'Move to designated safe areas',
                  'Do not use elevators during emergencies',
                  'Help others if safe to do so',
                  'Avoid flooded areas and downed power lines',
                  'Report hazards to authorities immediately',
                ].map((item, index) => (
                  <label key={index} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-700">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Post-Disaster */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                  After
                </span>
                Post-Disaster Recovery
              </h3>
              <div className="space-y-3">
                {[
                  'Wait for official all-clear before returning',
                  'Check yourself and others for injuries',
                  'Document any damage with photos',
                  'Be cautious of structural damage',
                  'Dispose of contaminated food and water',
                  'Report damages to school administration',
                ].map((item, index) => (
                  <label key={index} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-700">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
