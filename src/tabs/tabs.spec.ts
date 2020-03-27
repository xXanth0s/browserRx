import {browserRxTabs} from './tabs';
import * as SinonChrome from 'sinon-chrome';
import {OnUpdatedEvent} from './events/tabs-update.event';
import {OnCreatedEvent} from './events/taps-created.event';
import {OnActivatedEvent} from './events/taps-activated.event';
import {OnRemovedEvent} from './events/taps-removed.event';
import Tab = chrome.tabs.Tab;

describe('browserRxTabs', () => {

    describe('onUpdated', () => {

        it('should register on chrome.tabs.onUpdate', () => {

            const mockFn = jest.fn();

            browserRxTabs.onUpdated.subscribe(mockFn);

            SinonChrome.tabs.onUpdated.dispatch({data: 42});

            expect(mockFn).toBeCalled();

        });

        it('should unregister on chrome.tabs.onUpdate, when observable is unsubscribed', () => {
            const mockFn = jest.fn();

            const subscription = browserRxTabs.onUpdated.subscribe(mockFn);

            subscription.unsubscribe();

            SinonChrome.tabs.onUpdated.dispatch({data: 42});

            expect(mockFn).not.toBeCalled();
        });

        it('should pass right data', done => {
            const expected: OnUpdatedEvent = {
                tab: {
                    active: false,
                    id: 42
                } as Tab,
                changeInfo: {
                    discarded: true
                },
                tabId: 42
            };

            browserRxTabs.onUpdated.subscribe(data => {
                expect(data).toEqual(expected);
                done();
            });

            SinonChrome.tabs.onUpdated.dispatch(expected.tabId, expected.changeInfo, expected.tab);
        });
    });

    describe('onCreated', () => {

        it('should register on chrome.tabs.onCreated', () => {

            const mockFn = jest.fn();

            browserRxTabs.onCreated.subscribe(mockFn);

            SinonChrome.tabs.onCreated.dispatch({data: 42});

            expect(mockFn).toBeCalled();

        });

        it('should unregister on chrome.tabs.onCreated, when observable is unsubscribed', () => {
            const mockFn = jest.fn();

            const subscription = browserRxTabs.onCreated.subscribe(mockFn);

            subscription.unsubscribe();

            SinonChrome.tabs.onCreated.dispatch({data: 42});

            expect(mockFn).not.toBeCalled();
        });



        it('should pass right data', done => {
            const expected: OnCreatedEvent = {
                tab: {
                    active: false,
                    id: 42
                } as Tab,
            };

            browserRxTabs.onCreated.subscribe(data => {
                expect(data).toEqual(expected);
                done();
            });

            SinonChrome.tabs.onCreated.dispatch(expected.tab);
        });
    });

    describe('onActivated', () => {

        it('should register on chrome.tabs.onCreated', () => {

            const mockFn = jest.fn();

            browserRxTabs.onActivated.subscribe(mockFn);

            SinonChrome.tabs.onActivated.dispatch({data: 42});

            expect(mockFn).toBeCalled();

        });

        it('should unregister on chrome.tabs.onActivated, when observable is unsubscribed', () => {
            const mockFn = jest.fn();

            const subscription = browserRxTabs.onActivated.subscribe(mockFn);

            subscription.unsubscribe();

            SinonChrome.tabs.onActivated.dispatch({data: 42});

            expect(mockFn).not.toBeCalled();
        });



        it('should pass right data', done => {
            const expected: OnActivatedEvent = {
                activeInfo: {
                    tabId: 42,
                    windowId: 42
                }
            };

            browserRxTabs.onActivated.subscribe(data => {
                expect(data).toEqual(expected);
                done();
            });

            SinonChrome.tabs.onActivated.dispatch(expected.activeInfo);
        });
    });

    describe('onRemoved', () => {

        it('should register on chrome.tabs.onCreated', () => {

            const mockFn = jest.fn();

            browserRxTabs.onRemoved.subscribe(mockFn);

            SinonChrome.tabs.onRemoved.dispatch({data: 42});

            expect(mockFn).toBeCalled();

        });

        it('should unregister on chrome.tabs.onRemoved, when observable is unsubscribed', () => {
            const mockFn = jest.fn();

            const subscription = browserRxTabs.onRemoved.subscribe(mockFn);

            subscription.unsubscribe();

            SinonChrome.tabs.onRemoved.dispatch({data: 42});

            expect(mockFn).not.toBeCalled();
        });



        it('should pass right data', done => {
            const expected: OnRemovedEvent = {
                tabId: 42,
                removeInfo: {
                    isWindowClosing: true,
                    windowId: 42
                }
            };

            browserRxTabs.onRemoved.subscribe(data => {
                expect(data).toEqual(expected);
                done();
            });

            SinonChrome.tabs.onRemoved.dispatch(expected.tabId, expected.removeInfo);
        });
    });
});
