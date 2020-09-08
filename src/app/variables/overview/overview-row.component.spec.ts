import { createSpyObj } from 'jest-createspyobj';

import { EventEmitter } from '@angular/core';
import { of, Subject } from 'rxjs';

import { VariablesService } from '../variables.service';

import { OverviewRowComponent } from './overview-row.component';

jest.useFakeTimers();

describe('OverviewRowComponent', () => {
    let component: OverviewRowComponent;
    let variablesService: jest.Mocked<VariablesService>;
    let subscription: jest.Mocked<Subject<any>>;

    beforeEach(() => {
        variablesService = createSpyObj(VariablesService, ['deleteVariable', 'updateVariable']);
        subscription = createSpyObj(Subject, ['next', 'unsubscribe']);

        component = new OverviewRowComponent(variablesService as any);
        component.variable = { name: 'variable' };
    });

    describe('ngOnDestroy', () => {
        beforeEach(() => {
            component.subscriptions = [subscription as any];
            component.ngOnDestroy();
        });

        it('unsubscribes the subscriptions', () =>
            expect(subscription.unsubscribe).toHaveBeenCalled());
    });

    describe('ngOnInit', () => {
        let updatedEmitFn;

        beforeEach(() => {
            component.variable = {key: 'my-key', value: 'my-value'};
            updatedEmitFn = jest.spyOn(component.updated, 'emit');
            variablesService.updateVariable.mockReturnValue(of({}));
            variablesService.deleteVariable.mockReturnValue(of({}));

            component.ngOnInit();
        });

        describe('delete$ on next', () => {
            beforeEach(() => {
                component.delete$.next();
            });

            it('calls deleteVariable', () =>
                expect(variablesService.deleteVariable).toHaveBeenCalledWith('my-key'));

            it('subscribes to deleteVariable and emits the updated request', () =>
                expect(updatedEmitFn).toHaveBeenCalledWith({
                    key: 'my-key',
                    type: 'deleted',
                    value: ''
                }));
        });

        describe('value$ on next', () => {
            beforeEach(() => {
                component.value$.next('2000'); // changed value
                jest.advanceTimersByTime(500); // debounce 500
            });

            it('calls updateVariable', () =>
                expect(variablesService.updateVariable).toHaveBeenCalledWith({
                    key: 'my-key',
                    payload: {
                        'my-key': 'my-value'
                    },
                    value: 'my-value',
                    variable: {
                        key: 'my-key',
                        value: 'my-value'
                    }
                }));

            it('subscribes to updateVariable and emits the updated request', () =>
                expect(updatedEmitFn).toHaveBeenCalledWith({
                    key: 'my-key',
                    type: 'update',
                    value: 'my-value'
                }));
        });
    });

    describe('updated', () => {
        it('is an eventEmitter', () =>
            expect(component.updated instanceof EventEmitter).toBe(true));
    });
});
