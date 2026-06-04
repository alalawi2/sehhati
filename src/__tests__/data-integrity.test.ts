import { describe, it, expect } from 'vitest';
import { GOVERNORATE_HEALTH, MOH_HOSPITALS, HEALTH_INDICATORS } from '../data/hospitals';
import { POPULATION_BY_GOVERNORATE, POPULATION_INDICATORS } from '../data/population';
import { INFECTIOUS_DISEASES, DEATHS_BY_DISEASE, TOTAL_DEATHS_2025 } from '../data/diseases';
import { GOVERNORATES } from '../data/governorates';

// Every governorate code used across all data files
const ALL_GOV_CODES = GOVERNORATES.map(g => g.code);

describe('Referential integrity', () => {
  it('every GOVERNORATE_HEALTH entry has a valid governorate code', () => {
    for (const gh of GOVERNORATE_HEALTH) {
      expect(ALL_GOV_CODES).toContain(gh.governorateCode);
    }
  });

  it('every MOH_HOSPITALS entry has a valid governorate code', () => {
    for (const h of MOH_HOSPITALS) {
      expect(ALL_GOV_CODES).toContain(h.governorateCode);
    }
  });

  it('every POPULATION_BY_GOVERNORATE entry has a valid governorate code', () => {
    for (const p of POPULATION_BY_GOVERNORATE) {
      expect(ALL_GOV_CODES).toContain(p.governorateCode);
    }
  });

  it('all 11 governorates have population data', () => {
    for (const code of ALL_GOV_CODES) {
      expect(POPULATION_BY_GOVERNORATE.find(p => p.governorateCode === code)).toBeDefined();
    }
  });

  it('all 11 governorates have health infrastructure data', () => {
    for (const code of ALL_GOV_CODES) {
      expect(GOVERNORATE_HEALTH.find(g => g.governorateCode === code)).toBeDefined();
    }
  });

  it('all 11 governorates have at least one hospital in MOH_HOSPITALS', () => {
    for (const code of ALL_GOV_CODES) {
      const hospitals = MOH_HOSPITALS.filter(h => h.governorateCode === code);
      expect(hospitals.length).toBeGreaterThan(0);
    }
  });
});

describe('Hospital data sanity', () => {
  it('no hospital has negative beds', () => {
    for (const h of MOH_HOSPITALS) {
      expect(h.beds).toBeGreaterThanOrEqual(0);
    }
  });

  it('no hospital has occupancy > 100%', () => {
    for (const h of MOH_HOSPITALS) {
      expect(h.occupancyRate).toBeLessThanOrEqual(100);
    }
  });

  it('no hospital has negative occupancy', () => {
    for (const h of MOH_HOSPITALS) {
      expect(h.occupancyRate).toBeGreaterThanOrEqual(0);
    }
  });

  it('hospitals with 0 beds must have 0% occupancy', () => {
    const zeroBed = MOH_HOSPITALS.filter(h => h.beds === 0);
    const violations = zeroBed.filter(h => h.occupancyRate !== 0);
    // Known data issue: As Suwaiq has 0 beds but 11.3% occupancy
    // This test documents it — fix the source data when confirmed
    expect(violations.map(h => h.name)).toEqual(['As Suwaiq Hospital']);
  });

  it('hospitals with 0 discharges should have 0% occupancy (unless long-stay)', () => {
    const zeroDischarge = MOH_HOSPITALS.filter(h => h.dischargesTotal === 0 && h.meanStayDays === 0);
    for (const h of zeroDischarge) {
      expect(h.occupancyRate).toBe(0);
    }
  });

  it('discharge gender split sums to total (±1 for rounding)', () => {
    const mismatches: string[] = [];
    for (const h of MOH_HOSPITALS) {
      const diff = Math.abs(h.dischargesTotal - h.dischargesFemale - h.dischargesMale);
      if (diff > 1) mismatches.push(`${h.name}: diff=${diff}`);
    }
    // Known data issue: Saham has a 6-person gap
    expect(mismatches).toEqual(['Saham: diff=6']);
  });

  it('mean stay days are non-negative', () => {
    for (const h of MOH_HOSPITALS) {
      expect(h.meanStayDays).toBeGreaterThanOrEqual(0);
    }
  });

  it('hospital-level bed sum ≤ governorate-level govt beds for each governorate', () => {
    // Hospital-level data may be incomplete (not all hospitals listed individually),
    // so the sum should be ≤ the aggregate, never greater
    for (const gh of GOVERNORATE_HEALTH) {
      const hospitalBeds = MOH_HOSPITALS
        .filter(h => h.governorateCode === gh.governorateCode)
        .reduce((sum, h) => sum + h.beds, 0);
      expect(hospitalBeds).toBeLessThanOrEqual(gh.govtBeds);
    }
  });

  it('governorate-level govt beds > 0 for all governorates', () => {
    for (const gh of GOVERNORATE_HEALTH) {
      expect(gh.govtBeds).toBeGreaterThan(0);
    }
  });

  it('no governorate has negative private beds', () => {
    for (const gh of GOVERNORATE_HEALTH) {
      expect(gh.privateBeds).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('Population data sanity', () => {
  it('total = omani + expat for each governorate', () => {
    for (const p of POPULATION_BY_GOVERNORATE) {
      expect(p.total2025).toBe(p.omani2025 + p.expat2025);
    }
  });

  it('population is positive for all governorates', () => {
    for (const p of POPULATION_BY_GOVERNORATE) {
      expect(p.total2025).toBeGreaterThan(0);
      expect(p.total2024).toBeGreaterThan(0);
      expect(p.total2023).toBeGreaterThan(0);
    }
  });

  it('national population sums to approximately 5.36M', () => {
    const total = POPULATION_BY_GOVERNORATE.reduce((s, p) => s + p.total2025, 0);
    expect(total).toBeGreaterThan(5_000_000);
    expect(total).toBeLessThan(6_000_000);
  });

  it('density is positive for all governorates', () => {
    for (const p of POPULATION_BY_GOVERNORATE) {
      expect(p.density2025).toBeGreaterThan(0);
    }
  });

  it('POPULATION_INDICATORS years are sequential', () => {
    for (let i = 1; i < POPULATION_INDICATORS.length; i++) {
      expect(POPULATION_INDICATORS[i].year).toBe(POPULATION_INDICATORS[i - 1].year + 1);
    }
  });

  it('life expectancy is in plausible range (60-90)', () => {
    for (const p of POPULATION_INDICATORS) {
      expect(p.lifeExpectancy).toBeGreaterThan(60);
      expect(p.lifeExpectancy).toBeLessThan(90);
    }
  });

  it('infant mortality is in plausible range (0-50)', () => {
    for (const p of POPULATION_INDICATORS) {
      expect(p.infantMortality).toBeGreaterThanOrEqual(0);
      expect(p.infantMortality).toBeLessThan(50);
    }
  });
});

describe('Disease data sanity', () => {
  it('all case counts are non-negative', () => {
    for (const d of INFECTIOUS_DISEASES) {
      expect(d.cases2023).toBeGreaterThanOrEqual(0);
      expect(d.cases2024).toBeGreaterThanOrEqual(0);
      expect(d.cases2025).toBeGreaterThanOrEqual(0);
    }
  });

  it('disease groups are valid (A, B, or C)', () => {
    for (const d of INFECTIOUS_DISEASES) {
      expect(['A', 'B', 'C']).toContain(d.group);
    }
  });

  it('TOTAL_DEATHS_2025 equals sum of all death category totals', () => {
    const sum = DEATHS_BY_DISEASE.reduce((s, d) => s + d.total, 0);
    expect(sum).toBe(TOTAL_DEATHS_2025);
  });

  it('death category totals are positive', () => {
    for (const d of DEATHS_BY_DISEASE) {
      expect(d.total).toBeGreaterThan(0);
    }
  });

  it('death by-governorate sums ≤ category total (may exclude referral deaths)', () => {
    for (const d of DEATHS_BY_DISEASE) {
      const govSum = Object.values(d.byGovernorate).reduce((s, v) => s + v, 0);
      expect(govSum).toBeLessThanOrEqual(d.total);
    }
  });

  it('death by-governorate has all 11 governorate keys', () => {
    for (const d of DEATHS_BY_DISEASE) {
      for (const code of ALL_GOV_CODES) {
        expect(d.byGovernorate).toHaveProperty(code);
      }
    }
  });

  it('no duplicate disease names', () => {
    const names = INFECTIOUS_DISEASES.map(d => d.name);
    expect(new Set(names).size).toBe(names.length);
  });
});

describe('Health indicators sanity', () => {
  it('years are sequential from 2016 to 2025', () => {
    expect(HEALTH_INDICATORS.length).toBe(10);
    for (let i = 0; i < HEALTH_INDICATORS.length; i++) {
      expect(HEALTH_INDICATORS[i].year).toBe(2016 + i);
    }
  });

  it('all per-10K rates are positive', () => {
    for (const h of HEALTH_INDICATORS) {
      expect(h.bedsPerTenK).toBeGreaterThan(0);
      expect(h.doctorsPerTenK).toBeGreaterThan(0);
      expect(h.nursesPerTenK).toBeGreaterThan(0);
      expect(h.dentistsPerTenK).toBeGreaterThan(0);
      expect(h.pharmacistsPerTenK).toBeGreaterThan(0);
    }
  });

  it('beds per 10K is in plausible range (10-30)', () => {
    for (const h of HEALTH_INDICATORS) {
      expect(h.bedsPerTenK).toBeGreaterThan(10);
      expect(h.bedsPerTenK).toBeLessThan(30);
    }
  });
});
