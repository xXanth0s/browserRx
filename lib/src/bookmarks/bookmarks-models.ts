import type { Bookmarks } from 'webextension-polyfill';

export interface OnCreatedEvent {
    id: string;
    bookmark: Bookmarks.BookmarkTreeNode;
}

export interface OnRemovedEvent {
    id: string;
    removeInfo: Bookmarks.OnRemovedRemoveInfoType;
}

export interface OnChangedEvent {
    id: string;
    changeInfo: Bookmarks.OnChangedChangeInfoType;
}

export interface OnMovedEvent {
    id: string;
    moveInfo: Bookmarks.OnMovedMoveInfoType;
} 