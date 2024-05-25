import { Mock } from '@ng-apimock/core/dist/mock/mock';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';

import { RecordingDetailsComponent } from '../details/details.component';
import { RecordingsService } from '../recordings.service';
import { DatePipe } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableFilterComponent } from '../../common/mat-table-filter/filter.component';
import { AlertComponent } from '../../alert/alert.component';

@Component({
    selector: 'apimock-recordings-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    standalone: true,
    imports: [AlertComponent, MatTableFilterComponent, MatTableModule, MatBadgeModule, DatePipe]
})
export class OverviewComponent implements OnInit, OnDestroy {
    changed$ = new Subject<any>();
    record: boolean;
    searchText: string;
    subscriptions: Subscription[];

    dataSource: MatTableDataSource<any>;
    displayedColumns = ['name', 'url', 'method', 'timestamp', 'options'];
    displayedFooterColumns = ['actions'];

    /**
     * Constructor.
     * @param {RecordingsService} recordingsService The recordings service.
     */
    constructor(private readonly dialog: MatDialog,
                private readonly recordingsService: RecordingsService) {
        this.searchText = '';

        this.dataSource = new MatTableDataSource([] as any[]);
        this.dataSource.filterPredicate =
            (data: Mock, text: string) =>
                data.name.indexOf(text) > -1 ||
                data.request.url.indexOf(text) > -1;
        this.subscriptions = [];
    }

    /** Disable recording. */
    disableRecording(): void {
        this.subscriptions.push(this.recordingsService.record(false).subscribe(data => {
            this.record = false;
            this.changed$.next('Recording of request/response has been  \'<strong>disabled</strong>\'');
        }));
    }

    /** Enable recording. */
    enableRecording(): void {
        this.subscriptions.push(this.recordingsService.record(true).subscribe(data => {
            this.record = true;
            this.changed$.next('Recording of request/response has been  \'<strong>enabled</strong>\'');
        }));
    }

    filter(text: string): void {
        this.dataSource.filter = text;
    }

    /** Gets the recordings. */
    getRecordings(): void {
        this.subscriptions.push(this.recordingsService.getRecordings().subscribe(data => {
            this.dataSource.data = Object.keys(data.recordings)
                .map(key => data.recordings[key].map(recording => {
                    const result = recording;
                    result.name = key;
                    result.response.data = JSON.parse(result.response.data) || {};
                    return result;
                }))
                .reduce((recordings, recording) => recordings.concat(recording), []);
            this.record = data.record;
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

    showRecordingDetails(recording: any): void {
        this.dialog.open(RecordingDetailsComponent, {
            width: '80%',
            data: recording,
            height: '80%'
        });
    }
}
