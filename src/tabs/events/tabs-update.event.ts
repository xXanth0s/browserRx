import { BaseEventTarget } from '../../utils/event-target.abstract';
import { browser, Tabs } from 'webextension-polyfill-ts';

export interface OnUpdatedEvent {
    tabId: number;
    changeInfo: Tabs.OnUpdatedChangeInfoType;
    tab: Tabs.Tab;
}

export class TabsOnUpdated extends BaseEventTarget<OnUpdatedEvent> {

    readonly event = browser.tabs.onUpdated;

    protected transform(tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab): OnUpdatedEvent {
        return {
            tabId,
            changeInfo,
            tab
        }
    }
}



