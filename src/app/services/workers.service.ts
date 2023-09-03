import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Flight} from "../models/flight.interface";
import {Worker} from '../models/worker.interface'

@Injectable({
    providedIn: 'root'
})
export class WorkersService {

    private URL = 'http://20.66.25.216:3000';

    constructor(private http: HttpClient) {
    }

    getWorkersList(): Observable<Worker[]> {
        return this.http.get<Worker[]>(`${this.URL}/workers`, {headers: {'content-type': 'text/plain'}});
    }

    getWorkerFlights(workerId: number): Observable<Flight[]> {
        return this.http.get<Flight[]>(`${this.URL}/flights/${workerId}`);

    }
}
