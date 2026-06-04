'use client';

import { calculateEquityScores } from '../../lib/calculations';
import { getGovernorateName } from '../../data/governorates';
import BarCompare from '../../components/charts/BarCompare';
import { Shield } from 'lucide-react';
import SourceBadge from '../../components/ui/SourceBadge';

function getScoreColor(score: number): string {
  if (score >= 70) return 'text-emerald-600 dark:text-emerald-400';
  if (score >= 40) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
}

function getScoreBg(score: number): string {
  if (score >= 70) return 'bg-emerald-100 dark:bg-emerald-900/30';
  if (score >= 40) return 'bg-amber-100 dark:bg-amber-900/30';
  return 'bg-red-100 dark:bg-red-900/30';
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  const barColor =
    score >= 70
      ? 'bg-emerald-500'
      : score >= 40
        ? 'bg-amber-500'
        : 'bg-red-500';

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 dark:text-gray-400 w-16 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${barColor} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 w-8 text-right">{score}</span>
    </div>
  );
}

export default function EquityPage() {
  const scores = calculateEquityScores().sort((a, b) => b.overall - a.overall);

  const chartData = scores.map((s) => ({
    name: getGovernorateName(s.governorateCode),
    overall: s.overall,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="p-2 sm:p-2.5 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
          <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Equity Atlas
          </h1>
          <p className="text-xs text-purple-600/70 dark:text-purple-400/70 font-medium">
            أطلس العدالة الصحية
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Health resource equity scores across governorates (0-100 scale)
          </p>
          <SourceBadge sources={['OMHLTH2016', 'OMPOP2016']} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-8">
        <BarCompare
          data={chartData}
          valueKey="overall"
          nameKey="name"
          title="Overall Equity Score by Governorate"
          color="#8b5cf6"
          height={420}
        />
      </div>

      {/* Equity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {scores.map((s, idx) => {
          const govName = getGovernorateName(s.governorateCode);
          return (
            <div key={s.governorateCode} className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-400 dark:text-gray-500">#{idx + 1}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{govName}</h3>
                </div>
                <span
                  className={`text-xl font-bold px-3 py-1 rounded-lg ${getScoreBg(s.overall)} ${getScoreColor(s.overall)}`}
                >
                  {s.overall}
                </span>
              </div>
              <div className="space-y-2.5">
                <ScoreBar label="Beds" score={s.bedScore} />
                <ScoreBar label="Hospitals" score={s.doctorScore} />
                <ScoreBar label="Centres" score={s.nurseScore} />
                <ScoreBar label="Access" score={s.accessScore} />
                <ScoreBar label="Stress" score={s.stressScore} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Methodology Note */}
      <div className="mt-8 glass rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Methodology</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          The equity score is a composite of five normalized dimensions: <strong>Beds</strong> (government hospital beds per 10,000),{' '}
          <strong>Hospitals</strong> (government hospitals per 100,000 — proxy for physician access, since per-governorate doctor counts are unavailable),{' '}
          <strong>Centres</strong> (health centres per 100,000 — proxy for primary/nursing care density),{' '}
          <strong>Access</strong> (pharmacies and medical centres per 10,000),{' '}
          and <strong>Stress</strong> (inverse of bed-weighted average occupancy — larger hospitals carry proportionally more weight).{' '}
          Each dimension is min-max normalized to 0-100 across governorates, then averaged for the overall score.
          Higher scores indicate more equitable resource distribution relative to other governorates.
        </p>
      </div>
    </div>
  );
}
