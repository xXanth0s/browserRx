// export type eventResultFunction<T> = (evt: T) => void

import type { Events } from 'webextension-polyfill';

export abstract class BaseEventTarget<T> {

    abstract readonly event: Events.Event<any>;

    addEventListener(_type: string, listener: (evt: T) => void): void {
        this.event.addListener(this.listener(listener));
    }

    removeEventListener(_type: string, listener: (evt: T) => void): void {
        this.event.removeListener(this.listener(listener));
    }

    private listener(listener: (evt: T) => void): (...event: any[]) => void {
        return (...args: any) => {
            listener(this.transform(...args));
        }
    }

    protected abstract transform(...args: any[]): T;

}
