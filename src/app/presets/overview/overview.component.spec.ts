import {assert, createStubInstance, SinonStub, SinonStubbedInstance, stub} from 'sinon';

import {PresetsService} from '../presets.service';
import {OverviewComponent} from './overview.component';

import {of, Subject, Subscription} from 'rxjs';
import {SelectPresetRequest} from '../select-preset-request';

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let componentGetPresetsFn: SinonStub;
    let changeSubject: SinonStubbedInstance<Subject<any>>;
    let presetsService: SinonStubbedInstance<PresetsService>;
    let subscription: SinonStubbedInstance<Subscription>;
    let selectPresetRequest: SinonStubbedInstance<SelectPresetRequest>;

    beforeEach(() => {
        componentGetPresetsFn = stub(OverviewComponent.prototype, 'getPresets');
        presetsService = createStubInstance(PresetsService);
        subscription = createStubInstance(Subscription);
        selectPresetRequest = createStubInstance(SelectPresetRequest);
        changeSubject = createStubInstance(Subject);
        component = new OverviewComponent(presetsService as any);
        component.change$ = changeSubject as any;
    });

    describe('constructor', () => {
        it('creates a new data object', () =>
            expect(component.data).toEqual({ mocks: [] }));

        it('creates a new subscriptions object', () =>
            expect(component.subscriptions).toEqual([]));
    });

    describe('getPresets', () => {
        beforeEach(() => {
            componentGetPresetsFn.callThrough();
            presetsService.getPresets.returns(of({ presets: ['one'] }));
            component.getPresets();
        });

        it('calls getPresets', () =>
            assert.called(presetsService.getPresets));

        it('subscribes to getPresets and sets the data object once resolved', () =>
            expect(component.data).toEqual({ presets: ['one'] }));

        it('adds the observable to the subscription list', () =>
            expect(component.subscriptions.length).toBe(1));

        afterEach(() => {
            component.subscriptions = [];
            componentGetPresetsFn.reset();
            presetsService.getPresets.reset();
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
            assert.called(componentGetPresetsFn));

        it('creates the change subject', () =>
            expect(component.change$).toBeDefined());

        afterEach(() => {
            componentGetPresetsFn.reset();
        });
    });

    describe('onUpdate', () => {
        beforeEach(() => {
            component.onUpdate(selectPresetRequest);
        });

        it('emits the change', () =>
            assert.called(changeSubject.next));

        afterEach(() => {
            presetsService.getPresets.reset();
        });
    });

    afterEach(() => {
        componentGetPresetsFn.restore();
    });
});
