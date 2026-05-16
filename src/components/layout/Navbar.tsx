'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X, Heart } from 'lucide-react';

const links = [
  { href: '/', label: 'Home', labelAr: 'الرئيسية' },
  { href: '/dashboard', label: 'Dashboard', labelAr: 'لوحة البيانات' },
  { href: '/capacity', label: 'Capacity', labelAr: 'السعة' },
  { href: '/equity', label: 'Equity', labelAr: 'العدالة' },
  { href: '/diseases', label: 'Diseases', labelAr: 'الأمراض' },
  { href: '/about', label: 'About', labelAr: 'حول' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass-strong border-b border-teal-900/5 dark:border-teal-400/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar — Open Data Portal branding */}
        <div className="hidden sm:flex items-center justify-center gap-3 py-1.5 border-b border-gray-100 dark:border-slate-800">
          <p className="text-xs text-teal-700 dark:text-teal-300 font-medium tracking-wide">
            مبادرة البوابة الوطنية للبيانات المفتوحة | National Open Data Portal Initiative
          </p>
          <a
            href="https://opendata.gov.om"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-800/40 transition-colors"
          >
            opendata.gov.om
          </a>
        </div>

        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 group-hover:from-teal-500 group-hover:to-teal-600 transition-all">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
              Sehhati <span className="text-teal-600 dark:text-teal-400">|</span>{' '}
              <span className="font-semibold text-base">صحتي</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-teal-50 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 shadow-sm'
                      : 'text-gray-600 hover:text-teal-700 hover:bg-teal-50/50 dark:text-gray-300 dark:hover:text-teal-300 dark:hover:bg-teal-900/20'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-gray-500 hover:text-teal-700 hover:bg-teal-50 dark:text-gray-400 dark:hover:text-teal-300 dark:hover:bg-teal-900/30 transition-all"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 hidden dark:block" />
              <Moon className="h-4 w-4 block dark:hidden" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700/50"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 dark:border-slate-800 mt-1 pt-2 space-y-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-teal-50 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label} <span className="text-gray-400 dark:text-gray-500 text-xs mr-1">{link.labelAr}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
