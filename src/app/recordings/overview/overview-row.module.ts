import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OverviewRowComponent} from './overview-row.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        OverviewRowComponent
    ],
    exports: [
        OverviewRowComponent
    ]
})
export class OverviewRowModule {
}
