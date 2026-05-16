'use client';

import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | ReactNode;
  subtitle?: string;
  trend?: 'up' | 'down' | 'flat';
  trendValue?: string;
  icon?: ReactNode;
}

export default function KPICard({ title, value, subtitle, trend, trendValue, icon }: KPICardProps) {
  const trendColor = trend === 'up'
    ? 'text-emerald-600 dark:text-emerald-400'
    : trend === 'down'
      ? 'text-red-600 dark:text-red-400'
      : 'text-gray-500 dark:text-gray-400';

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className="glass rounded-xl p-5 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div className={`flex items-center gap-1 mt-2 ${trendColor}`}>
              <TrendIcon className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-2.5 bg-teal-50 dark:bg-teal-900/30 rounded-lg text-teal-600 dark:text-teal-400 shrink-0">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
