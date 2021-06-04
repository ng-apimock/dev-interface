import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';

import { AlertModule } from '../../alert/alert.module';
import { MatTableFilterModule } from '../../common/mat-table-filter/filter.module';

import { FilterVariablesPipe } from './filter.variables.pipe';
import { OverviewComponent } from './overview.component';

export const routes: Routes = [{ path: 'variables', component: OverviewComponent }];

@NgModule({
    imports: [
        AlertModule,
        CommonModule,
        FormsModule,
        MatInputModule,
        MatTableModule,
        MatTableFilterModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        FilterVariablesPipe,
        OverviewComponent
    ],
    exports: [
        OverviewComponent
    ]
})
export class OverviewModule {
}
