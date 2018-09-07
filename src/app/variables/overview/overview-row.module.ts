import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {OverviewRowComponent} from './overview-row.component';

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
