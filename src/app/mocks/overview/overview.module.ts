import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OverviewComponent} from './overview.component';
import {OverviewRowModule} from './overview-row.module';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [{ path: 'mocks', component: OverviewComponent }];

@NgModule({
    imports: [
        CommonModule,
        OverviewRowModule,
        RouterModule.forChild(routes),
    ],
    declarations: [OverviewComponent],
    exports: [OverviewComponent]
})
export class OverviewModule {
}
