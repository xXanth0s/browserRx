import { BaseEventTarget } from '../../utils/event-target.abstract';
import { browser, Tabs } from 'webextension-polyfill-ts';

export interface OnCreatedEvent {
    tab: Tabs.Tab;
}

export class TabsOnCreated extends BaseEventTarget<OnCreatedEvent> {

    readonly event = browser.tabs.onCreated;

    protected transform(tab: Tabs.Tab): OnCreatedEvent {
        return {
            tab
        }
    }
}
