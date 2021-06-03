import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './mocks/overview/overview.component';

export const routes: Routes = [
    {path: '', component: OverviewComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true, relativeLinkResolution: 'legacy'})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
