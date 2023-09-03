import {ChangeDetectorRef, Injectable} from '@angular/core';
import {WorkersService} from "./workers.service";
import {WorkerFlights} from "../models/worker-flights";
import {Flight} from "../models/flight.interface";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WorkersFlightsService {
    private INTERVAL_UPDATE_PERIOD = 1000 * 60; // one minute

    private workersFlightsList: Map<number, WorkerFlights> = new Map<number, WorkerFlights>();

    private selectedWorkerId: number;

    updated: Subject<void> = new Subject<void>();

    constructor(private workersService: WorkersService) {
    }

    selectWorker(workerId: number): void {
        const workerFlights = this.workersFlightsList.get(workerId);
        if (!workerFlights) {
            this.workersService.getWorkerFlights(workerId)
                .subscribe((flights: Flight[]) => {
                    this.setNewWorkerFlights(workerId, flights);
                    this.selectedWorkerId = workerId;
                    this.updated.next();
                })
        } else {
            this.selectedWorkerId = workerId;
            this.updated.next();
        }

    }

    getSelectedId(): number {
        return this.selectedWorkerId;
    }

    getSelectedWorkerFlights(): WorkerFlights {
        return this.workersFlightsList.get(this.selectedWorkerId);
    }

    destroyTimers(): void {
        this.workersFlightsList.forEach(item => {
            window.clearInterval(item.intervalId);
        })

    }

    private setNewWorkerFlights(workerId: number, flights: Flight[]): void {
        const workerFlights = new WorkerFlights(workerId, flights);
        this.workersFlightsList.set(workerId, workerFlights);
        workerFlights.intervalId = this.setUpdateInterval(workerId, workerFlights);
    }

    private setUpdateInterval(workerId: number, workerFlights: WorkerFlights): number {
        return window.setInterval(() => {
            this.workersService.getWorkerFlights(workerId)
                .subscribe((flights: Flight[]) => {
                    workerFlights.flights = flights;
                    if (this.selectedWorkerId === workerId) {
                        this.updated.next();
                    }
                })
        }, this.INTERVAL_UPDATE_PERIOD)
    }
}
