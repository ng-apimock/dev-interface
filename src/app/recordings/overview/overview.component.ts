import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecordingsService} from '../recordings.service';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-recordings-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
    data: any;
    subscriptions: Subscription[];

    /**
     * Constructor.
     * @param {RecordingsService} recordingsService The recordings service.
     */
    constructor(private recordingsService: RecordingsService) {
        this.data = { recordings: [] };
        this.subscriptions = [];
    }

    /** Gets the recordings. */
    getRecordings() {
        this.recordingsService.getRecordings()
            .pipe(map((data) => Object.keys(data.recordings)
                .map((key) => data.recordings[key].map((recording) => {
                    const result = recording;
                    result.name = key;
                    result.response.data = JSON.parse(result.response.data) || {}
                    return result;
                }))
                .reduce((recordings, recording) => recordings.concat(recording), [])
            ))
            .subscribe((data) => {
                this.data.recordings = data;
            });
    }

    /** {@inheritDoc}. */
    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    /** {@inheritDoc}.*/
    ngOnInit() {
        this.getRecordings();
    }
}
