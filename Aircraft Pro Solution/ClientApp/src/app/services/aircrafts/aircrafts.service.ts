import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aircraft } from 'src/app/models/aircraft.model';
import { environment } from 'src/environments/environment';

/**
 * Note: We would create a proper provider layer for the API in an ideal world, but 
 * it's fine for this exercice. 
 * */

interface AircraftNoId extends Omit<Aircraft, "id">{}

@Injectable({
  providedIn: 'root'
})
export class AircraftsService {

  baseAircrafApiUrl: string = environment.baseUrl + 'api/aircrafts';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Aircraft[]> {
    return this.http.get<Aircraft[]>(this.baseAircrafApiUrl);
  }

  get(id: number): Observable<Aircraft> {
    return this.http.get<Aircraft>(`${this.baseAircrafApiUrl}/${id}`);
  }

  add(newAircraft: AircraftNoId): Observable<Aircraft> {
    return this.http.post<Aircraft>(this.baseAircrafApiUrl, newAircraft);
  }

  update(updatedAircraft: Aircraft): Observable<Aircraft> {
    return this.http.put<Aircraft>(`${this.baseAircrafApiUrl}/${updatedAircraft.id}`, updatedAircraft)
  }

  delete(id: number): Observable<Aircraft> {
    return this.http.delete<Aircraft>(`${this.baseAircrafApiUrl}/${id}`);
  }

}
