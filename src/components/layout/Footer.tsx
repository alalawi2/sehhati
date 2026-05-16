'use client';

import { Heart, ExternalLink, Database } from 'lucide-react';

const dataSources = [
  { name: 'National Open Data Portal', nameAr: 'البوابة الوطنية للبيانات المفتوحة', url: 'https://opendata.gov.om', description: 'Primary data source' },
  { name: 'NCSI', nameAr: 'المركز الوطني للإحصاء', url: 'https://data.gov.om', description: 'National Centre for Statistics & Information' },
  { name: 'MOH', nameAr: 'وزارة الصحة', url: 'https://www.moh.gov.om', description: 'Ministry of Health' },
];

export default function Footer() {
  return (
    <footer className="border-t border-teal-900/5 dark:border-teal-400/10 bg-gray-50/80 dark:bg-slate-900/80">
      {/* Open Data Portal Highlight Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-800 dark:to-emerald-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Database className="h-5 w-5 text-teal-100" />
            <h3 className="text-white font-semibold text-sm">
              Powered by Oman&apos;s Open Government Data
            </h3>
          </div>
          <p className="text-teal-100 text-xs max-w-2xl mx-auto leading-relaxed">
            Built on NCSI open data (OMHLTH2016 &amp; OMPOP2016) from data.gov.om, complemented by the NCSI Statistical Yearbook and Ministry of Health reports.
          </p>
          <p className="text-teal-200/80 text-xs mt-1 max-w-2xl mx-auto leading-relaxed">
            هذا المشروع يُظهر قوة البيانات الحكومية المفتوحة في سلطنة عمان لدعم قرارات السياسة الصحية المبنية على الأدلة
          </p>
          <a
            href="https://opendata.gov.om"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium hover:bg-white/30 transition-colors"
          >
            opendata.gov.om <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-teal-600 to-teal-700">
                <Heart className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-bold text-gray-900 dark:text-white">
                Sehhati | صحتي
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Oman Health Intelligence Platform. Transforming open government data into actionable insights for better health planning.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              منصة عمان للذكاء الصحي
            </p>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
              Data Sources | مصادر البيانات
            </h3>
            <ul className="space-y-2">
              {dataSources.map((source, i) => (
                <li key={source.name}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 text-xs transition-colors ${i === 0 ? 'text-teal-700 dark:text-teal-300 font-semibold hover:text-teal-800 dark:hover:text-teal-200' : 'text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400'}`}
                  >
                    <ExternalLink className="h-3 w-3 shrink-0" />
                    <span>{source.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Initiative */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
              Initiative | المبادرة
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              مختبر البيانات المفتوحة | Open Data Lab 2026
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              Built for the Open Data Lab Oman Competition, leveraging publicly available datasets to improve health planning and resource allocation.
            </p>
          </div>

          {/* Built By & Logos */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
              Built By
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
              MedResearch Academy | أكاديمية البحث الطبي
            </p>
            {/* Official Government Logos */}
            <div className="mt-4 space-y-3">
              {/* MTCIT - Competition Organizer - Most Prominent */}
              <div className="p-2 rounded-lg border border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-900/20">
                <p className="text-[9px] text-teal-600 dark:text-teal-400 font-semibold mb-1.5">Competition Organizer | الجهة المنظمة</p>
                <a href="https://mtcit.gov.om" target="_blank" rel="noopener noreferrer">
                  <img src="/logos/mtcit-logo.png" alt="Ministry of Transport, Communications and Information Technology" className="h-8 object-contain dark:brightness-200 dark:contrast-50" />
                </a>
              </div>
              {/* Other logos in a row */}
              <div className="flex items-center gap-3 flex-wrap">
                <a href="https://opendata.gov.om" target="_blank" rel="noopener noreferrer" title="National Open Data Portal">
                  <img src="/logos/opendata-logo.png" alt="National Open Data Portal" className="h-6 object-contain dark:hidden" />
                  <img src="/logos/opendata-logo-white.png" alt="National Open Data Portal" className="h-6 object-contain hidden dark:block" />
                </a>
                <a href="https://www.ncsi.gov.om" target="_blank" rel="noopener noreferrer" title="NCSI">
                  <img src="/logos/ncsi-logo.png" alt="NCSI" className="h-7 object-contain dark:brightness-200 dark:contrast-50" />
                </a>
                <a href="https://www.moh.gov.om" target="_blank" rel="noopener noreferrer" title="Ministry of Health">
                  <img src="/logos/moh-logo-en.png" alt="Ministry of Health" className="h-6 object-contain dark:brightness-200 dark:contrast-50" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-gray-400 dark:text-gray-500">
            &copy; 2026 Sehhati. All data sourced from publicly available Omani government datasets.
          </p>
          <p className="text-[10px] text-gray-400 dark:text-gray-500">
            مختبر البيانات المفتوحة عمان | Open Data Lab Oman 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
