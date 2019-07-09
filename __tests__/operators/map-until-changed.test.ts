import { cold } from 'jest-marbles';

import { mapUntilChanged } from '../../src/operators';

describe('mapUntilChanged', () => {
    it('should only emit and map if the new value is distinct', () => {
        const result = cold('(abcdefg|)', {
            a: 1,
            b: 1,
            c: 2,
            d: 1,
            e: 5,
            f: 4,
            g: 4,
        }).pipe(mapUntilChanged(x => x * 2));

        const expected = cold('(abcde|)', { a: 2, b: 4, c: 2, d: 10, e: 8 });

        expect(result).toBeObservable(expected);
    });
});
