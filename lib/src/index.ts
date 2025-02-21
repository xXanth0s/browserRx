import {browserRxTabs} from './tabs/tabs';
import {browserRxBrowserAction} from './browser-action/browser-action';

export * from './tabs';
export * from './browser-action';

// Export main browserRx object
export const browserRx = {
    tabs: browserRxTabs,
    browserAction: browserRxBrowserAction
};
