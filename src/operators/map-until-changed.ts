import { Observable, pipe, UnaryFunction } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export function mapUntilChanged<T, R>(
    fn: (state: T) => R
): UnaryFunction<Observable<T>, Observable<R>> {
    return pipe(
        distinctUntilChanged(),
        map(fn)
    );
}
