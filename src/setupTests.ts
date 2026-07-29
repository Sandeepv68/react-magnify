/**
 * Test environment setup for Vitest + @testing-library/react.
 *
 * - Imports `@testing-library/jest-dom` matchers (e.g. `toBeInTheDocument`,
 *   `toHaveClass`, `toHaveTextContent`) so they are available in every test.
 * - Exports Vitest globals (`expect`, `afterEach`, `beforeEach`, `describe`,
 *   `it`, `test`, `vi`) onto `globalThis` so they can be used without
 *   explicit imports in test files when `globals: true` is set in vitest.config.
 */

import '@testing-library/jest-dom';
import { expect, afterEach, beforeEach, describe, it, test, vi } from 'vitest';

Object.assign(globalThis, {
  expect,
  afterEach,
  beforeEach,
  describe,
  it,
  test,
  vi,
});
