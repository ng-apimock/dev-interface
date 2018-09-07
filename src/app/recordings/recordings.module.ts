import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OverviewModule} from './overview/overview.module';
import {RecordingsService} from './recordings.service';

@NgModule({
    imports: [
        CommonModule,
        OverviewModule
    ],
    providers: [
        RecordingsService
    ]
})
export class RecordingsModule {
}
