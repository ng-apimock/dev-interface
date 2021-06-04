import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatTableFilterComponent } from './filter.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [MatTableFilterComponent],
    exports: [MatTableFilterComponent]
})
export class MatTableFilterModule {
}
