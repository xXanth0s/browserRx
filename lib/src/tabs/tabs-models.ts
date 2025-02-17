import type { Tabs } from 'webextension-polyfill';

export interface OnUpdatedEvent {
    tabId: number;
    changeInfo: Tabs.OnUpdatedChangeInfoType;
    tab: Tabs.Tab;
}

export type OnActivatedEvent = {
    activeInfo: Tabs.OnActivatedActiveInfoType
}

export interface OnCreatedEvent {
    tab: Tabs.Tab;
}

export interface OnRemovedEvent {
    tabId: number;
    removeInfo: Tabs.OnRemovedRemoveInfoType;
}
