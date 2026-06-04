'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Building2,
  Activity,
  Bug,
  BarChart3,
  Shield,
  ArrowRight,
  Database,
  ExternalLink,
  Lightbulb,
  Target,
  Rocket,
} from 'lucide-react';
import OmanMapReal from '../components/map/OmanMapReal';
import type { MapMetric } from '../components/map/OmanMapReal';
import GovernorateDetail from '../components/sections/GovernorateDetail';
import InsightsFeed from '../components/sections/InsightsFeed';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { GOVERNORATES } from '../data/governorates';
import { GOVERNORATE_HEALTH, MOH_HOSPITALS } from '../data/hospitals';
import { POPULATION_BY_GOVERNORATE } from '../data/population';
import { INFECTIOUS_DISEASES } from '../data/diseases';
import { calculateEquityScores, getTotalBeds, getTotalHospitals, getAverageOccupancy } from '../lib/calculations';

// Computed from data — single source of truth
const totalPopulation = POPULATION_BY_GOVERNORATE.reduce((s, p) => s + p.total2025, 0);
const heroStats = [
  { label: 'Population', labelAr: 'السكان', value: totalPopulation / 1_000_000, suffix: 'M', decimals: 2 },
  { label: 'Hospitals', labelAr: 'المستشفيات', value: getTotalHospitals(), suffix: '', decimals: 0 },
  { label: 'Beds', labelAr: 'الأسرة', value: getTotalBeds(), suffix: '', decimals: 0 },
  { label: 'Life Expectancy', labelAr: 'متوسط العمر', value: 78.6, suffix: ' yrs', decimals: 1 },
];

const features = [
  {
    href: '/dashboard',
    title: 'Health Dashboard',
    titleAr: 'لوحة الصحة',
    description: 'Track national health indicators, workforce ratios, and demographic trends over the past decade.',
    icon: <BarChart3 className="h-6 w-6" />,
    gradient: 'from-teal-600 to-emerald-600',
  },
  {
    href: '/capacity',
    title: 'Capacity Predictor',
    titleAr: 'تنبؤ السعة',
    description: 'Project hospital occupancy rates and identify facilities at risk of overcrowding by 2027 and 2030.',
    icon: <Building2 className="h-6 w-6" />,
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    href: '/equity',
    title: 'Equity Atlas',
    titleAr: 'أطلس العدالة',
    description: 'Score and rank governorates on health resource equity across beds, workforce, and access metrics.',
    icon: <Shield className="h-6 w-6" />,
    gradient: 'from-purple-600 to-indigo-600',
  },
  {
    href: '/diseases',
    title: 'Disease Trends',
    titleAr: 'اتجاهات الأمراض',
    description: 'Analyze infectious disease patterns, mortality data, and emerging public health threats across Oman.',
    icon: <Bug className="h-6 w-6" />,
    gradient: 'from-amber-600 to-orange-600',
  },
];

const dataSources = [
  {
    name: 'NCSI Open Data Portal — Health Dataset (OMHLTH2016)',
    nameAr: 'بوابة البيانات المفتوحة — مجموعة بيانات الصحة',
    description: 'Primary dataset: hospitals, health units, workforce structure, hospital beds, diseases & epidemics. Published by the National Centre for Statistics & Information (NCSI). Coverage: 1975–2023.',
    url: 'https://data.gov.om/OMHLTH2016/health?regions=1000000-oman',
    primary: true,
    logo: '/logos/ncsi-logo.png',
  },
  {
    name: 'NCSI Open Data Portal — Population Dataset (OMPOP2016)',
    nameAr: 'بوابة البيانات المفتوحة — مجموعة بيانات السكان',
    description: 'Population by governorate, nationality, vital statistics (births, deaths, fertility, life expectancy), and demographic projections.',
    url: 'https://data.gov.om/OMPOP2016/population',
    primary: true,
    logo: '/logos/ncsi-logo.png',
  },
  {
    name: 'NCSI Statistical Yearbook 2026 (Issue 54)',
    nameAr: 'الكتاب الإحصائي السنوي ٢٠٢٦ — الإصدار ٥٤',
    description: 'Complementary source: detailed hospital-level data, climate indicators, infectious disease notifications, and health workforce by specialization. Section 17 (Health) and Section 2 (Population).',
    url: 'https://www.ncsi.gov.om/publications',
    primary: false,
    logo: '/logos/ncsi-logo.png',
  },
  {
    name: 'Ministry of Health Annual Reports',
    nameAr: 'التقارير السنوية لوزارة الصحة',
    description: 'Disease surveillance data, health facility directories, and maternal/child health indicators.',
    url: 'https://www.moh.gov.om/en/statistics/annual-health-reports/',
    primary: false,
    logo: '/logos/moh-logo-en.png',
  },
];

// Computed "Open Data Revealed" — no hardcoded numbers
const bedRatiosByGov = GOVERNORATE_HEALTH.map(gh => {
  const pop = POPULATION_BY_GOVERNORATE.find(p => p.governorateCode === gh.governorateCode);
  const ratio = pop ? ((gh.govtBeds + gh.privateBeds) / pop.total2025) * 10000 : 0;
  const name = GOVERNORATES.find(g => g.code === gh.governorateCode)?.nameEn || gh.governorateCode;
  return { name, ratio };
}).sort((a, b) => a.ratio - b.ratio);
const lowestBedGov = bedRatiosByGov[0];

const highestOccHospital = [...MOH_HOSPITALS].sort((a, b) => b.occupancyRate - a.occupancyRate)[0];

const foodPoisoning = INFECTIOUS_DISEASES.find(d => d.name === 'Food Poisoning');
const fpChange = foodPoisoning && foodPoisoning.cases2023 > 0
  ? Math.round(((foodPoisoning.cases2025 - foodPoisoning.cases2023) / foodPoisoning.cases2023) * 100)
  : 0;

const noPrivateCount = GOVERNORATE_HEALTH.filter(gh => gh.privateBeds === 0).length;

const openDataRevealed = [
  {
    finding: `${lowestBedGov.name} has the lowest bed-to-population ratio in the country — ${lowestBedGov.ratio.toFixed(1)} per 10,000`,
    findingAr: `${lowestBedGov.name} لديها أدنى نسبة أسرة إلى عدد السكان — ${lowestBedGov.ratio.toFixed(1)} لكل ١٠,٠٠٠`,
    severity: 'critical',
  },
  {
    finding: `${highestOccHospital.name} is operating at ${highestOccHospital.occupancyRate}% capacity — a finding invisible without transparent data`,
    findingAr: `${highestOccHospital.name} يعمل بنسبة ${highestOccHospital.occupancyRate}٪ — اكتشاف مستحيل بدون بيانات شفافة`,
    severity: 'critical',
  },
  {
    finding: `A ${fpChange}% surge in food poisoning cases (2023–2025) — enabling early intervention`,
    findingAr: `ارتفاع ${fpChange}٪ في حالات التسمم الغذائي (٢٠٢٣–٢٠٢٥) — مما يتيح التدخل المبكر`,
    severity: 'warning',
  },
  {
    finding: `${noPrivateCount} governorates with zero private hospital beds — highlighting investment opportunities`,
    findingAr: `${noPrivateCount} محافظات بدون أسرة مستشفيات خاصة — مما يبرز فرص الاستثمار`,
    severity: 'info',
  },
];

const policyRecommendations = [
  'Prioritize bed expansion in Al Batinah South and Al Batinah North — fastest growing populations with lowest bed ratios',
  'Establish private sector incentives in the 6 governorates with zero private hospital beds',
  'Expand mental health infrastructure beyond the single 185-bed facility (Al Masarra Hospital)',
  'Implement climate-based disease early warning for dengue-prone regions',
  'Publish health datasets on the National Open Data Portal to enable broader innovation',
];

export default function HomePage() {
  const [selectedGov, setSelectedGov] = useState<string | null>(null);
  const [mapMetric, setMapMetric] = useState<MapMetric>('occupancy');

  const mapData = useMemo(() => {
    const equityScores = calculateEquityScores();

    return GOVERNORATES.map(g => {
      const health = GOVERNORATE_HEALTH.find(gh => gh.governorateCode === g.code);
      const pop = POPULATION_BY_GOVERNORATE.find(p => p.governorateCode === g.code);
      const hospitals = MOH_HOSPITALS.filter(h => h.governorateCode === g.code);
      const equity = equityScores.find(e => e.governorateCode === g.code);

      let value = 0;
      if (mapMetric === 'occupancy') {
        if (hospitals.length > 0) {
          const totalBeds = hospitals.reduce((s, h) => s + h.beds, 0);
          value = totalBeds > 0
            ? hospitals.reduce((s, h) => s + h.occupancyRate * h.beds, 0) / totalBeds
            : 0;
        }
      } else if (mapMetric === 'equity') {
        value = equity?.overall || 0;
      } else if (mapMetric === 'bedsPerTenK') {
        if (health && pop) {
          value = ((health.govtBeds + health.privateBeds) / pop.total2025) * 10000;
        }
      } else if (mapMetric === 'population') {
        value = pop?.total2025 || 0;
      }

      return { code: g.code, name: g.nameEn, value };
    });
  }, [mapMetric]);

  return (
    <div className="animate-fade-in">
      {/* ===== SECTION 1: Hero ===== */}
      <section className="relative overflow-hidden gradient-hero-light dark:gradient-hero">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6bTAtMzBWMkgydjJoMzR6TTIgMzRoMnYySDJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            {/* Open Data Lab Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-4 sm:mb-6">
              <Database className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-teal-200" />
              <span className="text-[10px] sm:text-xs font-medium text-teal-100">
                مختبر البيانات المفتوحة 2026 | Open Data Lab 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
              OHealth
            </h1>
            <p className="mt-3 sm:mt-4 text-lg sm:text-xl lg:text-2xl text-teal-100 font-light">
              Oman Health Intelligence Platform
            </p>
            <p className="mt-1 text-sm sm:text-lg text-teal-200/80">
              منصة عمان للذكاء الصحي
            </p>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-teal-200 font-medium">
              Built on Oman&apos;s National Open Data Portal | مبني على البوابة الوطنية للبيانات المفتوحة
            </p>

            {/* Hero Stats */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
              {heroStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="animate-count-up bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    <AnimatedCounter
                      end={stat.value}
                      duration={2000 + i * 300}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </div>
                  <p className="text-[10px] sm:text-xs text-teal-200 mt-1 font-medium">{stat.label}</p>
                  <p className="text-[9px] sm:text-[10px] text-teal-300/60">{stat.labelAr}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-teal-700 rounded-lg font-semibold hover:bg-teal-50 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Explore Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-all text-sm sm:text-base"
              >
                About the Platform
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 1.5: Made Possible by Open Data Banner ===== */}
      <section className="py-10 sm:py-14 bg-gradient-to-b from-teal-50 to-white dark:from-teal-900/20 dark:to-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/40 border border-teal-200 dark:border-teal-700 mb-4">
            <Database className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            <span className="text-xs font-semibold text-teal-700 dark:text-teal-300">Open Data Impact</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Made Possible by Open Data
          </h2>
          <p className="text-base sm:text-lg text-teal-700 dark:text-teal-300 font-medium mt-1">
            أصبح ممكنًا بفضل البيانات المفتوحة
          </p>
          <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            This platform transforms publicly available government data into actionable health intelligence.
            Without Oman&apos;s commitment to open data, these critical insights would remain locked in spreadsheets.
          </p>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed" dir="rtl">
            هذه المنصة تحول البيانات الحكومية المتاحة للجمهور إلى ذكاء صحي قابل للتنفيذ.
            بدون التزام عمان بالبيانات المفتوحة، ستبقى هذه الرؤى الحيوية حبيسة الجداول
          </p>
        </div>
      </section>

      {/* ===== SECTION 2: Interactive Map ===== */}
      <section className="py-10 sm:py-16 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Healthcare Across Oman
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              الرعاية الصحية في عمان
            </p>
          </div>

          {/* Metric Selector - horizontal scroll on mobile */}
          <div className="scroll-pills flex gap-2 mb-6 justify-start sm:justify-center pb-2">
            {(['occupancy', 'equity', 'bedsPerTenK', 'population'] as MapMetric[]).map(m => (
              <button
                key={m}
                onClick={() => setMapMetric(m)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  mapMetric === m
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-700 dark:hover:text-teal-300'
                }`}
              >
                {m === 'occupancy' ? 'Occupancy' : m === 'equity' ? 'Equity Score' : m === 'bedsPerTenK' ? 'Beds/10K' : 'Population'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            {/* Map (60%) */}
            <div className="lg:col-span-3 glass rounded-2xl p-2 sm:p-4">
              <OmanMapReal
                metric={mapMetric}
                data={mapData}
                selectedCode={selectedGov}
                onSelect={(code) => setSelectedGov(code === selectedGov ? null : code)}
              />
            </div>

            {/* Detail Panel (40%) */}
            <div className="lg:col-span-2">
              {selectedGov ? (
                <GovernorateDetail code={selectedGov} onClose={() => setSelectedGov(null)} />
              ) : (
                <div className="glass rounded-2xl p-4 sm:p-6">
                  <div className="text-center py-6 sm:py-8">
                    <Activity className="h-8 sm:h-10 w-8 sm:w-10 text-teal-500/40 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1 text-sm sm:text-base">
                      Select a Governorate
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Click on any region to view detailed health metrics
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      اختر محافظة لعرض التفاصيل
                    </p>
                    {/* Quick summary stats — computed from data */}
                    <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3 text-left">
                      <div className="p-2 sm:p-3 rounded-lg bg-teal-50 dark:bg-teal-900/20">
                        <p className="text-base sm:text-lg font-bold text-teal-700 dark:text-teal-300">{getTotalHospitals()}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Total Hospitals</p>
                      </div>
                      <div className="p-2 sm:p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                        <p className="text-base sm:text-lg font-bold text-amber-700 dark:text-amber-300">{getTotalBeds().toLocaleString()}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Total Beds</p>
                      </div>
                      <div className="p-2 sm:p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <p className="text-base sm:text-lg font-bold text-blue-700 dark:text-blue-300">{GOVERNORATES.length}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Governorates</p>
                      </div>
                      <div className="p-2 sm:p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                        <p className="text-base sm:text-lg font-bold text-purple-700 dark:text-purple-300">{getAverageOccupancy()}%</p>
                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Avg Occupancy</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2.5: What Open Data Revealed ===== */}
      <section className="py-10 sm:py-16 bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-900/10 dark:to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 mb-3">
              <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">Discoveries</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              What Open Data Revealed
            </h2>
            <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
              ماذا كشفت البيانات المفتوحة
            </p>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 dark:text-gray-500 max-w-xl mx-auto">
              Critical discoveries that were only possible because Oman publishes its data openly
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {openDataRevealed.map((item, i) => (
              <div
                key={i}
                className={`rounded-xl p-4 sm:p-5 border-l-4 ${
                  item.severity === 'critical'
                    ? 'border-l-red-500 bg-red-50 dark:bg-red-900/10'
                    : item.severity === 'warning'
                      ? 'border-l-amber-500 bg-amber-50 dark:bg-amber-900/10'
                      : 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/10'
                }`}
              >
                <p className="text-xs sm:text-sm font-semibold text-teal-700 dark:text-teal-300 mb-2">
                  Open data revealed:
                </p>
                <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white leading-relaxed">
                  {item.finding}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2" dir="rtl">
                  {item.findingAr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: Key Findings ===== */}
      <section className="py-10 sm:py-16 bg-gray-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              What the Data Reveals
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              ماذا تكشف البيانات
            </p>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 dark:text-gray-500">
              Automatically detected patterns from the latest health data
            </p>
          </div>
          <InsightsFeed maxItems={4} showFilters={false} />
          <div className="mt-6 text-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
            >
              View all insights on dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3.5: Policy Recommendations ===== */}
      <section className="py-10 sm:py-16 bg-white dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 mb-3">
              <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">Actionable</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Policy Recommendations
            </h2>
            <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
              توصيات السياسات
            </p>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 dark:text-gray-500 max-w-xl mx-auto">
              Data-driven recommendations generated from open data analysis
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {policyRecommendations.map((rec, i) => (
              <div
                key={i}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl glass"
              >
                <span className="shrink-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 text-xs sm:text-sm font-bold">
                  {i + 1}
                </span>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 leading-relaxed">
                  {rec}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: Explore ===== */}
      <section className="py-10 sm:py-16 bg-gray-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Explore
            </h2>
            <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Dive deeper into specific dimensions of Oman&apos;s health system
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group card-premium p-5 sm:p-6"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-teal-600/70 dark:text-teal-400/70 font-medium mt-0.5">
                  {feature.titleAr}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-teal-600 dark:text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4.5: Build on This Data ===== */}
      <section className="py-10 sm:py-16 bg-white dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 mb-3">
              <Rocket className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Open Innovation</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Build on This Data
            </h2>
            <p className="mt-1 text-sm sm:text-base text-teal-700 dark:text-teal-300 font-medium">
              ابنِ على هذه البيانات
            </p>
          </div>

          <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            The same datasets that power OHealth are freely available to everyone.
            We encourage researchers, entrepreneurs, and developers to explore Oman&apos;s open data
            and create new solutions for the Sultanate&apos;s challenges.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="https://data.gov.om/OMHLTH2016"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-xl glass hover:shadow-lg transition-shadow group text-center"
            >
              <Database className="h-6 w-6 text-teal-600 dark:text-teal-400 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-teal-600 dark:group-hover:text-teal-400">
                OMHLTH2016
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Health Dataset</p>
              <p className="text-[10px] text-teal-600 dark:text-teal-400 mt-2 flex items-center justify-center gap-1">
                data.gov.om/OMHLTH2016 <ExternalLink className="h-3 w-3" />
              </p>
            </a>
            <a
              href="https://data.gov.om/OMPOP2016"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-xl glass hover:shadow-lg transition-shadow group text-center"
            >
              <Database className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400">
                OMPOP2016
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Population Dataset</p>
              <p className="text-[10px] text-blue-600 dark:text-blue-400 mt-2 flex items-center justify-center gap-1">
                data.gov.om/OMPOP2016 <ExternalLink className="h-3 w-3" />
              </p>
            </a>
            <a
              href="https://opendata.gov.om"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-xl glass hover:shadow-lg transition-shadow group text-center"
            >
              <Database className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400">
                Open Data Portal
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">National Portal</p>
              <p className="text-[10px] text-purple-600 dark:text-purple-400 mt-2 flex items-center justify-center gap-1">
                opendata.gov.om <ExternalLink className="h-3 w-3" />
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: Data Sources ===== */}
      <section className="py-10 sm:py-16 bg-gray-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Our Data Sources
            </h2>
            <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
              مصادر البيانات
            </p>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 dark:text-gray-500 max-w-2xl mx-auto">
              Utilizing Oman&apos;s open government data ecosystem — including the NCSI Data Portal (data.gov.om), complemented by the NCSI Statistical Yearbook and Ministry of Health reports
            </p>
            <p className="mt-1 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 max-w-2xl mx-auto">
              تستخدم منظومة البيانات الحكومية المفتوحة في سلطنة عمان — بما في ذلك بوابة بيانات المركز الوطني للإحصاء والمعلومات، مع الكتاب الإحصائي السنوي وتقارير وزارة الصحة
            </p>
          </div>
          {/* MTCIT - Competition Organizer - Hero Card */}
          <div className="mb-6 rounded-xl p-4 sm:p-6 bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-800 dark:to-emerald-900 text-white text-center">
            <p className="text-teal-100 text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-2 sm:mb-3">Competition Organizer | الجهة المنظمة للمسابقة</p>
            <a href="https://mtcit.gov.om" target="_blank" rel="noopener noreferrer">
              <img src="/logos/mtcit-logo.png" alt="Ministry of Transport, Communications and Information Technology" className="h-10 sm:h-12 mx-auto object-contain brightness-200 contrast-50 mb-2 sm:mb-3" />
            </a>
            <p className="text-xs sm:text-sm font-semibold">وزارة النقل والاتصالات وتقنية المعلومات</p>
            <p className="text-[10px] sm:text-xs text-teal-100 mt-1">Ministry of Transport, Communications and Information Technology</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5">
            {dataSources.map((source) => (
              <div key={source.name} className={`rounded-xl p-4 sm:p-6 ${source.primary ? 'bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/20 border-2 border-teal-200 dark:border-teal-700' : 'glass'}`}>
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div>
                    {source.logo && (
                      <img src={source.logo} alt={source.name} className={`${source.primary ? 'h-6 sm:h-8' : 'h-5 sm:h-6'} object-contain mb-2 dark:brightness-200 dark:contrast-50`} />
                    )}
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium text-teal-700 dark:text-teal-300 bg-teal-100/50 dark:bg-teal-900/30 hover:bg-teal-200/50 dark:hover:bg-teal-800/50 transition-colors"
                  >
                    Visit <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <h3 className={`font-semibold text-gray-900 dark:text-white ${source.primary ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
                  {source.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-teal-600/70 dark:text-teal-400/70 mt-0.5">
                  {source.nameAr}
                </p>
                <p className={`mt-2 text-gray-500 dark:text-gray-400 leading-relaxed ${source.primary ? 'text-xs sm:text-sm' : 'text-[11px] sm:text-xs'}`}>
                  {source.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
