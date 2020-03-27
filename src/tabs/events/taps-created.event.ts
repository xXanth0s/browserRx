import Tab = chrome.tabs.Tab;
import {BaseEventTarget} from '../../utils/event-target.abstract';

export interface OnCreatedEvent {
    tab: Tab;
}

export class TabsOnCreated extends BaseEventTarget<OnCreatedEvent> {

    readonly event = chrome.tabs.onCreated;

    protected transform(tab: Tab): OnCreatedEvent {
        return {
            tab
        }
    }
}
