'use client';

import { Database, BookOpen, Target, Users, ExternalLink, Cpu, Globe, Award, Building } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-800 dark:from-teal-900 dark:to-slate-900 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4">
            <Database className="h-3 w-3 text-teal-200" />
            <span className="text-[10px] sm:text-[11px] font-medium text-teal-100">Open Data Lab 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            About OHealth
          </h1>
          <p className="mt-2 text-base sm:text-xl text-teal-200">
            حول OHealth — منصة عمان للذكاء الصحي
          </p>
          <p className="mt-3 text-xs sm:text-sm text-teal-100/80 max-w-2xl mx-auto">
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
              Oman&apos;s open government data ecosystem includes multiple platforms that make official statistics freely
              available to the public. The <strong>National Open Data Portal</strong> (<a href="https://opendata.gov.om" target="_blank" rel="noopener noreferrer" className="text-teal-700 dark:text-teal-300 underline hover:text-teal-900 dark:hover:text-teal-100">opendata.gov.om</a>)
              serves as the central hub, while the <strong>NCSI Data Portal</strong> (<a href="https://data.gov.om" target="_blank" rel="noopener noreferrer" className="text-teal-700 dark:text-teal-300 underline hover:text-teal-900 dark:hover:text-teal-100">data.gov.om</a>)
              publishes detailed statistical datasets covering health, population, economy, and more. Together, these platforms
              support Oman&apos;s commitment to transparency, good governance, and <strong>Vision 2040</strong>.
            </p>
            <p>
              <strong>How OHealth uses open data:</strong> All data used in OHealth comes from government entities that are
              registered publishers on the <strong>National Open Data Portal</strong> (<a href="https://opendata.gov.om" target="_blank" rel="noopener noreferrer" className="text-teal-700 dark:text-teal-300 underline">opendata.gov.om</a>),
              published under the <strong>Open Government License — Sultanate of Oman</strong>:
            </p>
            <div className="space-y-4 ml-1">
              <div>
                <p className="font-semibold text-teal-800 dark:text-teal-200 mb-1">Ministry of Health (وزارة الصحة) — <a href="https://opendata.gov.om/en/publishers/139b01ed-59c8-4157-a38e-9036408f2a06" target="_blank" rel="noopener noreferrer" className="underline">3 datasets on portal</a></p>
                <ul className="list-disc list-inside space-y-1.5 text-xs">
                  <li><strong>Healthcare services data in health institutions</strong> — bed counts, discharge volumes, occupancy rates, and mean length of stay for 98+ hospitals</li>
                  <li><strong>Disease surveillance and notifiable infectious diseases</strong> — 28 notifiable diseases (Groups A, B, C) with trend analysis 2023–2025</li>
                  <li><strong>Deaths by cause of disease by governorate</strong> — mortality patterns across 11 governorates by 9 disease categories</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-teal-800 dark:text-teal-200 mb-1">National Centre for Statistics and Information — NCSI (المركز الوطني للإحصاء والمعلومات) — <a href="https://opendata.gov.om/en/publishers/3f8e43cf-8092-411f-96b7-0d0ffa040ca0" target="_blank" rel="noopener noreferrer" className="underline">3 datasets on portal</a></p>
                <ul className="list-disc list-inside space-y-1.5 text-xs">
                  <li><strong>Population by governorate (Omani and expatriate)</strong> — per-capita health indicators and equity scores, 2023–2025</li>
                  <li><strong>Vital statistics (births, deaths, fertility rates, life expectancy)</strong> — population health indicators 2016–2025</li>
                  <li><strong>Population projections (2026–2040)</strong> — hospital bed demand and workforce forecasting</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-lg bg-teal-100/60 dark:bg-teal-800/30 border border-teal-200/60 dark:border-teal-700/50">
              <p className="text-xs text-teal-800 dark:text-teal-200 font-medium text-center">
                OHealth demonstrates the power of Oman&apos;s open government data in enabling evidence-based health planning.
                <br />
                <span className="text-teal-600 dark:text-teal-400">
                  OHealth يُظهر قوة البيانات الحكومية المفتوحة في سلطنة عمان في تمكين التخطيط الصحي المبني على الأدلة
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
              <strong>OHealth</strong> (Oman Health) is an open-data health intelligence
              platform for the Sultanate of Oman. Built on open government data published by the
              Ministry of Health and the National Centre for Statistics and Information (NCSI) —
              both registered publishers on the National Open Data Portal (opendata.gov.om) — it transforms
              6 official datasets into interactive visualizations and predictive insights that support
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
              OHealth directly aligns with <strong>رؤية عمان 2040</strong> (Oman Vision 2040), specifically the
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

        {/* Oman Pride — Health Achievements */}
        <section className="rounded-xl p-5 sm:p-6 bg-gradient-to-r from-red-50 to-white dark:from-red-900/10 dark:to-slate-900/50 border-2 border-red-100 dark:border-red-900/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <Award className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Oman&apos;s Health Achievements</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">إنجازات عمان الصحية — رؤية عمان ٢٠٤٠</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            In line with <strong>Oman Vision 2040</strong> (رؤية عمان ٢٠٤٠), the Sultanate has made remarkable strides in healthcare.
            These achievements, documented through open data, are a testament to the nation&apos;s investment in its people.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700">
              <p className="text-xl sm:text-2xl font-bold text-teal-700 dark:text-teal-300">75.1 → 78.6</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Life expectancy grew in just 4 years</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">ارتفع متوسط العمر المتوقع خلال ٤ سنوات فقط</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700">
              <p className="text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-300">7.4 / 1,000</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Infant mortality — among best in region</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">وفيات الرضع — من أفضل المعدلات في المنطقة</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700">
              <p className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-300">99.97%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Births attended by specialists</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">ولادات بإشراف متخصصين</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700">
              <p className="text-xl sm:text-2xl font-bold text-purple-700 dark:text-purple-300">98</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hospitals serving 5.36M people</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">مستشفى تخدم ٥.٣٦ مليون شخص</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 sm:col-span-2 lg:col-span-2">
              <p className="text-sm text-gray-700 dark:text-gray-200 font-medium leading-relaxed">
                These achievements, documented through open data, are a testament to the Sultanate&apos;s investment in its people.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1" dir="rtl">
                هذه الإنجازات، الموثقة عبر البيانات المفتوحة، شاهدة على استثمار السلطنة في شعبها
              </p>
            </div>
          </div>
        </section>

        {/* Data Provenance — Feature-to-Source Mapping */}
        <section className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
              <Database className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Data Provenance</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">مصادر البيانات لكل ميزة</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Every feature in OHealth traces back to a specific government data source.
            All sources are published by entities registered on the <strong>National Open Data Portal</strong> (opendata.gov.om)
            under the <strong>Open Government License — Sultanate of Oman</strong>.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-teal-200 dark:border-teal-800">
                  <th className="text-left py-2 pr-3 text-gray-700 dark:text-gray-300 font-semibold">Platform Feature</th>
                  <th className="text-left py-2 pr-3 text-teal-700 dark:text-teal-300 font-semibold">Dataset on opendata.gov.om</th>
                  <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-semibold">Publisher</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-300">
                <tr className="border-b border-gray-100 dark:border-slate-700/50">
                  <td className="py-2 pr-3 font-medium">Governorate health infrastructure<br /><span className="text-[10px] text-gray-400">(hospitals, beds, health centres, pharmacies)</span></td>
                  <td className="py-2 pr-3"><span className="px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 font-medium">Healthcare services data in health institutions</span></td>
                  <td className="py-2"><span className="text-[10px]">Ministry of Health</span></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-700/50">
                  <td className="py-2 pr-3 font-medium">Health workforce trends<br /><span className="text-[10px] text-gray-400">(doctors, nurses, dentists, pharmacists per 10K)</span></td>
                  <td className="py-2 pr-3"><span className="px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 font-medium">Healthcare services data in health institutions</span></td>
                  <td className="py-2"><span className="text-[10px]">Ministry of Health</span></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-700/50">
                  <td className="py-2 pr-3 font-medium">Infectious disease cases<br /><span className="text-[10px] text-gray-400">(28 diseases, Groups A/B/C, 2023-2025)</span></td>
                  <td className="py-2 pr-3"><span className="px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 font-medium">Disease surveillance and notifiable infectious diseases</span></td>
                  <td className="py-2"><span className="text-[10px]">Ministry of Health</span></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-700/50">
                  <td className="py-2 pr-3 font-medium">Mortality by disease category<br /><span className="text-[10px] text-gray-400">(9 categories, by governorate)</span></td>
                  <td className="py-2 pr-3"><span className="px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 font-medium">Deaths by cause of disease by governorate</span></td>
                  <td className="py-2"><span className="text-[10px]">Ministry of Health</span></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-700/50">
                  <td className="py-2 pr-3 font-medium">Population by governorate<br /><span className="text-[10px] text-gray-400">(Omani/expatriate, density, 2023-2025)</span></td>
                  <td className="py-2 pr-3"><span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 font-medium">Population by governorate (Omani and expatriate)</span></td>
                  <td className="py-2"><span className="text-[10px]">NCSI</span></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-700/50">
                  <td className="py-2 pr-3 font-medium">Vital statistics trends<br /><span className="text-[10px] text-gray-400">(life expectancy, fertility, infant mortality)</span></td>
                  <td className="py-2 pr-3"><span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 font-medium">Vital statistics (births, deaths, fertility rates, life expectancy)</span></td>
                  <td className="py-2"><span className="text-[10px]">NCSI</span></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-700/50">
                  <td className="py-2 pr-3 font-medium">Capacity forecasting<br /><span className="text-[10px] text-gray-400">(projected bed demand 2026–2040)</span></td>
                  <td className="py-2 pr-3"><span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 font-medium">Population projections (2026–2040)</span></td>
                  <td className="py-2"><span className="text-[10px]">NCSI</span></td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-medium">Equity scores &amp; derived insights</td>
                  <td className="py-2 pr-3 text-gray-400" colSpan={2}><span className="text-[10px]">Derived — computed from the above datasets using documented methodology</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-[10px]">
            <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded bg-teal-500" /> Ministry of Health datasets</span>
            <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded bg-blue-500" /> NCSI datasets</span>
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
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
            OHealth uses open government data published by entities registered on the <strong>National Open Data Portal</strong> (<a href="https://opendata.gov.om" target="_blank" rel="noopener noreferrer" className="text-teal-700 dark:text-teal-300 underline font-semibold">opendata.gov.om</a>).
            Primary data from <strong>NCSI</strong> (registered publisher) via the NCSI Data Portal (<a href="https://data.gov.om" target="_blank" rel="noopener noreferrer" className="text-teal-700 dark:text-teal-300 underline">data.gov.om</a>),
            complemented by the NCSI Statistical Yearbook and <strong>Ministry of Health</strong> (registered publisher) reports.
            All sources are licensed under the <strong>Open Government License — Sultanate of Oman</strong>.
          </p>
          <div className="space-y-3">
            {[
              {
                name: 'National Open Data Portal (opendata.gov.om)',
                nameAr: 'البوابة الوطنية للبيانات المفتوحة',
                description: 'Oman\'s official national open data initiative by MTCIT. All data used in OHealth comes from registered publishers on this portal.',
                url: 'https://opendata.gov.om',
                primary: true,
              },
              {
                name: 'Ministry of Health — Healthcare services data in health institutions',
                nameAr: 'وزارة الصحة — بيانات الخدمات الصحية في المؤسسات الصحية',
                description: 'Hospital-level indicators: bed counts, discharge volumes, occupancy rates, mean length of stay for 98+ hospitals. Published on opendata.gov.om.',
                url: 'https://opendata.gov.om/en/publishers/139b01ed-59c8-4157-a38e-9036408f2a06',
                primary: true,
              },
              {
                name: 'Ministry of Health — Disease surveillance and notifiable infectious diseases',
                nameAr: 'وزارة الصحة — رصد الأمراض والأمراض المعدية الواجب الإبلاغ عنها',
                description: '28 notifiable diseases (Groups A, B, C) with case counts across 2023–2025. Published on opendata.gov.om.',
                url: 'https://opendata.gov.om/en/publishers/139b01ed-59c8-4157-a38e-9036408f2a06',
                primary: true,
              },
              {
                name: 'Ministry of Health — Deaths by cause of disease by governorate',
                nameAr: 'وزارة الصحة — الوفيات حسب سبب المرض حسب المحافظة',
                description: 'Mortality patterns across 11 governorates by 9 disease categories. Published on opendata.gov.om.',
                url: 'https://opendata.gov.om/en/publishers/139b01ed-59c8-4157-a38e-9036408f2a06',
                primary: true,
              },
              {
                name: 'NCSI — Population by governorate (Omani and expatriate)',
                nameAr: 'المركز الوطني للإحصاء — السكان حسب المحافظة',
                description: 'Governorate-level population data (Omani/expatriate split, density, YoY growth). Published on opendata.gov.om.',
                url: 'https://opendata.gov.om/en/publishers/3f8e43cf-8092-411f-96b7-0d0ffa040ca0',
                primary: true,
              },
              {
                name: 'NCSI — Vital statistics (births, deaths, fertility rates, life expectancy)',
                nameAr: 'المركز الوطني للإحصاء — الإحصاءات الحيوية',
                description: 'Population health indicators 2016–2025: life expectancy, infant mortality, fertility rate, maternal mortality. Published on opendata.gov.om.',
                url: 'https://opendata.gov.om/en/publishers/3f8e43cf-8092-411f-96b7-0d0ffa040ca0',
                primary: true,
              },
              {
                name: 'NCSI — Population projections (2026–2040)',
                nameAr: 'المركز الوطني للإحصاء — الإسقاطات السكانية',
                description: 'Demographic projections used for hospital bed demand forecasting. Published on opendata.gov.om.',
                url: 'https://opendata.gov.om/en/publishers/3f8e43cf-8092-411f-96b7-0d0ffa040ca0',
                primary: true,
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
            <a href="https://www.medresearch-academy.om" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mb-3 group">
              <img src="/logos/medresearch-logo.png" alt="MedResearch Academy" className="h-12 sm:h-14 object-contain" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  MedResearch Academy
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">أكاديمية البحث الطبي</p>
              </div>
            </a>
            <p className="mt-1">
              Dedicated to leveraging data science and technology to improve healthcare delivery in Oman and the region.
            </p>
            <a href="https://www.medresearch-academy.om" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-xs text-teal-600 dark:text-teal-400 hover:underline">
              www.medresearch-academy.om
            </a>
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
