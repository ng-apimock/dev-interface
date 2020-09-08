import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OverviewVariablesRowComponent } from './overview-variables-row.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        OverviewVariablesRowComponent
    ],
    exports: [
        OverviewVariablesRowComponent
    ]
})
export class OverviewVariablesRowModule {
}
