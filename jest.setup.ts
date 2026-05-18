import '@testing-library/jest-dom'
// jest.setup.ts or jest.setup.js

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/login',
}));

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};