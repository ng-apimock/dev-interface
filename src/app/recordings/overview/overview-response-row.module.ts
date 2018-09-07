import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PrettyJsonModule} from 'angular2-prettyjson';
import {OverviewResponseRowComponent} from './overview-response-row.component';

@NgModule({
    imports: [
        CommonModule,
        PrettyJsonModule
    ],
    declarations: [
        OverviewResponseRowComponent,
    ],
    exports: [
        OverviewResponseRowComponent
    ]
})
export class OverviewResponseRowModule {
}
