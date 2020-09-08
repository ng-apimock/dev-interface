import { createSpyObj } from 'jest-createspyobj';

import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';

import { VariableRequest } from '../variable-request';
import { VariablesService } from '../variables.service';

import { OverviewFooterRowComponent } from './overview-footer-row.component';

describe('OverviewFooterRowComponent', () => {
    let component: OverviewFooterRowComponent;
    let variablesService: jest.Mocked<VariablesService>;

    beforeEach(() => {
        variablesService = createSpyObj(VariablesService);
        component = new OverviewFooterRowComponent(variablesService as any);
    });

    describe('constructor', () => {
        it('creates a new data object', () =>
            expect(component.variable).toEqual({key: undefined, value: undefined}));
    });

    describe('ngOnDestroy', () => {
        beforeEach(() => {
            spyOn(component.add$, 'unsubscribe');
            component.ngOnDestroy();
        });

        it('unsubscribes the add', () =>
            expect(component.add$.unsubscribe).toHaveBeenCalled());
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            spyOn(component.updated, 'emit');
            variablesService.updateVariable.mockReturnValue(of({}));
            component.ngOnInit();
        });

        describe('add$ on next', () => {
            beforeEach(() => {
                component.variable = {key: 'my-key', value: 'my-value'};
                component.add$.next();
            });

            it('calls updateVariable', () =>
                expect(variablesService.updateVariable).toHaveBeenCalledWith(new VariableRequest({
                    key: 'my-key',
                    value: 'my-value'
                })));

            it('subscribes to updateVariable and emits the updated request', () => {
                expect(component.updated.emit).toHaveBeenCalledWith({
                        key: 'my-key',
                        type: 'set ',
                        value: 'my-value'
                    }
                );
            });
        });
    });

    describe('updated', () => {
        it('is an eventEmitter', () =>
            expect(component.updated instanceof EventEmitter).toBe(true));
    });
});
