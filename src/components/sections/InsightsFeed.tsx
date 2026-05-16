'use client';

import { useState, useMemo } from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { generateInsights } from '../../lib/insights';
import type { Insight } from '../../lib/insights';

const SEVERITY_CONFIG = {
  critical: {
    icon: AlertTriangle,
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-900/10',
    border: 'border-red-200 dark:border-red-800/40',
  },
  warning: {
    icon: AlertCircle,
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/10',
    border: 'border-amber-200 dark:border-amber-800/40',
  },
  info: {
    icon: Info,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    border: 'border-blue-200 dark:border-blue-800/40',
  },
  positive: {
    icon: CheckCircle,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/10',
    border: 'border-emerald-200 dark:border-emerald-800/40',
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  infrastructure: 'Infrastructure',
  disease: 'Disease',
  workforce: 'Workforce',
  population: 'Population',
};

interface InsightsFeedProps {
  maxItems?: number;
  showFilters?: boolean;
}

export default function InsightsFeed({ maxItems, showFilters = true }: InsightsFeedProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const allInsights = useMemo(() => generateInsights(), []);

  const filteredInsights = useMemo(() => {
    let filtered: Insight[] = allInsights;
    if (activeCategory) {
      filtered = allInsights.filter(i => i.category === activeCategory);
    }
    // Sort by severity
    const severityOrder = { critical: 0, warning: 1, info: 2, positive: 3 };
    filtered.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
    if (maxItems) {
      filtered = filtered.slice(0, maxItems);
    }
    return filtered;
  }, [allInsights, activeCategory, maxItems]);

  const categories = ['infrastructure', 'disease', 'workforce', 'population'];

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === null
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {filteredInsights.map((insight, idx) => {
          const config = SEVERITY_CONFIG[insight.severity];
          const Icon = config.icon;

          return (
            <div
              key={idx}
              className={`rounded-xl p-4 border ${config.border} ${config.bg} transition-all duration-300 hover:shadow-md`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 mt-0.5 ${config.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {insight.title}
                    </h4>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-300">
                      {CATEGORY_LABELS[insight.category]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {insight.description}
                  </p>
                  {insight.dataPoints.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {insight.dataPoints.slice(0, 3).map((dp, i) => (
                        <span
                          key={i}
                          className="inline-flex text-[10px] px-2 py-0.5 rounded bg-white/60 dark:bg-slate-800/60 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-600"
                        >
                          {dp}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
