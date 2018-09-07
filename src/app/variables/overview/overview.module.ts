import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OverviewComponent} from './overview.component';
import {RouterModule, Routes} from '@angular/router';
import {OverviewRowModule} from './overview-row.module';
import {OverviewFooterRowModule} from './overview-footer-row.module';

export const routes: Routes = [{ path: 'variables', component: OverviewComponent }];

@NgModule({
    imports: [
        CommonModule,
        OverviewFooterRowModule,
        OverviewRowModule,
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
