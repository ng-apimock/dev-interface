import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MocksModule } from './mocks/mocks.module';
import { OverviewComponent } from './mocks/overview/overview.component';
import { PresetsModule } from './presets/presets.module';
import { RecordingsModule } from './recordings/recordings.module';
import { VariablesModule } from './variables/variables.module';
export const routes: Routes = [{ path: '', component: OverviewComponent }];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    imports: [
        BrowserAnimationsModule,
        MocksModule,
        PresetsModule,
        VariablesModule,
        RecordingsModule,
        MatDialogModule,
        RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
