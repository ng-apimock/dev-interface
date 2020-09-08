import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { UpdateVariableRequest } from '../variable-request';
import { VariablesService } from '../variables.service';

@Component({
    selector: 'apimock-variables-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
    data: any;
    subscriptions: Subscription[];
    searchText: string;
    change$: Subject<any>;

    /**
     * Constructor.
     * @param {VariablesService} variablesService The mock service.
     */
    constructor(private readonly variablesService: VariablesService) {
        this.data = { variables: [] };
        this.subscriptions = [];
        this.searchText = '';
    }

    /** Gets the variables. */
    getVariables(): void {
        this.subscriptions.push(this.variablesService.getVariables()
            .pipe(map(data => Object.keys(data.state).map(key =>
                ({ key: key, value: data.state[key] }))))
            .subscribe(data => {
                this.data.variables = data;
            }));
    }

    /** {@inheritDoc}. */
    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    /** {@inheritDoc}.*/
    ngOnInit(): void {
        this.getVariables();
        this.change$ = new Subject();
    }

    /**
     * On update show the message about the action that has been performed.
     * @param {UpdateVariableRequest} change The change.
     */
    onUpdate(change: UpdateVariableRequest): void {
        const message = ` Variable '<strong>${change.key}</strong>' has been '<strong>${change.type}</strong>'
            ${change.value ? ` to <strong>${change.value}</strong>` : ''}`;
        this.change$.next(message);
        this.getVariables();
    }
}
