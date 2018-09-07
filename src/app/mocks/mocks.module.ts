import {HttpClientModule} from '@angular/common/http';
import {MocksService} from './mocks.service';
import {NgModule} from '@angular/core';
import {OverviewModule} from './overview/overview.module';

@NgModule({
    imports: [
        HttpClientModule,
        OverviewModule
    ],
    providers: [
        MocksService
    ]
})
export class MocksModule {
}
