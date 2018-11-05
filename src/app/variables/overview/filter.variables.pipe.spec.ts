import {FilterVariablesPipe} from './filter.variables.pipe';

describe('FilterVariablesPipe', () => {
    let pipe: FilterVariablesPipe;

    describe('transform', () => {
        beforeEach(() => {
            pipe = new FilterVariablesPipe();
        });

        it('gets the matching variables', () => {
            const matches = pipe.transform([{ key: 'some' }, { key: 'thing' }], 'so');
            expect(matches).toEqual([{ key: 'some' }]);
        });

        it('returns [] when no variables are provided', () => {
            const matches = pipe.transform(undefined, 'so');
            expect(matches).toEqual([]);
        });

        it('returns all the variables when no search text is provided', () => {
            const matches = pipe.transform([{ key: 'some' }, { key: 'thing' }], undefined);
            expect(matches).toEqual([{ key: 'some' }, { key: 'thing' }]);
        });
    });
});
