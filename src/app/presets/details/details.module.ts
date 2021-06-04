import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

import { PresetDetailsComponent } from './details.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatTableModule
    ],
    declarations: [
        PresetDetailsComponent
    ],
    exports: [
        PresetDetailsComponent
    ]
})
export class PresetDetailsModule {
}
