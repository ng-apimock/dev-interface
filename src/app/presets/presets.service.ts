import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreatePresetRequest } from './create-preset/create-preset-request';
import { GetPresetResponse } from './presets.interfaces';

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
     * Creates a new preset
     * @param {CreatePresetRequest} request The request.
     * @returns {Observable<any>} observable The observable.
     */
    createPreset(request: CreatePresetRequest): Observable<any> {
        return this.http.post(`${this.BASE_URL}/${PRESET_URI}`, request, { responseType: 'blob' });
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
    selectPreset(request: { name: string }): Observable<any> {
        return this.http.put(`${this.BASE_URL}/${PRESET_URI}`, request, { responseType: 'text' });
    }
}
