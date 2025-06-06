import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AIRLINE_SERVICE } from '../constants/services-constants';
import { API_URL } from '../constants/app-constants';

@Injectable({
  providedIn: 'root',
})
export class AirlineService {
  readonly airlineLogo$: BehaviorSubject<string> = new BehaviorSubject<string>(
    'Aucun fichier',
  );
  readonly airlines$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(readonly http: HttpClient) {
    this.refreshAirlinesList();
  }

  public refreshAirlinesList(): void {
    this.findAllAirlines().subscribe((airlines) => {
      this.airlines$.next(airlines);
    });
  }

  public get airlineLogo(): Observable<string> {
    return this.airlineLogo$;
  }

  public get airlines(): Observable<any[]> {
    return this.airlines$;
  }

  public findAllAirlines(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/airlines/list`);
  }

  public findAirline(): Observable<any> {
    return this.http.get<any>(`${AIRLINE_SERVICE}`);
  }

  public updateAirline(airlineUpdated: any): Observable<any> {
    return this.http
      .put<any>(`${AIRLINE_SERVICE}update`, { airlineUpdated })
      .pipe(
        tap(() => {
          this.refreshAirlinesList();
        }),
      );
  }

  public checkAirlineLogo(): Observable<any[]> {
    return this.http.get<any>(`${AIRLINE_SERVICE}check-logo`);
  }
}
