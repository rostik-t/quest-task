import {Flight} from "./flight.interface";

export class WorkerFlights {
    workerId: number;
    flights: Flight[];
    intervalId: number;

    constructor(workerId: number, flights: Flight[]) {
        this.workerId = workerId;
        this.flights = flights;
    }
}
