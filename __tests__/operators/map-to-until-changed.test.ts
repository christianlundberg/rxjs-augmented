import { cold } from 'jest-marbles';

import { mapToUntilChanged } from '../../src/operators';

describe('mapToUntilChanged', () => {
    it('should only emit and map to if the new value is distinct', () => {
        const value = 'value';

        const result = cold('(abcdefg|)', {
            a: 1,
            b: 1,
            c: 2,
            d: 1,
            e: 5,
            f: 4,
            g: 4,
        }).pipe(mapToUntilChanged(value));

        const expected = cold('(abcde|)', {
            a: value,
            b: value,
            c: value,
            d: value,
            e: value,
        });

        expect(result).toBeObservable(expected);
    });
});
