import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, timer } from 'rxjs';

import { PresetsService } from '../presets.service';
import { SelectPresetRequest } from '../select-preset-request';

@Component({
    selector: 'apimock-presets-overview',
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
     * @param {PresetsService} presetsService The presets service.
     */
    constructor(private readonly presetsService: PresetsService) {
        this.data = { mocks: [] };
        this.subscriptions = [];
        this.searchText = '';
    }

    /** Gets the presets. */
    getPresets(): void {
        this.subscriptions.push(this.presetsService.getPresets().subscribe(data => {
            this.data = data;
        }));
    }

    /** {@inheritDoc}. */
    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    /** {@inheritDoc}.*/
    ngOnInit(): void {
        this.getPresets();
        this.change$ = new Subject();
    }

    /**
     * On update show the message about the action that has been performed.
     * @param {SelectPresetRequest} change The change.
     */
    onUpdate(change: SelectPresetRequest): void {
        const message = `Preset '<strong>${change.name}</strong>' has been selected`;
        this.change$.next(message);
    }
}
