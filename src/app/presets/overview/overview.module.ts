import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AlertModule } from '../../alert/alert.module';

import { FilterPresetsPipe } from './filter.preset.pipe';
import { OverviewMocksRowModule } from './overview-mocks-row.module';
import { OverviewRowModule } from './overview-row.module';
import { OverviewVariablesRowModule } from './overview-variables-row.module';
import { OverviewComponent } from './overview.component';

export const routes: Routes = [{ path: 'presets', component: OverviewComponent }];

@NgModule({
    imports: [
        AlertModule,
        CommonModule,
        FormsModule,
        OverviewRowModule,
        OverviewMocksRowModule,
        OverviewVariablesRowModule,
        RouterModule.forChild(routes),
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
