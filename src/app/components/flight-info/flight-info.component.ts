import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Flight} from "../../models/flight.interface";

@Component({
    selector: 'app-flight-info',
    templateUrl: './flight-info.component.html',
    styleUrls: ['./flight-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightInfoComponent {
    @Input() flight: Flight;

}
