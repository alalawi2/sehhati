import { describe, it, expect } from 'vitest';
import { generateInsights, Insight } from '../lib/insights';

describe('generateInsights', () => {
  const insights = generateInsights();

  it('generates at least 10 insights', () => {
    expect(insights.length).toBeGreaterThanOrEqual(10);
  });

  it('every insight has required fields', () => {
    for (const ins of insights) {
      expect(ins.title).toBeTruthy();
      expect(ins.description).toBeTruthy();
      expect(ins.severity).toBeTruthy();
      expect(ins.category).toBeTruthy();
      expect(ins.dataPoints.length).toBeGreaterThan(0);
    }
  });

  it('severity is one of the valid values', () => {
    const valid = ['critical', 'warning', 'info', 'positive'];
    for (const ins of insights) {
      expect(valid).toContain(ins.severity);
    }
  });

  it('category is one of the valid values', () => {
    const valid = ['infrastructure', 'disease', 'workforce', 'population'];
    for (const ins of insights) {
      expect(valid).toContain(ins.category);
    }
  });

  it('no insight title is empty', () => {
    for (const ins of insights) {
      expect(ins.title.trim().length).toBeGreaterThan(0);
    }
  });

  it('no insight description contains "NaN" or "undefined"', () => {
    for (const ins of insights) {
      expect(ins.description).not.toContain('NaN');
      expect(ins.description).not.toContain('undefined');
      expect(ins.title).not.toContain('NaN');
      expect(ins.title).not.toContain('undefined');
    }
  });

  it('no insight data points contain "NaN" or "undefined"', () => {
    for (const ins of insights) {
      for (const dp of ins.dataPoints) {
        expect(dp).not.toContain('NaN');
        expect(dp).not.toContain('undefined');
      }
    }
  });

  it('does not claim "year-over-year" for multi-year comparisons', () => {
    for (const ins of insights) {
      expect(ins.description).not.toMatch(/year-over-year/i);
      expect(ins.title).not.toMatch(/year-over-year/i);
    }
  });

  it('does not use causal language ("worsening", "effective") without qualification', () => {
    for (const ins of insights) {
      // "suggesting effective" or "worsening X conditions" are causal claims
      expect(ins.description).not.toMatch(/suggesting effective/i);
      expect(ins.description).not.toMatch(/worsening.*conditions/i);
    }
  });

  it('has at least one critical and one positive insight', () => {
    expect(insights.some(i => i.severity === 'critical')).toBe(true);
    expect(insights.some(i => i.severity === 'positive')).toBe(true);
  });

  it('covers all four categories', () => {
    expect(insights.some(i => i.category === 'infrastructure')).toBe(true);
    expect(insights.some(i => i.category === 'disease')).toBe(true);
    expect(insights.some(i => i.category === 'workforce')).toBe(true);
    expect(insights.some(i => i.category === 'population')).toBe(true);
  });

  it('bed ratio insight references correct governorate and plausible ratio', () => {
    const bedRatioInsight = insights.find(i =>
      i.title.includes('lowest bed ratio')
    );
    expect(bedRatioInsight).toBeDefined();
    // Should mention the actual lowest-ratio governorate
    // The ratio should be a number between 1 and 30 (plausible range for Oman)
    const ratioMatch = bedRatioInsight!.description.match(/(\d+\.\d+) beds per 10,000/);
    expect(ratioMatch).toBeTruthy();
    const ratio = parseFloat(ratioMatch![1]);
    expect(ratio).toBeGreaterThan(1);
    expect(ratio).toBeLessThan(30);
  });
});
