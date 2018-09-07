import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {UpdateVariableRequest, VariableRequest} from '../variable-request';
import {VariablesService} from '../variables.service';
import {map, switchMap} from 'rxjs/operators';

@Component({
    selector: '[apimock-variable-overview-footer-row]',
    templateUrl: './overview-footer-row.component.html',
    styleUrls: ['./overview-footer-row.component.scss']
})
export class OverviewFooterRowComponent implements OnInit, OnDestroy {
    variable: any;
    @Output() updated = new EventEmitter();

    add$ = new Subject<any>();

    /**
     * Constructor.
     * @param {VariablesService} variablesService The mocks service.
     */
    constructor(private variablesService: VariablesService) {
        this.variable = { key: undefined, value: undefined };
    }

    /** {@inheritDoc} */
    ngOnDestroy(): void {
        this.add$.unsubscribe();
    }

    /** {@inheritDoc} */
    ngOnInit() {
        this.add$
            .pipe(
                map(() => new VariableRequest(this.variable)),
                switchMap((request: VariableRequest) => this.variablesService.updateVariable(request))
            )
            .subscribe(() => {
                this.updated.emit(new UpdateVariableRequest(this.variable.key, 'set ', this.variable.value))
                this.variable = { key: undefined, value: undefined };
            });
    }
}
