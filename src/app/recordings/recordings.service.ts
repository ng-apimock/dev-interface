import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

/** Recordings service. */
@Injectable()
export class RecordingsService {
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
    getRecordings(): Observable<any> {
        return this.http.get(`${this.BASE_URL}/recordings`);
    }
}
