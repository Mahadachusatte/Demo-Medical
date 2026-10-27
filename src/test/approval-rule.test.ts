import { describe, it, expect } from 'vitest';
import { validateEventApproval } from '@/lib/events';

describe('Approval rule', () => {
  it('should throw if event with money action has no approver', () => {
    expect(() => {
      validateEventApproval({
        action: 'Release pay run',
        status: 'proposed',
        approver: null,
      });
    }).toThrow('Event with money or message action requires an approver');
  });

  it('should throw if event with send action has no approver', () => {
    expect(() => {
      validateEventApproval({
        action: 'Send reminder',
        status: 'proposed',
        approver: null,
      });
    }).toThrow('Event with money or message action requires an approver');
  });

  it('should not throw if automatic', () => {
    expect(() => {
      validateEventApproval({
        action: 'Release pay run',
        status: 'automatic',
        approver: null,
      });
    }).not.toThrow();
  });

  it('should not throw if has approver', () => {
    expect(() => {
      validateEventApproval({
        action: 'Release pay run',
        status: 'proposed',
        approver: 'Hannah Clarke',
      });
    }).not.toThrow();
  });
});
