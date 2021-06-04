import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { OverviewModule } from './overview/overview.module';
import { PresetsService } from './presets.service';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forChild([]),
        OverviewModule,
        MatDialogModule,
    ],
    providers: [
        PresetsService
    ],
    declarations: []
})
export class PresetsModule {
}
