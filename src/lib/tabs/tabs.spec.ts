import { chrome } from 'jest-chrome';
import { Tabs } from 'webextension-polyfill';
import { browserRxTabs } from './tabs';
import {
    OnActivatedEvent,
    OnCreatedEvent,
    OnRemovedEvent,
    OnUpdatedEvent
} from './tabs-models';

describe('browserRxTabs', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('onUpdated', () => {
        let addListenerSpy: jest.SpyInstance;
        let removeListenerSpy: jest.SpyInstance;

        beforeEach(() => {
            addListenerSpy = jest.spyOn(chrome.tabs.onUpdated, 'addListener');
            removeListenerSpy = jest.spyOn(chrome.tabs.onUpdated, 'removeListener');
        });

        it('should register on chrome.tabs.onUpdate', () => {
            const mockFn = jest.fn();
            browserRxTabs.onUpdated.subscribe(mockFn);

            expect(addListenerSpy).toHaveBeenCalled();
            const callback = addListenerSpy.mock.calls[0][0];

            callback(42, { discarded: true }, { active: false, id: 42 });

            expect(mockFn).toHaveBeenCalled();
        });

        it('should unregister on chrome.tabs.onUpdate, when observable is unsubscribed', () => {
            const mockFn = jest.fn();
            const subscription = browserRxTabs.onUpdated.subscribe(mockFn);

            subscription.unsubscribe();

            expect(removeListenerSpy).toHaveBeenCalled();
        });

        it('should pass right data', () => {
            const expected: OnUpdatedEvent = {
                tab: {
                    active: false,
                    id: 42
                } as Tabs.Tab,
                changeInfo: {
                    discarded: true
                },
                tabId: 42
            };

            const mockFn = jest.fn();
            browserRxTabs.onUpdated.subscribe(mockFn);

            const callback = addListenerSpy.mock.calls[0][0];
            callback(expected.tabId, expected.changeInfo, expected.tab);

            expect(mockFn).toHaveBeenCalledWith(expected);
        });
    });

    describe('onCreated', () => {
        let addListenerSpy: jest.SpyInstance;
        let removeListenerSpy: jest.SpyInstance;

        beforeEach(() => {
            addListenerSpy = jest.spyOn(chrome.tabs.onCreated, 'addListener');
            removeListenerSpy = jest.spyOn(chrome.tabs.onCreated, 'removeListener');
        });

        it('should register on chrome.tabs.onCreated', () => {
            const mockFn = jest.fn();
            browserRxTabs.onCreated.subscribe(mockFn);

            expect(addListenerSpy).toHaveBeenCalled();
            const callback = addListenerSpy.mock.calls[0][0];

            callback({ active: false, id: 42 });

            expect(mockFn).toHaveBeenCalled();
        });

        it('should unregister on chrome.tabs.onCreated, when observable is unsubscribed', () => {
            const mockFn = jest.fn();
            const subscription = browserRxTabs.onCreated.subscribe(mockFn);

            subscription.unsubscribe();

            expect(removeListenerSpy).toHaveBeenCalled();
        });

        it('should pass right data', () => {
            const expected: OnCreatedEvent = {
                tab: {
                    active: false,
                    id: 42
                } as Tabs.Tab,
            };

            const mockFn = jest.fn();
            browserRxTabs.onCreated.subscribe(mockFn);

            const callback = addListenerSpy.mock.calls[0][0];
            callback(expected.tab);

            expect(mockFn).toHaveBeenCalledWith(expected);
        });
    });

    describe('onActivated', () => {
        let addListenerSpy: jest.SpyInstance;
        let removeListenerSpy: jest.SpyInstance;

        beforeEach(() => {
            addListenerSpy = jest.spyOn(chrome.tabs.onActivated, 'addListener');
            removeListenerSpy = jest.spyOn(chrome.tabs.onActivated, 'removeListener');
        });

        it('should register on chrome.tabs.onActivated', () => {
            const mockFn = jest.fn();
            browserRxTabs.onActivated.subscribe(mockFn);

            expect(addListenerSpy).toHaveBeenCalled();
            const callback = addListenerSpy.mock.calls[0][0];

            callback({ tabId: 42, windowId: 42 });

            expect(mockFn).toHaveBeenCalled();
        });

        it('should unregister on chrome.tabs.onActivated, when observable is unsubscribed', () => {
            const mockFn = jest.fn();
            const subscription = browserRxTabs.onActivated.subscribe(mockFn);

            subscription.unsubscribe();

            expect(removeListenerSpy).toHaveBeenCalled();
        });

        it('should pass right data', () => {
            const expected: OnActivatedEvent = {
                activeInfo: {
                    tabId: 42,
                    windowId: 42
                }
            };

            const mockFn = jest.fn();
            browserRxTabs.onActivated.subscribe(mockFn);

            const callback = addListenerSpy.mock.calls[0][0];
            callback(expected.activeInfo);

            expect(mockFn).toHaveBeenCalledWith(expected);
        });
    });

    describe('onRemoved', () => {
        let addListenerSpy: jest.SpyInstance;
        let removeListenerSpy: jest.SpyInstance;

        beforeEach(() => {
            addListenerSpy = jest.spyOn(chrome.tabs.onRemoved, 'addListener');
            removeListenerSpy = jest.spyOn(chrome.tabs.onRemoved, 'removeListener');
        });

        it('should register on chrome.tabs.onRemoved', () => {
            const mockFn = jest.fn();
            browserRxTabs.onRemoved.subscribe(mockFn);

            expect(addListenerSpy).toHaveBeenCalled();
            const callback = addListenerSpy.mock.calls[0][0];

            callback(42, { isWindowClosing: true, windowId: 42 });

            expect(mockFn).toHaveBeenCalled();
        });

        it('should unregister on chrome.tabs.onRemoved, when observable is unsubscribed', () => {
            const mockFn = jest.fn();
            const subscription = browserRxTabs.onRemoved.subscribe(mockFn);

            subscription.unsubscribe();

            expect(removeListenerSpy).toHaveBeenCalled();
        });

        it('should pass right data', () => {
            const expected: OnRemovedEvent = {
                tabId: 42,
                removeInfo: {
                    isWindowClosing: true,
                    windowId: 42
                }
            };

            const mockFn = jest.fn();
            browserRxTabs.onRemoved.subscribe(mockFn);

            const callback = addListenerSpy.mock.calls[0][0];
            callback(expected.tabId, expected.removeInfo);

            expect(mockFn).toHaveBeenCalledWith(expected);
        });
    });
});
