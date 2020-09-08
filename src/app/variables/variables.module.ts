import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { OverviewModule } from './overview/overview.module';
import { VariablesService } from './variables.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        OverviewModule
    ],
    providers: [
        VariablesService
    ]
})
export class VariablesModule {
}
