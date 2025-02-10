import { Observable, fromEventPattern } from 'rxjs';
import { Events } from 'webextension-polyfill';

type ExtractEventCallback<T> = T extends Events.Event<infer C> ? C : never;
type ExtractEventArgs<T> = T extends (...args: infer P) => void ? P : never;

export function fromBrowserEvent<E extends Events.Event<(...args: unknown[]) => void>, R = ExtractEventArgs<ExtractEventCallback<E>>[0]>(
    event: E,
    resultSelector?: (...args: ExtractEventArgs<ExtractEventCallback<E>>) => R
): Observable<R> {
    return fromEventPattern<R>(
        handler => event.addListener(handler),
        handler => event.removeListener(handler),
        resultSelector
    );
}