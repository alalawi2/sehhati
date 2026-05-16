import { GOVERNORATE_HEALTH, MOH_HOSPITALS, HEALTH_INDICATORS } from '../data/hospitals';
import { POPULATION_BY_GOVERNORATE } from '../data/population';
import { INFECTIOUS_DISEASES, DEATHS_BY_DISEASE } from '../data/diseases';
import { GOVERNORATES } from '../data/governorates';
import { calculateEquityScores } from './calculations';

export interface Insight {
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info' | 'positive';
  category: 'infrastructure' | 'disease' | 'workforce' | 'population';
  dataPoints: string[];
}

function getGovName(code: string): string {
  const g = GOVERNORATES.find(gov => gov.code === code);
  return g ? g.nameEn : code;
}

export function generateInsights(): Insight[] {
  const insights: Insight[] = [];

  // 1. Highest occupancy hospital
  const sortedByOcc = [...MOH_HOSPITALS].sort((a, b) => b.occupancyRate - a.occupancyRate);
  const highest = sortedByOcc[0];
  if (highest && highest.occupancyRate >= 85) {
    insights.push({
      title: `${highest.name} at ${highest.occupancyRate}% capacity`,
      description: `${highest.name} in ${getGovName(highest.governorateCode)} has the highest occupancy rate in the country, indicating urgent need for expansion or patient redistribution.`,
      severity: 'critical',
      category: 'infrastructure',
      dataPoints: [`Occupancy: ${highest.occupancyRate}%`, `Beds: ${highest.beds}`, `Discharges: ${highest.dischargesTotal.toLocaleString()}`],
    });
  }

  // 2. Lowest occupancy (surplus)
  const withBeds = MOH_HOSPITALS.filter(h => h.beds > 10);
  const lowest = [...withBeds].sort((a, b) => a.occupancyRate - b.occupancyRate)[0];
  if (lowest && lowest.occupancyRate < 20) {
    insights.push({
      title: `${lowest.name} severely underutilized`,
      description: `At only ${lowest.occupancyRate}% occupancy with ${lowest.beds} beds, ${lowest.name} represents potential wasted capacity that could serve other regions.`,
      severity: 'info',
      category: 'infrastructure',
      dataPoints: [`Occupancy: ${lowest.occupancyRate}%`, `Beds: ${lowest.beds}`],
    });
  }

  // 3. Bed ratio disparities
  const bedRatios = GOVERNORATE_HEALTH.map(gh => {
    const pop = POPULATION_BY_GOVERNORATE.find(p => p.governorateCode === gh.governorateCode);
    const totalBeds = gh.govtBeds + gh.privateBeds;
    const ratio = pop ? (totalBeds / pop.total2025) * 10000 : 0;
    return { code: gh.governorateCode, ratio, totalBeds, pop: pop?.total2025 || 0 };
  }).sort((a, b) => a.ratio - b.ratio);

  const lowestBedRatio = bedRatios[0];
  const highestBedRatio = bedRatios[bedRatios.length - 1];
  insights.push({
    title: `${getGovName(lowestBedRatio.code)} has lowest bed ratio`,
    description: `With only ${lowestBedRatio.ratio.toFixed(1)} beds per 10,000 people, ${getGovName(lowestBedRatio.code)} has ${(highestBedRatio.ratio / lowestBedRatio.ratio).toFixed(1)}x fewer beds per capita than ${getGovName(highestBedRatio.code)}.`,
    severity: 'critical',
    category: 'infrastructure',
    dataPoints: [`${lowestBedRatio.ratio.toFixed(1)} beds/10K`, `Population: ${lowestBedRatio.pop.toLocaleString()}`],
  });

  // 4. Private sector desert
  const noPrivate = GOVERNORATE_HEALTH.filter(gh => gh.privateBeds === 0);
  if (noPrivate.length > 0) {
    insights.push({
      title: `${noPrivate.length} governorates lack private hospitals`,
      description: `${noPrivate.map(g => getGovName(g.governorateCode)).join(', ')} have zero private hospital beds, leaving populations entirely dependent on government facilities.`,
      severity: 'warning',
      category: 'infrastructure',
      dataPoints: noPrivate.map(g => `${getGovName(g.governorateCode)}: 0 private beds`),
    });
  }

  // 5. Population growth vs bed capacity
  const growthData = POPULATION_BY_GOVERNORATE.map(p => {
    const growth = ((p.total2025 / p.total2023) - 1) * 100;
    const gh = GOVERNORATE_HEALTH.find(g => g.governorateCode === p.governorateCode);
    const totalBeds = gh ? gh.govtBeds + gh.privateBeds : 0;
    return { code: p.governorateCode, growth, totalBeds, pop: p.total2025 };
  }).sort((a, b) => b.growth - a.growth);

  const fastestGrowing = growthData[0];
  if (fastestGrowing.growth > 3) {
    insights.push({
      title: `${getGovName(fastestGrowing.code)} growing at ${fastestGrowing.growth.toFixed(1)}%`,
      description: `The fastest growing governorate over 2 years. If bed capacity remains static, occupancy pressure will intensify rapidly.`,
      severity: 'warning',
      category: 'population',
      dataPoints: [`Growth: ${fastestGrowing.growth.toFixed(1)}% (2023-2025)`, `Population: ${fastestGrowing.pop.toLocaleString()}`, `Beds: ${fastestGrowing.totalBeds}`],
    });
  }

  // 6. Disease trends - rising diseases
  const risingDiseases = INFECTIOUS_DISEASES
    .filter(d => d.cases2025 > d.cases2024 && d.cases2024 > d.cases2023 && d.cases2025 > 20)
    .sort((a, b) => {
      const rateA = a.cases2023 > 0 ? (a.cases2025 / a.cases2023 - 1) * 100 : 999;
      const rateB = b.cases2023 > 0 ? (b.cases2025 / b.cases2023 - 1) * 100 : 999;
      return rateB - rateA;
    });

  if (risingDiseases.length > 0) {
    const top = risingDiseases[0];
    const increase = top.cases2023 > 0 ? Math.round((top.cases2025 / top.cases2023 - 1) * 100) : 999;
    insights.push({
      title: `${top.name} surging: +${increase}% in 2 years`,
      description: `${top.name} cases grew from ${top.cases2023} (2023) to ${top.cases2025} (2025), representing a sustained upward trend requiring intervention.`,
      severity: 'critical',
      category: 'disease',
      dataPoints: [`2023: ${top.cases2023}`, `2024: ${top.cases2024}`, `2025: ${top.cases2025}`],
    });
  }

  // 7. Declining diseases (positive)
  const decliningDiseases = INFECTIOUS_DISEASES
    .filter(d => d.cases2025 < d.cases2024 && d.cases2024 < d.cases2023 && d.cases2023 > 50)
    .sort((a, b) => {
      const rateA = (a.cases2023 - a.cases2025) / a.cases2023;
      const rateB = (b.cases2023 - b.cases2025) / b.cases2023;
      return rateB - rateA;
    });

  if (decliningDiseases.length > 0) {
    const top = decliningDiseases[0];
    const decrease = Math.round((1 - top.cases2025 / top.cases2023) * 100);
    insights.push({
      title: `${top.name} declining: -${decrease}% since 2023`,
      description: `${top.name} cases dropped from ${top.cases2023} to ${top.cases2025}, suggesting effective public health measures or natural disease cycle resolution.`,
      severity: 'positive',
      category: 'disease',
      dataPoints: [`2023: ${top.cases2023}`, `2024: ${top.cases2024}`, `2025: ${top.cases2025}`],
    });
  }

  // 8. Top cause of death
  const topDeath = [...DEATHS_BY_DISEASE].sort((a, b) => b.total - a.total)[0];
  insights.push({
    title: `${topDeath.category}: leading cause of death`,
    description: `${topDeath.category} diseases account for ${topDeath.total} deaths, making it the single largest mortality category in Oman.`,
    severity: 'warning',
    category: 'disease',
    dataPoints: [`Total deaths: ${topDeath.total}`, `Share: ${((topDeath.total / 3992) * 100).toFixed(1)}%`],
  });

  // 9. Mortality geographic concentration
  const topDeathGov = Object.entries(topDeath.byGovernorate).sort((a, b) => b[1] - a[1]);
  const topMortGov = topDeathGov[0];
  if (topMortGov) {
    insights.push({
      title: `${getGovName(topMortGov[0])} leads in ${topDeath.category.toLowerCase()} deaths`,
      description: `${getGovName(topMortGov[0])} has ${topMortGov[1]} deaths from ${topDeath.category.toLowerCase()} diseases — the highest among all governorates.`,
      severity: 'warning',
      category: 'disease',
      dataPoints: [`Deaths: ${topMortGov[1]}`, `National total: ${topDeath.total}`],
    });
  }

  // 10. Workforce trends
  const latest = HEALTH_INDICATORS[HEALTH_INDICATORS.length - 1];
  const prev = HEALTH_INDICATORS[HEALTH_INDICATORS.length - 2];
  const doctorChange = ((latest.doctorsPerTenK / prev.doctorsPerTenK) - 1) * 100;
  if (doctorChange > 3) {
    insights.push({
      title: `Doctor workforce expanded by ${doctorChange.toFixed(1)}%`,
      description: `Doctors per 10,000 population increased from ${prev.doctorsPerTenK} to ${latest.doctorsPerTenK} in the last year, a positive trend.`,
      severity: 'positive',
      category: 'workforce',
      dataPoints: [`2024: ${prev.doctorsPerTenK}/10K`, `2025: ${latest.doctorsPerTenK}/10K`],
    });
  }

  // 11. Nurse ratio concern
  const nurseRatio = latest.nursesPerTenK / latest.doctorsPerTenK;
  if (nurseRatio < 2.5) {
    insights.push({
      title: `Nurse-to-doctor ratio below WHO benchmark`,
      description: `At ${nurseRatio.toFixed(1)}:1 (nurses-to-doctors), Oman falls short of the WHO recommended 3:1 ratio, suggesting nursing workforce gaps.`,
      severity: 'warning',
      category: 'workforce',
      dataPoints: [`Nurses/10K: ${latest.nursesPerTenK}`, `Doctors/10K: ${latest.doctorsPerTenK}`, `Ratio: ${nurseRatio.toFixed(1)}:1`],
    });
  }

  // 12. Equity disparities
  const equityScores = calculateEquityScores();
  const sortedEquity = [...equityScores].sort((a, b) => a.overall - b.overall);
  const worstEquity = sortedEquity[0];
  const bestEquity = sortedEquity[sortedEquity.length - 1];
  insights.push({
    title: `${getGovName(worstEquity.governorateCode)} scores lowest on equity`,
    description: `With an equity score of ${worstEquity.overall}/100, ${getGovName(worstEquity.governorateCode)} has the most unequal health resource distribution. ${getGovName(bestEquity.governorateCode)} leads at ${bestEquity.overall}/100.`,
    severity: 'critical',
    category: 'infrastructure',
    dataPoints: [`Bed score: ${worstEquity.bedScore}`, `Access score: ${worstEquity.accessScore}`, `Stress score: ${worstEquity.stressScore}`],
  });

  // 13. Expat population concentration
  const expatData = POPULATION_BY_GOVERNORATE.map(p => ({
    code: p.governorateCode,
    expatPct: (p.expat2025 / p.total2025) * 100,
    expat: p.expat2025,
  })).sort((a, b) => b.expatPct - a.expatPct);

  const highExpat = expatData[0];
  insights.push({
    title: `${getGovName(highExpat.code)}: ${highExpat.expatPct.toFixed(0)}% expatriate population`,
    description: `The high expatriate concentration impacts healthcare demand patterns, particularly occupational health and primary care needs.`,
    severity: 'info',
    category: 'population',
    dataPoints: [`Expat: ${highExpat.expat.toLocaleString()}`, `Share: ${highExpat.expatPct.toFixed(1)}%`],
  });

  // 14. Mean length of stay outlier
  const longStay = [...MOH_HOSPITALS].filter(h => h.meanStayDays > 10 && h.beds > 10).sort((a, b) => b.meanStayDays - a.meanStayDays);
  if (longStay.length > 0) {
    const longest = longStay[0];
    insights.push({
      title: `${longest.name}: ${longest.meanStayDays} day avg stay`,
      description: `Significantly above the national average, suggesting specialized care (psychiatric/rehabilitation) or potential discharge planning opportunities.`,
      severity: 'info',
      category: 'infrastructure',
      dataPoints: [`Mean stay: ${longest.meanStayDays} days`, `Beds: ${longest.beds}`, `Occupancy: ${longest.occupancyRate}%`],
    });
  }

  // 15. Chicken pox burden
  const chickenPox = INFECTIOUS_DISEASES.find(d => d.name === 'Chicken Pox');
  if (chickenPox && chickenPox.cases2025 > 2000) {
    insights.push({
      title: `Chicken Pox: ${chickenPox.cases2025.toLocaleString()} cases in 2025`,
      description: `Remains the highest-volume infectious disease by case count, indicating potential gaps in varicella vaccination coverage.`,
      severity: 'warning',
      category: 'disease',
      dataPoints: [`2023: ${chickenPox.cases2023}`, `2024: ${chickenPox.cases2024}`, `2025: ${chickenPox.cases2025}`],
    });
  }

  // 16. Hospitals at breaking point (multiple)
  const breakingPoint = MOH_HOSPITALS.filter(h => h.occupancyRate >= 85);
  if (breakingPoint.length > 1) {
    insights.push({
      title: `${breakingPoint.length} hospitals above 85% capacity`,
      description: `${breakingPoint.map(h => h.name).join(', ')} are all operating above the safety threshold, risking patient overcrowding and quality-of-care issues.`,
      severity: 'critical',
      category: 'infrastructure',
      dataPoints: breakingPoint.map(h => `${h.name}: ${h.occupancyRate}%`),
    });
  }

  // 17. Population density and health access
  const densePop = POPULATION_BY_GOVERNORATE.filter(p => p.density2025 > 100);
  if (densePop.length > 0) {
    const denseNames = densePop.map(p => getGovName(p.governorateCode));
    insights.push({
      title: `High-density regions: ${denseNames.join(', ')}`,
      description: `Dense populations (>100/km2) require proportionally more primary care facilities and emergency services per unit area.`,
      severity: 'info',
      category: 'population',
      dataPoints: densePop.map(p => `${getGovName(p.governorateCode)}: ${p.density2025}/km2`),
    });
  }

  // 18. Al Wusta sparse coverage
  const wusta = GOVERNORATE_HEALTH.find(g => g.governorateCode === 'WUS');
  const wustaPop = POPULATION_BY_GOVERNORATE.find(p => p.governorateCode === 'WUS');
  if (wusta && wustaPop) {
    insights.push({
      title: `Al Wusta: vast area, minimal infrastructure`,
      description: `With ${wustaPop.total2025.toLocaleString()} people across 82,471 km2, Al Wusta has only ${wusta.govtBeds} beds and ${wusta.govtHospitals} hospitals — the lowest density of healthcare access in Oman.`,
      severity: 'warning',
      category: 'infrastructure',
      dataPoints: [`Area: 82,471 km2`, `Population: ${wustaPop.total2025.toLocaleString()}`, `Beds: ${wusta.govtBeds}`],
    });
  }

  // 19. COVID decline
  const covid = INFECTIOUS_DISEASES.find(d => d.name === 'COVID-19');
  if (covid) {
    const decline = Math.round((1 - covid.cases2025 / covid.cases2023) * 100);
    insights.push({
      title: `COVID-19 down ${decline}% from 2023`,
      description: `Cases dropped from ${covid.cases2023.toLocaleString()} to ${covid.cases2025.toLocaleString()}, reflecting endemic transition and population immunity.`,
      severity: 'positive',
      category: 'disease',
      dataPoints: [`2023: ${covid.cases2023}`, `2024: ${covid.cases2024}`, `2025: ${covid.cases2025}`],
    });
  }

  // 20. Bed supply growth
  const bedGrowth = ((latest.bedsPerTenK / HEALTH_INDICATORS[0].bedsPerTenK) - 1) * 100;
  insights.push({
    title: `Bed supply grew ${bedGrowth.toFixed(0)}% over a decade`,
    description: `Beds per 10,000 increased from ${HEALTH_INDICATORS[0].bedsPerTenK} (2016) to ${latest.bedsPerTenK} (2025). However, population growth partially offsets gains.`,
    severity: bedGrowth > 5 ? 'positive' : 'info',
    category: 'infrastructure',
    dataPoints: [`2016: ${HEALTH_INDICATORS[0].bedsPerTenK}/10K`, `2025: ${latest.bedsPerTenK}/10K`],
  });

  return insights;
}
