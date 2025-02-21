import { vi } from 'vitest';

export const onUpdated = {
    addListener: vi.fn(),
    removeListener: vi.fn(),
    hasListener: vi.fn(),
    triggerEvent: vi.fn()
};

export const onCreated = {
    addListener: vi.fn(),
    removeListener: vi.fn(),
    hasListener: vi.fn(),
    triggerEvent: vi.fn()
};

export const onActivated = {
    addListener: vi.fn(),
    removeListener: vi.fn(),
    hasListener: vi.fn(),
    triggerEvent: vi.fn()
};

export const onRemoved = {
    addListener: vi.fn(),
    removeListener: vi.fn(),
    hasListener: vi.fn(),
    triggerEvent: vi.fn()
};

export const tabs = {
    query: vi.fn(),
    get: vi.fn(),
    create: vi.fn(),
    remove: vi.fn(),
    update: vi.fn(),
    onUpdated,
    onCreated,
    onActivated,
    onRemoved
}; 