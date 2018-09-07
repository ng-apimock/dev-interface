import {Component, OnDestroy, OnInit} from '@angular/core';
import {VariablesService} from '../variables.service';
import {Subscription, timer} from 'rxjs';
import {UpdateVariableRequest} from '../variable-request';
import {map} from 'rxjs/operators';

@Component({
    selector: 'apimock-variables-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
    data: any;
    change: UpdateVariableRequest;
    subscriptions: Subscription[];

    /**
     * Constructor.
     * @param {MocksService} variablesService The mock service.
     */
    constructor(private variablesService: VariablesService) {
        this.data = { variables: [] };
        this.subscriptions = [];
    }

    /** Gets the variables. */
    getVariables() {
        this.subscriptions.push(this.variablesService.getVariables()
            .pipe(map((data) => Object.keys(data.state).map((key) =>
                ({ key: key, value: data.state[key] }))))
            .subscribe((data) => {
                this.data.variables = data;
            }));
    }

    /** {@inheritDoc}. */
    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    /** {@inheritDoc}.*/
    ngOnInit() {
        this.getVariables();
    }

    /**
     * On update show the message about the action that has been performed.
     * @param {UpdateVariableRequest} change The change.
     */
    onUpdate(change: UpdateVariableRequest) {
        this.change = change;
        this.getVariables();

        timer(1500).subscribe(() => {
            this.change = undefined;
        });
    }
}
