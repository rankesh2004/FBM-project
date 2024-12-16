import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlightComponent } from './flight/flight.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FlightComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'booking-app';
}
