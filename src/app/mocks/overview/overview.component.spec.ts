import { createSpyObj } from 'jest-createspyobj';

import { of, Subject, Subscription } from 'rxjs';

import { UpdateMockRequest } from '../mock-request';
import { MocksService } from '../mocks.service';

import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let changeSubject: jest.Mocked<Subject<any>>;
    let mocksService: jest.Mocked<MocksService>;
    let request: jest.Mocked<UpdateMockRequest>;
    let subscription: jest.Mocked<Subscription>;

    beforeEach(() => {
        changeSubject = createSpyObj(Subject, ['next']);
        mocksService = createSpyObj(MocksService, ['getMocks', 'resetMocksToDefault', 'setMocksToPassThrough']);
        subscription = createSpyObj(Subscription);
        request = createSpyObj(UpdateMockRequest);

        component = new OverviewComponent(mocksService as any);
        component.change$ = changeSubject;
    });

    describe('constructor', () => {
        it('creates a new data object', () =>
            expect(component.data).toEqual({mocks: []}));

        it('creates a new subscriptions object', () =>
            expect(component.subscriptions).toEqual([]));
    });

    describe('getMocks', () => {
        beforeEach(() => {
            mocksService.getMocks.mockReturnValue(of({mocks: ['one']}));
            component.getMocks();
        });

        afterEach(() => {
            component.subscriptions = [];
        });

        it('calls getMocks', () =>
            expect(mocksService.getMocks).toHaveBeenCalled());

        it('subscribes to getMocks and sets the data object once resolved', () =>
            expect(component.data).toEqual({mocks: ['one']}));

        it('adds the observable to the subscription list', () =>
            expect(component.subscriptions.length).toBe(1));
    });

    describe('ngOnDestroy', () => {
        beforeEach(() => {
            component.subscriptions.push(subscription as any);
            component.ngOnDestroy();
        });

        it('unsubscribes the subscriptions', () =>
            expect(subscription.unsubscribe).toHaveBeenCalled());
    });

    describe('ngOnInit', () => {
        let getMocksFn;

        beforeEach(() => {
            getMocksFn = jest.spyOn(component, 'getMocks');
            getMocksFn.mockImplementation(() => []);

            component.ngOnInit();
        });

        it('gets the mocks', () =>
            expect(getMocksFn).toHaveBeenCalled());

        it('creates the change subject', () =>
            expect(component.change$).toBeDefined());
    });

    describe('onUpdate', () => {
        beforeEach(() => {
            component.onUpdate(request);
        });

        it('emits the change', () =>
            expect(component.change$.next).toHaveBeenCalled());
    });

    describe('resetMocksToDefaults', () => {
        beforeEach(() => {
            mocksService.getMocks.mockReturnValue(of({mocks: ['one']}));
            mocksService.resetMocksToDefault.mockReturnValue(of({}));

            component.resetMocksToDefaults();
        });

        it('call resetMocksToDefault', () =>
            expect(mocksService.resetMocksToDefault).toHaveBeenCalled());

        it('subscribes to resetMocksToDefault and once resolved calls getMocks', () =>
            expect(mocksService.getMocks).toHaveBeenCalled());

        it('subscribes to getMocks and sets the data object once resolved', () =>
            expect(component.data).toEqual({mocks: ['one']}));

        it('subscribes to getMocks and emits the change', () =>
            expect(changeSubject.next).toHaveBeenCalledWith('All mocks have been reset to defaults.'));
    });

    describe('setMocksToPassThrough', () => {
        beforeEach(() => {
            mocksService.getMocks.mockReturnValue(of({mocks: ['one']}));
            mocksService.setMocksToPassThrough.mockReturnValue(of({}));

            component.setMocksToPassThrough();
        });

        it('call setMocksToPassThrough', () =>
            expect(mocksService.setMocksToPassThrough).toHaveBeenCalled());

        it('subscribes to setMocksToPassThrough and once resolved calls getMocks', () =>
            expect(mocksService.getMocks).toHaveBeenCalled());

        it('subscribes to getMocks and sets the data object once resolved', () =>
            expect(component.data).toEqual({mocks: ['one']}));

        it('subscribes to getMocks and emits the change', () =>
            expect(changeSubject.next).toHaveBeenCalledWith('All mocks have been set to pass through.'));
    });
});
