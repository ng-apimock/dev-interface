import { FilterPresetsPipe } from './filter.preset.pipe';

describe('FilterPresetsPipe', () => {
    let pipe: FilterPresetsPipe;

    describe('transform', () => {
        beforeEach(() => {
            pipe = new FilterPresetsPipe();
        });

        it('gets the matching presets', () => {
            const matches = pipe.transform([{ name: 'some' }, { name: 'thing' }], 'so');
            expect(matches).toEqual([{ name: 'some' }]);
        });

        it('returns [] when no presets are provided', () => {
            const matches = pipe.transform(undefined, 'so');
            expect(matches).toEqual([]);
        });

        it('returns all the presets when no search text is provided', () => {
            const matches = pipe.transform([{ name: 'some' }, { name: 'thing' }], undefined);
            expect(matches).toEqual([{ name: 'some' }, { name: 'thing' }]);
        });
    });
});
