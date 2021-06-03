import { createSpyObj } from 'jest-createspyobj';

import { MatTableDataSource } from '@angular/material/table';
import { of, Subscription } from 'rxjs';

import { VariableRequest } from '../variable-request';
import { VariablesService } from '../variables.service';

import { OverviewComponent } from './overview.component';

jest.useFakeTimers();

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let variablesService: jest.Mocked<VariablesService>;
    let request: jest.Mocked<VariableRequest>;
    let subscription: jest.Mocked<Subscription>;

    beforeEach(() => {
        request = createSpyObj(VariableRequest);
        subscription = createSpyObj(Subscription);
        variablesService = createSpyObj(VariablesService, ['getVariables', 'deleteVariable', 'updateVariable']);

        component = new OverviewComponent(variablesService as any);
    });

    describe('constructor', () => {
        it('creates a new datasource', () =>
            expect(component.dataSource).toBeInstanceOf(MatTableDataSource));

        it('creates a new subscriptions object', () =>
            expect(component.subscriptions).toEqual([]));
    });

    describe('filter', () => {
        beforeEach(() => {
            component.dataSource.data = [
                {key: 'one', value: 'first', exists: true},
                {key: 'two', value: 'second', exists: true}
            ];
        });

        it('filters by key', () => {
            component.filter('one');
            expect(component.dataSource._filterData(component.dataSource.data))
                .toEqual([{key: 'one', value: 'first', exists: true}]);
        });

        it('filters by value', () => {
            component.filter('second');
            expect(component.dataSource._filterData(component.dataSource.data))
                .toEqual([{key: 'two', value: 'second', exists: true}]);
        });
    });

    describe('onAddVariable', () => {
        let create$NextFn: jest.SpyInstance;
        let update$NextFn: jest.SpyInstance;

        beforeEach(() => {
            component.dataSource.data = [
                {key: 'one', value: 'first', exists: true},
                {key: 'two', value: 'second', exists: true},
                {key: 'three', value: 'third', exists: false}
            ];

            create$NextFn = jest.spyOn(component.create$, 'next');
            update$NextFn = jest.spyOn(component.update$, 'next');
        });

        it('adds the variable', () => {
            component.onAddVariable({key: 'three', value: 'third', exists: false});

            expect(create$NextFn).toHaveBeenCalledWith({
                key: 'three', value: 'third', exists: false
            });
        });

        it('updates the variable', () => {
            component.onAddVariable({key: 'one', value: 'uno', exists: true});

            expect(update$NextFn).toHaveBeenCalledWith({
                key: 'one', value: 'uno', exists: true
            });
        });
    });

    describe('onUpdateVariableValue', () => {
        let update$NextFn: jest.SpyInstance;

        beforeEach(() => {
            update$NextFn = jest.spyOn(component.update$, 'next');
        });

        it('updates the variable', () => {
            component.onUpdateVariableValue({key: 'one', value: 'uno', exists: true});

            expect(update$NextFn).toHaveBeenCalledWith({
                key: 'one', value: 'uno', exists: true
            });
        });

        it('does not update the variable', () => {
            component.onUpdateVariableValue({key: 'three', value: 'third', exists: false});

            expect(update$NextFn).not.toHaveBeenCalled();
        });
    });

    describe('ngOnDestroy', () => {
        beforeEach(() => {
            component.subscriptions.push(subscription as any);
            component.ngOnDestroy();
        });

        it('unsubscribes the subscriptions', () =>
            expect(subscription.unsubscribe).toHaveBeenCalled());
    });

    describe('ngOnInit', () => {
        let changed$NextFn: jest.SpyInstance;
        let getVariablesFn: jest.SpyInstance;

        beforeEach(() => {
            getVariablesFn = jest.spyOn(component, 'getVariables');
            getVariablesFn.mockImplementation(() => of([
                {key: 'one', value: 'first', exists: true},
                {key: 'two', value: 'second', exists: true},
                {key: 'three', value: 'third', exists: false}
            ]));
            changed$NextFn = jest.spyOn(component.changed$, 'next');

            variablesService.deleteVariable.mockReturnValue(of({}));
            variablesService.updateVariable.mockReturnValue(of({}));

            component.ngOnInit();
        });

        it('call getVariables', () => {
            expect(getVariablesFn).toHaveBeenCalled();
            expect(component.dataSource.data).toEqual([
                {key: 'one', value: 'first', exists: true},
                {key: 'two', value: 'second', exists: true},
                {key: 'three', value: 'third', exists: false}
            ]);
        });

        it('registers create variable listener', () => {
            component.create$.next({key: 'three', value: 'third', exists: false});

            expect(variablesService.updateVariable).toHaveBeenCalledWith({
                key: 'three',
                payload: {three: 'third'},
                value: 'third',
                variable: {exists: false, key: 'three', value: 'third'}
            });
            expect(changed$NextFn).toHaveBeenCalledWith('Variable \'<strong>three</strong>\' has been \'<strong>created</strong>\' to \'<strong>third</strong>\'');
        });

        it('registers delete variable listener', () => {
            component.delete$.next({key: 'two', value: 'second', exists: true});

            expect(variablesService.deleteVariable).toHaveBeenCalledWith('two');
            expect(changed$NextFn).toHaveBeenCalledWith('Variable \'<strong>two</strong>\' has been deleted\'');
        });

        it('registers update variable listener', () => {
            component.update$.next({key: 'one', value: 'uno', exists: true});
            jest.advanceTimersByTime(500); // debounce 500

            expect(variablesService.updateVariable).toHaveBeenCalledWith({
                key: 'one',
                payload: {one: 'uno'},
                value: 'uno',
                variable: {exists: true, key: 'one', value: 'uno'}
            });
            expect(changed$NextFn).toHaveBeenCalledWith('Variable \'<strong>one</strong>\' has been \'<strong>updated</strong>\' to \'<strong>uno</strong>\'');
        });

        it('registers change listener', () => {
            component.changed$.next('something changed');

            expect(getVariablesFn).toBeCalledTimes(2);
            expect(getVariablesFn).toHaveBeenCalled();
            expect(component.dataSource.data).toEqual([
                {key: 'one', value: 'first', exists: true},
                {key: 'two', value: 'second', exists: true},
                {key: 'three', value: 'third', exists: false}
            ]);
        });
    });

    describe('getVariables', () => {
        beforeEach(() => {
            variablesService.getVariables.mockReturnValue(of({state: {one: 'first'}}));
        });

        afterEach(() => {
            component.subscriptions = [];
        });

        it('calls getVariables', () => {
            component.getVariables().subscribe();
            expect(variablesService.getVariables).toHaveBeenCalled();
        });

        it('adds the new variable', async () => {
            let variables: any;
            component.getVariables()
                .subscribe(value => variables = value);

            expect(variables).toEqual(
                [
                    {key: 'one', value: 'first', exists: true},
                    {key: undefined, value: undefined, exists: false}
                ]
            );

        });
    });

});
