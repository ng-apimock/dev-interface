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
import {MocksService} from '../mocks.service';
import {of, Subject} from 'rxjs';
import {MockRequest, UpdateMockDelayRequest, UpdateMockEchoRequest, UpdateMockScenarioRequest} from '../mock-request';
import {EventEmitter} from '@angular/core';

describe('OverviewRowComponent', () => {
    let component: OverviewRowComponent;
    let mocksService: SinonStubbedInstance<MocksService>;
    let updatedEmitFn: SinonStub;
    let subscription: SinonStubbedInstance<Subject<any>>;
    let clock: SinonFakeTimers;

    beforeEach(() => {
        clock = useFakeTimers();
        mocksService = createStubInstance(MocksService);
        subscription = createStubInstance(Subject);

        component = new OverviewRowComponent(mocksService as any);
        component.mock = { name: 'mock' };
        component.state = {
            scenario: 'scenario',
            delay: 0,
            echo: false
        };
    });

    describe('ngOnDestroy', () => {
        beforeEach(() => {
            component.subscriptions = [subscription as any];
            component.ngOnDestroy();
        });

        it('unsubscribes the subscriptions', () =>
            assert.called(subscription.unsubscribe));

        afterEach(() => {
            subscription.unsubscribe.reset();
        });
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            updatedEmitFn = stub(component.updated, 'emit');
            mocksService.updateMock.returns(of({}));
            component.ngOnInit();
        });

        describe('delay$ on next', () => {
            beforeEach(() => {
                component.delay$.next('2000'); // changed value
                clock.tick(500); // debounce 500
            });

            it('calls updateMock', () =>
                assert.calledWith(mocksService.updateMock, match((actual) =>
                    actual instanceof MockRequest)));

            it('subscribes to updateMock and emits the updated request', () =>
                assert.calledWith(updatedEmitFn, match((actual) =>
                    actual instanceof UpdateMockDelayRequest)));

            afterEach(() => {
                mocksService.updateMock.reset();
                updatedEmitFn.reset();
            });
        });

        describe('echo$ on next', () => {
            beforeEach(() => {
                component.echo$.next(true); // changed value
                clock.tick(500); // debounce 500
            });

            it('calls updateMock', () =>
                assert.calledWith(mocksService.updateMock, match((actual) =>
                    actual instanceof MockRequest)));

            it('subscribes to updateMock and emits the updated request', () =>
                assert.calledWith(updatedEmitFn, match((actual) =>
                    actual instanceof UpdateMockEchoRequest)));

            afterEach(() => {
                mocksService.updateMock.reset();
                updatedEmitFn.reset();
            });
        });

        describe('scenario$ on next', () => {
            beforeEach(() => {
                component.scenario$.next();
            });

            it('calls updateMock', () =>
                assert.calledWith(mocksService.updateMock, match((actual) =>
                    actual instanceof MockRequest)));

            it('subscribes to updateMock and emits the updated request', () =>
                assert.calledWith(updatedEmitFn, match((actual) =>
                    actual instanceof UpdateMockScenarioRequest)));

            afterEach(() => {
                mocksService.updateMock.reset();
                updatedEmitFn.reset();
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
