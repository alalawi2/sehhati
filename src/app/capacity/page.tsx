'use client';

import { calculateCapacityProjections, getHighRiskHospitals } from '../../lib/calculations';
import { getRiskBadge, formatPercent } from '../../lib/constants';
import { getGovernorateName } from '../../data/governorates';
import { Building2, AlertTriangle } from 'lucide-react';
import CapacitySimulator from '../../components/sections/CapacitySimulator';
import DownloadButton from '../../components/ui/DownloadButton';

export default function CapacityPage() {
  const projections = calculateCapacityProjections();
  const highRisk = getHighRiskHospitals();

  const projectionsExport = projections.map(p => ({
    governorate: getGovernorateName(p.governorateCode),
    currentBeds: p.currentBeds,
    currentOccupancy: p.currentOccupancy,
    projected2027: p.projectedOccupancy2027,
    projected2030: p.projectedOccupancy2030,
    monthsTo85Pct: p.monthsUntil85Pct ?? 'N/A',
    riskLevel: p.riskLevel,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
            <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Capacity Predictor
            </h1>
            <p className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium">
              تنبؤ سعة المستشفيات
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Projected hospital occupancy based on population growth trends
            </p>
          </div>
        </div>
        <DownloadButton
          data={projectionsExport as unknown as Record<string, unknown>[]}
          filename="capacity-projections"
        />
      </div>

      {/* Capacity Simulator */}
      <div className="mb-8">
        <CapacitySimulator />
      </div>

      {/* Governorate Projections Table */}
      <div className="glass rounded-xl overflow-hidden mb-8">
        <div className="p-5 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Governorate Capacity Projections
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Assuming constant bed supply with population-driven demand growth
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800/50">
                <th className="text-left px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Governorate</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Govt Beds</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Current Occ.</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">2027 Proj.</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">2030 Proj.</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Months to 85%</th>
                <th className="text-center px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
              {projections
                .sort((a, b) => {
                  const riskOrder = { critical: 0, high: 1, moderate: 2, low: 3, surplus: 4 };
                  return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
                })
                .map((p) => {
                  const badge = getRiskBadge(p.riskLevel);
                  return (
                    <tr key={p.governorateCode} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30">
                      <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">
                        {getGovernorateName(p.governorateCode)}
                      </td>
                      <td className="px-5 py-3 text-right text-gray-600 dark:text-gray-300">
                        {p.currentBeds.toLocaleString()}
                      </td>
                      <td className="px-5 py-3 text-right text-gray-600 dark:text-gray-300">
                        {formatPercent(p.currentOccupancy)}
                      </td>
                      <td className="px-5 py-3 text-right text-gray-600 dark:text-gray-300">
                        <span className={p.projectedOccupancy2027 >= 85 ? 'text-red-600 dark:text-red-400 font-semibold' : ''}>
                          {formatPercent(p.projectedOccupancy2027)}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right text-gray-600 dark:text-gray-300">
                        <span className={p.projectedOccupancy2030 >= 85 ? 'text-red-600 dark:text-red-400 font-semibold' : ''}>
                          {formatPercent(p.projectedOccupancy2030)}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right text-gray-600 dark:text-gray-300">
                        {p.monthsUntil85Pct === null
                          ? '-'
                          : p.monthsUntil85Pct === 0
                            ? 'Now'
                            : `${p.monthsUntil85Pct} mo`}
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
                          {badge.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* High Risk Hospitals */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-slate-700 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              High-Risk Hospitals
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Facilities with occupancy rate above 70%
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800/50">
                <th className="text-left px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Hospital</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Governorate</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Beds</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Occupancy</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Mean Stay (days)</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Discharges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
              {highRisk.map((h) => (
                <tr key={h.name} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30">
                  <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{h.name}</td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-300">
                    {getGovernorateName(h.governorateCode)}
                  </td>
                  <td className="px-5 py-3 text-right text-gray-600 dark:text-gray-300">{h.beds}</td>
                  <td className="px-5 py-3 text-right">
                    <span
                      className={`font-semibold ${
                        h.occupancyRate >= 85
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-orange-600 dark:text-orange-400'
                      }`}
                    >
                      {formatPercent(h.occupancyRate)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right text-gray-600 dark:text-gray-300">{h.meanStayDays}</td>
                  <td className="px-5 py-3 text-right text-gray-600 dark:text-gray-300">
                    {h.dischargesTotal.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
