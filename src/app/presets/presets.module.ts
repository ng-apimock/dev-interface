import {HttpClientModule} from '@angular/common/http';
import {PresetsService} from './presets.service';
import {NgModule} from '@angular/core';
import {OverviewModule} from './overview/overview.module';

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
