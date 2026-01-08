'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
} from 'chart.js';
import { ProjectionData } from '@/lib/calculations';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LimitGraphProps {
  data: ProjectionData;
  dailyIncrease: number;
}

export default function LimitGraph({ data, dailyIncrease }: LimitGraphProps) {
  const chartData = {
    labels: data.labels.filter((_, i) => i % 30 === 0 || i === data.labels.length - 1),
    datasets: [
      {
        label: 'Cumulative Waste (kg)',
        data: data.data.filter((_, i) => i % 30 === 0 || i === data.data.length - 1),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Ecosystem Limit',
        data: Array(Math.ceil(data.data.length / 30) + 1).fill(data.limit),
        borderColor: 'rgb(239, 68, 68)',
        borderDash: [10, 5],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Waste Projection Over 365 Days (${dailyIncrease} kg/day increase)`,
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
            if (context.dataset.label === 'Ecosystem Limit') {
              return `Limit: ${(context.raw as number).toLocaleString()} kg`;
            }
            return `Cumulative: ${(context.raw as number).toLocaleString()} kg`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Waste (kg)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>

      {/* Limit Analysis */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-2">📊 Limit Analysis</h3>
        {data.daysToLimit ? (
          <p className="text-red-600">
            ⚠️ At current rate, ecosystem limit ({data.limit.toLocaleString()} kg) will be
            reached in <strong>{data.daysToLimit} days</strong>!
          </p>
        ) : (
          <p className="text-green-600">
            ✅ Current usage rate is sustainable for the projected period.
          </p>
        )}
        <p className="text-gray-600 mt-2 text-sm">
          This demonstrates the mathematical concept of <strong>limits</strong>: as time (t)
          approaches infinity, cumulative waste approaches a critical threshold where the
          ecosystem cannot recover.
        </p>
      </div>
    </div>
  );
}
