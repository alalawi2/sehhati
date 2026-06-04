'use client';

import { HEALTH_INDICATORS, GOVERNORATE_HEALTH } from '../../data/hospitals';
import { POPULATION_INDICATORS, POPULATION_BY_GOVERNORATE } from '../../data/population';
import { GOVERNORATES } from '../../data/governorates';
import TrendChart from '../../components/charts/TrendChart';
import BarCompare from '../../components/charts/BarCompare';
import GovernorateComparator from '../../components/sections/GovernorateComparator';
import DownloadButton from '../../components/ui/DownloadButton';
import { BarChart3 } from 'lucide-react';
import SourceBadge from '../../components/ui/SourceBadge';

export default function DashboardPage() {
  const healthData = HEALTH_INDICATORS.map(d => ({ ...d }));
  const popData = POPULATION_INDICATORS.map(d => ({ ...d }));

  const govBedData = GOVERNORATE_HEALTH.map((gh) => {
    const gov = GOVERNORATES.find((g) => g.code === gh.governorateCode);
    const pop = POPULATION_BY_GOVERNORATE.find((p) => p.governorateCode === gh.governorateCode);
    const totalBeds = gh.govtBeds + gh.privateBeds;
    const bedsPerTenK = pop ? Math.round((totalBeds / pop.total2025) * 10000 * 10) / 10 : 0;
    return {
      name: gov ? gov.nameEn : gh.governorateCode,
      bedsPerTenK,
    };
  }).sort((a, b) => b.bedsPerTenK - a.bedsPerTenK);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-2.5 bg-teal-50 dark:bg-teal-900/30 rounded-xl">
            <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Health Dashboard
            </h1>
            <p className="text-xs text-teal-600/70 dark:text-teal-400/70 font-medium">
              لوحة المؤشرات الصحية
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              National health indicators and workforce trends (2016-2025)
            </p>
            <SourceBadge sources={['OMHLTH2016', 'OMPOP2016']} />
          </div>
        </div>
        <DownloadButton
          data={healthData as unknown as Record<string, unknown>[]}
          filename="oman-health-indicators"
        />
      </div>

      <div className="space-y-6">
        <div className="relative">
          <TrendChart
            data={healthData}
            xKey="year"
            yKeys={[
              { key: 'bedsPerTenK', name: 'Beds/10K', color: '#0d9488' },
              { key: 'doctorsPerTenK', name: 'Doctors/10K', color: '#2563eb' },
              { key: 'nursesPerTenK', name: 'Nurses/10K', color: '#d97706' },
            ]}
            title="Health Workforce per 10,000 Population"
            height={380}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart
            data={popData}
            xKey="year"
            yKeys={[
              { key: 'lifeExpectancy', name: 'Life Expectancy', color: '#0d9488' },
            ]}
            title="Life Expectancy at Birth (years)"
            height={300}
          />
          <TrendChart
            data={popData}
            xKey="year"
            yKeys={[
              { key: 'fertilityRate', name: 'Fertility Rate', color: '#8b5cf6' },
              { key: 'infantMortality', name: 'Infant Mortality', color: '#dc2626' },
            ]}
            title="Fertility Rate & Infant Mortality"
            height={300}
          />
        </div>

        <TrendChart
          data={popData}
          xKey="year"
          yKeys={[
            { key: 'totalPop', name: 'Total (thousands)', color: '#0d9488' },
            { key: 'omaniPop', name: 'Omani (thousands)', color: '#2563eb' },
            { key: 'expatPop', name: 'Expat (thousands)', color: '#d97706' },
          ]}
          title="Population Trends (in thousands)"
          height={350}
        />

        <div className="relative">
          <BarCompare
            data={govBedData}
            valueKey="bedsPerTenK"
            nameKey="name"
            title="Hospital Beds per 10,000 Population by Governorate"
            color="#0d9488"
            height={420}
          />
          <div className="absolute top-5 right-5">
            <DownloadButton
              data={govBedData as unknown as Record<string, unknown>[]}
              filename="beds-per-governorate"
            />
          </div>
        </div>

        {/* Governorate Comparator */}
        <GovernorateComparator />
      </div>
    </div>
  );
}
