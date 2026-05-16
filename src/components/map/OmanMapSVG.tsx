'use client';

import { useState, useMemo } from 'react';

export type MapMetric = 'occupancy' | 'equity' | 'bedsPerTenK' | 'population';

interface GovernorateData {
  code: string;
  name: string;
  value: number;
}

interface OmanMapSVGProps {
  metric: MapMetric;
  data: GovernorateData[];
  onSelect?: (code: string) => void;
  selectedCode?: string | null;
}

// Approximate SVG paths for Oman's 11 governorates
// Positioned relatively correctly: Musandam in north, Dhofar in south, Muscat on east coast
const GOVERNORATE_PATHS: Record<string, { d: string; labelX: number; labelY: number }> = {
  MSN: {
    d: 'M 340 20 L 360 15 L 375 25 L 380 50 L 370 70 L 355 75 L 340 65 L 335 40 Z',
    labelX: 357, labelY: 45,
  },
  BUR: {
    d: 'M 250 80 L 290 75 L 310 90 L 315 120 L 295 135 L 260 130 L 245 110 Z',
    labelX: 278, labelY: 105,
  },
  BTN: {
    d: 'M 290 130 L 340 115 L 370 130 L 380 160 L 360 185 L 320 180 L 295 165 L 285 145 Z',
    labelX: 330, labelY: 155,
  },
  BTS: {
    d: 'M 285 165 L 320 180 L 340 200 L 335 225 L 310 235 L 285 220 L 275 195 Z',
    labelX: 305, labelY: 200,
  },
  MUS: {
    d: 'M 360 185 L 395 175 L 415 190 L 420 215 L 405 235 L 380 230 L 355 220 L 350 200 Z',
    labelX: 385, labelY: 205,
  },
  DHH: {
    d: 'M 220 130 L 260 130 L 285 165 L 275 195 L 250 210 L 215 195 L 200 165 L 210 145 Z',
    labelX: 242, labelY: 170,
  },
  DAK: {
    d: 'M 275 220 L 310 235 L 335 225 L 355 240 L 365 270 L 340 290 L 300 285 L 270 265 L 260 240 Z',
    labelX: 310, labelY: 260,
  },
  SHN: {
    d: 'M 355 220 L 380 230 L 410 240 L 430 260 L 425 290 L 400 300 L 370 290 L 350 270 Z',
    labelX: 390, labelY: 265,
  },
  SHS: {
    d: 'M 370 290 L 400 300 L 430 310 L 445 340 L 430 370 L 395 380 L 360 360 L 350 325 L 355 300 Z',
    labelX: 395, labelY: 340,
  },
  WUS: {
    d: 'M 200 290 L 260 265 L 300 285 L 340 290 L 350 325 L 340 380 L 310 420 L 270 440 L 220 430 L 180 400 L 170 350 L 185 310 Z',
    labelX: 260, labelY: 370,
  },
  DHO: {
    d: 'M 140 430 L 220 430 L 270 440 L 310 460 L 320 500 L 300 540 L 250 560 L 180 555 L 130 530 L 110 490 L 120 455 Z',
    labelX: 220, labelY: 500,
  },
};

function getColorScale(value: number, min: number, max: number, metric: MapMetric): string {
  if (max === min) return '#94a3b8';
  const normalized = (value - min) / (max - min);

  if (metric === 'occupancy') {
    // Red = high (bad), green = low (good)
    if (normalized > 0.75) return '#dc2626';
    if (normalized > 0.5) return '#f97316';
    if (normalized > 0.25) return '#f59e0b';
    return '#10b981';
  }
  if (metric === 'equity' || metric === 'bedsPerTenK') {
    // Green = high (good), red = low (bad)
    if (normalized > 0.75) return '#059669';
    if (normalized > 0.5) return '#10b981';
    if (normalized > 0.25) return '#f59e0b';
    return '#dc2626';
  }
  // population - blue scale
  if (normalized > 0.75) return '#1e40af';
  if (normalized > 0.5) return '#2563eb';
  if (normalized > 0.25) return '#60a5fa';
  return '#bfdbfe';
}

const METRIC_LABELS: Record<MapMetric, string> = {
  occupancy: 'Bed Occupancy %',
  equity: 'Equity Score',
  bedsPerTenK: 'Beds per 10K',
  population: 'Population',
};

export default function OmanMapSVG({ metric, data, onSelect, selectedCode }: OmanMapSVGProps) {
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const { min, max } = useMemo(() => {
    const values = data.map(d => d.value);
    return { min: Math.min(...values), max: Math.max(...values) };
  }, [data]);

  const hoveredData = useMemo(() => {
    if (!hoveredCode) return null;
    return data.find(d => d.code === hoveredCode);
  }, [hoveredCode, data]);

  const formatValue = (val: number) => {
    if (metric === 'population') return val.toLocaleString();
    if (metric === 'occupancy') return `${val.toFixed(1)}%`;
    if (metric === 'bedsPerTenK') return val.toFixed(1);
    return val.toString();
  };

  return (
    <div className="relative w-full">
      <svg
        viewBox="80 0 400 580"
        className="w-full h-auto max-h-[500px]"
        onMouseLeave={() => setHoveredCode(null)}
      >
        {Object.entries(GOVERNORATE_PATHS).map(([code, { d }]) => {
          const govData = data.find(dd => dd.code === code);
          const value = govData?.value ?? 0;
          const fillColor = getColorScale(value, min, max, metric);
          const isSelected = selectedCode === code;
          const isHovered = hoveredCode === code;

          return (
            <path
              key={code}
              d={d}
              fill={fillColor}
              stroke={isSelected ? '#0f172a' : isHovered ? '#1e293b' : '#64748b'}
              strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
              className="cursor-pointer transition-all duration-300"
              style={{ opacity: isHovered || isSelected ? 1 : 0.85 }}
              onClick={() => onSelect?.(code)}
              onMouseEnter={(e) => {
                setHoveredCode(code);
                const svg = e.currentTarget.ownerSVGElement;
                if (svg) {
                  const rect = svg.getBoundingClientRect();
                  const pt = svg.createSVGPoint();
                  pt.x = e.clientX;
                  pt.y = e.clientY;
                  setTooltipPos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }
              }}
              onMouseMove={(e) => {
                const svg = e.currentTarget.ownerSVGElement;
                if (svg) {
                  const rect = svg.getBoundingClientRect();
                  setTooltipPos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }
              }}
            />
          );
        })}

        {/* Governorate labels */}
        {Object.entries(GOVERNORATE_PATHS).map(([code, { labelX, labelY }]) => (
          <text
            key={`label-${code}`}
            x={labelX}
            y={labelY}
            textAnchor="middle"
            className="pointer-events-none select-none fill-white dark:fill-white text-[8px] font-medium"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
          >
            {code}
          </text>
        ))}
      </svg>

      {/* Tooltip */}
      {hoveredCode && hoveredData && (
        <div
          className="absolute pointer-events-none z-50 bg-slate-900 text-white px-3 py-2 rounded-lg shadow-xl text-sm"
          style={{
            left: tooltipPos.x + 12,
            top: tooltipPos.y - 40,
            transform: 'translateX(-50%)',
          }}
        >
          <p className="font-semibold">{hoveredData.name}</p>
          <p className="text-slate-300 text-xs">
            {METRIC_LABELS[metric]}: {formatValue(hoveredData.value)}
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
        <span>Low</span>
        <div className="flex h-3 rounded overflow-hidden">
          {metric === 'occupancy' ? (
            <>
              <div className="w-8 bg-emerald-500" />
              <div className="w-8 bg-amber-500" />
              <div className="w-8 bg-orange-500" />
              <div className="w-8 bg-red-600" />
            </>
          ) : metric === 'population' ? (
            <>
              <div className="w-8 bg-blue-200" />
              <div className="w-8 bg-blue-400" />
              <div className="w-8 bg-blue-600" />
              <div className="w-8 bg-blue-800" />
            </>
          ) : (
            <>
              <div className="w-8 bg-red-600" />
              <div className="w-8 bg-amber-500" />
              <div className="w-8 bg-emerald-400" />
              <div className="w-8 bg-emerald-600" />
            </>
          )}
        </div>
        <span>High</span>
        <span className="ml-3 font-medium">{METRIC_LABELS[metric]}</span>
      </div>
    </div>
  );
}
