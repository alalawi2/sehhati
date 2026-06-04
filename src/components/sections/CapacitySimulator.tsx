'use client';

import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { GOVERNORATES } from '../../data/governorates';
import { GOVERNORATE_HEALTH, MOH_HOSPITALS } from '../../data/hospitals';
import { POPULATION_BY_GOVERNORATE } from '../../data/population';

export default function CapacitySimulator() {
  const [growthRate, setGrowthRate] = useState(2.0);
  const [newBeds, setNewBeds] = useState(0);
  const [selectedGov, setSelectedGov] = useState('MUS');

  const projectionData = useMemo(() => {
    const health = GOVERNORATE_HEALTH.find(g => g.governorateCode === selectedGov);
    const hospitals = MOH_HOSPITALS.filter(h => h.governorateCode === selectedGov);
    const pop = POPULATION_BY_GOVERNORATE.find(p => p.governorateCode === selectedGov);

    if (!health || !pop) return [];

    // Use government beds only — private bed utilization data is unavailable,
    // matching the projection model in calculations.ts
    const currentBeds = health.govtBeds;
    const totalBedsAfter = currentBeds + newBeds;
    const govtHospitals = hospitals.filter(h => h.sector === 'government');
    const govtBedCount = govtHospitals.reduce((s, h) => s + h.beds, 0);
    const currentOcc = govtBedCount > 0
      ? govtHospitals.reduce((s, h) => s + h.occupancyRate * h.beds, 0) / govtBedCount
      : 50;

    // Current demand = currentOcc% of currentBeds (government only)
    const currentDemand = (currentOcc / 100) * currentBeds;

    const data = [];
    for (let year = 2025; year <= 2035; year++) {
      const yearsFromNow = year - 2025;
      const projectedDemand = currentDemand * Math.pow(1 + growthRate / 100, yearsFromNow);
      const occupancy = Math.min(100, (projectedDemand / totalBedsAfter) * 100);
      data.push({ year, occupancy: Math.round(occupancy * 10) / 10 });
    }

    return data;
  }, [growthRate, newBeds, selectedGov]);

  // Find year when capacity hits 85%
  const criticalYear = projectionData.find(d => d.occupancy >= 85)?.year;
  const govName = GOVERNORATES.find(g => g.code === selectedGov)?.nameEn || selectedGov;

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        &quot;What If&quot; Capacity Simulator
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Model future occupancy based on population growth and bed additions
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Governorate Selector */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Governorate</label>
          <select
            value={selectedGov}
            onChange={e => setSelectedGov(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white"
          >
            {GOVERNORATES.map(g => (
              <option key={g.code} value={g.code}>{g.nameEn}</option>
            ))}
          </select>
        </div>

        {/* Growth Rate Slider */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            Population Growth Rate: <span className="text-teal-600 dark:text-teal-400 font-bold">{growthRate.toFixed(1)}%</span>/year
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={growthRate}
            onChange={e => setGrowthRate(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0%</span>
            <span>5%</span>
          </div>
        </div>

        {/* New Beds Slider */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            New Beds Added: <span className="text-blue-600 dark:text-blue-400 font-bold">{newBeds}</span>
          </label>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={newBeds}
            onChange={e => setNewBeds(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0</span>
            <span>500</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={projectionData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
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
            formatter={(value) => [`${value}%`, 'Occupancy']}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <ReferenceLine
            y={85}
            stroke="#dc2626"
            strokeDasharray="4 4"
            strokeWidth={2}
            label={{ value: 'Danger Zone (85%)', position: 'right', fontSize: 11, fill: '#dc2626' }}
          />
          <Line
            type="monotone"
            dataKey="occupancy"
            name="Projected Occupancy"
            stroke="#0d9488"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#0d9488' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Auto-text insight */}
      <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-slate-700/30 border border-gray-200 dark:border-slate-700">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {criticalYear ? (
            <>
              At <strong>{growthRate.toFixed(1)}%</strong> annual growth
              {newBeds > 0 ? <> with <strong>{newBeds}</strong> new beds added</> : ' with no new beds'},
              <strong> {govName}</strong> will hit critical capacity (85%) by <strong className="text-red-600 dark:text-red-400">{criticalYear}</strong>.
              {criticalYear <= 2027 && ' Urgent action required.'}
              {criticalYear > 2030 && ' The situation is manageable with monitoring.'}
            </>
          ) : (
            <>
              At <strong>{growthRate.toFixed(1)}%</strong> annual growth
              {newBeds > 0 ? <> with <strong>{newBeds}</strong> new beds added</> : ' with no new beds'},
              <strong> {govName}</strong> is projected to remain below 85% capacity through 2035.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
