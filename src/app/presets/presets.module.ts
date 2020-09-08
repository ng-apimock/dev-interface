import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { OverviewModule } from './overview/overview.module';
import { PresetsService } from './presets.service';

@NgModule({
    imports: [
        HttpClientModule,
        OverviewModule
    ],
    providers: [
        PresetsService
    ]
})
export class PresetsModule {
}
