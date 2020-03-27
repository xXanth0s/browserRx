import TabActiveInfo = chrome.tabs.TabActiveInfo;
import {BaseEventTarget} from '../../utils/event-target.abstract';

export type OnActivatedEvent = {
    activeInfo: TabActiveInfo
}

export class TabsOnActivated extends BaseEventTarget<OnActivatedEvent> {

    readonly event = chrome.tabs.onActivated;

    protected transform(activeInfo: TabActiveInfo): OnActivatedEvent {
        return {
            activeInfo
        }
    }
}
