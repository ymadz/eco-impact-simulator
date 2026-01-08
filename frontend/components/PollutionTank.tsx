'use client';

import { useState, useEffect } from 'react';
import { ConcentrationResult } from '@/lib/calculations';

interface PollutionTankProps {
  result: ConcentrationResult;
  waterBodyName: string;
  pollutantName: string;
  amount: number;
}

interface Particle {
  left: number;
  top: number;
  delay: number;
}

export default function PollutionTank({
  result,
  waterBodyName,
  pollutantName,
  amount,
}: PollutionTankProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const newParticles = [...Array(10)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    // eslint-disable-next-line
    setParticles(newParticles);
  }, []);
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'safe':
        return 'border-green-500 bg-green-50';
      case 'moderate':
        return 'border-yellow-500 bg-yellow-50';
      case 'dangerous':
        return 'border-orange-500 bg-orange-50';
      case 'critical':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'safe':
        return 'bg-green-500';
      case 'moderate':
        return 'bg-yellow-500';
      case 'dangerous':
        return 'bg-orange-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`p-6 rounded-2xl border-2 ${getSeverityColor(result.severity)}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-800">{waterBodyName}</h3>
        <span
          className={`${getSeverityBadge(result.severity)} text-white px-3 py-1 rounded-full text-sm font-semibold uppercase`}
        >
          {result.severity}
        </span>
      </div>

      {/* Visual Tank */}
      <div className="relative h-48 w-full bg-gray-200 rounded-xl overflow-hidden mb-4">
        {/* Water fill */}
        <div
          className="absolute bottom-0 left-0 right-0 transition-all duration-500"
          style={{
            height: '80%',
            backgroundColor: `rgba(59, 130, 246, ${result.opacity})`,
          }}
        >
          {/* Pollution particles animation */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gray-800 rounded-full animate-float"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  opacity: result.opacity * 0.5,
                }}
              />
            ))}
          </div>
        </div>

        {/* Tank border */}
        <div className="absolute inset-0 border-4 border-gray-400 rounded-xl pointer-events-none" />
      </div>

      {/* Stats */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Pollutant:</span>
          <span className="font-semibold">{pollutantName} ({amount}g)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Concentration:</span>
          <span className="font-semibold">{result.concentration.toFixed(4)} g/L</span>
        </div>
      </div>

      {/* Warning */}
      <div className="mt-4 p-3 bg-white rounded-lg">
        <p className={`text-sm font-medium ${result.severity === 'critical' ? 'text-red-600' : 'text-gray-700'}`}>
          {result.warning}
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
