import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'apimock-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [MatToolbarModule, NgClass, RouterLinkActive, RouterLink]
})
export class HeaderComponent implements OnInit {
    isCollapsed: boolean;

    /** {@inheritDoc}. */
    ngOnInit(): void {
        this.isCollapsed = true;
    }

}
