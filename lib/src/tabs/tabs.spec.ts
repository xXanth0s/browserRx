import { beforeEach, describe, expect, it, vi } from 'vitest';
import { browserRxTabs } from './tabs';
import WebExtensionMock from '../__mocks__/webextension-polyfill';
import { OnActivatedEvent, OnCreatedEvent, OnUpdatedEvent } from './tabs-models';
import { filter, take, takeUntil, Subject } from 'rxjs';
import type { Tabs } from 'webextension-polyfill';

describe('tabs', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('fromTabUpdated', () => {

        it('should emit tab update events', () => {
            const mockFn = vi.fn();
            const testEvent = {
                tabId: 1,
                changeInfo: { status: 'complete' },
                tab: { id: 1, index: 0, highlighted: false, active: false, pinned: false, incognito: false }
            } satisfies OnUpdatedEvent;

            browserRxTabs.onUpdated.subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.tabs.onUpdated.addListener.mock.calls[0];
            eventSubject(testEvent.tabId, testEvent.changeInfo, testEvent.tab);

            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(mockFn).toHaveBeenCalledWith(testEvent);
        });

        it('should complete when unsubscribed', async () => {
            const mockFn = vi.fn();
            const subscription = browserRxTabs.onUpdated.subscribe({
                complete: mockFn
            });

            subscription.unsubscribe();
            expect(WebExtensionMock.tabs.onUpdated.removeListener).toHaveBeenCalled();
        });

        it('should emit filtered tab update events', async () => {
            const mockFn = vi.fn();
            browserRxTabs.onUpdated.pipe(
                filter(event => event.changeInfo.status === 'complete')
            ).subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.tabs.onUpdated.addListener.mock.calls[0];
            eventSubject(1, { status: 'loading' }, { id: 1 });
            expect(mockFn).not.toHaveBeenCalled();

            eventSubject(1, { status: 'complete' }, { id: 1 });
            expect(mockFn).toHaveBeenCalledWith({
                tabId: 1,
                changeInfo: { status: 'complete' },
                tab: { id: 1 }
            });
        });

        it('should complete after taking one event with take(1)', () => {
            const mockFn = vi.fn();
            const completeFn = vi.fn();
            
            browserRxTabs.onUpdated.pipe(
                take(1)
            ).subscribe({
                next: mockFn,
                complete: completeFn
            });

            const [eventSubject] = WebExtensionMock.tabs.onUpdated.addListener.mock.calls[0];
            eventSubject(1, { status: 'complete' }, { id: 1 });
            
            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(completeFn).toHaveBeenCalled();
            expect(WebExtensionMock.tabs.onUpdated.removeListener).toHaveBeenCalled();
        });

        it('should complete when notifier emits with takeUntil', () => {
            const mockFn = vi.fn();
            const completeFn = vi.fn();
            const notifier = new Subject<void>();
            
            browserRxTabs.onUpdated.pipe(
                takeUntil(notifier)
            ).subscribe({
                next: mockFn,
                complete: completeFn
            });

            const [eventSubject] = WebExtensionMock.tabs.onUpdated.addListener.mock.calls[0];
            eventSubject(1, { status: 'complete' }, { id: 1 });
            expect(mockFn).toHaveBeenCalledTimes(1);
            
            notifier.next();
            expect(completeFn).toHaveBeenCalled();
            expect(WebExtensionMock.tabs.onUpdated.removeListener).toHaveBeenCalled();
        });
    });

    describe('fromTabCreated', () => {
        it('should emit tab created events', () => {
            const mockFn = vi.fn();
            const tab: Tabs.Tab = { 
                id: 1, 
                url: 'https://example.com',
                index: 0,
                highlighted: false,
                active: false,
                pinned: false,
                incognito: false
            };
            const testEvent: OnCreatedEvent = { tab };

            browserRxTabs.onCreated.subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.tabs.onCreated.addListener.mock.calls[0];
            eventSubject(tab);

            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(mockFn).toHaveBeenCalledWith(testEvent);
        });

        it('should complete when unsubscribed', () => {
            const mockFn = vi.fn();
            const subscription = browserRxTabs.onCreated.subscribe({
                complete: mockFn
            });

            subscription.unsubscribe();
            expect(WebExtensionMock.tabs.onCreated.removeListener).toHaveBeenCalled();
        });

        it('should emit filtered tab created events', () => {
            const mockFn = vi.fn();
            browserRxTabs.onCreated.pipe(
                filter((event): boolean => {
                    const url = event.tab.url;
                    return url !== undefined && url.includes('example.com');
                })
            ).subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.tabs.onCreated.addListener.mock.calls[0];
            const otherTab: Tabs.Tab = { 
                id: 1, 
                url: 'https://other.com',
                index: 0,
                highlighted: false,
                active: false,
                pinned: false,
                incognito: false
            };
            eventSubject(otherTab);
            expect(mockFn).not.toHaveBeenCalled();

            const exampleTab: Tabs.Tab = {
                id: 1,
                url: 'https://example.com',
                index: 0,
                highlighted: false,
                active: false,
                pinned: false,
                incognito: false
            };
            eventSubject(exampleTab);
            expect(mockFn).toHaveBeenCalledWith({ tab: exampleTab });
        });

        it('should complete after taking one event with take(1)', () => {
            const mockFn = vi.fn();
            const completeFn = vi.fn();
            
            browserRxTabs.onCreated.pipe(
                take(1)
            ).subscribe({
                next: mockFn,
                complete: completeFn
            });

            const [eventSubject] = WebExtensionMock.tabs.onCreated.addListener.mock.calls[0];
            const tab: Tabs.Tab = { 
                id: 1, 
                url: 'https://example.com',
                index: 0,
                highlighted: false,
                active: false,
                pinned: false,
                incognito: false
            };
            eventSubject(tab);
            
            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(completeFn).toHaveBeenCalled();
            expect(WebExtensionMock.tabs.onCreated.removeListener).toHaveBeenCalled();
        });

        it('should complete when notifier emits with takeUntil', () => {
            const mockFn = vi.fn();
            const completeFn = vi.fn();
            const notifier = new Subject<void>();
            
            browserRxTabs.onCreated.pipe(
                takeUntil(notifier)
            ).subscribe({
                next: mockFn,
                complete: completeFn
            });

            const [eventSubject] = WebExtensionMock.tabs.onCreated.addListener.mock.calls[0];
            const tab: Tabs.Tab = { 
                id: 1, 
                url: 'https://example.com',
                index: 0,
                highlighted: false,
                active: false,
                pinned: false,
                incognito: false
            };
            eventSubject(tab);
            expect(mockFn).toHaveBeenCalledTimes(1);
            
            notifier.next();
            expect(completeFn).toHaveBeenCalled();
            expect(WebExtensionMock.tabs.onCreated.removeListener).toHaveBeenCalled();
        });
    });

    describe('fromTabActivated', () => {
        it('should emit tab activated events', () => {
            const mockFn = vi.fn();
            const activeInfo: Tabs.OnActivatedActiveInfoType = {
                tabId: 1,
                windowId: 1,
                previousTabId: undefined
            };
            const testEvent: OnActivatedEvent = { activeInfo };

            browserRxTabs.onActivated.subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.tabs.onActivated.addListener.mock.calls[0];
            eventSubject(activeInfo);

            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(mockFn).toHaveBeenCalledWith(testEvent);
        });

        it('should complete when unsubscribed', () => {
            const mockFn = vi.fn();
            const subscription = browserRxTabs.onActivated.subscribe({
                complete: mockFn
            });

            subscription.unsubscribe();
            expect(WebExtensionMock.tabs.onActivated.removeListener).toHaveBeenCalled();
        });

        it('should emit filtered tab activated events', () => {
            const mockFn = vi.fn();
            browserRxTabs.onActivated.pipe(
                filter(event => event.activeInfo.windowId === 1)
            ).subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.tabs.onActivated.addListener.mock.calls[0];
            eventSubject({ tabId: 1, windowId: 2 });
            expect(mockFn).not.toHaveBeenCalled();

            const activeInfo: Tabs.OnActivatedActiveInfoType = {
                tabId: 1,
                windowId: 1
            };
            eventSubject(activeInfo);
            expect(mockFn).toHaveBeenCalledWith({ activeInfo });
        });

        it('should complete after taking one event with take(1)', () => {
            const mockFn = vi.fn();
            const completeFn = vi.fn();
            
            browserRxTabs.onActivated.pipe(
                take(1)
            ).subscribe({
                next: mockFn,
                complete: completeFn
            });

            const [eventSubject] = WebExtensionMock.tabs.onActivated.addListener.mock.calls[0];
            const activeInfo: Tabs.OnActivatedActiveInfoType = {
                tabId: 1,
                windowId: 1
            };
            eventSubject(activeInfo);
            
            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(completeFn).toHaveBeenCalled();
            expect(WebExtensionMock.tabs.onActivated.removeListener).toHaveBeenCalled();
        });

        it('should complete with takeUntil', () => {
            const mockFn = vi.fn();
            const completeFn = vi.fn();
            const notifier = new Subject<void>();
            
            browserRxTabs.onActivated.pipe(
                takeUntil(notifier)
            ).subscribe({
                next: mockFn,
                complete: completeFn
            });

            const [eventSubject] = WebExtensionMock.tabs.onActivated.addListener.mock.calls[0];
            const activeInfo: Tabs.OnActivatedActiveInfoType = {
                tabId: 1,
                windowId: 1
            };
            eventSubject(activeInfo);
            expect(mockFn).toHaveBeenCalledTimes(1);
            
            notifier.next();
            expect(completeFn).toHaveBeenCalled();
            expect(WebExtensionMock.tabs.onActivated.removeListener).toHaveBeenCalled();
        });
    });

    describe('fromTabRemoved', () => {
        it('should emit tab removed events', () => {
            const mockFn = vi.fn();
            const testEvent = {
                tabId: 1,
                removeInfo: { windowId: 1, isWindowClosing: false }
            };

            browserRxTabs.onRemoved.subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.tabs.onRemoved.addListener.mock.calls[0];
            eventSubject(testEvent.tabId, testEvent.removeInfo);

            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(mockFn).toHaveBeenCalledWith(testEvent);
        });

        it('should complete when unsubscribed', () => {
            const mockFn = vi.fn();
            const subscription = browserRxTabs.onRemoved.subscribe({
                complete: mockFn
            });

            subscription.unsubscribe();
            expect(WebExtensionMock.tabs.onRemoved.removeListener).toHaveBeenCalled();
        });

        it('should emit filtered tab removed events', () => {
            const mockFn = vi.fn();
            browserRxTabs.onRemoved.pipe(
                filter(event => event.removeInfo.windowId === 1)
            ).subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.tabs.onRemoved.addListener.mock.calls[0];
            eventSubject(1, { windowId: 2, isWindowClosing: false });
            expect(mockFn).not.toHaveBeenCalled();

            eventSubject(1, { windowId: 1, isWindowClosing: false });
            expect(mockFn).toHaveBeenCalledWith({
                tabId: 1,
                removeInfo: { windowId: 1, isWindowClosing: false }
            });
        });

        it('should complete after taking one event with take(1)', () => {
            const mockFn = vi.fn();
            const completeFn = vi.fn();
            
            browserRxTabs.onRemoved.pipe(
                take(1)
            ).subscribe({
                next: mockFn,
                complete: completeFn
            });

            const [eventSubject] = WebExtensionMock.tabs.onRemoved.addListener.mock.calls[0];
            eventSubject(1, { windowId: 1, isWindowClosing: false });
            
            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(completeFn).toHaveBeenCalled();
            expect(WebExtensionMock.tabs.onRemoved.removeListener).toHaveBeenCalled();
        });

        it('should complete when notifier emits with takeUntil', () => {
            const mockFn = vi.fn();
            const completeFn = vi.fn();
            const notifier = new Subject<void>();
            
            browserRxTabs.onRemoved.pipe(
                takeUntil(notifier)
            ).subscribe({
                next: mockFn,
                complete: completeFn
            });

            const [eventSubject] = WebExtensionMock.tabs.onRemoved.addListener.mock.calls[0];
            eventSubject(1, { windowId: 1, isWindowClosing: false });
            expect(mockFn).toHaveBeenCalledTimes(1);
            
            notifier.next();
            expect(completeFn).toHaveBeenCalled();
            expect(WebExtensionMock.tabs.onRemoved.removeListener).toHaveBeenCalled();
        });
    });
});
