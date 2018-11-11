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
import {PresetsService} from '../presets.service';
import {of, Subject} from 'rxjs';
import {SelectPresetRequest} from '../select-preset-request';

describe('OverviewRowComponent', () => {
    let component: OverviewRowComponent;
    let presetsService: SinonStubbedInstance<PresetsService>;
    let updatedEmitFn: SinonStub;
    let subscription: SinonStubbedInstance<Subject<any>>;
    let clock: SinonFakeTimers;

    beforeEach(() => {
        clock = useFakeTimers();
        presetsService = createStubInstance(PresetsService);
        subscription = createStubInstance(Subject);

        component = new OverviewRowComponent(presetsService as any);
        component.preset = { name: 'preset' };
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
        beforeEach(() => {
            updatedEmitFn = stub(component.updated, 'emit');
            presetsService.selectPreset.returns(of({}));
            component.selectPreset();
        });

        it('calls selectPreset', () =>
            assert.calledWith(presetsService.selectPreset, match((actual) =>
                actual instanceof SelectPresetRequest)));

        it('subscribes to selectPreset and emits the updated request', () =>
            assert.calledWith(updatedEmitFn, match((actual) =>
                actual instanceof SelectPresetRequest)));

        afterEach(() => {
            presetsService.selectPreset.reset();
            updatedEmitFn.reset();
        });
    });
});
