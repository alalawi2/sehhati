'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface YKeyConfig {
  key: string;
  name: string;
  color: string;
}

interface TrendChartProps {
  data: Array<Record<string, string | number>>;
  xKey: string;
  yKeys: YKeyConfig[];
  title: string;
  height?: number;
}

export default function TrendChart({ data, xKey, yKeys, title, height = 350 }: TrendChartProps) {
  return (
    <div className="glass rounded-xl p-5">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: 'none',
              borderRadius: '8px',
              color: '#f1f5f9',
              fontSize: '13px',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
          />
          {yKeys.map((yk) => (
            <Line
              key={yk.key}
              type="monotone"
              dataKey={yk.key}
              name={yk.name}
              stroke={yk.color}
              strokeWidth={2}
              dot={{ r: 3, fill: yk.color }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
