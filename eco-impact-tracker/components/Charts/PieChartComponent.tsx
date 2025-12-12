'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ResourcePercentages } from '@/types';
import { Zap, Droplet, FileText, Trash2, MoreVertical } from 'lucide-react';

interface PieChartComponentProps {
  percentages: ResourcePercentages;
}

const COLORS = {
  electricity: '#f59e0b', // amber
  water: '#3b82f6',      // blue
  paper: '#a855f7',      // purple
  waste: '#ef4444',      // red
};

export function PieChartComponent({ percentages }: PieChartComponentProps) {
  const data = [
    {
      name: 'Electricity',
      value: percentages.electricity,
      color: COLORS.electricity,
      percentage: `${percentages.electricity.toFixed(0)}%`,
    },
    {
      name: 'Water',
      value: percentages.water,
      color: COLORS.water,
      percentage: `${percentages.water.toFixed(0)}%`,
    },
    {
      name: 'Paper',
      value: percentages.paper,
      color: COLORS.paper,
      percentage: `${percentages.paper.toFixed(0)}%`,
    },
    {
      name: 'Waste',
      value: percentages.waste,
      color: COLORS.waste,
      percentage: `${percentages.waste.toFixed(0)}%`,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-3">
          <p className="font-semibold text-gray-900 text-sm">{payload[0].name}</p>
          <p className="text-xs text-gray-600">
            {payload[0].value.toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white border-0 shadow-sm rounded-3xl">
      <CardHeader className="border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl mb-1">Resource Distribution</CardTitle>
            <CardDescription className="text-sm">
              Breakdown of your environmental impact
            </CardDescription>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={105}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors"
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-700 truncate">
                  {item.name}
                </div>
                <div className="text-xs text-gray-500">
                  {item.percentage}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
