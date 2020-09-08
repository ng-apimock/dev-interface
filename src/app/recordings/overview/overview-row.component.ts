import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: '[apimock-recording-overview-row]',
    templateUrl: './overview-row.component.html',
    styleUrls: ['./overview-row.component.scss']
})
export class OverviewRowComponent implements OnInit {
    @Input() recording: any;

    /** {@inheritDoc}. */
    ngOnInit(): void {
        this.recording.showRequestDetails = false;
        this.recording.showResponseDetails = false;
    }

    /** Toggle the request details. */
    toggleRequestDetails(): void {
        this.recording.showRequestDetails = !this.recording.showRequestDetails;
    }

    /** Toggle the response details. */
    toggleResponseDetails(): void {
        this.recording.showResponseDetails = !this.recording.showResponseDetails;
    }

}
