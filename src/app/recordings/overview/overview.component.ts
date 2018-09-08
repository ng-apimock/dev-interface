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

    /** Enable recording. */
    enableRecording() {
        this.subscriptions.push(this.recordingsService.record(true).subscribe((data) => {
            this.data.record = true;
        }));
    }

    /** Disable recording. */
    disableRecording() {
        this.subscriptions.push(this.recordingsService.record(false).subscribe((data) => {
            this.data.record = false;
        }));
    }

    /** Gets the recordings. */
    getRecordings() {
        this.subscriptions.push(this.recordingsService.getRecordings()
            .pipe(map((data) => {
                    data.recordings = Object.keys(data.recordings)
                        .map((key) => data.recordings[key].map((recording) => {
                            const result = recording;
                            result.name = key;
                            result.response.data = JSON.parse(result.response.data) || {};
                            return result;
                        }))
                        .reduce((recordings, recording) => recordings.concat(recording), []);
                    return data;
                }
            ))
            .subscribe((data) => {
                this.data.recordings = data.recordings;
                this.data.record = data.record;
            }));
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
