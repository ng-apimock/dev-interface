import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MockRequest, UpdateMockDelayRequest, UpdateMockEchoRequest, UpdateMockScenarioRequest} from '../mock-request';
import {MocksService} from '../mocks.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

@Component({
    selector: '[apimock-mock-overview-row]',
    templateUrl: './overview-row.component.html',
    styleUrls: ['./overview-.component.scss']
})
export class OverviewRowComponent implements OnInit, OnDestroy {
    @Input() mock: any;
    @Input() state: any;
    @Output() updated = new EventEmitter();

    scenario$ = new Subject<any>();
    delay$ = new Subject<any>();
    echo$ = new Subject<any>();

    /**
     * Constructor.
     * @param {MocksService} mockService The mocks service.
     */
    constructor(private mockService: MocksService) {
    }

    /** {@inheritDoc} */
    ngOnDestroy(): void {
        this.scenario$.unsubscribe();
        this.delay$.unsubscribe();
        this.echo$.unsubscribe();
    }

    /** {@inheritDoc} */
    ngOnInit() {
        this.delay$
            .pipe(debounceTime(500),
                distinctUntilChanged(),
                map(() => new MockRequest(this.mock.name, this.state)),
                switchMap((request: MockRequest) => this.mockService.updateMock(request))
            )
            .subscribe(() => this.updated.emit(new UpdateMockDelayRequest(this.mock.name, this.state.delay)));

        this.echo$
            .pipe(
                map(() => {
                    this.state.echo = !this.state.echo;
                    return new MockRequest(this.mock.name, this.state);
                }),
                switchMap((state: MockRequest) => this.mockService.updateMock(state))
            )
            .subscribe(() => this.updated.emit(new UpdateMockEchoRequest(this.mock.name, this.state.echo)));

        this.scenario$
            .pipe(
                map(() => new MockRequest(this.mock.name, this.state)),
                switchMap((request: MockRequest) => this.mockService.updateMock(request))
            )
            .subscribe(() => this.updated.emit(new UpdateMockScenarioRequest(this.mock.name, this.state.scenario)));
    }
}
