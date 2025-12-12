'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ResourcePercentages } from '@/types';
import { Zap, Droplet, FileText, Trash2 } from 'lucide-react';

interface PieChartComponentProps {
  percentages: ResourcePercentages;
}

const COLORS = {
  electricity: '#eab308', // yellow
  water: '#3b82f6',      // blue
  paper: '#f97316',      // orange
  waste: '#ef4444',      // red
};

const ICONS = {
  electricity: Zap,
  water: Droplet,
  paper: FileText,
  waste: Trash2,
};

export function PieChartComponent({ percentages }: PieChartComponentProps) {
  // Transform percentages into chart data
  const data = [
    {
      name: 'Electricity',
      value: percentages.electricity,
      color: COLORS.electricity,
      icon: 'Zap',
    },
    {
      name: 'Water',
      value: percentages.water,
      color: COLORS.water,
      icon: 'Droplet',
    },
    {
      name: 'Paper',
      value: percentages.paper,
      color: COLORS.paper,
      icon: 'FileText',
    },
    {
      name: 'Waste',
      value: percentages.waste,
      color: COLORS.waste,
      icon: 'Trash2',
    },
  ];

  // Custom label renderer
  const renderLabel = (entry: any) => {
    return `${entry.value.toFixed(1)}%`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            {payload[0].value.toFixed(1)}% of total impact
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Distribution</CardTitle>
        <CardDescription>
          Breakdown of your environmental impact by resource type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend with Icons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          {data.map((item) => {
            const Icon = ICONS[item.name.toLowerCase() as keyof typeof ICONS];
            return (
              <div
                key={item.name}
                className="flex items-center gap-2 p-2 rounded-lg bg-gray-50"
              >
                <Icon className="w-5 h-5" style={{ color: item.color }} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">
                    {item.value.toFixed(1)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
