'use client';

import { useState, useMemo } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { GOVERNORATES } from '../../data/governorates';
import { GOVERNORATE_HEALTH, MOH_HOSPITALS } from '../../data/hospitals';
import { POPULATION_BY_GOVERNORATE } from '../../data/population';
import { calculateEquityScores } from '../../lib/calculations';

function getGovStats(code: string) {
  const health = GOVERNORATE_HEALTH.find(g => g.governorateCode === code);
  const pop = POPULATION_BY_GOVERNORATE.find(p => p.governorateCode === code);
  const hospitals = MOH_HOSPITALS.filter(h => h.governorateCode === code);
  const equityScores = calculateEquityScores();
  const equity = equityScores.find(e => e.governorateCode === code);

  if (!health || !pop) return null;

  const totalBeds = health.govtBeds + health.privateBeds;
  const bedsPerTenK = (totalBeds / pop.total2025) * 10000;
  const avgOcc = hospitals.length > 0
    ? hospitals.reduce((s, h) => s + h.occupancyRate * h.beds, 0) / hospitals.reduce((s, h) => s + h.beds, 0)
    : 0;
  const growthRate = ((pop.total2025 / pop.total2023) - 1) * 100;

  return {
    code,
    name: GOVERNORATES.find(g => g.code === code)?.nameEn || code,
    population: pop.total2025,
    omani: pop.omani2025,
    expat: pop.expat2025,
    totalBeds,
    govtBeds: health.govtBeds,
    privateBeds: health.privateBeds,
    bedsPerTenK,
    govtHospitals: health.govtHospitals,
    privateHospitals: health.privateHospitals,
    avgOccupancy: avgOcc,
    growthRate,
    healthCentres: health.healthCentres + health.extendedHC,
    pharmacies: health.pharmacies,
    equity,
  };
}

export default function GovernorateComparator() {
  const [codeA, setCodeA] = useState('MUS');
  const [codeB, setCodeB] = useState('BTN');

  const statsA = useMemo(() => getGovStats(codeA), [codeA]);
  const statsB = useMemo(() => getGovStats(codeB), [codeB]);

  if (!statsA || !statsB) return null;

  const radarData = [
    { dimension: 'Beds', A: statsA.equity?.bedScore || 0, B: statsB.equity?.bedScore || 0 },
    { dimension: 'Doctors', A: statsA.equity?.doctorScore || 0, B: statsB.equity?.doctorScore || 0 },
    { dimension: 'Nurses', A: statsA.equity?.nurseScore || 0, B: statsB.equity?.nurseScore || 0 },
    { dimension: 'Access', A: statsA.equity?.accessScore || 0, B: statsB.equity?.accessScore || 0 },
    { dimension: 'Capacity', A: statsA.equity?.stressScore || 0, B: statsB.equity?.stressScore || 0 },
  ];

  const rows = [
    { label: 'Population', a: statsA.population.toLocaleString(), b: statsB.population.toLocaleString(), betterA: statsA.population > statsB.population },
    { label: 'Growth Rate (2yr)', a: `${statsA.growthRate.toFixed(1)}%`, b: `${statsB.growthRate.toFixed(1)}%`, betterA: statsA.growthRate > statsB.growthRate },
    { label: 'Total Beds', a: statsA.totalBeds.toLocaleString(), b: statsB.totalBeds.toLocaleString(), betterA: statsA.totalBeds > statsB.totalBeds },
    { label: 'Beds per 10K', a: statsA.bedsPerTenK.toFixed(1), b: statsB.bedsPerTenK.toFixed(1), betterA: statsA.bedsPerTenK > statsB.bedsPerTenK },
    { label: 'Govt Hospitals', a: String(statsA.govtHospitals), b: String(statsB.govtHospitals), betterA: statsA.govtHospitals > statsB.govtHospitals },
    { label: 'Private Hospitals', a: String(statsA.privateHospitals), b: String(statsB.privateHospitals), betterA: statsA.privateHospitals > statsB.privateHospitals },
    { label: 'Avg Occupancy', a: `${statsA.avgOccupancy.toFixed(1)}%`, b: `${statsB.avgOccupancy.toFixed(1)}%`, betterA: statsA.avgOccupancy < statsB.avgOccupancy },
    { label: 'Health Centres', a: String(statsA.healthCentres), b: String(statsB.healthCentres), betterA: statsA.healthCentres > statsB.healthCentres },
    { label: 'Pharmacies', a: String(statsA.pharmacies), b: String(statsB.pharmacies), betterA: statsA.pharmacies > statsB.pharmacies },
    { label: 'Equity Score', a: String(statsA.equity?.overall || '-'), b: String(statsB.equity?.overall || '-'), betterA: (statsA.equity?.overall || 0) > (statsB.equity?.overall || 0) },
  ];

  // Gap analysis
  const bedGap = Math.abs(statsA.bedsPerTenK - statsB.bedsPerTenK);
  const lowerBed = statsA.bedsPerTenK < statsB.bedsPerTenK ? statsA : statsB;
  const higherBed = statsA.bedsPerTenK < statsB.bedsPerTenK ? statsB : statsA;
  const bedsNeeded = Math.round((higherBed.bedsPerTenK - lowerBed.bedsPerTenK) * lowerBed.population / 10000);

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Governorate Comparator</h3>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Governorate A</label>
          <select
            value={codeA}
            onChange={e => setCodeA(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white"
          >
            {GOVERNORATES.map(g => (
              <option key={g.code} value={g.code}>{g.nameEn}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Governorate B</label>
          <select
            value={codeB}
            onChange={e => setCodeB(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white"
          >
            {GOVERNORATES.map(g => (
              <option key={g.code} value={g.code}>{g.nameEn}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stats Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">Metric</th>
                <th className="text-right py-2 font-semibold text-teal-600 dark:text-teal-400">{statsA.name}</th>
                <th className="text-right py-2 font-semibold text-blue-600 dark:text-blue-400">{statsB.name}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.label} className="border-b border-gray-100 dark:border-slate-700/50">
                  <td className="py-2 text-gray-600 dark:text-gray-400">{row.label}</td>
                  <td className={`py-2 text-right ${row.betterA ? 'font-semibold text-teal-600 dark:text-teal-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    {row.a}
                  </td>
                  <td className={`py-2 text-right ${!row.betterA ? 'font-semibold text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    {row.b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Radar Chart */}
        <div>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Radar name={statsA.name} dataKey="A" stroke="#0d9488" fill="#0d9488" fillOpacity={0.3} />
              <Radar name={statsB.name} dataKey="B" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gap Analysis */}
      <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-200 dark:border-amber-800/30">
        <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Gap Analysis</h4>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          To match {higherBed.name}&apos;s bed ratio ({higherBed.bedsPerTenK.toFixed(1)}/10K),{' '}
          {lowerBed.name} needs approximately <strong>{bedsNeeded.toLocaleString()}</strong> additional beds
          (gap: {bedGap.toFixed(1)} beds per 10K population).
        </p>
      </div>
    </div>
  );
}
