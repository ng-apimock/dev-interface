import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OverviewRequestRowComponent} from './overview-request-row.component';
import {PrettyJsonModule} from 'angular2-prettyjson';

@NgModule({
    imports: [
        CommonModule,
        PrettyJsonModule
    ],
    declarations: [
        OverviewRequestRowComponent
    ],
    exports: [
        OverviewRequestRowComponent
    ]
})
export class OverviewRequestRowModule {
}
