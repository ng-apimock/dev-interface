import { Preset } from '@ng-apimock/core/dist/preset/preset';
import { createSpyObj } from 'jest-createspyobj';

import { of, Subject, Subscription } from 'rxjs';

import { PresetsService } from '../presets.service';
import { SelectPresetRequest } from '../select-preset-request';

import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let changeSubject: jest.Mocked<Subject<any>>;
    let presetsService: jest.Mocked<PresetsService>;
    let subscription: jest.Mocked<Subscription>;
    let selectPresetRequest: jest.Mocked<SelectPresetRequest>;

    beforeEach(() => {
        presetsService = createSpyObj(PresetsService);
        subscription = createSpyObj(Subscription);
        selectPresetRequest = createSpyObj(SelectPresetRequest);
        changeSubject = createSpyObj(Subject, ['next']);
        component = new OverviewComponent(presetsService as any);
        component.change$ = changeSubject;
    });

    describe('constructor', () => {
        it('creates a new data object', () =>
            expect(component.data).toEqual({ mocks: [] }));

        it('creates a new subscriptions object', () =>
            expect(component.subscriptions).toEqual([]));
    });

    describe('getPresets', () => {
        beforeEach(() => {
            presetsService.getPresets.mockReturnValue(of({ presets: [{ name: 'somepreset'} as  Preset] }));
            component.getPresets();
        });

        afterEach(() => {
            component.subscriptions = [];
        });

        it('calls getPresets', () =>
            expect(presetsService.getPresets).toHaveBeenCalled());

        it('subscribes to getPresets and sets the data object once resolved', () =>
            expect(component.data).toEqual({ presets: [{name: 'somepreset'}] }));

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
        let getPresetsFn;

        beforeEach(() => {
            getPresetsFn = jest.spyOn(component, 'getPresets');
            getPresetsFn.mockImplementation(() => []);

            component.ngOnInit();
        });

        it('gets the presets', () =>
            expect(component.getPresets).toHaveBeenCalled());

        it('creates the change subject', () =>
            expect(component.change$).toBeDefined());
    });

    describe('onUpdate', () => {
        beforeEach(() => {
            component.onUpdate(selectPresetRequest);
        });

        it('emits the change', () =>
            expect(component.change$.next).toHaveBeenCalled());
    });
});
