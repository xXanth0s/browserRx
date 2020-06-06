import { BaseEventTarget } from '../../utils/event-target.abstract';
import { browser, Tabs } from 'webextension-polyfill-ts';

export interface OnRemovedEvent {
    tabId: number;
    removeInfo: Tabs.OnRemovedRemoveInfoType;
}

export class TabsOnRemoved extends BaseEventTarget<OnRemovedEvent> {

    readonly event = browser.tabs.onRemoved;

    protected transform(tabId: number, removeInfo: Tabs.OnRemovedRemoveInfoType): OnRemovedEvent {
        return {
            tabId,
            removeInfo
        }
    }
}
