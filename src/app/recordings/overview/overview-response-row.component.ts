import {Component, Input} from '@angular/core';

@Component({
    selector: '[apimock-recording-overview-response-row]',
    templateUrl: './overview-response-row.component.html',
    styleUrls: ['./overview-response-row.component.scss']
})
export class OverviewResponseRowComponent {
    @Input() recording: any;
}
