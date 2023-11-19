import { Mock } from '@ng-apimock/core/dist/mock/mock';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { MockRequest } from '../mock-request';
import { MocksService } from '../mocks.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { NgIf, NgFor } from '@angular/common';
import { MatTableFilterComponent } from '../../common/mat-table-filter/filter.component';
import { AlertComponent } from '../../alert/alert.component';

@Component({
    selector: 'apimock-mocks-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    standalone: true,
    imports: [
        AlertComponent,
        MatTableFilterComponent,
        NgIf,
        MatTableModule,
        MatBadgeModule,
        MatSelectModule,
        FormsModule,
        NgFor,
        MatOptionModule,
        MatCheckboxModule,
    ],
})
export class OverviewComponent implements OnInit, OnDestroy {
    changed$ = new Subject<any>();
    delay$ = new Subject<any>();
    dialogRef: MatDialogRef<any>;
    echo$ = new Subject<any>();
    subscriptions: Subscription[];
    scenario$ = new Subject<any>();

    dataSource: MatTableDataSource<Mock>;
    displayedColumns = ['name', 'url', 'method', 'scenario', 'delay', 'echo'];
    displayedFooterColumns = ['actions'];
    state: any;

    constructor(private readonly mocksService: MocksService) {
        this.dataSource = new MatTableDataSource([] as Mock[]);
        this.dataSource.filterPredicate =
            (data: Mock, text: string) =>
                data.name.indexOf(text) > -1 ||
                data.request.url.indexOf(text) > -1;
        this.subscriptions = [];
    }

    filter(text: string): void {
        this.dataSource.filter = text;
    }

    onResetMocksToDefaults(): void {
        this.subscriptions.push(this.mocksService.resetMocksToDefault()
            .pipe(mergeMap(() => this.mocksService.getMocks()))
            .subscribe(data => {
                this.dataSource.data = data.mocks;
                this.state = data.state;
                this.changed$.next('All mocks have been reset to defaults.');
            })
        );
    }

    onSetMocksToPassThrough(): void {
        this.subscriptions.push(this.mocksService.setMocksToPassThrough()
            .pipe(mergeMap(() => this.mocksService.getMocks()))
            .subscribe(data => {
                this.dataSource.data = data.mocks;
                this.state = data.state;
                this.changed$.next('All mocks have been set to pass through.');
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    ngOnInit(): void {
        this.subscriptions.push(this.mocksService.getMocks()
            .subscribe(responses => {
                this.dataSource.data = responses.mocks;
                this.state = responses.state;
            })
        );
        this.changed$ = new Subject();

        this.subscriptions.push(this.delay$
            .pipe(debounceTime(500),
                map(name => new MockRequest(name, this.state[name])),
                switchMap((request: MockRequest) =>
                    this.mocksService.updateMock(request)
                        .pipe(tap(() =>
                            this.changed$.next(`Mock '<strong>${request.name}</strong>' has changed the '<strong>delay</strong>' to '<strong>${this.state[request.name].delay}</strong>'`))
                        )))
            .subscribe());

        this.subscriptions.push(this.echo$
            .pipe(
                map(name => new MockRequest(name, this.state[name])),
                switchMap((request: MockRequest) =>
                    this.mocksService.updateMock(request)
                        .pipe(tap(() =>
                            this.changed$.next(`Mock '<strong>${request.name}</strong>' has changed the '<strong>echo</strong>' to '<strong>${this.state[request.name].echo}</strong>'`))
                        )))
            .subscribe());

        this.subscriptions.push(this.scenario$
            .pipe(
                map(name => new MockRequest(name, this.state[name])),
                switchMap((request: MockRequest) =>
                    this.mocksService.updateMock(request)
                        .pipe(tap(() =>
                            this.changed$.next(`Mock '<strong>${request.name}</strong>' has changed the '<strong>scenario</strong>' to '<strong>${this.state[request.name].scenario}</strong>'`))
                        )))
            .subscribe());
    }
}
