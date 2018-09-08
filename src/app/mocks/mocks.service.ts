import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MockRequest} from './mock-request';
import {Observable} from 'rxjs';

/** Mocks service. */
@Injectable()
export class MocksService {
    private BASE_URL = '/ngapimock';

    /**
     * Constructor.
     * @param {HttpClient} http The http client.
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Gets the mocks.
     * @return {Observable<Object>} observable The observable.
     */
    getMocks(): Observable<any> {
        return this.http.get(`${this.BASE_URL}/mocks`);
    }

    /**
     * Resets the mocks to default.
     * @return {Observable<Object>} observable The observable.
     */
    resetMocksToDefault() {
        return this.http.put(`${this.BASE_URL}/actions`, { action: 'defaults' });
    }

    /**
     * Sets the mocks to passThrough.
     * @return {Observable<Object>} observable The observable.
     */
    setMocksToPassThrough() {
        return this.http.put(`${this.BASE_URL}/actions`, { action: 'passThroughs' });
    }

    /**
     * Updates the mock.
     * @param {MockRequest} request The request.
     * @return {Observable<Object>} observable The observable.
     */
    updateMock(request: MockRequest) {
        return this.http.put(`${this.BASE_URL}/mocks`, request);
    }
}
