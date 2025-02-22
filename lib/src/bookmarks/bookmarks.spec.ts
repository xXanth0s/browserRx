import { beforeEach, describe, expect, it, vi } from 'vitest';
import { browserRxBookmarks } from './bookmarks';
import WebExtensionMock from '../__mocks__/webextension-polyfill';
import { OnCreatedEvent, OnRemovedEvent, OnChangedEvent, OnMovedEvent } from './bookmarks-models';
import { filter, take, takeUntil, Subject } from 'rxjs';
import { mockBookmarkTreeNode } from './__mocks__/bookmarks';

describe('browserRxBookmarks', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('onCreated', () => {
        it('should emit when a bookmark is created', () => {
            const mockFn = vi.fn();
            const testEvent: OnCreatedEvent = {
                id: 'test-id',
                bookmark: mockBookmarkTreeNode
            };

            browserRxBookmarks.onCreated.subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.bookmarks.onCreated.addListener.mock.calls[0];
            eventSubject(testEvent.id, testEvent.bookmark);

            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(mockFn).toHaveBeenCalledWith(testEvent);
        });

        it('should complete when unsubscribed', () => {
            const mockFn = vi.fn();
            const subscription = browserRxBookmarks.onCreated.subscribe({
                complete: mockFn
            });

            subscription.unsubscribe();
            expect(WebExtensionMock.bookmarks.onCreated.removeListener).toHaveBeenCalled();
        });

        it('should complete after taking one event with take(1)', () => {
            const mockFn = vi.fn();
            const completeFn = vi.fn();
            
            browserRxBookmarks.onCreated.pipe(
                take(1)
            ).subscribe({
                next: mockFn,
                complete: completeFn
            });

            const [eventSubject] = WebExtensionMock.bookmarks.onCreated.addListener.mock.calls[0];
            eventSubject('test-id', mockBookmarkTreeNode);
            
            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(completeFn).toHaveBeenCalled();
            expect(WebExtensionMock.bookmarks.onCreated.removeListener).toHaveBeenCalled();
        });

        it('should complete when notifier emits with takeUntil', () => {
            const mockFn = vi.fn();
            const completeFn = vi.fn();
            const notifier = new Subject<void>();
            
            browserRxBookmarks.onCreated.pipe(
                takeUntil(notifier)
            ).subscribe({
                next: mockFn,
                complete: completeFn
            });

            const [eventSubject] = WebExtensionMock.bookmarks.onCreated.addListener.mock.calls[0];
            eventSubject('test-id', mockBookmarkTreeNode);
            expect(mockFn).toHaveBeenCalledTimes(1);
            
            notifier.next();
            expect(completeFn).toHaveBeenCalled();
            expect(WebExtensionMock.bookmarks.onCreated.removeListener).toHaveBeenCalled();
        });

        it('should emit filtered bookmark created events', () => {
            const mockFn = vi.fn();
            browserRxBookmarks.onCreated.pipe(
                filter(event => Boolean(event.bookmark.url?.includes('example.com')))
            ).subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.bookmarks.onCreated.addListener.mock.calls[0];
            
            // Should not emit for non-matching URL
            eventSubject('test-id', {
                ...mockBookmarkTreeNode,
                url: 'https://other.com'
            });
            expect(mockFn).not.toHaveBeenCalled();

            // Should emit for matching URL
            eventSubject('test-id', mockBookmarkTreeNode);
            expect(mockFn).toHaveBeenCalledWith({
                id: 'test-id',
                bookmark: mockBookmarkTreeNode
            });
        });
    });

    describe('onRemoved', () => {
        it('should emit when a bookmark is removed', () => {
            const mockFn = vi.fn();
            const testEvent: OnRemovedEvent = {
                id: 'test-id',
                removeInfo: {
                    parentId: 'parent-id',
                    index: 0,
                    node: mockBookmarkTreeNode
                }
            };

            browserRxBookmarks.onRemoved.subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.bookmarks.onRemoved.addListener.mock.calls[0];
            eventSubject(testEvent.id, testEvent.removeInfo);

            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(mockFn).toHaveBeenCalledWith(testEvent);
        });

        it('should complete when unsubscribed', () => {
            const mockFn = vi.fn();
            const subscription = browserRxBookmarks.onRemoved.subscribe({
                complete: mockFn
            });

            subscription.unsubscribe();
            expect(WebExtensionMock.bookmarks.onRemoved.removeListener).toHaveBeenCalled();
        });

        it('should complete after taking one event with take(1)', () => {
            const mockFn = vi.fn();
            const completeFn = vi.fn();
            
            browserRxBookmarks.onRemoved.pipe(
                take(1)
            ).subscribe({
                next: mockFn,
                complete: completeFn
            });

            const [eventSubject] = WebExtensionMock.bookmarks.onRemoved.addListener.mock.calls[0];
            eventSubject('test-id', {
                parentId: 'parent-id',
                index: 0,
                node: mockBookmarkTreeNode
            });
            
            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(completeFn).toHaveBeenCalled();
            expect(WebExtensionMock.bookmarks.onRemoved.removeListener).toHaveBeenCalled();
        });

        it('should emit filtered bookmark removed events', () => {
            const mockFn = vi.fn();
            browserRxBookmarks.onRemoved.pipe(
                filter(event => event.removeInfo.parentId === 'parent-id')
            ).subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.bookmarks.onRemoved.addListener.mock.calls[0];
            
            // Should not emit for non-matching parent ID
            eventSubject('test-id', {
                parentId: 'other-parent',
                index: 0,
                node: mockBookmarkTreeNode
            });
            expect(mockFn).not.toHaveBeenCalled();

            // Should emit for matching parent ID
            const removeInfo = {
                parentId: 'parent-id',
                index: 0,
                node: mockBookmarkTreeNode
            };
            eventSubject('test-id', removeInfo);
            expect(mockFn).toHaveBeenCalledWith({
                id: 'test-id',
                removeInfo
            });
        });
    });

    describe('onChanged', () => {
        it('should emit when a bookmark is changed', () => {
            const mockFn = vi.fn();
            const testEvent: OnChangedEvent = {
                id: 'test-id',
                changeInfo: {
                    title: 'New Title',
                    url: 'https://new-url.com'
                }
            };

            browserRxBookmarks.onChanged.subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.bookmarks.onChanged.addListener.mock.calls[0];
            eventSubject(testEvent.id, testEvent.changeInfo);

            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(mockFn).toHaveBeenCalledWith(testEvent);
        });

        it('should complete when unsubscribed', () => {
            const mockFn = vi.fn();
            const subscription = browserRxBookmarks.onChanged.subscribe({
                complete: mockFn
            });

            subscription.unsubscribe();
            expect(WebExtensionMock.bookmarks.onChanged.removeListener).toHaveBeenCalled();
        });

        it('should complete after taking one event with take(1)', () => {
            const mockFn = vi.fn();
            const completeFn = vi.fn();
            
            browserRxBookmarks.onChanged.pipe(
                take(1)
            ).subscribe({
                next: mockFn,
                complete: completeFn
            });

            const [eventSubject] = WebExtensionMock.bookmarks.onChanged.addListener.mock.calls[0];
            eventSubject('test-id', {
                title: 'New Title',
                url: 'https://new-url.com'
            });
            
            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(completeFn).toHaveBeenCalled();
            expect(WebExtensionMock.bookmarks.onChanged.removeListener).toHaveBeenCalled();
        });

        it('should emit filtered bookmark changed events', () => {
            const mockFn = vi.fn();
            browserRxBookmarks.onChanged.pipe(
                filter(event => event.changeInfo.title === 'New Title')
            ).subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.bookmarks.onChanged.addListener.mock.calls[0];
            
            // Should not emit for non-matching title
            eventSubject('test-id', {
                title: 'Other Title',
                url: 'https://example.com'
            });
            expect(mockFn).not.toHaveBeenCalled();

            // Should emit for matching title
            const changeInfo = {
                title: 'New Title',
                url: 'https://example.com'
            };
            eventSubject('test-id', changeInfo);
            expect(mockFn).toHaveBeenCalledWith({
                id: 'test-id',
                changeInfo
            });
        });
    });

    describe('onMoved', () => {
        it('should emit when a bookmark is moved', () => {
            const mockFn = vi.fn();
            const testEvent: OnMovedEvent = {
                id: 'test-id',
                moveInfo: {
                    parentId: 'new-parent-id',
                    index: 1,
                    oldParentId: 'old-parent-id',
                    oldIndex: 0
                }
            };

            browserRxBookmarks.onMoved.subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.bookmarks.onMoved.addListener.mock.calls[0];
            eventSubject(testEvent.id, testEvent.moveInfo);

            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(mockFn).toHaveBeenCalledWith(testEvent);
        });

        it('should complete when unsubscribed', () => {
            const mockFn = vi.fn();
            const subscription = browserRxBookmarks.onMoved.subscribe({
                complete: mockFn
            });

            subscription.unsubscribe();
            expect(WebExtensionMock.bookmarks.onMoved.removeListener).toHaveBeenCalled();
        });

        it('should complete after taking one event with take(1)', () => {
            const mockFn = vi.fn();
            const completeFn = vi.fn();
            
            browserRxBookmarks.onMoved.pipe(
                take(1)
            ).subscribe({
                next: mockFn,
                complete: completeFn
            });

            const [eventSubject] = WebExtensionMock.bookmarks.onMoved.addListener.mock.calls[0];
            eventSubject('test-id', {
                parentId: 'new-parent-id',
                index: 1,
                oldParentId: 'old-parent-id',
                oldIndex: 0
            });
            
            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(completeFn).toHaveBeenCalled();
            expect(WebExtensionMock.bookmarks.onMoved.removeListener).toHaveBeenCalled();
        });

        it('should emit filtered bookmark moved events', () => {
            const mockFn = vi.fn();
            browserRxBookmarks.onMoved.pipe(
                filter(event => event.moveInfo.parentId === 'new-parent-id')
            ).subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.bookmarks.onMoved.addListener.mock.calls[0];
            
            // Should not emit for non-matching parent ID
            eventSubject('test-id', {
                parentId: 'other-parent',
                index: 1,
                oldParentId: 'old-parent-id',
                oldIndex: 0
            });
            expect(mockFn).not.toHaveBeenCalled();

            // Should emit for matching parent ID
            const moveInfo = {
                parentId: 'new-parent-id',
                index: 1,
                oldParentId: 'old-parent-id',
                oldIndex: 0
            };
            eventSubject('test-id', moveInfo);
            expect(mockFn).toHaveBeenCalledWith({
                id: 'test-id',
                moveInfo
            });
        });
    });
}); 