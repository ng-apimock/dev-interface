import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SelectPresetRequest} from './select-preset-request';

/** Presets service. */
@Injectable()
export class PresetsService {
    private BASE_URL = '/ngapimock';

    /**
     * Constructor.
     * @param {HttpClient} http The http client.
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Gets the presets.
     * @return {Observable<Object>} observable The observable.
     */
    getPresets(): Observable<any> {
        return this.http.get(`${this.BASE_URL}/presets`);
    }

    /**
     * Selects the preset.
     * @param {SelectPresetRequest} request The request.
     * @return {Observable<Object>} observable The observable.
     */
    selectPreset(request: SelectPresetRequest) {
        return this.http.put(`${this.BASE_URL}/presets`, request);
    }
}
