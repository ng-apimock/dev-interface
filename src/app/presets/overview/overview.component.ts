import { Preset } from '@ng-apimock/core/dist/preset/preset';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CreatePresetComponent } from '../create-preset/create-preset.component';
import { PresetDetailsComponent } from '../details/details.component';
import { PresetsService } from '../presets.service';

@Component({
    selector: 'apimock-presets-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[];
    searchText: string;
    changed$ = new Subject();
    dialogRef: MatDialogRef<any>;

    dataSource: MatTableDataSource<Preset>;
    displayedColumns = ['name', 'options'];
    displayedFooterColumns = ['actions'];

    /**
     * Constructor.
     * @param {MatDialog} dialog The dialog.
     * @param {PresetsService} presetsService The presets service.
     */
    constructor(private readonly dialog: MatDialog,
                private readonly presetsService: PresetsService) {
        this.searchText = '';

        this.dataSource = new MatTableDataSource([] as Preset[]);
        this.dataSource.filterPredicate =
            (data: Preset, text: string) => data.name.indexOf(text) > -1;
        this.subscriptions = [];
    }

    createPreset(): void {
        this.dialogRef = this.dialog.open(CreatePresetComponent);
        this.dialogRef.afterClosed()
            .pipe(
                switchMap(() => this.presetsService.getPresets())
            )
            .subscribe(data => this.dataSource.data = data.presets);
    }

    filter(text: string): void {
        this.dataSource.filter = text;
    }

    /** Gets the presets. */
    getPresets(): void {
        this.subscriptions.push(this.presetsService.getPresets().subscribe(data => {
            this.dataSource.data = data.presets;
        }));
    }

    /** {@inheritDoc}. */
    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    /** {@inheritDoc}.*/
    ngOnInit(): void {
        this.getPresets();
    }

    selectPreset(preset: Preset): void {
        this.subscriptions.push(this.presetsService.selectPreset({name: preset.name})
            .subscribe(() => {
                const message = `Preset '<strong>${preset.name}</strong>' has been selected`;
                this.changed$.next(message);
            }));

    }

    showPresetDetails(preset: Preset): void {
        this.dialogRef = this.dialog.open(PresetDetailsComponent, {
            width: '80%',
            data: preset
        });
    }
}
