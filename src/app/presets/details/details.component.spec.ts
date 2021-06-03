import { PresetDetailsComponent } from './details.component';

describe('PresetDetailsComponent', () => {
    const now = new Date();
    let component: PresetDetailsComponent;
    let data: any;

    beforeEach(() => {
        data = {
            name: 'happy',
            mocks: {
                'get repositories': {
                    'scenario': 'dummy',
                    'echo': true,
                    'delay': 3000
                },
                'create repository': {
                    'scenario': 'unauthorized'
                }
            },
            variables: {
                'dummy-description': 'dummy description'
            }
        };
        component = new PresetDetailsComponent(data);
    });

    describe('constructor', () => {
        it('creates a new mock datasource data', () =>
            expect(component.mocksDataSource.data).toEqual([
                {name: 'get repositories', scenario: 'dummy', 'echo': true, 'delay': 3000},
                {name: 'create repository', scenario: 'unauthorized'}
            ]));

        it('creates a new variables datasource data', () =>
            expect(component.variablesDataSource.data).toEqual([
                {key: 'dummy-description', value: 'dummy description'}
            ]));
    });
});
