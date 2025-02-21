import { vi } from 'vitest';

export const onClicked = {
    addListener: vi.fn(),
    removeListener: vi.fn(),
    hasListener: vi.fn(),
    triggerEvent: vi.fn()
};

export const browserAction = {
    onClicked
}; 