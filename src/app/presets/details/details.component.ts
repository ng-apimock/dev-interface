import { Preset } from '@ng-apimock/core/dist/preset/preset';

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MockState } from "@ng-apimock/core/dist/state/mock.state";


@Component({
    selector: 'apimock-presets-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    standalone: true,
    imports: [MatTableModule],
})
export class PresetDetailsComponent {

    mocksDataSource: MatTableDataSource<any>;
    mocksDisplayedColumns = ['name', 'scenario', 'delay', 'echo'];

    variablesDataSource: MatTableDataSource<any>;
    variablesDisplayedColumns = ['key', 'value'];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Preset
    ) {
        this.mocksDataSource = new MatTableDataSource([] as { [name: string]: MockState; }[]);
        this.mocksDataSource.data = Object.keys(this.data.mocks).map(key => ({
            name: key,
            ...this.data.mocks[key]
        }));

        this.variablesDataSource = new MatTableDataSource([] as { [key: string]: any }[]);
        this.variablesDataSource.data = Object.keys(this.data.variables).map(key => ({
            key: key,
            value: this.data.variables[key]
        }));
    }
}
