import {fromEvent, Observable} from 'rxjs';
import {OnUpdatedEvent, TabsOnUpdated} from './events/tabs-update.event';
import {OnActivatedEvent, TabsOnActivated} from './events/taps-activated.event';
import {OnRemovedEvent, TabsOnRemoved} from './events/taps-removed.event';
import {OnCreatedEvent, TabsOnCreated} from './events/taps-created.event';

export const browserRxTabs = {
    get onUpdated(): Observable<OnUpdatedEvent> {
        return fromEvent(new TabsOnUpdated(), '');
    },

    get onCreated(): Observable<OnCreatedEvent> {
        return fromEvent(new TabsOnCreated(), '');
    },

    get onActivated(): Observable<OnActivatedEvent> {
        return fromEvent(new TabsOnActivated(), '');
    },

    get onRemoved(): Observable<OnRemovedEvent> {
        return fromEvent(new TabsOnRemoved(), '');
    },
};
