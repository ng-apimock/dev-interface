import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { RecordingsService } from '../recordings.service';

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
    constructor(private readonly recordingsService: RecordingsService) {
        this.data = { recordings: [] };
        this.subscriptions = [];
    }

    /** Enable recording. */
    enableRecording(): void {
        this.subscriptions.push(this.recordingsService.record(true).subscribe(data => {
            this.data.record = true;
        }));
    }

    /** Disable recording. */
    disableRecording(): void {
        this.subscriptions.push(this.recordingsService.record(false).subscribe(data => {
            this.data.record = false;
        }));
    }

    /** Gets the recordings. */
    getRecordings(): void {
        this.subscriptions.push(this.recordingsService.getRecordings()
            .pipe(map(data => {
                    data.recordings = Object.keys(data.recordings)
                        .map(key => data.recordings[key].map(recording => {
                            const result = recording;
                            result.name = key;
                            result.response.data = JSON.parse(result.response.data) || {};
                            return result;
                        }))
                        .reduce((recordings, recording) => recordings.concat(recording), []);
                    return data;
                }
            ))
            .subscribe(data => {
                this.data.recordings = data.recordings.reverse();
                this.data.record = data.record;
            }));
    }

    /** {@inheritDoc}. */
    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    /** {@inheritDoc}.*/
    ngOnInit(): void {
        this.getRecordings();
    }
}
