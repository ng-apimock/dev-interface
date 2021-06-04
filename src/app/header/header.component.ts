import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'apimock-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isCollapsed: boolean;

    /** {@inheritDoc}. */
    ngOnInit(): void {
        this.isCollapsed = true;
    }

}
