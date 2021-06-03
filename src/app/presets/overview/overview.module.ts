import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';

import { AlertModule } from '../../alert/alert.module';
import { MatTableFilterModule } from '../../common/mat-table-filter/filter.module';
import { PresetDetailsModule } from '../details/details.module';

import { FilterPresetsPipe } from './filter.preset.pipe';
import { OverviewComponent } from './overview.component';

export const routes: Routes = [{path: 'presets', component: OverviewComponent}];

@NgModule({
    imports: [
        AlertModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        MatTableFilterModule,
        MatTableModule,
        PresetDetailsModule,
    ],
    declarations: [
        OverviewComponent,
        FilterPresetsPipe
    ],
    exports: [
        OverviewComponent
    ]
})
export class OverviewModule {
}
