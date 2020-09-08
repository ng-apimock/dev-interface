import { createSpyObj } from 'jest-createspyobj';

import { of, Subject } from 'rxjs';

import { PresetsService } from '../presets.service';

import { OverviewRowComponent } from './overview-row.component';

describe('OverviewRowComponent', () => {
    let component: OverviewRowComponent;
    let presetsService: jest.Mocked<PresetsService>;
    let subscription: jest.Mocked<Subject<any>>;

    beforeEach(() => {
        presetsService = createSpyObj(PresetsService, ['selectPreset']);
        subscription = createSpyObj(Subject, ['next', 'unsubscribe']);

        component = new OverviewRowComponent(presetsService as any);
        component.preset = { name: 'preset' };
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
        beforeEach(() => {
            component.ngOnInit();
        });
        it('sets the show mocks details indicator to false', () =>
            expect(component.preset.showMocksDetails).toBe(false));

        it('sets the show variables details indicator to false', () =>
            expect(component.preset.showVariablesDetails).toBe(false));
    });

    describe('toggleMocksDetails', () => {
        beforeEach(() => {
            component.toggleMocksDetails();
        });

        it('toggles the indicator', () =>
            expect(component.preset.showMocksDetails).toBe(true));
    });

    describe('toggleVariablesDetails', () => {
        beforeEach(() => {
            component.toggleVariablesDetails();
        });

        it('toggles the indicator', () =>
            expect(component.preset.showVariablesDetails).toBe(true));
    });

    describe('selectPreset', () => {
        let updatedEmitFn;

        beforeEach(() => {
            updatedEmitFn = jest.spyOn(component.updated, 'emit');
            presetsService.selectPreset.mockReturnValue(of({}));

            component.selectPreset();
        });

        it('calls selectPreset', () =>
            expect(presetsService.selectPreset).toHaveBeenCalledWith({name: 'preset'}));

        it('subscribes to selectPreset and emits the updated request', () =>
            expect(updatedEmitFn).toHaveBeenCalledWith({name: 'preset'}));
    });
});
