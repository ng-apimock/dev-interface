import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { MocksModule } from './mocks/mocks.module';
import { PresetsModule } from './presets/presets.module';
import { RecordingsModule } from './recordings/recordings.module';
import { VariablesModule } from './variables/variables.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        HeaderModule,
        MocksModule,
        PresetsModule,
        VariablesModule,
        RecordingsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
