import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { JsonPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'apimock-recording-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    standalone: true,
    imports: [
        MatTableModule,
        JsonPipe,
        DatePipe,
    ],
})
export class RecordingDetailsComponent {

    requestDataSource: MatTableDataSource<{ [name: string]: any; }>;
    requestDisplayedColumns = ['key', 'value'];

    responseDataSource: MatTableDataSource<{ [name: string]: any; }>;
    responseDisplayedColumns = ['key', 'value'];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.requestDataSource = new MatTableDataSource([] as { [name: string]: any; }[]);
        this.requestDataSource.data = [
            { key: 'Url', value: data.request.url },
            { key: 'Method', value: data.request.method },
            { key: 'Headers', value: data.request.headers },
            { key: 'Body', value: data.request.payload }
        ];

        this.responseDataSource = new MatTableDataSource([] as { [name: string]: any; }[]);
        this.responseDataSource.data = [
            { key: 'Status', value: data.response.status },
            { key: 'Headers', value: data.response.headers },
            { key: 'Data', value: data.response.data }
        ];
    }
}
