import { BaseEventTarget } from '../../utils/event-target.abstract';
import { browser, Tabs } from 'webextension-polyfill-ts';

export type OnActivatedEvent = {
    activeInfo: Tabs.OnActivatedActiveInfoType
}

export class TabsOnActivated extends BaseEventTarget<OnActivatedEvent> {

    readonly event = browser.tabs.onActivated;

    protected transform(activeInfo: Tabs.OnActivatedActiveInfoType): OnActivatedEvent {
        return {
            activeInfo
        }
    }
}
