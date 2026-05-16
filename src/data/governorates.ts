import { Governorate } from '../lib/types';

export const GOVERNORATES: Governorate[] = [
  { code: 'MUS', nameEn: 'Muscat', nameAr: 'مسقط', centroid: [23.588, 58.382], area: 4000 },
  { code: 'DHO', nameEn: 'Dhofar', nameAr: 'ظفار', centroid: [17.019, 54.094], area: 99062 },
  { code: 'MSN', nameEn: 'Musandam', nameAr: 'مسندم', centroid: [26.198, 56.247], area: 2000 },
  { code: 'BUR', nameEn: 'Al Buraymi', nameAr: 'البريمي', centroid: [24.261, 55.789], area: 8068 },
  { code: 'DAK', nameEn: 'Ad Dakhliyah', nameAr: 'الداخلية', centroid: [22.933, 57.530], area: 32000 },
  { code: 'BTN', nameEn: 'Al Batinah North', nameAr: 'شمال الباطنة', centroid: [23.972, 56.951], area: 8000 },
  { code: 'BTS', nameEn: 'Al Batinah South', nameAr: 'جنوب الباطنة', centroid: [23.427, 57.420], area: 5323 },
  { code: 'SHS', nameEn: 'Ash Sharqiyah South', nameAr: 'جنوب الشرقية', centroid: [22.566, 59.130], area: 12039 },
  { code: 'SHN', nameEn: 'Ash Sharqiyah North', nameAr: 'شمال الشرقية', centroid: [22.900, 58.530], area: 21136 },
  { code: 'DHH', nameEn: 'Adh Dhahirah', nameAr: 'الظاهرة', centroid: [23.298, 56.490], area: 35881 },
  { code: 'WUS', nameEn: 'Al Wusta', nameAr: 'الوسطى', centroid: [20.350, 56.500], area: 82471 },
];

export const getGovernorate = (code: string) =>
  GOVERNORATES.find(g => g.code === code);

export const getGovernorateName = (code: string, lang: 'en' | 'ar' = 'en') => {
  const g = getGovernorate(code);
  return g ? (lang === 'ar' ? g.nameAr : g.nameEn) : code;
};
