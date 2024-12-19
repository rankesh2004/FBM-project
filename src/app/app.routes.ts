import { Routes } from '@angular/router';
import { CancelBookingComponent } from './cancel-booking/cancel-booking.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { FlightComponent } from './flight/flight.component';

export const routes: Routes = [
    {
        path:"flights",
        component:FlightComponent
    },
    {
        path:"cancel-booking",
        component:CancelBookingComponent
    },
    {
        path:"booking-history",
        component:BookingHistoryComponent
    }
];
