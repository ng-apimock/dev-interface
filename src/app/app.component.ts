import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';


@Component({
    selector: 'apimock-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent]
})
export class AppComponent {
}
