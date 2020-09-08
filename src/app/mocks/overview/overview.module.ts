import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AlertModule } from '../../alert/alert.module';

import { FilterMocksPipe } from './filter.mocks.pipe';
import { OverviewRowModule } from './overview-row.module';
import { OverviewComponent } from './overview.component';

export const routes: Routes = [{ path: 'mocks', component: OverviewComponent }];

@NgModule({
    imports: [
        AlertModule,
        CommonModule,
        FormsModule,
        OverviewRowModule,
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
