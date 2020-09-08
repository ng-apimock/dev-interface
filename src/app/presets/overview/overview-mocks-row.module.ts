import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OverviewMocksRowComponent } from './overview-mocks-row.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        OverviewMocksRowComponent
    ],
    exports: [
        OverviewMocksRowComponent
    ]
})
export class OverviewMocksRowModule {
}
