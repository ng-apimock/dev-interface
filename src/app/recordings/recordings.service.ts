import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

/** Recordings service. */
@Injectable({ providedIn: "root" })
export class RecordingsService {
  private readonly BASE_URL = "/ngapimock";

  /**
   * Constructor.
   * @param {HttpClient} http The http client.
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Gets the mocks.
   * @return {Observable<Object>} observable The observable.
   */
  getRecordings(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/recordings`);
  }

  /**
   * Enables or Disables the recording functionality.
   * @param {boolean} record The indicator recording.
   * @return {Observable<any>} observable The observable.
   */
  record(record: boolean): Observable<any> {
    return this.http.put(`${this.BASE_URL}/actions`, {
      action: "record",
      record: record,
    });
  }
}
