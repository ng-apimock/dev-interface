import { Component, Input } from '@angular/core';

@Component({
    selector: '[apimock-recording-overview-request-row]',
    templateUrl: './overview-request-row.component.html',
    styleUrls: ['./overview-request-row.component.scss']
})
export class OverviewRequestRowComponent {
    @Input() recording: any;
}
