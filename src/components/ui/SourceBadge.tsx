'use client';

const SOURCES = {
  OMHLTH2016: { label: 'OMHLTH2016', color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200' },
  OMPOP2016: { label: 'OMPOP2016', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200' },
  YEARBOOK: { label: 'NCSI Yearbook', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200' },
  MOH: { label: 'MOH Report', color: 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300' },
  DERIVED: { label: 'Derived', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' },
} as const;

type SourceKey = keyof typeof SOURCES;

export default function SourceBadge({ sources }: { sources: SourceKey[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-1">
      {sources.map(key => (
        <span
          key={key}
          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-medium ${SOURCES[key].color}`}
        >
          {SOURCES[key].label}
        </span>
      ))}
    </div>
  );
}
