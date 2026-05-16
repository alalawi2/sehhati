'use client';

import { Download } from 'lucide-react';
import { exportToCSV } from '../../lib/exportData';

interface DownloadButtonProps {
  data: Record<string, unknown>[];
  filename: string;
  label?: string;
}

export default function DownloadButton({ data, filename, label = 'Download CSV' }: DownloadButtonProps) {
  return (
    <button
      onClick={() => exportToCSV(data, filename)}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
    >
      <Download className="h-4 w-4" />
      {label}
    </button>
  );
}
