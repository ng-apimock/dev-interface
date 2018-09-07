import * as sinon from 'sinon';
import {OverviewRowComponent} from './overview-row.component';
import {MocksService} from '../mocks.service';
import {of} from 'rxjs';
import {MockRequest, UpdateMockDelayRequest, UpdateMockEchoRequest, UpdateMockScenarioRequest} from '../mock-request';
import {EventEmitter} from '@angular/core';

describe('OverviewRowComponent', () => {
    let component: OverviewRowComponent;
    let mocksService: sinon.SinonStubbedInstance<MocksService>;
    let updatedEmitFn: sinon.SinonStub;

    beforeAll(() => {
        mocksService = sinon.createStubInstance(MocksService);
        jasmine.clock().install();
    });

    beforeEach(() => {
        component = new OverviewRowComponent(mocksService as any);
        component.mock = { name: 'mock' };
        component.state = {
            scenario: 'scenario',
            delay: 0,
            echo: false
        }
    });

    describe('ngOnDestroy', () => {
        let delayUnsubscribeFn: sinon.SinonStub;
        let echoUnsubscribeFn: sinon.SinonStub;
        let scenarioUnsubscribeFn: sinon.SinonStub;

        beforeEach(() => {
            delayUnsubscribeFn = sinon.stub(component.echo$, 'unsubscribe');
            echoUnsubscribeFn = sinon.stub(component.delay$, 'unsubscribe');
            scenarioUnsubscribeFn = sinon.stub(component.scenario$, 'unsubscribe');
            component.ngOnDestroy();
        });

        it('unsubscribes the delay', () =>
            sinon.assert.called(delayUnsubscribeFn));

        it('unsubscribes the echo', () =>
            sinon.assert.called(echoUnsubscribeFn));

        it('unsubscribes the scenario', () =>
            sinon.assert.called(scenarioUnsubscribeFn));

        afterEach(() => {
            delayUnsubscribeFn.reset();
            echoUnsubscribeFn.reset();
            scenarioUnsubscribeFn.reset();
        });
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            updatedEmitFn = sinon.stub(component.updated, 'emit');
            mocksService.updateMock.returns(of({}));
            component.ngOnInit();
        });

        describe('delay$ on next', () => {
            beforeEach(() => {
                component.delay$.next('2000'); // changed value
                jasmine.clock().tick(500); // debounce 500
            });

            it('calls updateMock', () =>
                sinon.assert.calledWith(mocksService.updateMock, sinon.match((actual) =>
                    actual instanceof MockRequest)));

            it('subscribes to updateMock and emits the updated request', () =>
                sinon.assert.calledWith(updatedEmitFn, sinon.match((actual) =>
                    actual instanceof UpdateMockDelayRequest)));

            afterEach(() => {
                mocksService.updateMock.reset();
                updatedEmitFn.reset();
            });
        });

        describe('echo$ on next', () => {
            beforeEach(() => {
                component.echo$.next(true); // changed value
                jasmine.clock().tick(500); // debounce 500
            });

            it('calls updateMock', () =>
                sinon.assert.calledWith(mocksService.updateMock, sinon.match((actual) =>
                    actual instanceof MockRequest)));

            it('subscribes to updateMock and emits the updated request', () =>
                sinon.assert.calledWith(updatedEmitFn, sinon.match((actual) =>
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
                sinon.assert.calledWith(mocksService.updateMock, sinon.match((actual) =>
                    actual instanceof MockRequest)));

            it('subscribes to updateMock and emits the updated request', () =>
                sinon.assert.calledWith(updatedEmitFn, sinon.match((actual) =>
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

    afterAll(() => {
        jasmine.clock().uninstall();
    });
});
