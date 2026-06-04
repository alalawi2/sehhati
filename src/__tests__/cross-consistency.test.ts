import { describe, it, expect } from 'vitest';
import { GOVERNORATE_HEALTH, HEALTH_INDICATORS } from '../data/hospitals';
import { POPULATION_BY_GOVERNORATE } from '../data/population';
import { DEATHS_BY_DISEASE, TOTAL_DEATHS_2025 } from '../data/diseases';
import { getTotalBeds, getTotalHospitals, getAverageOccupancy, calculateEquityScores } from '../lib/calculations';

describe('Cross-source consistency', () => {
  it('national beds/10K indicator ≈ computed from governorate data (±20%)', () => {
    // HEALTH_INDICATORS says 16.4 beds/10K for 2025
    // Governorate data: total beds / total pop * 10000
    const totalBeds = getTotalBeds();
    const totalPop = POPULATION_BY_GOVERNORATE.reduce((s, p) => s + p.total2025, 0);
    const computedRatio = (totalBeds / totalPop) * 10000;
    const reportedRatio = HEALTH_INDICATORS[HEALTH_INDICATORS.length - 1].bedsPerTenK;

    // Allow 20% tolerance (different bed counting methodologies)
    expect(computedRatio).toBeGreaterThan(reportedRatio * 0.8);
    expect(computedRatio).toBeLessThan(reportedRatio * 1.2);
  });

  it('total hospitals from getTotalHospitals matches sum of GOVERNORATE_HEALTH', () => {
    const fromHelper = getTotalHospitals();
    const fromData = GOVERNORATE_HEALTH.reduce(
      (s, g) => s + g.govtHospitals + g.privateHospitals, 0
    );
    expect(fromHelper).toBe(fromData);
  });

  it('weighted occupancy from getAverageOccupancy is between 40-90%', () => {
    // Oman national average should be in this range
    const avg = getAverageOccupancy();
    expect(avg).toBeGreaterThan(40);
    expect(avg).toBeLessThan(90);
  });

  it('death governorate sums never exceed category total', () => {
    for (const d of DEATHS_BY_DISEASE) {
      const govSum = Object.values(d.byGovernorate).reduce((s, v) => s + v, 0);
      expect(govSum).toBeLessThanOrEqual(d.total);
    }
  });

  it('TOTAL_DEATHS_2025 is internally consistent', () => {
    const sum = DEATHS_BY_DISEASE.reduce((s, d) => s + d.total, 0);
    expect(sum).toBe(TOTAL_DEATHS_2025);
  });

  it('bed ratio ordering is consistent between equity scores and raw data', () => {
    // Compute bed ratios from raw data
    const ratios = GOVERNORATE_HEALTH.map(gh => {
      const pop = POPULATION_BY_GOVERNORATE.find(p => p.governorateCode === gh.governorateCode);
      return {
        code: gh.governorateCode,
        ratio: pop ? (gh.govtBeds / pop.total2025) * 10000 : 0,
      };
    }).sort((a, b) => a.ratio - b.ratio);

    // The lowest ratio governorate should have the lowest bedScore in equity
    const scores = calculateEquityScores();
    const lowestRatioCode = ratios[0].code;
    const lowestEquityBed = [...scores].sort((a, b) => a.bedScore - b.bedScore)[0];
    expect(lowestEquityBed.governorateCode).toBe(lowestRatioCode);
  });

  it('population growth rates are plausible (-5% to +15% over 2 years)', () => {
    for (const p of POPULATION_BY_GOVERNORATE) {
      const growth = ((p.total2025 / p.total2023) - 1) * 100;
      expect(growth).toBeGreaterThan(-5);
      expect(growth).toBeLessThan(15);
    }
  });
});
