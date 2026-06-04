import { describe, it, expect } from 'vitest';
import {
  calculateEquityScores,
  calculateCapacityProjections,
  weightedOccupancy,
  getTotalBeds,
  getTotalHospitals,
  getAverageOccupancy,
  getBedsPerTenK,
  getTopDeathCauses,
  getHighRiskHospitals,
} from '../lib/calculations';
import { GOVERNORATE_HEALTH, MOH_HOSPITALS } from '../data/hospitals';
import { GOVERNORATES } from '../data/governorates';

const ALL_GOV_CODES = GOVERNORATES.map(g => g.code);

describe('weightedOccupancy', () => {
  it('returns 0 for a governorate with no hospitals', () => {
    expect(weightedOccupancy('FAKE_CODE')).toBe(0);
  });

  it('returns a value between 0 and 100 for all governorates', () => {
    for (const code of ALL_GOV_CODES) {
      const occ = weightedOccupancy(code);
      expect(occ).toBeGreaterThanOrEqual(0);
      expect(occ).toBeLessThanOrEqual(100);
    }
  });

  it('differs from simple mean for governorates with heterogeneous hospitals', () => {
    // Muscat has hospitals from 11.9% to 80.4% with very different bed counts
    const musHospitals = MOH_HOSPITALS.filter(h => h.governorateCode === 'MUS');
    const simpleMean = musHospitals.reduce((s, h) => s + h.occupancyRate, 0) / musHospitals.length;
    const weighted = weightedOccupancy('MUS');
    // These should be different since bed sizes vary widely
    expect(weighted).not.toBeCloseTo(simpleMean, 0);
  });

  it('weights larger hospitals more heavily', () => {
    // Royal Hospital (748 beds, 80.4%) should pull Muscat's weighted avg up
    // compared to the simple mean dragged down by small low-occupancy facilities
    const musHospitals = MOH_HOSPITALS.filter(h => h.governorateCode === 'MUS');
    const simpleMean = musHospitals.reduce((s, h) => s + h.occupancyRate, 0) / musHospitals.length;
    const weighted = weightedOccupancy('MUS');
    // Royal Hospital is the largest and has high occupancy, so weighted should > simple mean
    expect(weighted).toBeGreaterThan(simpleMean);
  });
});

describe('calculateEquityScores', () => {
  const scores = calculateEquityScores();

  it('returns scores for all 11 governorates', () => {
    expect(scores.length).toBe(11);
    for (const code of ALL_GOV_CODES) {
      expect(scores.find(s => s.governorateCode === code)).toBeDefined();
    }
  });

  it('overall scores are between 0 and 100', () => {
    for (const s of scores) {
      expect(s.overall).toBeGreaterThanOrEqual(0);
      expect(s.overall).toBeLessThanOrEqual(100);
    }
  });

  it('sub-scores are between 0 and 100', () => {
    for (const s of scores) {
      expect(s.bedScore).toBeGreaterThanOrEqual(0);
      expect(s.bedScore).toBeLessThanOrEqual(100);
      expect(s.doctorScore).toBeGreaterThanOrEqual(0);
      expect(s.doctorScore).toBeLessThanOrEqual(100);
      expect(s.nurseScore).toBeGreaterThanOrEqual(0);
      expect(s.nurseScore).toBeLessThanOrEqual(100);
      expect(s.accessScore).toBeGreaterThanOrEqual(0);
      expect(s.accessScore).toBeLessThanOrEqual(100);
      expect(s.stressScore).toBeGreaterThanOrEqual(0);
      expect(s.stressScore).toBeLessThanOrEqual(100);
    }
  });

  it('overall is the rounded average of 5 sub-scores', () => {
    for (const s of scores) {
      const avg = Math.round(
        (s.bedScore + s.doctorScore + s.nurseScore + s.accessScore + s.stressScore) / 5
      );
      expect(s.overall).toBe(avg);
    }
  });

  it('at least one governorate has max score (100) in each dimension', () => {
    // Min-max normalization guarantees this
    expect(scores.some(s => s.bedScore === 100)).toBe(true);
    expect(scores.some(s => s.doctorScore === 100)).toBe(true);
    expect(scores.some(s => s.nurseScore === 100)).toBe(true);
    expect(scores.some(s => s.accessScore === 100)).toBe(true);
    expect(scores.some(s => s.stressScore === 100)).toBe(true);
  });

  it('at least one governorate has min score (0) in each dimension', () => {
    expect(scores.some(s => s.bedScore === 0)).toBe(true);
    expect(scores.some(s => s.doctorScore === 0)).toBe(true);
    expect(scores.some(s => s.nurseScore === 0)).toBe(true);
    expect(scores.some(s => s.accessScore === 0)).toBe(true);
    expect(scores.some(s => s.stressScore === 0)).toBe(true);
  });
});

describe('calculateCapacityProjections', () => {
  const projections = calculateCapacityProjections();

  it('returns projections for all 11 governorates', () => {
    expect(projections.length).toBe(11);
  });

  it('currentOccupancy is between 0 and 100', () => {
    for (const p of projections) {
      expect(p.currentOccupancy).toBeGreaterThanOrEqual(0);
      expect(p.currentOccupancy).toBeLessThanOrEqual(100);
    }
  });

  it('projected occupancy 2027 ≥ current occupancy (population grows)', () => {
    for (const p of projections) {
      // Musandam has slightly declining population, so allow small decrease
      expect(p.projectedOccupancy2027).toBeGreaterThanOrEqual(p.currentOccupancy * 0.95);
    }
  });

  it('projected occupancy 2030 ≥ projected 2027', () => {
    for (const p of projections) {
      expect(p.projectedOccupancy2030).toBeGreaterThanOrEqual(p.projectedOccupancy2027 * 0.95);
    }
  });

  it('projections are capped at 100%', () => {
    for (const p of projections) {
      expect(p.projectedOccupancy2027).toBeLessThanOrEqual(100);
      expect(p.projectedOccupancy2030).toBeLessThanOrEqual(100);
    }
  });

  it('riskLevel is one of the valid values', () => {
    const validLevels = ['critical', 'high', 'moderate', 'low', 'surplus'];
    for (const p of projections) {
      expect(validLevels).toContain(p.riskLevel);
    }
  });

  it('critical risk means current occupancy ≥ 85%', () => {
    for (const p of projections) {
      if (p.riskLevel === 'critical') {
        expect(p.currentOccupancy).toBeGreaterThanOrEqual(85);
      }
    }
  });

  it('surplus means current occupancy < 30%', () => {
    for (const p of projections) {
      if (p.riskLevel === 'surplus') {
        expect(p.currentOccupancy).toBeLessThan(30);
      }
    }
  });

  it('monthsUntil85Pct is null or non-negative', () => {
    for (const p of projections) {
      if (p.monthsUntil85Pct !== null) {
        expect(p.monthsUntil85Pct).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it('currentBeds uses government beds only', () => {
    for (const p of projections) {
      const gh = GOVERNORATE_HEALTH.find(g => g.governorateCode === p.governorateCode);
      expect(p.currentBeds).toBe(gh!.govtBeds);
    }
  });
});

describe('Aggregation helpers', () => {
  it('getTotalBeds sums govt + private across all governorates', () => {
    const expected = GOVERNORATE_HEALTH.reduce((s, g) => s + g.govtBeds + g.privateBeds, 0);
    expect(getTotalBeds()).toBe(expected);
  });

  it('getTotalHospitals sums govt + private across all governorates', () => {
    const expected = GOVERNORATE_HEALTH.reduce((s, g) => s + g.govtHospitals + g.privateHospitals, 0);
    expect(getTotalHospitals()).toBe(expected);
  });

  it('getAverageOccupancy returns bed-weighted mean', () => {
    const totalBeds = MOH_HOSPITALS.reduce((s, h) => s + h.beds, 0);
    const weightedSum = MOH_HOSPITALS.reduce((s, h) => s + h.occupancyRate * h.beds, 0);
    const expected = Math.round(weightedSum / totalBeds * 10) / 10;
    expect(getAverageOccupancy()).toBe(expected);
  });

  it('getBedsPerTenK returns correct ratio for Muscat', () => {
    const result = getBedsPerTenK('MUS');
    // MUS: 3467 govt + 1278 private = 4745, pop = 1532486
    // (4745 / 1532486) * 10000 = 30.96
    expect(result).toBeGreaterThan(30);
    expect(result).toBeLessThan(32);
  });

  it('getBedsPerTenK returns 0 for unknown code', () => {
    expect(getBedsPerTenK('FAKE')).toBe(0);
  });

  it('getTopDeathCauses returns sorted by total descending', () => {
    const top = getTopDeathCauses(5);
    expect(top.length).toBe(5);
    for (let i = 1; i < top.length; i++) {
      expect(top[i].total).toBeLessThanOrEqual(top[i - 1].total);
    }
  });

  it('getHighRiskHospitals returns only hospitals ≥ 70% occupancy', () => {
    const risky = getHighRiskHospitals();
    for (const h of risky) {
      expect(h.occupancyRate).toBeGreaterThanOrEqual(70);
    }
  });

  it('getHighRiskHospitals is sorted by occupancy descending', () => {
    const risky = getHighRiskHospitals();
    for (let i = 1; i < risky.length; i++) {
      expect(risky[i].occupancyRate).toBeLessThanOrEqual(risky[i - 1].occupancyRate);
    }
  });
});
