import TabRemoveInfo = chrome.tabs.TabRemoveInfo;
import {BaseEventTarget} from '../../utils/event-target.abstract';

export interface OnRemovedEvent {
    tabId: number;
    removeInfo: TabRemoveInfo;
}

export class TabsOnRemoved extends BaseEventTarget<OnRemovedEvent> {

    readonly event = chrome.tabs.onRemoved;

    protected transform(tabId: number, removeInfo: TabRemoveInfo): OnRemovedEvent {
        return {
            tabId,
            removeInfo
        }
    }
}
