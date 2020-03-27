// import {BaseEventTarget} from '../../utils/event-target.abstract';
import TabChangeInfo = chrome.tabs.TabChangeInfo;
import Tab = chrome.tabs.Tab;
import {BaseEventTarget} from '../../utils/event-target.abstract';

export interface OnUpdatedEvent {
    tabId: number;
    changeInfo: TabChangeInfo;
    tab: Tab;
}

export class TabsOnUpdated extends BaseEventTarget<OnUpdatedEvent> {

    readonly event = chrome.tabs.onUpdated;

    protected transform(tabId: number, changeInfo: TabChangeInfo, tab: Tab): OnUpdatedEvent {
        return {
            tabId,
            changeInfo,
            tab
        }
    }
}



