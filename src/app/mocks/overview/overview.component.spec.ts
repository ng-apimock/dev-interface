import * as sinon from 'sinon';

import {MocksService} from '../mocks.service';
import {OverviewComponent} from './overview.component';

import {of, Subscription} from 'rxjs';
import {UpdateMockRequest} from '../mock-request';

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let componentGetMocksFn: sinon.SinonStub;
    let mocksService: sinon.SinonStubbedInstance<MocksService>;
    let subscription: sinon.SinonStubbedInstance<Subscription>;
    let updateRequest: sinon.SinonStubbedInstance<UpdateMockRequest>;

    beforeAll(() => {
        componentGetMocksFn = sinon.stub(OverviewComponent.prototype, 'getMocks');
        jasmine.clock().install();
        mocksService = sinon.createStubInstance(MocksService);
        subscription = sinon.createStubInstance(Subscription);
        updateRequest = sinon.createStubInstance(UpdateMockRequest);
        component = new OverviewComponent(mocksService as any);
    });

    describe('constructor', () => {
        it('creates a new data object', () =>
            expect(component.data).toEqual({ mocks: [] }))

        it('creates a new subscriptions object', () =>
            expect(component.subscriptions).toEqual([]));
    });


    describe('getMocks', () => {
        beforeEach(() => {
            componentGetMocksFn.callThrough();
            mocksService.getMocks.returns(of({ mocks: ['one'] }));
            component.getMocks();
        });

        it('calls getMocks', () =>
            sinon.assert.called(mocksService.getMocks));

        it('subscribes to getMocks and sets the data object once resolved', () =>
            expect(component.data).toEqual({ mocks: ['one'] }));

        it('adds the observable to the subscription list', () =>
            expect(component.subscriptions.length).toBe(1));

        afterEach(() => {
            component.subscriptions = [];
            componentGetMocksFn.reset();
            mocksService.getMocks.reset();
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

        it('gets the mocks', () =>
            sinon.assert.called(componentGetMocksFn));

        afterEach(() => {
            componentGetMocksFn.reset();
        });
    });

    describe('onUpdate', () => {
        beforeEach(() => {
            component.onUpdate(updateRequest);
        });

        it('assigns the given request object to the change attribute', () =>
            expect(component.change).toBe(updateRequest));

        it('sets the change attribute to undefined after 1500 milliseconds', () => {
            jasmine.clock().tick(1500);
            expect(component.change).toBe(undefined);
        });

        afterEach(() => {
            mocksService.getMocks.reset();
        });
    });

    describe('resetMocksToDefaults', () => {
        beforeEach(() => {
            mocksService.getMocks.returns(of({ mocks: ['one'] }));
            mocksService.resetMocksToDefault.returns(of({}));
            component.resetMocksToDefaults();
        });

        it('call resetMocksToDefault', () =>
            sinon.assert.called(mocksService.resetMocksToDefault));

        it('subscribes to resetMocksToDefault and once resolved calls getMocks', () =>
            sinon.assert.called(mocksService.getMocks));

        it('subscribes to getMocks and sets the data object once resolved', () =>
            expect(component.data).toEqual({ mocks: ['one'] }));

        afterEach(() => {
            mocksService.resetMocksToDefault.reset();
            mocksService.getMocks.reset();
        });
    });

    describe('setMocksToPassThrough', () => {
        beforeEach(() => {
            mocksService.getMocks.returns(of({ mocks: ['one'] }));
            mocksService.setMocksToPassThrough.returns(of({}));
            component.setMocksToPassThrough();
        });

        it('call setMocksToPassThrough', () =>
            sinon.assert.called(mocksService.setMocksToPassThrough));

        it('subscribes to setMocksToPassThrough and once resolved calls getMocks', () =>
            sinon.assert.called(mocksService.getMocks));

        it('subscribes to getMocks and sets the data object once resolved', () =>
            expect(component.data).toEqual({ mocks: ['one'] }));

        afterEach(() => {
            mocksService.setMocksToPassThrough.reset();
            mocksService.getMocks.reset();
        });
    });

    afterAll(() => {
        jasmine.clock().uninstall();
        componentGetMocksFn.restore();
    });
});
