'use client';

import { INFECTIOUS_DISEASES, DEATHS_BY_DISEASE } from '../../data/diseases';
import TrendChart from '../../components/charts/TrendChart';
import BarCompare from '../../components/charts/BarCompare';
import { Bug, Skull, TrendingUp, TrendingDown } from 'lucide-react';

export default function DiseasesPage() {
  // Top infectious diseases by 2025 cases
  const topDiseases = [...INFECTIOUS_DISEASES]
    .sort((a, b) => b.cases2025 - a.cases2025)
    .slice(0, 12)
    .map((d) => ({
      name: d.name,
      cases: d.cases2025,
    }));

  // Trend data for key diseases
  const keyDiseases = ['Dengue', 'Pulmonary Tuberculosis', 'COVID-19', 'Malaria', 'Food Poisoning', 'Brucellosis'];
  const trendData = [
    {
      year: '2023',
      ...Object.fromEntries(
        keyDiseases.map((name) => {
          const d = INFECTIOUS_DISEASES.find((i) => i.name === name);
          return [name, d ? d.cases2023 : 0];
        })
      ),
    },
    {
      year: '2024',
      ...Object.fromEntries(
        keyDiseases.map((name) => {
          const d = INFECTIOUS_DISEASES.find((i) => i.name === name);
          return [name, d ? d.cases2024 : 0];
        })
      ),
    },
    {
      year: '2025',
      ...Object.fromEntries(
        keyDiseases.map((name) => {
          const d = INFECTIOUS_DISEASES.find((i) => i.name === name);
          return [name, d ? d.cases2025 : 0];
        })
      ),
    },
  ];

  // Deaths by category
  const deathData = [...DEATHS_BY_DISEASE]
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)
    .map((d) => ({
      name: d.category,
      deaths: d.total,
    }));

  // Notable changes
  const changes = INFECTIOUS_DISEASES.map((d) => ({
    name: d.name,
    change: d.cases2023 > 0 ? Math.round(((d.cases2025 - d.cases2023) / d.cases2023) * 100) : 0,
    cases2025: d.cases2025,
    cases2023: d.cases2023,
  }))
    .filter((d) => Math.abs(d.change) > 30 && d.cases2025 > 5)
    .sort((a, b) => b.change - a.change);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="p-2 sm:p-2.5 bg-amber-50 dark:bg-amber-900/30 rounded-xl">
          <Bug className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Disease Trends
          </h1>
          <p className="text-xs text-amber-600/70 dark:text-amber-400/70 font-medium">
            اتجاهات الأمراض
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Infectious disease surveillance and mortality patterns (2023-2025)
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Top Diseases Bar Chart */}
        <BarCompare
          data={topDiseases}
          valueKey="cases"
          nameKey="name"
          title="Top Infectious Diseases by Cases (2025)"
          color="#d97706"
          height={450}
        />

        {/* Trend Comparison */}
        <TrendChart
          data={trendData}
          xKey="year"
          yKeys={[
            { key: 'Dengue', name: 'Dengue', color: '#dc2626' },
            { key: 'Pulmonary Tuberculosis', name: 'TB', color: '#2563eb' },
            { key: 'COVID-19', name: 'COVID-19', color: '#8b5cf6' },
            { key: 'Malaria', name: 'Malaria', color: '#059669' },
            { key: 'Food Poisoning', name: 'Food Poisoning', color: '#d97706' },
            { key: 'Brucellosis', name: 'Brucellosis', color: '#ec4899' },
          ]}
          title="Key Disease Trends (2023-2025)"
          height={380}
        />

        {/* Deaths by Category */}
        <BarCompare
          data={deathData}
          valueKey="deaths"
          nameKey="name"
          title="Deaths by Disease Category (2025)"
          color="#dc2626"
          height={400}
        />

        {/* Notable Changes */}
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Skull className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notable Changes (2023 vs 2025)
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {changes.map((d) => (
              <div
                key={d.name}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-slate-800/50"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{d.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {d.cases2023} &rarr; {d.cases2025}
                  </p>
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    d.change > 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {d.change > 0 ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" />
                  )}
                  {d.change > 0 ? '+' : ''}
                  {d.change}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Findings */}
        <div className="glass rounded-xl p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Key Findings
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5" />
              Food poisoning cases surged 166% from 266 (2023) to 707 (2025), suggesting worsening food safety conditions.
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
              Dengue cases dropped dramatically from 2,711 (2023) to 203 (2025), likely reflecting effective vector control measures.
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
              COVID-19 cases declined 66% year-over-year, continuing the post-pandemic downtrend.
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />
              Circulatory diseases remain the leading cause of death (885), followed by infectious diseases (667) and respiratory diseases (666).
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5" />
              Leprosy cases spiked from 1 to 9, warranting closer surveillance despite small absolute numbers.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
