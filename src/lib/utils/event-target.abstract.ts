

// export type eventResultFunction<T> = (evt: T) => void

import { Events } from 'webextension-polyfill-ts';

export abstract class BaseEventTarget<T> {

    abstract readonly event: Events.Event<any>;

    addEventListener(type: string, listener: ((evt: T) => void)): void {
        this.event.addListener(this.listener(listener));
    }


    removeEventListener(type: string, listener?: ((evt: T) => void)): void {
        this.event.removeListener(this.listener(listener));

    }

    private listener(listener: ((evt: T) => void)): (...event: any[]) => void {
        return (...args: any) => {
            listener(this.transform(...args));
        }
    }

    protected abstract transform(...args: any[]): T;

}
