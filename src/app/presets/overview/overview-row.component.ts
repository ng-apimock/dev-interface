import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { PresetsService } from '../presets.service';
import { SelectPresetRequest } from '../select-preset-request';

@Component({
    selector: '[apimock-preset-overview-row]',
    templateUrl: './overview-row.component.html',
    styleUrls: ['./overview-row.component.scss']
})
export class OverviewRowComponent implements OnInit, OnDestroy {
    @Input() preset: any;
    @Output() updated = new EventEmitter();
    subscriptions: Subscription[];

    /**
     * Constructor.
     * @param {PresetsService} presetsService The presets service.
     */
    constructor(private readonly presetsService: PresetsService) {
        this.subscriptions = [];
    }

    /** {@inheritDoc} */
    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    /** {@inheritDoc} */
    ngOnInit(): void {
        this.preset.showMocksDetails = false;
        this.preset.showVariablesDetails = false;
    }

    /** Toggle the mocks details. */
    toggleMocksDetails(): void {
        this.preset.showMocksDetails = !this.preset.showMocksDetails;
    }

    /** Toggle the variables details. */
    toggleVariablesDetails(): void {
        this.preset.showVariablesDetails = !this.preset.showVariablesDetails;
    }

    /** Select the preset. */
    selectPreset(): void {
        const presetRequest = new SelectPresetRequest(this.preset.name);
        this.subscriptions.push(this.presetsService.selectPreset(presetRequest)
            .subscribe(() => this.updated.emit(presetRequest)));
    }
}
