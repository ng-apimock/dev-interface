import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { InfoResponse } from "./versions.interfaces";

@Injectable({ providedIn: "root" })
export class VersionsService {
  private readonly BASE_URL = "/ngapimock";

  /**
   * Constructor.
   * @param {HttpClient} http The http client.
   */
  constructor(private readonly http: HttpClient) {
  }

  /**
   * Gets the core version
   * @return {Observable<InfoResponse>} observable The observable.
   */
  getCoreVersion(): Observable<InfoResponse> {
    return this.http.get<InfoResponse>(`${this.BASE_URL}/info`);
  }
}