import { cold } from 'jest-marbles';

import { select } from '../../src/operators';

describe('select', () => {
    it('should only emit if the mapped value is distinct (primitive)', () => {
        const result = cold('(abcdefg|)', {
            a: 1,
            b: 1,
            c: 2,
            d: 1,
            e: 5,
            f: 4,
            g: 4,
        }).pipe(select(x => x * 2));

        const expected = cold('(abcde|)', { a: 2, b: 4, c: 2, d: 10, e: 8 });

        expect(result).toBeObservable(expected);
    });

    it('should only emit if the mapped value is distinct (object)', () => {
        const result = cold('(abcdefg|)', {
            a: {
                name: 'Test',
                age: 18,
            },
            b: {
                name: 'Test',
                age: 18,
            },
            c: {
                name: 'Test',
                age: 18,
            },
            d: {
                name: 'Test',
                age: 18,
            },
            e: {
                name: 'Test',
                age: 25,
            },
            f: {
                name: 'Test',
                age: 18,
            },
            g: {
                name: 'Test',
                age: 18,
            },
        }).pipe(select((value: { name: string; age: number }) => value.age));

        const expected = cold('(abc|)', { a: 18, b: 25, c: 18 });

        expect(result).toBeObservable(expected);
    });
});
