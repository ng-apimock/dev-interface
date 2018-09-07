import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {UpdateVariableRequest, VariableRequest} from '../variable-request';
import {VariablesService} from '../variables.service';
import {map, switchMap} from 'rxjs/operators';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';

@Component({
    selector: '[apimock-variable-overview-row]',
    templateUrl: './overview-row.component.html',
    styleUrls: ['./overview-row.component.scss']
})
export class OverviewRowComponent implements OnInit, OnDestroy {
    @Input() variable: any;
    @Output() updated = new EventEmitter();

    delete$ = new Subject<any>();
    value$ = new Subject<any>();

    /**
     * Constructor.
     * @param {VariablesService} variablesService The mocks service.
     */
    constructor(private variablesService: VariablesService) {
    }

    /** {@inheritDoc} */
    ngOnDestroy(): void {
        this.delete$.unsubscribe();
        this.value$.unsubscribe();
    }

    /** {@inheritDoc} */
    ngOnInit() {
        this.delete$
            .pipe(
                map(() => new VariableRequest(this.variable)),
                switchMap((request: VariableRequest) => this.variablesService.deleteVariable(request.key))
            )
            .subscribe(() => this.updated.emit(new UpdateVariableRequest(this.variable.key, 'deleted', '')));

        this.value$
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                map(() => new VariableRequest(this.variable)),
                switchMap((request: VariableRequest) => this.variablesService.updateVariable(request))
            )
            .subscribe(() => this.updated.emit(new UpdateVariableRequest(this.variable.key, 'update', this.variable.value)));
    }
}
