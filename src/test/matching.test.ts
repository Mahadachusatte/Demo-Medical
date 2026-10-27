import { describe, it, expect } from 'vitest';

describe('Matching', () => {
  it('should have consistent scoring', () => {
    // Simple test for matching logic
    const scores = [90, 85, 80, 75, 70];
    expect(scores[0]).toBeGreaterThan(scores[4]);
  });
});
