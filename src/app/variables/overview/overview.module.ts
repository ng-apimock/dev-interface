import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AlertModule } from '../../alert/alert.module';

import { FilterVariablesPipe } from './filter.variables.pipe';
import { OverviewFooterRowModule } from './overview-footer-row.module';
import { OverviewRowModule } from './overview-row.module';
import { OverviewComponent } from './overview.component';

export const routes: Routes = [{ path: 'variables', component: OverviewComponent }];

@NgModule({
    imports: [
        AlertModule,
        CommonModule,
        FormsModule,
        OverviewFooterRowModule,
        OverviewRowModule,
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
