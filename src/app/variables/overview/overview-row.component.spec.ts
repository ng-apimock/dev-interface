import * as sinon from 'sinon';
import {OverviewRowComponent} from './overview-row.component';
import {VariablesService} from '../variables.service';
import {of} from 'rxjs';
import {UpdateVariableRequest, VariableRequest} from '../variable-request';
import {EventEmitter} from '@angular/core';

describe('OverviewRowComponent', () => {
    let component: OverviewRowComponent;
    let variablesService: sinon.SinonStubbedInstance<VariablesService>;
    let updatedEmitFn: sinon.SinonStub;

    beforeAll(() => {
        variablesService = sinon.createStubInstance(VariablesService);
        jasmine.clock().install();
    });

    beforeEach(() => {
        component = new OverviewRowComponent(variablesService as any);
        component.variable = { name: 'variable' };
    });

    describe('ngOnDestroy', () => {
        let deleteUnsubscribeFn: sinon.SinonStub;
        let valueUnsubscribeFn: sinon.SinonStub;

        beforeEach(() => {
            deleteUnsubscribeFn = sinon.stub(component.delete$, 'unsubscribe');
            valueUnsubscribeFn = sinon.stub(component.value$, 'unsubscribe');
            component.ngOnDestroy();
        });

        it('unsubscribes the delete', () =>
            sinon.assert.called(deleteUnsubscribeFn));

        it('unsubscribes the value', () =>
            sinon.assert.called(valueUnsubscribeFn));

        afterEach(() => {
            deleteUnsubscribeFn.reset();
            valueUnsubscribeFn.reset();
        });
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            updatedEmitFn = sinon.stub(component.updated, 'emit');
            variablesService.updateVariable.returns(of({}));
            variablesService.deleteVariable.returns(of({}));
            component.ngOnInit();
        });

        describe('delete$ on next', () => {
            beforeEach(() => {
                component.delete$.next();
            });

            it('calls deleteVariable', () =>
                sinon.assert.called(variablesService.deleteVariable));

            it('subscribes to deleteVariable and emits the updated request', () =>
                sinon.assert.calledWith(updatedEmitFn, sinon.match((actual) =>
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
                jasmine.clock().tick(500); // debounce 500
            });

            it('calls updateVariable', () =>
                sinon.assert.calledWith(variablesService.updateVariable, sinon.match((actual) =>
                    actual instanceof VariableRequest)));

            it('subscribes to updateVariable and emits the updated request', () =>
                sinon.assert.calledWith(updatedEmitFn, sinon.match((actual) =>
                    actual instanceof UpdateVariableRequest)));

            afterEach(() => {
                updatedEmitFn.reset();
            });
        });
    });

    describe('updated', () =>
        it('is an eventEmitter', () =>
            expect(component.updated instanceof EventEmitter).toBe(true)));

    afterAll(() => {
        jasmine.clock().uninstall();
    });
});
