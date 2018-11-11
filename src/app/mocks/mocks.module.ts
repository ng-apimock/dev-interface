import {HttpClientModule} from '@angular/common/http';
import {MocksService} from './mocks.service';
import {NgModule} from '@angular/core';
import {OverviewModule} from './overview/overview.module';
import {AlertModule} from '../alert/alert.module';

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
