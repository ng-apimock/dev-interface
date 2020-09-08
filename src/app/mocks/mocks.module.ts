import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AlertModule } from '../alert/alert.module';

import { MocksService } from './mocks.service';
import { OverviewModule } from './overview/overview.module';

@NgModule({
    imports: [
        AlertModule,
        HttpClientModule,
        OverviewModule
    ],
    providers: [
        MocksService
    ]
})
export class MocksModule {
}
