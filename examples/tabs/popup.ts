import { browserRx } from 'browserrx';
import { OnCreatedEvent, OnUpdatedEvent, OnActivatedEvent, OnRemovedEvent } from 'browserrx/dist/tabs/tabs-models';
 
/* global document */

const eventList = document.getElementById('eventList');
if (!eventList) throw new Error('Event list element not found');

type TabEvent = OnCreatedEvent | OnUpdatedEvent | OnActivatedEvent | OnRemovedEvent;

function addEventToList(type: string, details: TabEvent): void {
    const eventItem = document.createElement('div');
    eventItem.className = 'event-item';
    
    const eventType = document.createElement('div');
    eventType.className = 'event-type';
    eventType.textContent = type;
    
    const eventTime = document.createElement('div');
    eventTime.className = 'event-time';
    eventTime.textContent = new Date().toLocaleTimeString();
    
    const eventDetails = document.createElement('pre');
    eventDetails.textContent = JSON.stringify(details, null, 2);
    
    eventItem.appendChild(eventType);
    eventItem.appendChild(eventTime);
    eventItem.appendChild(eventDetails);
    
    eventList?.insertBefore(eventItem, eventList.firstChild);
}

// Subscribe to tab events
browserRx.tabs.onCreated.subscribe((event: OnCreatedEvent) => {
    addEventToList('Tab Created', event);
});

browserRx.tabs.onUpdated.subscribe((event: OnUpdatedEvent) => {
    addEventToList('Tab Updated', event);
});

browserRx.tabs.onActivated.subscribe((event: OnActivatedEvent) => {
    addEventToList('Tab Activated', event);
});

browserRx.tabs.onRemoved.subscribe((event: OnRemovedEvent) => {
    addEventToList('Tab Removed', event);
}); 