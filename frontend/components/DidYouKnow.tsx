'use client';

import { SURVEY_STATS } from '@/lib/constants';
import Link from 'next/link';
import { Droplets, FileText, Zap, GlassWater, UtensilsCrossed, Recycle, Lightbulb } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  '💧': <Droplets className="h-8 w-8 text-blue-500" />,
  '📄': <FileText className="h-8 w-8 text-amber-600" />,
  '⚡': <Zap className="h-8 w-8 text-yellow-500" />,
  '🥤': <GlassWater className="h-8 w-8 text-cyan-500" />,
  '🍔': <UtensilsCrossed className="h-8 w-8 text-orange-500" />,
  '♻️': <Recycle className="h-8 w-8 text-green-500" />,
};

export default function DidYouKnow() {
  // Get random 4 stats consistently on client
  const stats = SURVEY_STATS.slice(0, 4);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
            <Lightbulb className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Did You Know?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These statistics are based on survey data from students. See how your habits compare!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
                {iconMap[stat.icon] || <span className="text-2xl">{stat.icon}</span>}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.stat}</div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{stat.description}</p>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-green-600 flex items-center gap-2">
                  <span className="text-lg">💪</span> {stat.action}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/simulator"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
          >
            Try the Simulator →
          </Link>
        </div>
      </div>
    </section>
  );
}
