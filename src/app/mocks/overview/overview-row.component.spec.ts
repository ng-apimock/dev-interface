import { createSpyObj } from 'jest-createspyobj';

import { EventEmitter } from '@angular/core';
import { of, Subject } from 'rxjs';

import { MocksService } from '../mocks.service';

import { OverviewRowComponent } from './overview-row.component';

jest.useFakeTimers();

describe('OverviewRowComponent', () => {
    let component: OverviewRowComponent;
    let mocksService: jest.Mocked<MocksService>;
    let subscription: jest.Mocked<Subject<any>>;

    beforeEach(() => {
        mocksService = createSpyObj(MocksService, ['updateMock']);
        subscription = createSpyObj(Subject, ['next', 'unsubscribe']);

        component = new OverviewRowComponent(mocksService as any);
        component.mock = {name: 'mock'};
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
            expect(subscription.unsubscribe).toHaveBeenCalled());
    });

    describe('ngOnInit', () => {
        let updatedEmitFn;

        beforeEach(() => {
            updatedEmitFn = jest.spyOn(component.updated, 'emit');
            mocksService.updateMock.mockReturnValue(of({}));

            component.ngOnInit();
        });

        describe('delay$ on next', () => {
            beforeEach(() => {
                component.delay$.next('2000'); // changed value
                jest.advanceTimersByTime(500); // debounce 500
            });

            it('calls updateMock', () =>
                expect(mocksService.updateMock).toHaveBeenCalledWith({
                    delay: 0,
                    echo: false,
                    name: 'mock',
                    scenario: 'scenario',
                    state: {
                        delay: 0,
                        echo: false,
                        scenario: 'scenario'
                    }
                }));

            it('subscribes to updateMock and emits the updated request', () =>
                expect(updatedEmitFn).toHaveBeenCalledWith({
                    name: 'mock',
                    type: 'delay',
                    value: 0
                }));
        });

        describe('echo$ on next', () => {
            beforeEach(() => {
                component.echo$.next(true); // changed value
                jest.advanceTimersByTime(500); // debounce 500
            });

            it('calls updateMock', () =>
                expect(mocksService.updateMock).toHaveBeenCalledWith({
                    delay: 0,
                    echo: true,
                    name: 'mock',
                    scenario: 'scenario',
                    state: {
                        delay: 0,
                        echo: true,
                        scenario: 'scenario'
                    }}));

            it('subscribes to updateMock and emits the updated request', () =>
                expect(updatedEmitFn).toHaveBeenCalledWith({
                    name: 'mock',
                    type: 'echo',
                    value: true
                }));
        });

        describe('scenario$ on next', () => {
            beforeEach(() => {
                component.scenario$.next();
            });

            it('calls updateMock', () =>
                expect(mocksService.updateMock).toHaveBeenCalledWith({
                    delay: 0,
                    echo: false,
                    name: 'mock',
                    scenario: 'scenario',
                    state: {
                        delay: 0,
                        echo: false,
                        scenario: 'scenario'
                    }
                }));

            it('subscribes to updateMock and emits the updated request', () =>
                expect(updatedEmitFn).toHaveBeenCalledWith({
                    name: 'mock',
                    type: 'scenario',
                    value: 'scenario'}
                ));
        });
    });

    describe('updated', () => {
        it('is an eventEmitter', () =>
            expect(component.updated instanceof EventEmitter).toBe(true));
    });
});
