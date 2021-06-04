import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';

import { AlertModule } from '../../alert/alert.module';
import { MatTableFilterModule } from '../../common/mat-table-filter/filter.module';
import { CreatePresetModule } from '../../presets/create-preset/create-preset.module';

import { FilterMocksPipe } from './filter.mocks.pipe';
import { OverviewComponent } from './overview.component';

export const routes: Routes = [{ path: 'mocks', component: OverviewComponent }];

@NgModule({
    imports: [
        AlertModule,
        CommonModule,
        FormsModule,
        MatBadgeModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTableModule,
        MatTableFilterModule,
        CreatePresetModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        FilterMocksPipe,
        OverviewComponent
    ],
    exports: [
        OverviewComponent
    ]
})
export class OverviewModule {
}
