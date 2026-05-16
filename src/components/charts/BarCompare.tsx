'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface BarCompareProps {
  data: Array<Record<string, string | number>>;
  valueKey: string;
  nameKey: string;
  title: string;
  color?: string;
  height?: number;
}

export default function BarCompare({
  data,
  valueKey,
  nameKey,
  title,
  color = '#0d9488',
  height = 400,
}: BarCompareProps) {
  return (
    <div className="glass rounded-xl p-5">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis
            type="category"
            dataKey={nameKey}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            width={75}
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
          <Bar dataKey={valueKey} radius={[0, 4, 4, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={color} opacity={0.7 + (index % 3) * 0.1} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
