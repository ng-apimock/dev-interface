import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MocksWithState } from '../mocks/mock-state';

import { GetPresetResponse } from './presets.interfaces';
import { SelectPresetRequest } from './select-preset-request';

const PRESET_URI = 'presets';
/** Presets service. */
@Injectable()
export class PresetsService {
    private readonly BASE_URL = '/ngapimock';

    /**
     * Constructor.
     * @param {HttpClient} http The http client.
     */
    constructor(private readonly http: HttpClient) {
    }

    /**
     * Gets the presets.
     * @return {Observable<GetPresetResponse>} observable The observable.
     */
    getPresets(): Observable<GetPresetResponse> {
        return this.http.get<GetPresetResponse>(`${this.BASE_URL}/${PRESET_URI}`);
    }

    /**
     * Selects the preset.
     * @param {SelectPresetRequest} request The request.
     * @return {Observable<Object>} observable The observable.
     */
    selectPreset(request: SelectPresetRequest): Observable<any> {
        return this.http.put(`${this.BASE_URL}/${PRESET_URI}`, request);
    }

    /**
     * Creates a new preset
     * @param presetName
     * @returns {Observable<any>} observable The observable.
     */
    createPreset(presetName: string, mocks: MocksWithState): Observable<any> {
        return this.http.post(`${this.BASE_URL}/${PRESET_URI}`, {name: presetName, mocks, variables: {}}, {responseType: 'blob'});
    }
 }
