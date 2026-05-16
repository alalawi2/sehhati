import { PopulationData, PopulationIndicator } from '../lib/types';

export const POPULATION_BY_GOVERNORATE: PopulationData[] = [
  { governorateCode: 'MUS', omani2025: 596176, expat2025: 936310, total2025: 1532486, total2024: 1498521, total2023: 1455680, density2025: 383.1 },
  { governorateCode: 'DHO', omani2025: 244324, expat2025: 288573, total2025: 532897, total2024: 529574, total2023: 521266, density2025: 5.4 },
  { governorateCode: 'MSN', omani2025: 36609, expat2025: 19393, total2025: 56002, total2024: 55150, total2023: 56800, density2025: 28.0 },
  { governorateCode: 'BUR', omani2025: 77203, expat2025: 58306, total2025: 135509, total2024: 135821, total2023: 130576, density2025: 16.8 },
  { governorateCode: 'DAK', omani2025: 410815, expat2025: 159454, total2025: 570269, total2024: 560483, total2023: 555250, density2025: 17.8 },
  { governorateCode: 'BTN', omani2025: 609070, expat2025: 330676, total2025: 939746, total2024: 925163, total2023: 917546, density2025: 117.5 },
  { governorateCode: 'BTS', omani2025: 389169, expat2025: 196625, total2025: 585794, total2024: 566771, total2023: 545449, density2025: 110.0 },
  { governorateCode: 'SHS', omani2025: 251943, expat2025: 123019, total2025: 374962, total2024: 369528, total2023: 366501, density2025: 31.1 },
  { governorateCode: 'SHN', omani2025: 216221, expat2025: 104824, total2025: 321045, total2024: 321462, total2023: 315592, density2025: 15.2 },
  { governorateCode: 'DHH', omani2025: 180421, expat2025: 66402, total2025: 246823, total2024: 244373, total2023: 240529, density2025: 6.9 },
  { governorateCode: 'WUS', omani2025: 27398, expat2025: 36626, total2025: 64024, total2024: 61226, total2023: 60413, density2025: 0.8 },
];

export const POPULATION_INDICATORS: PopulationIndicator[] = [
  { year: 2016, totalPop: 4414, omaniPop: 2428, expatPop: 1986, lifeExpectancy: 78.0, fertilityRate: 3.0, crudeBirthRate: 20.0, crudeDeathRate: 2.0, infantMortality: 9.0, under5Mortality: 12.0, maternalMortality: 13.4 },
  { year: 2017, totalPop: 4560, omaniPop: 2505, expatPop: 2055, lifeExpectancy: 78.3, fertilityRate: 3.0, crudeBirthRate: 20.0, crudeDeathRate: 2.0, infantMortality: 9.0, under5Mortality: 11.0, maternalMortality: 15.7 },
  { year: 2018, totalPop: 4602, omaniPop: 2579, expatPop: 2022, lifeExpectancy: 78.3, fertilityRate: 2.3, crudeBirthRate: 15.7, crudeDeathRate: 2.0, infantMortality: 8.8, under5Mortality: 11.4, maternalMortality: 15.7 },
  { year: 2019, totalPop: 4618, omaniPop: 2655, expatPop: 1963, lifeExpectancy: 78.2, fertilityRate: 2.6, crudeBirthRate: 18.8, crudeDeathRate: 2.0, infantMortality: 9.0, under5Mortality: 10.0, maternalMortality: 20.2 },
  { year: 2020, totalPop: 4481, omaniPop: 2736, expatPop: 1745, lifeExpectancy: 77.1, fertilityRate: 2.6, crudeBirthRate: 18.8, crudeDeathRate: 2.0, infantMortality: 9.0, under5Mortality: 12.0, maternalMortality: 17.5 },
  { year: 2021, totalPop: 4527, omaniPop: 2804, expatPop: 1723, lifeExpectancy: 75.1, fertilityRate: 2.6, crudeBirthRate: 18.2, crudeDeathRate: 2.8, infantMortality: 8.1, under5Mortality: 10.2, maternalMortality: 42.5 },
  { year: 2022, totalPop: 4934, omaniPop: 2868, expatPop: 2066, lifeExpectancy: 78.3, fertilityRate: 2.3, crudeBirthRate: 15.7, crudeDeathRate: 2.0, infantMortality: 8.8, under5Mortality: 11.4, maternalMortality: 15.7 },
  { year: 2023, totalPop: 5166, omaniPop: 2929, expatPop: 2237, lifeExpectancy: 78.3, fertilityRate: 2.0, crudeBirthRate: 13.8, crudeDeathRate: 1.7, infantMortality: 8.5, under5Mortality: 10.8, maternalMortality: 17.5 },
  { year: 2024, totalPop: 5268, omaniPop: 2984, expatPop: 2283, lifeExpectancy: 78.3, fertilityRate: 1.9, crudeBirthRate: 13.3, crudeDeathRate: 1.7, infantMortality: 8.0, under5Mortality: 9.9, maternalMortality: 14.5 },
  { year: 2025, totalPop: 5360, omaniPop: 3040, expatPop: 2320, lifeExpectancy: 78.6, fertilityRate: 1.9, crudeBirthRate: 13.8, crudeDeathRate: 1.7, infantMortality: 7.4, under5Mortality: 9.1, maternalMortality: 11.3 },
];

export const POPULATION_PROJECTIONS = {
  2026: 5500,
  2027: 5650,
  2028: 5800,
  2029: 6000,
  2030: 6200,
  2035: 7400,
  2040: 8700,
};

export const getTotalPopulation = (code: string) => {
  const p = POPULATION_BY_GOVERNORATE.find(p => p.governorateCode === code);
  return p ? p.total2025 : 0;
};

export const getPopGrowthRate = (code: string) => {
  const p = POPULATION_BY_GOVERNORATE.find(p => p.governorateCode === code);
  if (!p || !p.total2023) return 0;
  return ((p.total2025 / p.total2023) - 1) * 100;
};
