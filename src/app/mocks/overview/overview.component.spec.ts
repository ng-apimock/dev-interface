import {assert, createStubInstance, SinonStub, SinonStubbedInstance, stub} from 'sinon';

import {MocksService} from '../mocks.service';
import {OverviewComponent} from './overview.component';

import {of, Subject, Subscription} from 'rxjs';
import {UpdateMockRequest} from '../mock-request';

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let componentGetMocksFn: SinonStub;
    let changeSubject: SinonStubbedInstance<Subject<any>>;
    let mocksService: SinonStubbedInstance<MocksService>;
    let subscription: SinonStubbedInstance<Subscription>;
    let updateRequest: SinonStubbedInstance<UpdateMockRequest>;

    beforeEach(() => {
        componentGetMocksFn = stub(OverviewComponent.prototype, 'getMocks');
        mocksService = createStubInstance(MocksService);
        subscription = createStubInstance(Subscription);
        updateRequest = createStubInstance(UpdateMockRequest);
        changeSubject = createStubInstance(Subject);
        component = new OverviewComponent(mocksService as any);
        component.change$ = changeSubject;
    });

    describe('constructor', () => {
        it('creates a new data object', () =>
            expect(component.data).toEqual({ mocks: [] }));

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
            assert.called(mocksService.getMocks));

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
            assert.calledWith(subscription.unsubscribe));

        afterEach(() => {
            subscription.unsubscribe.reset();
        });
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            component.ngOnInit();
        });

        it('gets the mocks', () =>
            assert.called(componentGetMocksFn));

        it('creates the change subject', () =>
            expect(component.change$).toBeDefined());

        afterEach(() => {
            componentGetMocksFn.reset();
        });
    });

    describe('onUpdate', () => {
        beforeEach(() => {
            component.onUpdate(updateRequest);
        });

        it('emits the change', () =>
            assert.called(changeSubject.next));

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
            assert.called(mocksService.resetMocksToDefault));

        it('subscribes to resetMocksToDefault and once resolved calls getMocks', () =>
            assert.called(mocksService.getMocks));

        it('subscribes to getMocks and sets the data object once resolved', () =>
            expect(component.data).toEqual({ mocks: ['one'] }));

        it('subscribes to getMocks and emits the change', () =>
            assert.calledWith(changeSubject.next, 'All mocks have been reset to defaults.'));

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
            assert.called(mocksService.setMocksToPassThrough));

        it('subscribes to setMocksToPassThrough and once resolved calls getMocks', () =>
            assert.called(mocksService.getMocks));

        it('subscribes to getMocks and sets the data object once resolved', () =>
            expect(component.data).toEqual({ mocks: ['one'] }));

        it('subscribes to getMocks and emits the change', () =>
            assert.calledWith(changeSubject.next, 'All mocks have been set to pass through.'));

        afterEach(() => {
            mocksService.setMocksToPassThrough.reset();
            mocksService.getMocks.reset();
        });
    });

    afterEach(() => {
        componentGetMocksFn.restore();
    });
});
