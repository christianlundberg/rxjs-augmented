import { Observable, pipe, UnaryFunction } from 'rxjs';
import { distinctUntilChanged, mapTo } from 'rxjs/operators';

export function mapToUntilChanged<T, R>(
    state: R
): UnaryFunction<Observable<T>, Observable<R>> {
    return pipe(
        distinctUntilChanged(),
        mapTo(state)
    );
}
