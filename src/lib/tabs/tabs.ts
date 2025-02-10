import { Observable } from 'rxjs';
import {
    OnActivatedEvent,
    OnCreatedEvent,
    OnRemovedEvent,
    OnUpdatedEvent
} from './tabs-models';
import Browser from 'webextension-polyfill';
import { fromBrowserEvent } from '../utils/from-browser-event';

export const browserRxTabs = {
    get onUpdated(): Observable<OnUpdatedEvent> {
        return fromBrowserEvent<typeof Browser.tabs.onUpdated, OnUpdatedEvent>(
            Browser.tabs.onUpdated,
            (tabId, changeInfo, tab) => ({
                tabId,
                changeInfo,
                tab
            })
        );
    },

    get onCreated(): Observable<OnCreatedEvent> {
        return fromBrowserEvent<typeof Browser.tabs.onCreated, OnCreatedEvent>(
            Browser.tabs.onCreated,
            (tab: Browser.Tabs.Tab) => ({ tab })
        );
    },

    get onActivated(): Observable<OnActivatedEvent> {
        return fromBrowserEvent<typeof Browser.tabs.onActivated, OnActivatedEvent>(
            Browser.tabs.onActivated,
            (activeInfo: Browser.Tabs.OnActivatedActiveInfoType) => ({ activeInfo })
        );
    },

    get onRemoved(): Observable<OnRemovedEvent> {
        return fromBrowserEvent<typeof Browser.tabs.onRemoved, OnRemovedEvent>(
            Browser.tabs.onRemoved,
            (tabId: number, removeInfo: Browser.Tabs.OnRemovedRemoveInfoType) => ({
                tabId,
                removeInfo
            })
        );
    },
};
