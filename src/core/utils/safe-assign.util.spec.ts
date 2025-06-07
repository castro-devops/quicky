import { describe, it, expect } from 'vitest';
import { safeAssign } from '@/core/utils/safe-assing.util';

describe('safeAssign', () => {
  it('should return undefined when value is null', () => {
    expect(safeAssign(null)).toBeUndefined();
  });

  it('should return undefined when value is undefined', () => {
    expect(safeAssign(undefined)).toBeUndefined();
  });

  it('should preserve provided values', () => {
    const obj = { a: 1 };
    expect(safeAssign('value')).toBe('value');
    expect(safeAssign(0)).toBe(0);
    expect(safeAssign(false)).toBe(false);
    expect(safeAssign(obj)).toBe(obj);
  });
});
