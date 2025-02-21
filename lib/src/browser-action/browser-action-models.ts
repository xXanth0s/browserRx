import Browser from 'webextension-polyfill';

export interface OnClickedEvent {
    tab: Browser.Tabs.Tab;
}

export interface OnTitleChangedEvent {
    title: string;
}

export interface OnBadgeTextChangedEvent {
    tabId: number;
    text: string;
}

export interface OnBadgeBackgroundColorChangedEvent {
    tabId: number;
    color: [number, number, number, number];
} 