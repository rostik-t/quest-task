import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {WorkersListComponent} from './components/workers-list/workers-list.component';
import {FlightsPageComponent} from './components/flights-page/flights-page.component';
import {WorkerFlightsComponent} from './components/worker-flights/worker-flights.component';
import {FlightInfoComponent} from './components/flight-info/flight-info.component';
import {HttpClientModule} from "@angular/common/http";
import { DurationPipe } from './shared/duration.pipe';

@NgModule({
    declarations: [
        AppComponent,
        WorkersListComponent,
        FlightsPageComponent,
        WorkerFlightsComponent,
        FlightInfoComponent,
        DurationPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
