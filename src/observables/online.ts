import { fromEvent, merge, Observable } from 'rxjs';
import { mapTo, startWith } from 'rxjs/operators';

export const online$: Observable<boolean> = merge(
    fromEvent(window, 'online').pipe(mapTo(true)),
    fromEvent(window, 'offline').pipe(mapTo(false))
).pipe(startWith(navigator && navigator.onLine ? true : false));
