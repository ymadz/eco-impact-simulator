'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp, Droplets, Trees, Award } from 'lucide-react';

interface QuickStatsProps {
  carbonFootprint: number;
  score: number;
}

export function QuickStats({ carbonFootprint, score }: QuickStatsProps) {
  const monthlyImpact = carbonFootprint * 30;
  const treesSaved = Math.max(0, (10 - carbonFootprint) * 0.5).toFixed(1);
  const avgImpactLevel = carbonFootprint < 5 ? 'Low' : carbonFootprint < 10 ? 'Medium' : 'High';
  const impactChange = carbonFootprint < 8 ? '-14%' : '+8%';
  const isPositive = carbonFootprint < 8;

  const stats = [
    {
      label: 'Day Streak',
      value: '12 Days',
      subtext: 'Top 5% of users',
      icon: Award,
      gradient: 'from-emerald-400 to-teal-500',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      label: 'Avg Daily Impact',
      value: avgImpactLevel,
      subtext: `${impactChange} vs last week`,
      icon: Droplets,
      gradient: 'from-blue-400 to-cyan-500',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Trees Saved',
      value: treesSaved,
      subtext: 'Total lifetime impact',
      icon: Trees,
      gradient: 'from-purple-400 to-pink-500',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Points',
      value: score * 10,
      subtext: '+50 today',
      icon: TrendingUp,
      gradient: 'from-amber-400 to-orange-500',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="relative overflow-hidden bg-white border-0 shadow-sm rounded-3xl hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="p-6">
              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl ${stat.iconBg} flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>

              {/* Label */}
              <div className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">
                {stat.label}
              </div>

              {/* Value */}
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>

              {/* Subtext */}
              <div className={`text-xs ${isPositive && index === 1 ? 'text-emerald-600 font-medium' : 'text-gray-500'} flex items-center gap-1`}>
                {isPositive && index === 1 && (
                  <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                )}
                {stat.subtext}
              </div>
            </div>

            {/* Gradient accent at bottom */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} rounded-b-3xl`} />
          </Card>
        );
      })}
    </div>
  );
}
