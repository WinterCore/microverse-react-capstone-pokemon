import { extractIdFromUrl } from '../../api/index';

describe('Api Utils', () => {
    describe('extractIdFromUrl', () => {
        it('Should extract item id from a url correctly', () => {
            const url = 'https://potato.com/pokemon/3';

            expect(extractIdFromUrl('/pokemon', url)).toBe(3);
        });

        it('Should return -1 when no id could be extracted', () => {
            const url = 'https://potato.com/pokemon/test/123';

            expect(extractIdFromUrl('/pokemon', url)).toBe(-1);
        });
    });
});
