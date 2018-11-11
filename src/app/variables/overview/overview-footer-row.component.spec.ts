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
import {OverviewFooterRowComponent} from './overview-footer-row.component';
import {VariablesService} from '../variables.service';
import {UpdateVariableRequest, VariableRequest} from '../variable-request';
import {of} from 'rxjs';
import {EventEmitter} from '@angular/core';

describe('OverviewFooterRowComponent', () => {
    let component: OverviewFooterRowComponent;
    let variableRequest: SinonStubbedInstance<VariableRequest>;
    let variablesService: SinonStubbedInstance<VariablesService>;
    let updatedEmitFn: SinonStub;
    let clock: SinonFakeTimers;

    beforeEach(() => {
        variableRequest = createStubInstance(VariableRequest);
        variablesService = createStubInstance(VariablesService);
        clock = useFakeTimers();
        component = new OverviewFooterRowComponent(variablesService as any);
    });

    describe('constructor', () => {
        it('creates a new data object', () =>
            expect(component.variable).toEqual({ key: undefined, value: undefined }));
    });

    describe('ngOnDestroy', () => {
        let addUnsubscribeFn: SinonStub;

        beforeEach(() => {
            addUnsubscribeFn = stub(component.add$, 'unsubscribe');
            component.ngOnDestroy();
        });

        it('unsubscribes the add', () =>
            assert.called(addUnsubscribeFn));

        afterEach(() => {
            addUnsubscribeFn.reset();
        });
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            updatedEmitFn = stub(component.updated, 'emit');
            variablesService.updateVariable.returns(of({}));
            component.ngOnInit();
        });

        describe('add$ on next', () => {
            beforeEach(() => {
                component.add$.next();
            });

            it('calls updateVariable', () =>
                assert.called(variablesService.updateVariable));

            it('subscribes to updateVariable and emits the updated request', () =>
                assert.calledWith(updatedEmitFn, match((actual) =>
                    actual instanceof UpdateVariableRequest)));

            afterEach(() => {
                updatedEmitFn.reset();
                variablesService.updateVariable.reset();
            });
        });

        afterEach(() => {
            updatedEmitFn.restore();
        });
    });

    describe('updated', () =>
        it('is an eventEmitter', () =>
            expect(component.updated instanceof EventEmitter).toBe(true)));
});
