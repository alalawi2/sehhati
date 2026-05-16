'use client';

import { Database, BookOpen, Target, Users, ExternalLink, Cpu, Globe, Award, Building } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-800 dark:from-teal-900 dark:to-slate-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4">
            <Database className="h-3 w-3 text-teal-200" />
            <span className="text-[11px] font-medium text-teal-100">Open Data Lab 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            About Sehhati
          </h1>
          <p className="mt-2 text-xl text-teal-200">
            حول صحتي
          </p>
          <p className="mt-3 text-sm text-teal-100/80 max-w-2xl mx-auto">
            An open-data health intelligence platform built on Oman&apos;s National Open Data Portal
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* ===== National Open Data Portal Section (PROMINENT) ===== */}
        <section className="rounded-xl p-6 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/20 border-2 border-teal-200 dark:border-teal-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-teal-100 dark:bg-teal-800/50 rounded-lg">
              <Building className="h-6 w-6 text-teal-700 dark:text-teal-300" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">National Open Data Portal</h2>
              <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">البوابة الوطنية للبيانات المفتوحة</p>
            </div>
          </div>
          <div className="space-y-3 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
            <p>
              Oman&apos;s <strong>National Open Data Portal</strong> (<a href="https://opendata.gov.om" target="_blank" rel="noopener noreferrer" className="text-teal-700 dark:text-teal-300 underline hover:text-teal-900 dark:hover:text-teal-100">opendata.gov.om</a>)
              is the Sultanate&apos;s official open government data platform. It provides free, publicly accessible datasets
              across multiple sectors including health, education, economy, and infrastructure. The portal is part of Oman&apos;s
              commitment to transparency, good governance, and the digital transformation goals of <strong>Vision 2040</strong>.
            </p>
            <p>
              <strong>Why it matters:</strong> Open data empowers researchers, entrepreneurs, and policymakers to build
              evidence-based solutions. By making government data freely available, the portal catalyzes innovation and
              enables citizens to participate in informed decision-making about their country&apos;s future.
            </p>
            <p>
              <strong>How Sehhati uses it:</strong> This platform is a direct use case of the portal&apos;s data. We consume
              population statistics, health facility data, disease surveillance records, and demographic indicators
              published through the portal, then transform them into interactive visualizations and predictive models
              that support health policy planning across all 11 governorates.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-teal-100/60 dark:bg-teal-800/30 border border-teal-200/60 dark:border-teal-700/50">
              <p className="text-xs text-teal-800 dark:text-teal-200 font-medium text-center">
                Sehhati demonstrates that open data can directly improve health planning and resource allocation in Oman.
                <br />
                <span className="text-teal-600 dark:text-teal-400">
                  صحتي يُثبت أن البيانات المفتوحة يمكنها تحسين التخطيط الصحي وتوزيع الموارد في سلطنة عمان بشكل مباشر
                </span>
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <a
              href="https://opendata.gov.om"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors shadow-md"
            >
              Visit the National Open Data Portal
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Project Description */}
        <section className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
              <Target className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Project Overview</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">نظرة عامة على المشروع</p>
            </div>
          </div>
          <div className="space-y-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            <p>
              <strong>Sehhati</strong> (صحتي, meaning &ldquo;My Health&rdquo; in Arabic) is an open-data health intelligence
              platform for the Sultanate of Oman. Built entirely on data from the National Open Data Portal, it transforms
              publicly available government datasets into interactive visualizations and predictive insights that support
              evidence-based health planning.
            </p>
            <p>
              The platform addresses four critical questions: How are health resources distributed across governorates?
              Which hospitals are approaching capacity limits? How equitable is healthcare access? And what disease
              trends demand attention?
            </p>
          </div>
        </section>

        {/* Vision 2040 Alignment */}
        <section className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
              <Globe className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Vision 2040 Alignment</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">التوافق مع رؤية عمان 2040</p>
            </div>
          </div>
          <div className="space-y-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            <p>
              Sehhati directly aligns with <strong>رؤية عمان 2040</strong> (Oman Vision 2040), specifically the
              &ldquo;Health&rdquo; priority area which calls for a world-class health system. The platform supports
              data-driven decision making for:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Equitable distribution of health resources across all governorates</li>
              <li>Proactive capacity planning to prevent overcrowding</li>
              <li>Early detection of disease trends for public health preparedness</li>
              <li>Transparent use of open government data for accountability</li>
            </ul>
          </div>
        </section>

        {/* Methodology */}
        <section className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Methodology</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">المنهجية</p>
            </div>
          </div>
          <div className="space-y-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Capacity Projections</h3>
              <p>
                Hospital occupancy is projected forward assuming constant bed supply with demand growing at the
                governorate-level population growth rate. A compound growth model estimates when each facility
                will reach the 85% critical occupancy threshold.
              </p>
              <div className="mt-2 p-3 rounded-lg bg-gray-50 dark:bg-slate-800/50 font-mono text-xs">
                Occ(t) = Occ(now) * (1 + growth_rate)^t
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Equity Scoring</h3>
              <p>
                A composite equity score (0-100) from five dimensions: bed availability per capita, hospital
                density (proxy for physician access), health centre density, pharmacy and clinic access, and system stress
                (inverse occupancy). Each dimension is min-max normalized across all 11 governorates, then averaged.
              </p>
              <div className="mt-2 p-3 rounded-lg bg-gray-50 dark:bg-slate-800/50 font-mono text-xs">
                Equity = (bedScore + hospitalDensityScore + nurseScore + accessScore + stressScore) / 5
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Disease Surveillance</h3>
              <p>
                Three-year trends (2023-2025) for notifiable infectious diseases classified by Oman&apos;s MOH into
                Groups A, B, and C. YoY percentage changes highlight emerging threats and successful control measures.
              </p>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Data Sources</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">مصادر البيانات</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              {
                name: 'National Open Data Portal (Primary Source)',
                description: 'Oman\'s official open government data platform. The primary source of all datasets used in this platform, providing population, health, and demographic data through publicly accessible APIs and downloads.',
                url: 'https://opendata.gov.om',
                primary: true,
              },
              {
                name: 'National Centre for Statistics and Information (NCSI)',
                description: 'Population statistics, demographic indicators, and vital statistics for all governorates.',
                url: 'https://data.gov.om',
                primary: false,
              },
              {
                name: 'Ministry of Health (MOH) — Annual Health Report 2025',
                description: 'Hospital capacity data, health workforce ratios, infectious disease notifications, and mortality statistics.',
                url: 'https://www.moh.gov.om',
                primary: false,
              },
              {
                name: 'Oman Meteorological Service',
                description: 'Monthly temperature, humidity, and rainfall data by station for climate-health correlation analysis.',
                url: 'https://met.gov.om',
                primary: false,
              },
            ].map((source) => (
              <div
                key={source.name}
                className={`p-4 rounded-lg ${source.primary ? 'bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800' : 'bg-gray-50 dark:bg-slate-800/50'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className={`text-sm font-semibold ${source.primary ? 'text-teal-800 dark:text-teal-200' : 'text-gray-900 dark:text-white'}`}>{source.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{source.description}</p>
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-1.5 text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          {/* Source footnote */}
          <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30">
            <p className="text-xs text-amber-700 dark:text-amber-300">
              <strong>Note:</strong> Death data by governorate excludes Royal Hospital and Khoula Hospital (national referral centres counted separately).
            </p>
          </div>
        </section>

        {/* Acknowledgments */}
        <section className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
              <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Acknowledgments</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">شكر وتقدير</p>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
            <p>
              This platform was developed for the <strong>Open Data Lab Oman Competition 2026</strong>, an initiative
              by the Ministry of Transport, Communications and Information Technology (MTCIT) promoting innovative
              use of publicly available government datasets.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {['National Open Data Portal', 'NCSI', 'Ministry of Health', 'MTCIT'].map((org) => (
                <div key={org} className="p-3 rounded-lg bg-gray-50 dark:bg-slate-800/50 text-center">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{org}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
              <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Team</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">الفريق</p>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <p className="font-medium text-gray-900 dark:text-white">
              MedResearch Academy | أكاديمية البحث الطبي
            </p>
            <p className="mt-1">
              Dedicated to leveraging data science and technology to improve healthcare delivery in Oman and the region.
            </p>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <Cpu className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Technology</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">التقنيات المستخدمة</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Leaflet', 'Vercel', 'Open Data APIs'].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300 border border-gray-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
