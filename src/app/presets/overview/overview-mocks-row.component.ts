import { Component, Input } from '@angular/core';

@Component({
    selector: '[apimock-preset-overview-mocks-row]',
    templateUrl: './overview-mocks-row.component.html',
    styleUrls: ['./overview-mocks-row.component.scss']
})
export class OverviewMocksRowComponent {
    @Input() preset: any;
}
