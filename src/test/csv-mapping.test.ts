import { describe, it, expect } from 'vitest';

describe('CSV mapping', () => {
  it('should map columns correctly', () => {
    const headers = ["Staff Name", "Hrs Worked", "Ward/Dept", "Shift Date"];
    const mapping = {
      name: headers.find(h => h.toLowerCase().includes('name')) || "",
      hours: headers.find(h => h.toLowerCase().includes('hour')) || "",
    };
    expect(mapping.name).toBe("Staff Name");
    expect(mapping.hours).toBe("Hrs Worked");
  });
});
