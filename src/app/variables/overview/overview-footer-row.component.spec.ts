import * as sinon from 'sinon';
import {OverviewFooterRowComponent} from './overview-footer-row.component';
import {VariablesService} from '../variables.service';
import {UpdateVariableRequest, VariableRequest} from '../variable-request';
import {of} from 'rxjs';
import {EventEmitter} from '@angular/core';

describe('OverviewFooterRowComponent', () => {
    let component: OverviewFooterRowComponent;
    let variableRequest: sinon.SinonStubbedInstance<VariableRequest>;
    let variablesService: sinon.SinonStubbedInstance<VariablesService>;
    let updatedEmitFn: sinon.SinonStub;

    beforeAll(() => {
        variableRequest = sinon.createStubInstance(VariableRequest);
        variablesService = sinon.createStubInstance(VariablesService);
        jasmine.clock().install();
        component = new OverviewFooterRowComponent(variablesService as any);
    });

    describe('constructor', () => {
        it('creates a new data object', () =>
            expect(component.variable).toEqual({ key: undefined, value: undefined }));
    });

    describe('ngOnDestroy', () => {
        let addUnsubscribeFn: sinon.SinonStub;

        beforeEach(() => {
            addUnsubscribeFn = sinon.stub(component.add$, 'unsubscribe');
            component.ngOnDestroy();
        });

        it('unsubscribes the add', () =>
            sinon.assert.called(addUnsubscribeFn));

        afterEach(() => {
            addUnsubscribeFn.reset();
        });
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            updatedEmitFn = sinon.stub(component.updated, 'emit');
            variablesService.updateVariable.returns(of({}));
            component.ngOnInit();
        });

        describe('add$ on next', () => {
            beforeEach(() => {
                component.add$.next();
            });

            it('calls updateVariable', () =>
                sinon.assert.called(variablesService.updateVariable));

            it('subscribes to updateVariable and emits the updated request', () =>
                sinon.assert.calledWith(updatedEmitFn, sinon.match((actual) =>
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

    afterAll(() => {
        jasmine.clock().uninstall();
    });
});
