import { browserRx } from 'browserrx';
import { OnActivatedEvent, OnRemovedEvent } from 'browserrx/dist/tabs/tabs-models';
import { OnUpdatedEvent } from 'browserrx/dist/tabs/tabs-models';
import { OnCreatedEvent } from 'browserrx/dist/tabs/tabs-models';

/* global console */

// Subscribe to tab events and log them
browserRx.tabs.onCreated.subscribe((event: OnCreatedEvent) => {
    console.log('Tab Created:', event);
});

browserRx.tabs.onUpdated.subscribe((event: OnUpdatedEvent) => {
    console.log('Tab Updated:', event);
});

browserRx.tabs.onActivated.subscribe((event: OnActivatedEvent) => {
    console.log('Tab Activated:', event);
});

browserRx.tabs.onRemoved.subscribe((event: OnRemovedEvent) => {
    console.log('Tab Removed:', event);
}); 