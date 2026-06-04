import { GOVERNORATE_HEALTH, MOH_HOSPITALS } from '../data/hospitals';
import { POPULATION_BY_GOVERNORATE } from '../data/population';
import { DEATHS_BY_DISEASE } from '../data/diseases';
import { EquityScore, CapacityProjection } from './types';

// ===== EQUITY SCORE (0-100) =====
function normalize(value: number, min: number, max: number): number {
  if (max === min) return 50;
  return Math.round(((value - min) / (max - min)) * 100);
}

/**
 * Bed-weighted average occupancy for a governorate's hospitals.
 * Prevents a 10-bed facility from counting the same as a 700-bed tertiary hospital.
 */
export function weightedOccupancy(governorateCode: string): number {
  const hospitals = MOH_HOSPITALS.filter(h => h.governorateCode === governorateCode);
  const totalBeds = hospitals.reduce((sum, h) => sum + h.beds, 0);
  if (totalBeds === 0) return 0;
  return hospitals.reduce((sum, h) => sum + h.occupancyRate * h.beds, 0) / totalBeds;
}

export function calculateEquityScores(): EquityScore[] {
  const data = GOVERNORATE_HEALTH.map(gh => {
    const pop = POPULATION_BY_GOVERNORATE.find(p => p.governorateCode === gh.governorateCode);
    const totalPop = pop ? pop.total2025 : 1;
    // Equity uses government beds only — private bed utilization data is unavailable
    const govtBeds = gh.govtBeds;

    return {
      code: gh.governorateCode,
      bedsPerTenK: (govtBeds / totalPop) * 10000,
      // Proxy: government hospitals per 100K (doctor counts unavailable per governorate)
      hospitalDensity: (gh.govtHospitals / totalPop) * 100000,
      // Proxy: health centres per 100K (nurse FTE unavailable per governorate)
      healthCentreDensity: (gh.healthCentres + gh.extendedHC) / totalPop * 100000,
      pharmaciesPerTenK: (gh.pharmacies + gh.medicalCentres) / totalPop * 10000,
      weightedOcc: weightedOccupancy(gh.governorateCode),
    };
  });

  const bedValues = data.map(d => d.bedsPerTenK);
  const docValues = data.map(d => d.hospitalDensity);
  const nurseValues = data.map(d => d.healthCentreDensity);
  const pharmValues = data.map(d => d.pharmaciesPerTenK);
  const occValues = data.map(d => 100 - d.weightedOcc); // invert: lower occupancy = better

  return data.map(d => {
    const bedScore = normalize(d.bedsPerTenK, Math.min(...bedValues), Math.max(...bedValues));
    const doctorScore = normalize(d.hospitalDensity, Math.min(...docValues), Math.max(...docValues));
    const nurseScore = normalize(d.healthCentreDensity, Math.min(...nurseValues), Math.max(...nurseValues));
    const accessScore = normalize(d.pharmaciesPerTenK, Math.min(...pharmValues), Math.max(...pharmValues));
    const stressScore = normalize(100 - d.weightedOcc, Math.min(...occValues), Math.max(...occValues));
    const overall = Math.round((bedScore + doctorScore + nurseScore + accessScore + stressScore) / 5);

    return {
      governorateCode: d.code,
      overall,
      bedScore,
      doctorScore,
      nurseScore,
      accessScore,
      stressScore,
    };
  });
}

// ===== CAPACITY PROJECTIONS =====
export function calculateCapacityProjections(): CapacityProjection[] {
  return GOVERNORATE_HEALTH.map(gh => {
    const pop = POPULATION_BY_GOVERNORATE.find(p => p.governorateCode === gh.governorateCode);
    const hospitals = MOH_HOSPITALS.filter(h => h.governorateCode === gh.governorateCode);

    const currentBeds = gh.govtBeds;
    const currentOccupancy = hospitals.length > 0
      ? hospitals.reduce((sum, h) => sum + h.occupancyRate * h.beds, 0) /
        hospitals.reduce((sum, h) => sum + h.beds, 0)
      : 0;

    // Population growth rate (annual)
    const growthRate = pop
      ? Math.pow(pop.total2025 / pop.total2023, 0.5) - 1
      : 0.02;

    // Project occupancy assuming beds stay constant, demand grows with population
    const projectedOccupancy2027 = Math.min(100, currentOccupancy * Math.pow(1 + growthRate, 2));
    const projectedOccupancy2030 = Math.min(100, currentOccupancy * Math.pow(1 + growthRate, 5));

    // Months until 85%
    let monthsUntil85: number | null = null;
    if (currentOccupancy < 85) {
      const monthlyGrowth = Math.pow(1 + growthRate, 1 / 12) - 1;
      if (monthlyGrowth > 0) {
        monthsUntil85 = Math.ceil(Math.log(85 / currentOccupancy) / Math.log(1 + monthlyGrowth));
        if (monthsUntil85 > 120) monthsUntil85 = null; // >10 years = not foreseeable
      }
    } else {
      monthsUntil85 = 0; // already above
    }

    let riskLevel: CapacityProjection['riskLevel'];
    if (currentOccupancy >= 85) riskLevel = 'critical';
    else if (projectedOccupancy2027 >= 85) riskLevel = 'high';
    else if (projectedOccupancy2030 >= 85) riskLevel = 'moderate';
    else if (currentOccupancy < 30) riskLevel = 'surplus';
    else riskLevel = 'low';

    return {
      hospitalName: '', // governorate level
      governorateCode: gh.governorateCode,
      currentBeds,
      currentOccupancy: Math.round(currentOccupancy * 10) / 10,
      projectedOccupancy2027: Math.round(projectedOccupancy2027 * 10) / 10,
      projectedOccupancy2030: Math.round(projectedOccupancy2030 * 10) / 10,
      monthsUntil85Pct: monthsUntil85,
      riskLevel,
    };
  });
}

// ===== HOSPITAL-LEVEL RISK =====
export function getHighRiskHospitals() {
  return MOH_HOSPITALS
    .filter(h => h.occupancyRate >= 70)
    .sort((a, b) => b.occupancyRate - a.occupancyRate);
}

// ===== AGGREGATION HELPERS =====
export function getTotalBeds() {
  return GOVERNORATE_HEALTH.reduce((sum, g) => sum + g.govtBeds + g.privateBeds, 0);
}

export function getTotalHospitals() {
  return GOVERNORATE_HEALTH.reduce((sum, g) => sum + g.govtHospitals + g.privateHospitals, 0);
}

export function getAverageOccupancy() {
  const weighted = MOH_HOSPITALS.reduce((sum, h) => sum + h.occupancyRate * h.beds, 0);
  const totalBeds = MOH_HOSPITALS.reduce((sum, h) => sum + h.beds, 0);
  return totalBeds > 0 ? Math.round(weighted / totalBeds * 10) / 10 : 0;
}

export function getBedsPerTenK(govCode: string) {
  const gh = GOVERNORATE_HEALTH.find(g => g.governorateCode === govCode);
  const pop = POPULATION_BY_GOVERNORATE.find(p => p.governorateCode === govCode);
  if (!gh || !pop) return 0;
  return Math.round(((gh.govtBeds + gh.privateBeds) / pop.total2025) * 10000 * 10) / 10;
}

export function getTopDeathCauses(n: number = 5) {
  return [...DEATHS_BY_DISEASE]
    .sort((a, b) => b.total - a.total)
    .slice(0, n);
}
