import { Preset } from '@ng-apimock/core/dist/preset/preset';
import { createSpyObj } from 'jest-createspyobj';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { of, Subject, Subscription } from 'rxjs';

import { CreatePresetComponent } from '../create-preset/create-preset.component';
import { PresetDetailsComponent } from '../details/details.component';
import { PresetsService } from '../presets.service';

import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let dialog: jest.Mocked<MatDialog>;
    let changeSubject: jest.Mocked<Subject<any>>;
    let presetsService: jest.Mocked<PresetsService>;
    let subscription: jest.Mocked<Subscription>;

    beforeEach(() => {
        dialog = createSpyObj(MatDialog, ['open']);
        presetsService = createSpyObj(PresetsService, ['getPresets', 'selectPreset']);
        subscription = createSpyObj(Subscription);
        changeSubject = createSpyObj(Subject, ['next']);
        component = new OverviewComponent(dialog, presetsService);
        component.changed$ = changeSubject;
    });

    describe('constructor', () => {
        it('creates a new datasource', () =>
            expect(component.dataSource).toBeInstanceOf(MatTableDataSource));

        it('creates a new subscriptions object', () =>
            expect(component.subscriptions).toEqual([]));
    });

    describe('createPreset', () => {
        let dialogRef: jest.Mocked<MatDialogRef<CreatePresetComponent>>;

        beforeEach(() => {
            dialogRef = createSpyObj(MatDialogRef, ['afterClosed']) as any;

            dialogRef.afterClosed.mockReturnValue(of({}));
            dialog.open.mockReturnValue(dialogRef);
            presetsService.getPresets.mockReturnValue(of({ presets: [{ name: 'somepreset' } as Preset] }));

            component.createPreset();
        });

        it('opens the create dialog', () =>
            expect(dialog.open).toHaveBeenCalledWith(CreatePresetComponent));

        it('after close gets the updated presets', () => {
            dialogRef.afterClosed();

            expect(presetsService.getPresets).toHaveBeenCalled();
            expect(component.dataSource.data).toEqual([{ name: 'somepreset' } as Preset]);
        });
    });

    describe('filter', () => {
        beforeEach(() => {
            component.dataSource.data = [{ name: 'somepreset' } as Preset];
        });

        it('filters by name', () => {
            component.filter('somepreset');

            expect(component.dataSource._filterData(component.dataSource.data)).toEqual([{ name: 'somepreset' } as Preset]);
        });
    });

    describe('getPresets', () => {
        beforeEach(() => {
            presetsService.getPresets.mockReturnValue(of({ presets: [{ name: 'somepreset' } as Preset] }));
            component.getPresets();
        });

        afterEach(() => {
            component.subscriptions = [];
        });

        it('calls getPresets', () =>
            expect(presetsService.getPresets).toHaveBeenCalled());

        it('subscribes to getPresets and sets the data object once resolved', () =>
            expect(component.dataSource.data).toEqual([{ name: 'somepreset' }]));

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
    });

    describe('selectPreset', () => {
        beforeEach(() => {
            presetsService.selectPreset.mockReturnValue(of({}));
            component.selectPreset({ name: 'somepreset' } as Preset);
        });

        it('selects the preset', () =>
            expect(presetsService.selectPreset).toHaveBeenCalledWith({ name: 'somepreset' }));

        it('emits the change', () =>
            expect(component.changed$.next).toHaveBeenCalledWith('Preset \'<strong>somepreset</strong>\' has been selected'));
    });

    describe('showPresetDetails', () => {
        beforeEach(() => {
            component.showPresetDetails({ name: 'somepreset' } as Preset);
        });

        it('opens the details', () =>
            expect(dialog.open).toHaveBeenCalledWith(PresetDetailsComponent, {
                width: '80%',
                data: { name: 'somepreset' }
            }));
    });
});
