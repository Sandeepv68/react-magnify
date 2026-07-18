// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { expect, afterEach, beforeEach, describe, it, test, vi } from 'vitest';
// Set up global test utilities
Object.assign(globalThis, {
    expect,
    afterEach,
    beforeEach,
    describe,
    it,
    test,
    vi,
});
