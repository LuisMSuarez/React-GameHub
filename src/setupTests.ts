import "@testing-library/jest-dom";
import { vi } from "vitest";

// Vitest runs in a simulated browser environment, but some APIs like matchMedia are not included by default.
window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
}));