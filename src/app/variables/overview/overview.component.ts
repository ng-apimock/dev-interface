import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

import { VariableRequest } from '../variable-request';
import { VariablesService } from '../variables.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatTableFilterComponent } from '../../common/mat-table-filter/filter.component';
import { AlertComponent } from '../../alert/alert.component';

@Component({
    selector: 'apimock-variables-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    standalone: true,
    imports: [AlertComponent, MatTableFilterComponent, MatTableModule, NgIf, MatInputModule, FormsModule]
})
export class OverviewComponent implements OnInit, OnDestroy {
    data: any;
    subscriptions: Subscription[];
    changed$ = new Subject<any>();
    create$ = new Subject<any>();
    update$ = new Subject<any>();
    delete$ = new Subject<any>();

    dataSource: MatTableDataSource<{ key: string, value: string, exists: boolean }>;
    displayedColumns = ['key', 'value', 'options'];

    /**
     * Constructor.
     * @param {VariablesService} variablesService The mock service.
     */
    constructor(private readonly variablesService: VariablesService) {
        this.dataSource = new MatTableDataSource([] as { key: string, value: string, exists: boolean }[]);
        this.dataSource.filterPredicate =
            (data: { key: string, value: string }, text: string) =>
                data.key === undefined ||
                data.key.indexOf(text) > -1 ||
                data.value.indexOf(text) > -1;

        this.subscriptions = [];
    }

    filter(text: string): void {
        this.dataSource.filter = text;
    }

    onAddVariable(element: { key: string, value: string, exists: boolean }): void {
        if (this.dataSource.data.find(value => value.key === element.key).exists) {
            element.exists = true;
            this.onUpdateVariableValue(element);
        } else {
            this.create$.next(element);
        }
    }

    onUpdateVariableValue(element: { key: string, value: string, exists: boolean }): void {
        if (element.exists) {
            this.update$.next(element);
        }
    }

    /** {@inheritDoc}. */
    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    /** {@inheritDoc}.*/
    ngOnInit(): void {
        this.subscriptions.push(this.getVariables()
            .subscribe(data => this.dataSource.data = data));

        this.subscriptions.push(this.create$
            .pipe(map((variable: { key: string, value: any }) => new VariableRequest(variable)),
                switchMap((request: VariableRequest) =>
                    this.variablesService.updateVariable(request).pipe(map(() => request)))
            )
            .subscribe((request: VariableRequest) =>
                this.changed$.next(`Variable '<strong>${request.key}</strong>' has been '<strong>created</strong>' to '<strong>${request.value}</strong>'`)));

        this.subscriptions.push(this.delete$
            .pipe(map((variable: { key: string, value: any }) => new VariableRequest(variable)),
                switchMap((request: VariableRequest) =>
                    this.variablesService.deleteVariable(request.key).pipe(map(() => request)))
            )
            .subscribe((request: VariableRequest) =>
                this.changed$.next(`Variable '<strong>${request.key}</strong>' has been deleted'`)));

        this.subscriptions.push(this.update$
            .pipe(debounceTime(500),
                map((variable: { key: string, value: any }) => new VariableRequest(variable)),
                switchMap((request: VariableRequest) =>
                    this.variablesService.updateVariable(request).pipe(map(() => request)))
            )
            .subscribe((request: VariableRequest) =>
                this.changed$.next(`Variable '<strong>${request.key}</strong>' has been '<strong>updated</strong>' to '<strong>${request.value}</strong>'`)));

        this.subscriptions.push(this.changed$
            .pipe(switchMap(() => this.getVariables()))
            .subscribe(data => this.dataSource.data = data));
    }

    getVariables(): Observable<{ key: string, value: string, exists: boolean }[]> {
        return this.variablesService.getVariables()
            .pipe(map(data => Object.keys(data.state).map(key =>
                    ({ key: key, value: data.state[key], exists: true }))),
                map(data => [...data, { key: undefined, value: undefined, exists: false }])
            );
    }
}
