'use client';

import { EcoResult } from '@/lib/calculations';

interface EcoScoreProps {
  result: EcoResult;
}

export default function EcoScore({ result }: EcoScoreProps) {
  return (
    <div
      className={`${result.bgColor} text-white p-8 rounded-2xl shadow-lg transition-all duration-500 text-center`}
    >
      <div className="text-6xl font-bold mb-2">{result.grade}</div>
      <div className="text-2xl font-semibold mb-4">
        Eco-Score: {result.score} points
      </div>
      <p className="text-lg opacity-90">{result.message}</p>
    </div>
  );
}
