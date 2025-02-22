import { Observable } from 'rxjs';
import Browser from 'webextension-polyfill';
import { fromBrowserEvent } from '../utils/from-browser-event';
import {
    OnCreatedEvent,
    OnRemovedEvent,
    OnChangedEvent,
    OnMovedEvent
} from './bookmarks-models';

export const browserRxBookmarks = {
    get onCreated(): Observable<OnCreatedEvent> {
        return fromBrowserEvent<typeof Browser.bookmarks.onCreated, OnCreatedEvent>(
            Browser.bookmarks.onCreated,
            (id: string, bookmark: Browser.Bookmarks.BookmarkTreeNode) => ({
                id,
                bookmark
            })
        );
    },

    get onRemoved(): Observable<OnRemovedEvent> {
        return fromBrowserEvent<typeof Browser.bookmarks.onRemoved, OnRemovedEvent>(
            Browser.bookmarks.onRemoved,
            (id: string, removeInfo: Browser.Bookmarks.OnRemovedRemoveInfoType) => ({
                id,
                removeInfo
            })
        );
    },

    get onChanged(): Observable<OnChangedEvent> {
        return fromBrowserEvent<typeof Browser.bookmarks.onChanged, OnChangedEvent>(
            Browser.bookmarks.onChanged,
            (id: string, changeInfo: Browser.Bookmarks.OnChangedChangeInfoType) => ({
                id,
                changeInfo
            })
        );
    },

    get onMoved(): Observable<OnMovedEvent> {
        return fromBrowserEvent<typeof Browser.bookmarks.onMoved, OnMovedEvent>(
            Browser.bookmarks.onMoved,
            (id: string, moveInfo: Browser.Bookmarks.OnMovedMoveInfoType) => ({
                id,
                moveInfo
            })
        );
    }
}; 