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
} from 'lucide-react';
import OmanMapReal from '../components/map/OmanMapReal';
import type { MapMetric } from '../components/map/OmanMapReal';
import GovernorateDetail from '../components/sections/GovernorateDetail';
import InsightsFeed from '../components/sections/InsightsFeed';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { GOVERNORATES } from '../data/governorates';
import { GOVERNORATE_HEALTH, MOH_HOSPITALS } from '../data/hospitals';
import { POPULATION_BY_GOVERNORATE } from '../data/population';
import { calculateEquityScores } from '../lib/calculations';

const heroStats = [
  { label: 'Population', labelAr: 'السكان', value: 5.36, suffix: 'M', decimals: 2 },
  { label: 'Hospitals', labelAr: 'المستشفيات', value: 98, suffix: '', decimals: 0 },
  { label: 'Beds', labelAr: 'الأسرة', value: 9706, suffix: '', decimals: 0 },
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
    name: 'National Open Data Portal',
    nameAr: 'البوابة الوطنية للبيانات المفتوحة',
    description: 'The primary data source powering this platform. Oman\'s official open government data initiative enabling innovation, transparency, and evidence-based policy.',
    url: 'https://opendata.gov.om',
    primary: true,
    logo: '/logos/opendata-logo.png',
  },
  {
    name: 'NCSI Statistical Yearbook 2026',
    nameAr: 'المركز الوطني للإحصاء والمعلومات',
    description: 'National Centre for Statistics & Information — Population, demographics, and vital statistics for all governorates.',
    url: 'https://data.gov.om',
    primary: false,
    logo: '/logos/ncsi-logo.png',
  },
  {
    name: 'Ministry of Health',
    nameAr: 'وزارة الصحة',
    description: 'Hospital capacity data, health workforce ratios, infectious disease notifications, and mortality statistics.',
    url: 'https://www.moh.gov.om',
    primary: false,
    logo: '/logos/moh-logo-en.png',
  },
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            {/* Open Data Lab Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <Database className="h-3.5 w-3.5 text-teal-200" />
              <span className="text-xs font-medium text-teal-100">
                مختبر البيانات المفتوحة 2026 | Open Data Lab 2026
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
              صحتي <span className="text-teal-200">|</span> Sehhati
            </h1>
            <p className="mt-4 text-xl sm:text-2xl text-teal-100 font-light">
              Oman Health Intelligence Platform
            </p>
            <p className="mt-1 text-lg text-teal-200/80">
              منصة عمان للذكاء الصحي
            </p>
            <p className="mt-4 text-sm text-teal-200 font-medium">
              Built on Oman&apos;s National Open Data Portal | مبني على البوابة الوطنية للبيانات المفتوحة
            </p>

            {/* Hero Stats */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {heroStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="animate-count-up bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    <AnimatedCounter
                      end={stat.value}
                      duration={2000 + i * 300}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </div>
                  <p className="text-xs text-teal-200 mt-1 font-medium">{stat.label}</p>
                  <p className="text-[10px] text-teal-300/60">{stat.labelAr}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-700 rounded-lg font-semibold hover:bg-teal-50 transition-all shadow-lg hover:shadow-xl"
              >
                Explore Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-all"
              >
                About the Platform
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: Interactive Map ===== */}
      <section className="py-16 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Healthcare Across Oman
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              الرعاية الصحية في عمان
            </p>
          </div>

          {/* Metric Selector */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {(['occupancy', 'equity', 'bedsPerTenK', 'population'] as MapMetric[]).map(m => (
              <button
                key={m}
                onClick={() => setMapMetric(m)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
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
            <div className="lg:col-span-3 glass rounded-2xl p-4">
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
                <div className="glass rounded-2xl p-6">
                  <div className="text-center py-8">
                    <Activity className="h-10 w-10 text-teal-500/40 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Select a Governorate
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Click on any region to view detailed health metrics
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      اختر محافظة لعرض التفاصيل
                    </p>
                    {/* Quick summary stats */}
                    <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                      <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-900/20">
                        <p className="text-lg font-bold text-teal-700 dark:text-teal-300">98</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Total Hospitals</p>
                      </div>
                      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                        <p className="text-lg font-bold text-amber-700 dark:text-amber-300">9,706</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Total Beds</p>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <p className="text-lg font-bold text-blue-700 dark:text-blue-300">11</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Governorates</p>
                      </div>
                      <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                        <p className="text-lg font-bold text-purple-700 dark:text-purple-300">64.6%</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Avg Occupancy</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: Key Findings ===== */}
      <section className="py-16 bg-gray-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              What the Data Reveals
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              ماذا تكشف البيانات
            </p>
            <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
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

      {/* ===== SECTION 4: Explore ===== */}
      <section className="py-16 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Explore
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Dive deeper into specific dimensions of Oman&apos;s health system
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group card-premium p-6"
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
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
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

      {/* ===== SECTION 5: Data Sources ===== */}
      <section className="py-16 bg-gray-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Our Data Sources
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              مصادر البيانات
            </p>
            <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
              All data is sourced from official Omani government open data publications
            </p>
          </div>
          {/* MTCIT - Competition Organizer - Hero Card */}
          <div className="mb-6 rounded-xl p-6 bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-800 dark:to-emerald-900 text-white text-center">
            <p className="text-teal-100 text-xs font-medium uppercase tracking-wider mb-3">Competition Organizer | الجهة المنظمة للمسابقة</p>
            <a href="https://mtcit.gov.om" target="_blank" rel="noopener noreferrer">
              <img src="/logos/mtcit-logo.png" alt="Ministry of Transport, Communications and Information Technology" className="h-12 mx-auto object-contain brightness-200 contrast-50 mb-3" />
            </a>
            <p className="text-sm font-semibold">وزارة النقل والاتصالات وتقنية المعلومات</p>
            <p className="text-xs text-teal-100 mt-1">Ministry of Transport, Communications and Information Technology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {dataSources.map((source) => (
              <div key={source.name} className={`rounded-xl p-6 ${source.primary ? 'md:col-span-3 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/20 border-2 border-teal-200 dark:border-teal-700' : 'glass'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    {source.logo && (
                      <img src={source.logo} alt={source.name} className={`${source.primary ? 'h-8' : 'h-6'} object-contain mb-2 dark:brightness-200 dark:contrast-50`} />
                    )}
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-teal-700 dark:text-teal-300 bg-teal-100/50 dark:bg-teal-900/30 hover:bg-teal-200/50 dark:hover:bg-teal-800/50 transition-colors"
                  >
                    Visit <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <h3 className={`font-semibold text-gray-900 dark:text-white ${source.primary ? 'text-base' : 'text-sm'}`}>
                  {source.name}
                </h3>
                <p className="text-xs text-teal-600/70 dark:text-teal-400/70 mt-0.5">
                  {source.nameAr}
                </p>
                <p className={`mt-2 text-gray-500 dark:text-gray-400 leading-relaxed ${source.primary ? 'text-sm' : 'text-xs'}`}>
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
