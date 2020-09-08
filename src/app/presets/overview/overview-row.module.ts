import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { OverviewRowComponent } from './overview-row.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
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
