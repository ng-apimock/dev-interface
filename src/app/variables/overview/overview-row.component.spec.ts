import {
    assert,
    createStubInstance,
    match,
    SinonFakeTimers,
    SinonStub,
    SinonStubbedInstance,
    stub,
    useFakeTimers
} from 'sinon';
import {OverviewRowComponent} from './overview-row.component';
import {VariablesService} from '../variables.service';
import {of} from 'rxjs';
import {UpdateVariableRequest, VariableRequest} from '../variable-request';
import {EventEmitter} from '@angular/core';

describe('OverviewRowComponent', () => {
    let component: OverviewRowComponent;
    let variablesService: SinonStubbedInstance<VariablesService>;
    let updatedEmitFn: SinonStub;
    let clock: SinonFakeTimers;

    beforeEach(() => {
        variablesService = createStubInstance(VariablesService);
        clock = useFakeTimers();
        component = new OverviewRowComponent(variablesService as any);
        component.variable = { name: 'variable' };
    });

    describe('ngOnDestroy', () => {
        let deleteUnsubscribeFn: SinonStub;
        let valueUnsubscribeFn: SinonStub;

        beforeEach(() => {
            deleteUnsubscribeFn = stub(component.delete$, 'unsubscribe');
            valueUnsubscribeFn = stub(component.value$, 'unsubscribe');
            component.ngOnDestroy();
        });

        it('unsubscribes the delete', () =>
            assert.called(deleteUnsubscribeFn));

        it('unsubscribes the value', () =>
            assert.called(valueUnsubscribeFn));

        afterEach(() => {
            deleteUnsubscribeFn.reset();
            valueUnsubscribeFn.reset();
        });
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            updatedEmitFn = stub(component.updated, 'emit');
            variablesService.updateVariable.returns(of({}));
            variablesService.deleteVariable.returns(of({}));
            component.ngOnInit();
        });

        describe('delete$ on next', () => {
            beforeEach(() => {
                component.delete$.next();
            });

            it('calls deleteVariable', () =>
                assert.called(variablesService.deleteVariable));

            it('subscribes to deleteVariable and emits the updated request', () =>
                assert.calledWith(updatedEmitFn, match((actual) =>
                    actual instanceof UpdateVariableRequest)));

            afterEach(() => {
                updatedEmitFn.reset();
                variablesService.deleteVariable.reset();
                variablesService.updateVariable.reset();
            });
        });

        describe('value$ on next', () => {
            beforeEach(() => {
                component.value$.next('2000'); // changed value
                clock.tick(500); // debounce 500
            });

            it('calls updateVariable', () =>
                assert.calledWith(variablesService.updateVariable, match((actual) =>
                    actual instanceof VariableRequest)));

            it('subscribes to updateVariable and emits the updated request', () =>
                assert.calledWith(updatedEmitFn, match((actual) =>
                    actual instanceof UpdateVariableRequest)));

            afterEach(() => {
                updatedEmitFn.reset();
            });
        });
    });

    describe('updated', () =>
        it('is an eventEmitter', () =>
            expect(component.updated instanceof EventEmitter).toBe(true)));

});
