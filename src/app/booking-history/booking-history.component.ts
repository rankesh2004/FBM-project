import { Component } from '@angular/core';
import { FlightBookingService } from '../services/flight-booking.service';
import { compileComponentClassMetadata } from '@angular/compiler';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-history.component.html',
  styleUrl: './booking-history.component.css'
})
export class BookingHistoryComponent {
  combinedData: any[] = [];
  isView = false
  selectedPassengers:any[]=[]

  constructor(private flightBookingService: FlightBookingService) {}

  onOpenView(id:string){
    const booking = this.combinedData.find((item) => item.id === id);

    if (booking && booking.bookings.passengers) {
      this.selectedPassengers = booking.bookings.passengers;
      console.log(this.selectedPassengers)
      this.isView = !this.isView; 
    }
  }

  onCloseView(){
    this.isView = !this.isView
    this.selectedPassengers = []
  }

  ngOnInit(): void {
    this.flightBookingService.getCombinedData().subscribe((data:any) => {
      console.log(data)
      this.combinedData = data;
    });
  }
}
