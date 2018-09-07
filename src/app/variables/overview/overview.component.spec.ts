import * as sinon from 'sinon';
import {OverviewComponent} from './overview.component';
import {VariablesService} from '../variables.service';
import {of, Subscription} from 'rxjs';
import {UpdateVariableRequest} from '../variable-request';

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let componentGetVariablesFn: sinon.SinonStub;
    let variablesService: sinon.SinonStubbedInstance<VariablesService>;
    let subscription: sinon.SinonStubbedInstance<Subscription>;
    let request: UpdateVariableRequest;

    beforeAll(() => {
        componentGetVariablesFn = sinon.stub(OverviewComponent.prototype, 'getVariables');
        jasmine.clock().install();
        subscription = sinon.createStubInstance(Subscription);
        variablesService = sinon.createStubInstance(VariablesService);
        request = sinon.createStubInstance(UpdateVariableRequest);
        component = new OverviewComponent(variablesService as any);
    });

    describe('constructor', () => {
        it('creates a new data object', () =>
            expect(component.data).toEqual({ variables: [] }));

        it('creates a new subscriptions object', () =>
            expect(component.subscriptions).toEqual([]));
    });

    describe('getVariables', () => {
        beforeEach(() => {
            componentGetVariablesFn.callThrough();
            variablesService.getVariables.returns(of({ state: [{ one: 'first' }] }));
            component.getVariables();
        });

        it('calls getVariables', () =>
            sinon.assert.called(variablesService.getVariables));

        it('subscribes to getVariables and sets the data object once resolved', () =>
            expect(component.data).toEqual({
                variables: [{ key: '0', value: { one: 'first' } }]
            }));

        afterEach(() => {
            componentGetVariablesFn.reset();
            variablesService.getVariables.reset();
        });
    });

    describe('ngOnDestroy', () => {
        beforeEach(() => {
            component.subscriptions.push(subscription as any);
            component.ngOnDestroy();
        });

        it('unsubscribes the subscriptions', () =>
            sinon.assert.calledWith(subscription.unsubscribe));

        afterEach(() => {
            subscription.unsubscribe.reset();
        });
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            component.ngOnInit();
        });
        it('call getVariables', () => {
            sinon.assert.called(componentGetVariablesFn);
        });

        afterEach(() => {
            variablesService.getVariables.reset();
        });
    });

    describe('onUpdate', () => {
        beforeEach(() => {
            component.onUpdate(request);
        });

        it('assigns the given request object to the change attribute', () =>
            expect(component.change).toBe(request));

        it('sets the change attribute to undefined after 1500 milliseconds', () => {
            jasmine.clock().tick(1500);
            expect(component.change).toBe(undefined);
        });

        afterEach(() => {
            variablesService.getVariables.reset();
        });
    });

    afterAll(() => {
        jasmine.clock().uninstall();
        componentGetVariablesFn.restore();
    });
});
