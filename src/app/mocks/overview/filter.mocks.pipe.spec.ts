import {FilterMocksPipe} from './filter.mocks.pipe';

describe('FilterMocksPipe', () => {
    let pipe: FilterMocksPipe;

    describe('transform', () => {
        beforeEach(() => {
            pipe = new FilterMocksPipe();
        });

        it('gets the matching mocks', () => {
            const matches = pipe.transform([{ name: 'some' }, { name: 'thing' }], 'so');
            expect(matches).toEqual([{ name: 'some' }]);
        });

        it('returns [] when no mocks are provided', () => {
            const matches = pipe.transform(undefined, 'so');
            expect(matches).toEqual([]);
        });

        it('returns all the mocks when no search text is provided', () => {
            const matches = pipe.transform([{ name: 'some' }, { name: 'thing' }], undefined);
            expect(matches).toEqual([{ name: 'some' }, { name: 'thing' }]);
        });
    });
});
