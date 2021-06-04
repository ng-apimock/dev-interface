import { Mock } from '@ng-apimock/core/dist/mock/mock';
import { createSpyObj } from 'jest-createspyobj';

import { MatTableDataSource } from '@angular/material/table';
import { of, Subject, Subscription } from 'rxjs';

import { GetMocksResponse } from '../mock-state';
import { MocksService } from '../mocks.service';

import { OverviewComponent } from './overview.component';

jest.useFakeTimers();

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let changeSubject: jest.Mocked<Subject<any>>;
    let mockResponse: GetMocksResponse;
    let mocksService: jest.Mocked<MocksService>;
    let subscription: jest.Mocked<Subscription>;

    beforeEach(() => {
        changeSubject = createSpyObj(Subject, ['next']);
        mocksService = createSpyObj(MocksService, [
            'getMocks',
            'resetMocksToDefault',
            'setMocksToPassThrough',
            'updateMock'
        ]);
        subscription = createSpyObj(Subscription);
        component = new OverviewComponent(mocksService as any);

        mockResponse = {
            state: { mock: { delay: 0, echo: false, scenario: 'some' } },
            mocks: [
                { name: 'some', request: { url: 'path/to/some-url' } } as Mock,
                { name: 'other', request: { url: 'path/to/other-url' } } as Mock
            ]
        };

        component.dataSource.data = mockResponse.mocks;
        component.state = mockResponse.state;
    });

    describe('constructor', () => {
        it('creates a new datasource', () =>
            expect(component.dataSource).toBeInstanceOf(MatTableDataSource));

        it('creates a new subscriptions object', () =>
            expect(component.subscriptions).toEqual([]));
    });

    describe('filter', () => {
        it('filters by name', () => {
            component.filter('to/some');

            expect(component.dataSource._filterData(component.dataSource.data)).toEqual([{
                name: 'some',
                request: {
                    url: 'path/to/some-url'
                }
            } as Mock]);
        });

        it('filters by url', () => {
            component.filter('s');

            expect(component.dataSource._filterData(component.dataSource.data)).toEqual([{
                name: 'some',
                request: {
                    url: 'path/to/some-url'
                }
            } as Mock]);
        });
    });

    describe('onResetMocksToDefaults', () => {
        beforeEach(() => {
            mocksService.getMocks.mockReturnValue(of(mockResponse));
            mocksService.resetMocksToDefault.mockReturnValue(of({}));

            component.dataSource.data = [];
            component.state = {};
            component.changed$ = changeSubject;

            component.onResetMocksToDefaults();
        });

        it('resets the mock to default', () =>
            expect(mocksService.resetMocksToDefault).toHaveBeenCalled());

        it('updates the datasource', () =>
            expect(component.dataSource.data).toEqual([
                { name: 'some', request: { url: 'path/to/some-url' } } as Mock,
                { name: 'other', request: { url: 'path/to/other-url' } } as Mock
            ]));

        it('updates the state', () =>
            expect(component.state).toEqual({
                mock: {
                    delay: 0,
                    echo: false,
                    scenario: 'some'
                }
            }));

        it('notifies that the mocks have been reset to defaults', () => {
            const message = 'All mocks have been reset to defaults.';
            expect(changeSubject.next).toHaveBeenCalledWith(message);
        });

        it('adds the observable to the subscription list', () =>
            expect(component.subscriptions.length).toBe(1));
    });

    describe('onSetMocksToPassThrough', () => {
        beforeEach(() => {
            mocksService.getMocks.mockReturnValue(of(mockResponse));
            mocksService.setMocksToPassThrough.mockReturnValue(of({}));

            component.dataSource.data = [];
            component.state = {};
            component.changed$ = changeSubject;

            component.onSetMocksToPassThrough();
        });

        it('sets the mocks to pass through', () =>
            expect(mocksService.setMocksToPassThrough).toHaveBeenCalled());

        it('updates the datasource', () =>
            expect(component.dataSource.data).toEqual([
                { name: 'some', request: { url: 'path/to/some-url' } } as Mock,
                { name: 'other', request: { url: 'path/to/other-url' } } as Mock
            ]));

        it('updates the state', () =>
            expect(component.state).toEqual({
                mock: {
                    delay: 0,
                    echo: false,
                    scenario: 'some'
                }
            }));

        it('notifies that the mocks have been set to pass through', () => {
            const message = 'All mocks have been set to pass through.';
            expect(changeSubject.next).toHaveBeenCalledWith(message);
        });

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
        beforeEach(() => {
            mocksService.getMocks.mockReturnValue(of(mockResponse));
            component.ngOnInit();
            component.changed$ = changeSubject;
        });

        it('gets the mocks', () =>
            expect(mocksService.getMocks).toHaveBeenCalled());

        it('subscribes to getMocks and sets the data object once resolved', () =>
            expect(component.dataSource.data).toEqual([
                { name: 'some', request: { url: 'path/to/some-url' } } as Mock,
                { name: 'other', request: { url: 'path/to/other-url' } } as Mock
            ]));

        it('adds the observable to the subscription list', () =>
            expect(component.subscriptions.length).toBe(4));

        describe('delay$ on next', () => {
            beforeEach(() => {
                mocksService.updateMock.mockReturnValue(of({}));
                component.state['mock'].delay = 2000; // changed value
                component.delay$.next('mock');
                jest.advanceTimersByTime(500); // debounce 500
            });

            it('updates the mock', () => {
                expect(mocksService.updateMock).toHaveBeenCalledWith({
                    delay: 2000,
                    echo: false,
                    name: 'mock',
                    scenario: 'some',
                    state: {
                        delay: 2000,
                        echo: false,
                        scenario: 'some'
                    }
                });
            });

            it('notifies that the mock has changed delay', () => {
                const message = 'Mock \'<strong>mock</strong>\' has changed the \'<strong>delay</strong>\' to \'<strong>2000</strong>\'';
                expect(changeSubject.next).toHaveBeenCalledWith(message);
            });
        });

        describe('echo$ on next', () => {
            beforeEach(() => {
                mocksService.updateMock.mockReturnValue(of({}));
                component.state['mock'].echo = true; // changed value
                component.echo$.next('mock');
            });

            it('updates the mock', () => {
                expect(mocksService.updateMock).toHaveBeenCalledWith({
                    delay: 0,
                    echo: true,
                    name: 'mock',
                    scenario: 'some',
                    state: {
                        delay: 0,
                        echo: true,
                        scenario: 'some'
                    }
                });
            });

            it('notifies that the mock has changed echo indicator', () => {
                const message = 'Mock \'<strong>mock</strong>\' has changed the \'<strong>echo</strong>\' to \'<strong>true</strong>\'';
                expect(changeSubject.next).toHaveBeenCalledWith(message);
            });
        });

        describe('scenario$ on next', () => {
            beforeEach(() => {
                mocksService.updateMock.mockReturnValue(of({}));
                component.state['mock'].scenario = 'other'; // changed value
                component.scenario$.next('mock');
            });

            it('updates the mock', () => {
                expect(mocksService.updateMock).toHaveBeenCalledWith({
                    delay: 0,
                    echo: false,
                    name: 'mock',
                    scenario: 'other',
                    state: {
                        delay: 0,
                        echo: false,
                        scenario: 'other'
                    }
                });
            });

            it('notifies that the mock has changed scenario', () => {
                const message = 'Mock \'<strong>mock</strong>\' has changed ' +
                    'the \'<strong>scenario</strong>\' to \'<strong>other</strong>\'';
                expect(changeSubject.next).toHaveBeenCalledWith(message);
            });
        });
    });
});
