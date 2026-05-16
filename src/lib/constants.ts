export const COLORS = {
  primary: '#0D9488',    // teal-600
  secondary: '#D97706',  // amber-600
  success: '#059669',    // emerald-600
  danger: '#DC2626',     // red-600
  warning: '#F59E0B',    // amber-500
  info: '#2563EB',       // blue-600

  // Occupancy scale
  occupancyLow: '#10B981',    // < 50% green
  occupancyMedium: '#F59E0B', // 50-70% amber
  occupancyHigh: '#F97316',   // 70-85% orange
  occupancyCritical: '#DC2626', // > 85% red

  // Chart palette
  chart: ['#0D9488', '#2563EB', '#D97706', '#DC2626', '#8B5CF6', '#EC4899', '#059669', '#6366F1'],
};

export const THRESHOLDS = {
  occupancyLow: 50,
  occupancyMedium: 70,
  occupancyHigh: 85,
  occupancyCritical: 95,
};

export const getOccupancyColor = (rate: number): string => {
  if (rate >= THRESHOLDS.occupancyCritical) return COLORS.occupancyCritical;
  if (rate >= THRESHOLDS.occupancyHigh) return COLORS.occupancyHigh;
  if (rate >= THRESHOLDS.occupancyMedium) return COLORS.occupancyMedium;
  return COLORS.occupancyLow;
};

export const getRiskBadge = (level: string) => {
  switch (level) {
    case 'critical': return { label: 'Critical', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' };
    case 'high': return { label: 'High Risk', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' };
    case 'moderate': return { label: 'Moderate', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' };
    case 'low': return { label: 'Low Risk', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' };
    case 'surplus': return { label: 'Surplus', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' };
    default: return { label: level, color: 'bg-gray-100 text-gray-800' };
  }
};

export const formatNumber = (n: number): string => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`;
  return n.toLocaleString();
};

export const formatPercent = (n: number): string => `${n.toFixed(1)}%`;
