'use client';

import { useMemo } from 'react';
import { GOVERNORATES } from '../../data/governorates';
import { GOVERNORATE_HEALTH, MOH_HOSPITALS } from '../../data/hospitals';
import { POPULATION_BY_GOVERNORATE } from '../../data/population';
import { DEATHS_BY_DISEASE } from '../../data/diseases';
import { calculateEquityScores } from '../../lib/calculations';
import { X } from 'lucide-react';

interface GovernorateDetailProps {
  code: string;
  onClose: () => void;
}

export default function GovernorateDetail({ code, onClose }: GovernorateDetailProps) {
  const detail = useMemo(() => {
    const gov = GOVERNORATES.find(g => g.code === code);
    const health = GOVERNORATE_HEALTH.find(g => g.governorateCode === code);
    const pop = POPULATION_BY_GOVERNORATE.find(p => p.governorateCode === code);
    const hospitals = MOH_HOSPITALS.filter(h => h.governorateCode === code);
    const equityScores = calculateEquityScores();
    const equity = equityScores.find(e => e.governorateCode === code);

    if (!gov || !health || !pop) return null;

    const totalBeds = health.govtBeds + health.privateBeds;
    const avgOcc = hospitals.length > 0
      ? hospitals.reduce((s, h) => s + h.occupancyRate * h.beds, 0) / hospitals.reduce((s, h) => s + h.beds, 0)
      : 0;
    const growthRate = ((pop.total2025 / pop.total2023) - 1) * 100;

    const topDeaths = DEATHS_BY_DISEASE
      .map(d => ({ category: d.category, deaths: d.byGovernorate[code] || 0 }))
      .filter(d => d.deaths > 0)
      .sort((a, b) => b.deaths - a.deaths)
      .slice(0, 5);

    return { gov, health, pop, hospitals, equity, totalBeds, avgOcc, growthRate, topDeaths };
  }, [code]);

  if (!detail) return null;

  const { gov, health, pop, equity, totalBeds, avgOcc, growthRate, topDeaths } = detail;
  const expatPct = (pop.expat2025 / pop.total2025) * 100;

  // Auto-generated insight
  let insight = '';
  if (avgOcc > 85) {
    insight = `${gov.nameEn} is at critical capacity. Immediate bed expansion or patient redistribution is needed.`;
  } else if (avgOcc > 70) {
    insight = `${gov.nameEn} is approaching capacity limits. Planning for additional beds should begin within 1-2 years.`;
  } else if (avgOcc < 30) {
    insight = `${gov.nameEn} has significant surplus capacity that could serve referral patients from neighboring regions.`;
  } else {
    insight = `${gov.nameEn} is operating within safe capacity margins. Population growth of ${growthRate.toFixed(1)}% warrants monitoring.`;
  }

  return (
    <div className="glass rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{gov.nameEn}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{gov.nameAr}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Population Breakdown */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Population</h4>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{pop.total2025.toLocaleString()}</p>
          <div className="w-full h-4 rounded-full overflow-hidden bg-gray-200 dark:bg-slate-700 flex">
            <div
              className="h-full bg-teal-500"
              style={{ width: `${(1 - expatPct / 100) * 100}%` }}
            />
            <div
              className="h-full bg-amber-500"
              style={{ width: `${expatPct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Omani: {pop.omani2025.toLocaleString()} ({(100 - expatPct).toFixed(0)}%)</span>
            <span>Expat: {pop.expat2025.toLocaleString()} ({expatPct.toFixed(0)}%)</span>
          </div>
          <p className="text-xs text-gray-400">Growth: {growthRate > 0 ? '+' : ''}{growthRate.toFixed(1)}% (2yr)</p>
        </div>

        {/* Infrastructure */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Hospitals & Beds</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-teal-700 dark:text-teal-300">{health.govtHospitals}</p>
              <p className="text-xs text-gray-500">Govt Hospitals</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{health.privateHospitals}</p>
              <p className="text-xs text-gray-500">Private</p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{totalBeds}</p>
              <p className="text-xs text-gray-500">Total Beds</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-purple-700 dark:text-purple-300">{((totalBeds / pop.total2025) * 10000).toFixed(1)}</p>
              <p className="text-xs text-gray-500">Beds/10K</p>
            </div>
          </div>
        </div>

        {/* Occupancy Gauge */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bed Occupancy</h4>
          <div className="relative flex items-center justify-center">
            <svg className="w-28 h-28" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" className="dark:stroke-slate-700" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={avgOcc >= 85 ? '#dc2626' : avgOcc >= 70 ? '#f97316' : avgOcc >= 50 ? '#f59e0b' : '#10b981'}
                strokeWidth="8"
                strokeDasharray={`${(avgOcc / 100) * 251.3} 251.3`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <text x="50" y="50" textAnchor="middle" dy="5" className="fill-gray-900 dark:fill-white text-sm font-bold" fontSize="14">
                {avgOcc.toFixed(1)}%
              </text>
            </svg>
          </div>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            {avgOcc >= 85 ? 'Critical' : avgOcc >= 70 ? 'High' : avgOcc >= 50 ? 'Moderate' : 'Low'}
          </p>
        </div>

        {/* Top Deaths */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Top Causes of Death</h4>
          <div className="space-y-1">
            {topDeaths.map((d, i) => (
              <div key={d.category} className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400 truncate">{i + 1}. {d.category}</span>
                <span className="font-semibold text-gray-900 dark:text-white ml-2">{d.deaths}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Equity Score */}
        {equity && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Equity Score</h4>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{equity.overall}<span className="text-sm font-normal text-gray-400">/100</span></p>
            <div className="space-y-1 text-xs">
              {[
                { label: 'Beds', score: equity.bedScore },
                { label: 'Doctors', score: equity.doctorScore },
                { label: 'Nurses', score: equity.nurseScore },
                { label: 'Access', score: equity.accessScore },
                { label: 'Stress', score: equity.stressScore },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="w-14 text-gray-500">{s.label}</span>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-teal-500"
                      style={{ width: `${s.score}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-medium text-gray-700 dark:text-gray-300">{s.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Insight */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Key Insight</h4>
          <div className="p-3 rounded-lg bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border border-teal-100 dark:border-teal-800/30">
            <p className="text-sm text-gray-700 dark:text-gray-300">{insight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
