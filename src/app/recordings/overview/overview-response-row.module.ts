import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OverviewResponseRowComponent } from './overview-response-row.component';

import { PrettyJsonModule } from 'angular2-prettyjson';

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
