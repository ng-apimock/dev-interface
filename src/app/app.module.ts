import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {HeaderComponent} from './header/header.component';
import {MocksModule} from './mocks/mocks.module';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VariablesModule} from './variables/variables.module';
import {RecordingsModule} from './recordings/recordings.module';
import {OverviewComponent} from './mocks/overview/overview.component';

export const routes: Routes = [{ path: '', component: OverviewComponent }];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        MocksModule,
        VariablesModule,
        RecordingsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
