import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { OverviewFooterRowComponent } from './overview-footer-row.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        OverviewFooterRowComponent
    ],
    exports: [
        OverviewFooterRowComponent
    ]
})
export class OverviewFooterRowModule {
}
