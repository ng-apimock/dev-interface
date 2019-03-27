import {Component, OnDestroy, OnInit} from '@angular/core';
import {MocksService} from '../mocks.service';
import {Subject, Subscription} from 'rxjs';
import {UpdateMockRequest} from '../mock-request';
import {flatMap} from 'rxjs/operators';

@Component({
    selector: 'apimock-mocks-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
    data: any;
    subscriptions: Subscription[];
    searchText: string;
    change$: Subject<string>;

    /**
     * Constructor.
     * @param {MocksService} mocksService The mock service.
     */
    constructor(private mocksService: MocksService) {
        this.data = { mocks: [] };
        this.subscriptions = [];
        this.searchText = '';
    }

    /** Gets the mocks. */
    getMocks() {
        this.subscriptions.push(this.mocksService.getMocks().subscribe((data) => {
            this.data = data;
        }));
    }

    /** {@inheritDoc}. */
    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    /** {@inheritDoc}.*/
    ngOnInit() {
        this.getMocks();
        this.change$ = new Subject();
    }

    /**
     * On update show the message about the action that has been performed.
     * @param {UpdateMockRequest} change The change.
     */
    onUpdate(change: UpdateMockRequest) {
        const message = `Mock '<strong>${change.name}</strong>' has changed the '<strong>${change.type}</strong>'
        to '<strong>${change.value}</strong>'`;
        this.change$.next(message);
    }

    /** Resets the mocks to defaults. */
    resetMocksToDefaults() {
        this.subscriptions.push(this.mocksService.resetMocksToDefault()
            .pipe(flatMap(() => this.mocksService.getMocks()))
            .subscribe((data) => {
                this.data = data;
                this.change$.next('All mocks have been reset to defaults.');
            }));
    }

    /** Sets the mocks to passThroughs. */
    setMocksToPassThrough() {
        this.subscriptions.push(this.mocksService.setMocksToPassThrough()
            .pipe(flatMap(() => this.mocksService.getMocks()))
            .subscribe((data) => {
                this.data = data;
                this.change$.next('All mocks have been set to pass through.');
            }));
    }
}
