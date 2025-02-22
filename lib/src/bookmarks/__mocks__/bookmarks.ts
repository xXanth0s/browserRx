import { vi } from 'vitest';
import type { Bookmarks } from 'webextension-polyfill';

export const mockBookmarkTreeNode: Bookmarks.BookmarkTreeNode = {
    id: 'test-bookmark-id',
    title: 'Test Bookmark',
    url: 'https://example.com',
    index: 0,
    dateAdded: 1234567890,
    type: 'bookmark'
};

export const onCreated = {
    addListener: vi.fn(),
    removeListener: vi.fn(),
    hasListener: vi.fn()
};

export const onRemoved = {
    addListener: vi.fn(),
    removeListener: vi.fn(),
    hasListener: vi.fn()
};

export const onChanged = {
    addListener: vi.fn(),
    removeListener: vi.fn(),
    hasListener: vi.fn()
};

export const onMoved = {
    addListener: vi.fn(),
    removeListener: vi.fn(),
    hasListener: vi.fn()
};

export const bookmarks = {
    onCreated,
    onRemoved,
    onChanged,
    onMoved
}; 