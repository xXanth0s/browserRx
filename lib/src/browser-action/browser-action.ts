import { Observable } from 'rxjs';
import { OnClickedEvent } from './browser-action-models';
import Browser from 'webextension-polyfill';
import { fromBrowserEvent } from '../utils/from-browser-event';

export const browserRxBrowserAction = {
    get onClicked(): Observable<OnClickedEvent> {
        return fromBrowserEvent<typeof Browser.browserAction.onClicked, OnClickedEvent>(
            Browser.browserAction.onClicked,
            (tab: Browser.Tabs.Tab) => ({ tab })
        );
    }
}; 