import { Mock } from '@ng-apimock/core/dist/mock/mock';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MockRequest } from './mock-request';
import { GetMocksResponse, MockState } from './mock-state';

/** Mocks service. */
@Injectable()
export class MocksService {
    private readonly BASE_URL = '/ngapimock';

    /**
     * Constructor.
     * @param {HttpClient} http The http client.
     */
    constructor(private readonly http: HttpClient) {
    }

    /**
     * Gets the mocks.
     * @return {Observable<GetMocksResponse>} observable The observable.
     */
    getMocks(): Observable<GetMocksResponse> {
        return this.http.get<GetMocksResponse>(`${this.BASE_URL}/mocks`);
    }

    /**
     * Resets the mocks to default.
     * @return {Observable<Object>} observable The observable.
     */
    resetMocksToDefault(): Observable<any> {
        return this.http.put(`${this.BASE_URL}/actions`, { action: 'defaults' });
    }

    /**
     * Sets the mocks to passThrough.
     * @return {Observable<Object>} observable The observable.
     */
    setMocksToPassThrough(): Observable<any> {
        return this.http.put(`${this.BASE_URL}/actions`, { action: 'passThroughs' });
    }

    /**
     * Updates the mock.
     * @param {MockRequest} request The request.
     * @return {Observable<Object>} observable The observable.
     */
    updateMock(request: MockRequest): Observable<any> {
        return this.http.put(`${this.BASE_URL}/mocks`, request);
    }
}
