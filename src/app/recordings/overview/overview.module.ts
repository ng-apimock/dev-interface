import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';

import { AlertModule } from '../../alert/alert.module';
import { MatTableFilterModule } from '../../common/mat-table-filter/filter.module';
import { RecordingDetailsModule } from '../details/details.module';

import { OverviewComponent } from './overview.component';

export const routes: Routes = [{ path: 'recordings', component: OverviewComponent }];

@NgModule({
    imports: [
        AlertModule,
        CommonModule,
        MatBadgeModule,
        MatTableFilterModule,
        MatTableModule,
        RecordingDetailsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        OverviewComponent
    ],
    exports: [
        OverviewComponent
    ]
})
export class OverviewModule {
}
