import { beforeEach, describe, expect, it, vi } from 'vitest';
import { browserRxBrowserAction } from './browser-action';
import WebExtensionMock from '../__mocks__/webextension-polyfill';
import { OnClickedEvent } from './browser-action-models';
import { filter, take, takeUntil, Subject } from 'rxjs';
import type { Tabs } from 'webextension-polyfill';


describe('browserAction', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('onClicked', () => {
        it('should emit when a tab is clicked', () => {
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
            const testEvent: OnClickedEvent = { tab };

            browserRxBrowserAction.onClicked.subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.browserAction.onClicked.addListener.mock.calls[0];
            eventSubject(tab);

            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(mockFn).toHaveBeenCalledWith(testEvent);
        });

        it('should complete when unsubscribed', () => {
            const mockFn = vi.fn();
            const subscription = browserRxBrowserAction.onClicked.subscribe({
                complete: mockFn
            });

            subscription.unsubscribe();
            expect(WebExtensionMock.browserAction.onClicked.removeListener).toHaveBeenCalled();
        });

        it('should emit filtered click events', () => {
            const mockFn = vi.fn();
            browserRxBrowserAction.onClicked.pipe(
                filter((event): boolean => {
                    const url = event.tab.url;
                    return url !== undefined && url.includes('example.com');
                })
            ).subscribe(mockFn);

            const [eventSubject] = WebExtensionMock.browserAction.onClicked.addListener.mock.calls[0];
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
            
            browserRxBrowserAction.onClicked.pipe(
                take(1)
            ).subscribe({
                next: mockFn,
                complete: completeFn
            });

            const [eventSubject] = WebExtensionMock.browserAction.onClicked.addListener.mock.calls[0];
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
            expect(WebExtensionMock.browserAction.onClicked.removeListener).toHaveBeenCalled();
        });

        it('should complete when notifier emits with takeUntil', () => {
            const mockFn = vi.fn();
            const completeFn = vi.fn();
            const notifier = new Subject<void>();
            
            browserRxBrowserAction.onClicked.pipe(
                takeUntil(notifier)
            ).subscribe({
                next: mockFn,
                complete: completeFn
            });

            const [eventSubject] = WebExtensionMock.browserAction.onClicked.addListener.mock.calls[0];
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
            expect(WebExtensionMock.browserAction.onClicked.removeListener).toHaveBeenCalled();
        });
    });
}); 