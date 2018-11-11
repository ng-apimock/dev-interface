import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OverviewComponent} from './overview.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {OverviewRowModule} from './overview-row.module';
import {OverviewMocksRowModule} from './overview-mocks-row.module';
import {OverviewVariablesRowModule} from './overview-variables-row.module';
import {FilterPresetsPipe} from './filter.preset.pipe';
import {AlertModule} from '../../alert/alert.module';

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
