import { browserRx, OnActivatedEvent, OnRemovedEvent, OnUpdatedEvent, OnCreatedEvent } from 'browserrx';

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