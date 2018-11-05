import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OverviewComponent} from './overview.component';
import {OverviewRowModule} from './overview-row.module';
import {RouterModule, Routes} from '@angular/router';
import {FilterMocksPipe} from './filter.mocks.pipe';
import {FormsModule} from '@angular/forms';

export const routes: Routes = [{ path: 'mocks', component: OverviewComponent }];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverviewRowModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        OverviewComponent,
        FilterMocksPipe
    ],
    exports: [
        OverviewComponent
    ]
})
export class OverviewModule {
}
