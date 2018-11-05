import {Component, OnDestroy, OnInit} from '@angular/core';
import {MocksService} from '../mocks.service';
import {Subscription, timer} from 'rxjs';
import {UpdateMockRequest} from '../mock-request';
import {flatMap} from 'rxjs/operators';

@Component({
    selector: 'apimock-mocks-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
    data: any;
    change: UpdateMockRequest;
    subscriptions: Subscription[];
    searchText: string;

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
    }

    /**
     * On update show the message about the action that has been performed.
     * @param {{mock: string; type: string; value: string}} change The change.
     */
    onUpdate(change: UpdateMockRequest) {
        this.change = change;
        timer(1500).subscribe(() => {
            this.change = undefined;
        });
    }

    /** Resets the mocks to defaults. */
    resetMocksToDefaults() {
        this.subscriptions.push(this.mocksService.resetMocksToDefault()
            .pipe(flatMap(() => this.mocksService.getMocks()))
            .subscribe((data) => this.data = data));
    }

    /** Sets the mocks to passThroughs. */
    setMocksToPassThrough() {
        this.subscriptions.push(this.mocksService.setMocksToPassThrough()
            .pipe(flatMap(() => this.mocksService.getMocks()))
            .subscribe((data) => this.data = data));
    }
}
