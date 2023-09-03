import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Flight} from "../../models/flight.interface";
import {WorkersFlightsService} from "../../services/workers-flights.service";

@Component({
    selector: 'app-flights-page',
    templateUrl: './flights-page.component.html',
    styleUrls: ['./flights-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightsPageComponent implements OnDestroy {

    constructor(private workersFlightsService: WorkersFlightsService) {
    }

    selectedFlight: Flight;

    selectFlight(flight: Flight) {
        this.selectedFlight = flight;
    }

    ngOnDestroy() {
        this.workersFlightsService.destroyTimers();
    }

}
