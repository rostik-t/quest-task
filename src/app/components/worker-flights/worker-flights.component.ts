import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import {WorkersFlightsService} from "../../services/workers-flights.service";
import {Subject, takeUntil} from "rxjs";
import {Flight} from "../../models/flight.interface";

@Component({
    selector: 'app-worker-flights',
    templateUrl: './worker-flights.component.html',
    styleUrls: ['./worker-flights.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerFlightsComponent implements OnInit, OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();

    flights: Flight[] = [];

    selectedFlight: Flight;

    @Output() onSelectFlight = new EventEmitter<Flight>;

    constructor(
        private workersFlightsService: WorkersFlightsService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.workersFlightsService.updated
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.flights = this.workersFlightsService.getSelectedWorkerFlights().flights;
                this.selectFlight(this.flights[0]);
                this.changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    selectFlight(flight: Flight) {
        this.selectedFlight = flight;
        this.onSelectFlight.next(flight);
    }

    isSelected(flight: Flight) {
        return flight === this.selectedFlight;
    }


}
