import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OverviewComponent} from './overview.component';
import {RouterModule, Routes} from '@angular/router';
import {OverviewRowModule} from './overview-row.module';
import {OverviewRequestRowModule} from './overview-request-row.module';
import {OverviewResponseRowModule} from './overview-response-row.module';

export const routes: Routes = [{ path: 'recordings', component: OverviewComponent }];

@NgModule({
    imports: [
        CommonModule,
        OverviewRowModule,
        OverviewRequestRowModule,
        OverviewResponseRowModule,
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
