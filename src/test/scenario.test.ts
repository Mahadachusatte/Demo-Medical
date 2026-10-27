import { describe, it, expect } from 'vitest';
import { scenarioSteps } from '@/lib/scenario';

describe('Scenario', () => {
  it('should have 9 steps in correct order', () => {
    expect(scenarioSteps).toHaveLength(9);
    expect(scenarioSteps[0].step).toBe(1);
    expect(scenarioSteps[8].step).toBe(9);
  });

  it('should pause at steps 4, 7, and 8', () => {
    expect(scenarioSteps[3].needsHuman).toBe(true); // step 4
    expect(scenarioSteps[6].needsHuman).toBe(true); // step 7
    expect(scenarioSteps[7].needsHuman).toBe(true); // step 8
  });
});
