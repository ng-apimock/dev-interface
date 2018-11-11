import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OverviewComponent} from './overview.component';
import {RouterModule, Routes} from '@angular/router';
import {OverviewRowModule} from './overview-row.module';
import {OverviewFooterRowModule} from './overview-footer-row.module';
import {FilterVariablesPipe} from './filter.variables.pipe';
import {FormsModule} from '@angular/forms';
import {AlertModule} from '../../alert/alert.module';

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
